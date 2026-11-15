# G12 Controlled Infrastructure Activation and Staging Pilot

Status: CONTROLLED NO-GO — internal synthetic pilot boundary is documented; production and external pilot remain prohibited.
Date: 14 November 2026 (MYT)  
Local service family: 5100.

## Activation order

1. Git: configure the approved remote, protected default branch, review policy, and source commit baseline.
2. Supabase: configure a non-production project boundary, Auth, database connection, RLS, environment variables, and readback checks.
3. Vercel: configure preview/staging only, separate environment variables, and no production promotion.
4. Migration: review candidate SQL against physical source schemas, execute only in staging, capture migration ID/readback, then test rollback.
5. Pilot: record named users, appointment scopes, data classification, monitoring, support, incident contacts, and rollback owner.
6. Decision: run staging UAT and update the signed GO/NO-GO record.

## Safety controls

- No production or customer data.
- Enterprise writes remain disabled until a specific staging change record authorizes them.
- No service-role key in browser code, Git, or Vercel client variables.
- Supabase RLS must be read back and tested for tenant, project, contract, and revoked appointment boundaries.
- Vercel preview/staging must not share production secrets or data.

## Current observed state

- Local fixture frontend and synthetic test suite are available.
- Git `origin` is configured to `https://github.com/EffortEdutech/workledger-enterprise.git`; `master` tracks `origin/master` at `1e84dabceb20217823ce85d33fc65862c0611736`.
- Vercel `workledger-enterprise` is verified under Eff Edu's projects and linked to `EffortEdutech/workledger-enterprise`. A READY deployment exists at `workledger-enterprise-kp6g4db8b-eff-edus-projects.vercel.app` with target `production`, commit `1e84dabceb20217823ce85d33fc65862c0611736`; this is an infrastructure exception and is not pilot approval.
- A separate READY staging deployment was created from the same GitHub `master` commit: deployment `dpl_wxohMwSWCWZioFho5TtCdVBYf55v`, URL `workledger-enterprise-eebqkxdof-eff-edus-projects.vercel.app`, target `staging`. The static frontend makes no backend calls; the project’s Preview environment separately carries the explicit writes-disabled safety variables.
- The initial staging deployment returned HTTP 404 because it used the repository root. A replacement deployment `dpl_DDV9enGLYF8iGZ5Wh1BZCimnWZ5V` with root `ui/app` returned HTTP 200 for `/`, `/app.js`, and `/styles.css`; it is the current staging UAT target.
- Vercel now has only two non-secret Preview variables: `WLE_ENVIRONMENT=preview` and `WLE_ENTERPRISE_WRITES=false`; both are targeted to Preview only, have no security issues, and `hiddenProductionEnvCount=0`. No Supabase URL/key or production variable was added.
- Supabase project `gumlaaqfxxkdlwuusfhv` is now reachable and reports `ACTIVE_HEALTHY` in region `ap-southeast-2` with Postgres 17.11. Read-only inspection found zero migrations, zero tables in the requested schemas, and no security or health lints. No SQL or migration was applied.
- A read-only SQL preflight confirmed the available extensions include `pgcrypto`, `uuid-ossp`, and `plpgsql`. The candidate SQL still references the unprovisioned `wle_e01`, `wle_e04`, and `wle_e06` schemas, so migration execution remains held pending physical source-schema reconciliation.
- A minimal staging control migration was applied as `20261114182126` (`g12_staging_readiness_boundary`). Readback confirms `wle_staging.release_readiness` exists with RLS and FORCE RLS enabled and zero policies (default deny); it contains no customer data and hard-checks staging, synthetic-only, writes-disabled, and HOLD defaults.
- Supabase Auth readback returned `auth.users` count `0`; no pilot identities or customer accounts exist. A disposable transaction rollback probe created and rolled back a temporary staging relation, with post-rollback `to_regclass` returning `null`.
- One synthetic readiness record was inserted and read back: `7db568ae-91ec-4218-bdd2-f92883fedd9a`, project ref `gumlaaqfxxkdlwuusfhv`, `writes_enabled=false`, `data_classification=synthetic-only`, `owner_decision=HOLD`.
- Candidate SQL remains unexecuted.
- The production-target deployment requires owner review before any pilot GO decision; no production variables or customer data were observed.
- Owner decision: retain the production-target deployment as an explicitly excluded infrastructure exception; do not promote, connect data, or enable writes. The staging pilot uses the separate `ui/app` deployment and synthetic-only boundary.
- Hosted branch protection could not be read through the connected GitHub integration (HTTP 403). Compensating control for this synthetic pilot: no production promotion, no write-enabled deployment, no customer data, and the source commit is pinned in the local and Vercel records.
- Previous release decision remains HOLD / NO-GO until this gate produces evidence.

## Evidence required for completion

- Git remote/branch record and source commit hash.
- Supabase staging/Auth/RLS readback without exposing secrets.
- Vercel preview/staging deployment reference and environment separation.
- Migration ID, schema readback, rollback result, and test logs.
- Pilot owner/user/data-classification record.
- Staging UAT, monitoring, incident, and updated signed decision.

Current UAT and controlled decision record: `docs/G12_STAGING_UAT_AND_DECISION.md`.
