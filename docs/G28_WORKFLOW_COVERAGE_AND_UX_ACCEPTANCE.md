# G28 — Workflow Coverage and UX Acceptance

Status: COMPLETE for controlled internal synthetic staging.

## Delivered

- Deterministic local workflow state and transitions for project selection, diary acknowledgement, evidence verification, review open/complete, programme baseline acceptance, BOQ locking, provenance opening, and audit filtering.
- Programme, BOQ, evidence, provenance, review, chronology, audit, stale, denied, empty, pending, and error presentation states remain read-only and local-only.
- Role-aware navigation exercised across the seven configured journeys: Project Director, Contract Administrator, Site Manager, Site Supervisor, Quantity Surveyor, Independent Reviewer, and Auditor / Legal Reviewer.
- Browser acceptance screenshots captured for programme acceptance and BOQ locking in `evidence/g28-programme-accepted.png` and `evidence/g28-boq-locked.png`.

## Verification

- `npm test`: 137 passed, 0 failed.
- `node --check ui/app/app.js`: passed.
- `git diff --check`: passed.
- Stable staging deployment: `workledger-enterprise.vercel.app`, commit `654f85c9f13520c5ae80975ae484b824dd3065b5`.

## Boundary

This gate covers internal synthetic UAT only. It does not authorise production identity, customer data, external users, write operations, or a Supabase plan upgrade.
