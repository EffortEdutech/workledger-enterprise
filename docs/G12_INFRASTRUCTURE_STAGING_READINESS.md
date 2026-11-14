# G12 Controlled Infrastructure Activation and Staging Pilot

Status: IN PROGRESS — readiness plan established; external activation not yet executed.  
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
- Git `origin` is configured to `https://github.com/EffortEdutech/workledger-enterprise.git`; no push has been performed.
- Supabase and Vercel are not yet connected to the workspace.
- Candidate SQL remains unexecuted.
- Previous release decision remains HOLD / NO-GO until this gate produces evidence.

## Evidence required for completion

- Git remote/branch record and source commit hash.
- Supabase staging/Auth/RLS readback without exposing secrets.
- Vercel preview/staging deployment reference and environment separation.
- Migration ID, schema readback, rollback result, and test logs.
- Pilot owner/user/data-classification record.
- Staging UAT, monitoring, incident, and updated signed decision.
