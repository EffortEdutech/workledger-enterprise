# G27 Local Product Workflow Implementation

Status: NEXT — not started.

## Objective

Build the first complete WorkLedger Enterprise product workflows on the reconciled local source using deterministic synthetic fixtures, keeping the frontend demonstrable and testable without Supabase Pro, customer data, or write-enabled infrastructure.

## Scope

- Project and contract control workflow.
- Site diary and evidence capture/review states.
- Programme actuals and BOQ/QS linkage views.
- Review queue, provenance, chronology, and audit views.
- Role-aware route and state transitions.
- Interaction-level acceptance tests and local UX evidence.

## Boundaries

No production traffic, customer/source data, external users, paid Supabase upgrade, or persistent writes. Backend write design remains a later goal after the local workflows are accepted.
