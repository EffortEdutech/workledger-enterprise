# G13 Authorised Pilot Governance and Production Separation

Status: COMPLETE — controlled staging separation verified; production deployment removed; external/production pilot remains NO-GO.

Date: 15 November 2026 (MYT)

## Simplified operating model

G13 is limited to an internal synthetic pilot. No customer data, production traffic, external users, payment/entitlement decisions, or legal conclusion is permitted. Local development and the Vercel staging deployment may continue under read-only/fixture controls.

## Required decisions and current evidence

| Gate | Current state | Required evidence/action |
|---|---|---|
| Production Vercel deployment | PASS — deleted and confirmed absent from current project deployment readback | No production deployment remains; staging deployments remain READY |
| Reviewer assignments | Not required for this project gate per Overall Project Owner instruction | Do not create or wait for independent reviewer assignments; retain explicit scope boundaries and NO-GO controls |
| GitHub branch protection | Not required for the current owner-controlled synthetic pilot; API/browser verification was unavailable | Keep commit pinning, local tests, no-promotion, and no-write controls; enable hosted protection later for team-scale production work |
| Source-schema reconciliation | Supabase target has only `wle_staging.release_readiness`; candidate depends on absent `wle_e01`, `wle_e04`, `wle_e06` | Obtain authoritative schema readbacks and map keys/FKs before applying candidate SQL |
| Migration/rollback | Transaction rollback probe passes; candidate migration remains unexecuted | DBA review, staging migration ID, before/after readback, and tested rollback |
| Pilot decision | Controlled NO-GO for external/production use | Issue revised decision after the above evidence is accepted |

## Production separation controls

- Vercel staging deployment: `dpl_DDV9enGLYF8iGZ5Wh1BZCimnWZ5V`, root `ui/app`, synthetic static frontend.
- Preview variables: `WLE_ENVIRONMENT=preview`, `WLE_ENTERPRISE_WRITES=false`.
- Supabase project: `gumlaaqfxxkdlwuusfhv`, synthetic-only readiness row, writes disabled, default-deny RLS.
- No Supabase service-role key is stored in Git, browser code, or Vercel variables.
- Existing production deployment is excluded from the pilot until the owner decision is recorded.

## Source-schema reconciliation preflight

Local authoritative source repositories are present and were inspected read-only:

- Contract Diary Platform exposes UUID-based `public.contracts`, `public.organizations`, `public.work_diaries`, `public.diary_photos`, `public.programme_items`, and `public.programme_versions` in its database schema.
- QS Service exposes integer-keyed `projects`, `boq_items`, `programmes`, `programme_tasks`, `programme_task_dependencies`, and programme resource/assignment tables in its migrations.
- The current Supabase staging project does not contain these source schemas or tables; it contains only the G12 staging control table.
- Therefore the E07 candidate SQL must not be applied. A future reconciliation must define explicit source connection/read-only import boundaries and preserve UUID-vs-integer native identifiers before migration review.

## Approval record

| Role | Name | Decision | Date | Evidence |
|---|---|---|---|---|
| Overall project owner | User / EffortEdutech account owner | Decision authority | 15 Nov 2026 | G12 controlled NO-GO |
| Reviewer assignments | Not applicable | Not required | 15 Nov 2026 | Owner instruction |

## Exit decision

Decision: **NO-GO for production/external pilot; GO for internal synthetic staging review only.**

Production separation is verified. Independent reviewer assignments and hosted branch protection are not gates for this owner-controlled synthetic scope. The candidate migration remains unexecuted until a future source-schema and migration decision is made. Internal synthetic frontend work remains permitted.
