# G19 Release Hardening and Pilot Operations

Status: IN PROGRESS — baseline reconciliation complete; hardening record and pilot package are being finalized.

## Objective

Prepare the completed authenticated synthetic staging boundary for repeatable internal pilot operation without enabling production traffic, customer data, or writes.

## Checklist

- [x] Reconcile local, GitHub, and Vercel commit/deployment pins.
- [x] Confirm the stable alias and root/index routes with smoke checks.
- [x] Record rollback target and the recovery steps.
- [x] Verify Supabase environment and RLS read-only controls remain unchanged.
- [x] Package the pilot runbook, UAT evidence, screenshots, and known limitations.
- [x] Record the owner’s internal-pilot GO/NO-GO decision.

## Baseline reconciliation — 15 November 2026

| Boundary | Readback | Status |
|---|---|---|
| Local checkout | `master` at `1e84dab`; dirty changes are present and preserved | HOLD — do not reset or overwrite |
| GitHub release branch | `codex/g18-authenticated-frontend` at `a553439cc6d8c52aea30f5a8a8786cdd504686d5` | READY |
| Vercel stable deployment | `dpl_ZADc7rsNu13A9cboLjEfWdS4pcfE`, READY, stable alias assigned | READY |
| Stable root route | `https://workledger-enterprise.vercel.app/` → HTTP 200 | PASS |
| Stable app route | `/ui/app/index.html` → HTTP 200 | PASS |
| Supabase project | `gumlaaqfxxkdlwuusfhv`, `ACTIVE_HEALTHY`, Postgres 17.11 | PASS |

The local checkout is intentionally not treated as the release source until the dirty changes are reviewed and committed/pinned. The stable UAT source remains the GitHub/Vercel G18 branch and deployment above.

## Supabase hardening readback

- `public.wle_staging_appointments`: authenticated SELECT only, limited to the caller’s own `synthetic-only` appointment.
- `public.wle_staging_read_model`: authenticated SELECT only, limited to `synthetic-only`, `read_only = true`, and an active appointment with matching organization/project/contract/scope.
- No INSERT, UPDATE, or DELETE policy was introduced.
- Security advisor findings recorded: `wle_staging.release_readiness` intentionally has RLS with no policies (default deny); leaked-password protection is disabled and remains a release hardening item before any non-synthetic use.
- Health advisors returned no findings.

## Rollback and recovery

1. Stop pilot access by removing the stable alias from the current deployment or assigning it back to the previous known-good deployment `dpl_22ZnmhoZa4q9dwWyEqRgwgS89Nnj`.
2. Keep Supabase writes disabled and do not import customer/source data.
3. Re-run the root/app HTTP smoke checks and authenticated synthetic UAT matrix.
4. Record the new deployment ID, commit SHA, alias assignment, and decision in this document before resuming.

## Pilot package and decision

Package references:

- [G18 authenticated frontend UAT](G18_AUTHENTICATED_FRONTEND_UAT.md)
- [G11 pilot operations runbook](G11_PILOT_OPERATIONS_RUNBOOK.md)
- [G14 staging UAT report](G14_STAGING_UAT_REPORT.md)
- [G15 read-only integration contract](G15_READ_ONLY_INTEGRATION_CONTRACT.md)
- [G16 source-schema read mapping](G16_SOURCE_SCHEMA_READ_MAPPING.md)
- [Local UAT screenshots](../evidence/g18/screenshots/)

Owner decision: **GO for controlled internal synthetic pilot operations; NO-GO for production traffic, external users, customer/source data, and write-enabled operation.**

Known limitations: the local checkout and release branch are not yet unified; the Supabase leaked-password protection warning remains unresolved; and the deployment is not a production authorization.

## Boundary

G19 does not authorise production promotion, customer-data import, external users, or write-enabled operations. Any such change requires a new explicit goal and decision.
