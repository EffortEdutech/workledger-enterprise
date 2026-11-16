# G27 Local Product Workflow Implementation

Status: COMPLETE — deterministic local workflow state and interaction coverage implemented.

## Objective

Build the first complete WorkLedger Enterprise product workflows on the reconciled local source using deterministic synthetic fixtures, keeping the frontend demonstrable and testable without Supabase Pro, customer data, or write-enabled infrastructure.

## Scope

- Project and contract control workflow.
- Site diary and evidence capture/review states.
- Programme actuals and BOQ/QS linkage views.
- Review queue, provenance, chronology, and audit views.
- Role-aware route and state transitions.
- Interaction-level acceptance tests and local UX evidence.

## Completed evidence

- Added `ui/app/workflows.js` with deterministic project, diary, evidence, and review transitions.
- Wired project selection, local diary acknowledgement, evidence verification, and review open/complete actions into the frontend.
- Added four G27 acceptance tests; full suite now passes **134/134**.
- Deployed commit `157c134fcdccb9b7ff2214de9faed3d7265ed263` as READY Vercel deployment `dpl_HDGGo3eEXsjoyh5LckxGWMHBx4pT` and assigned it to the stable alias.
- No persistence, Supabase writes, customer data, or production authorization was introduced.

## Boundaries

No production traffic, customer/source data, external users, paid Supabase upgrade, or persistent writes. Backend write design remains a later goal after the local workflows are accepted.
