# WorkLedger Enterprise — Functional Production-Demo Release

Status: **IN PROGRESS**  
Release class: zero-budget functional demonstration  
Data mode: synthetic/demo data  
Supabase: Free tier accepted  
Client-production security: deferred

This release is intended for presentation, workflow demonstration, and controlled evaluation. It must not be represented as secure client production or as authorized for real customer data.

## Functional acceptance matrix

| Capability | Demonstration evidence | Status |
|---|---|---|
| Project and contract control | Project context, contract action register, chronology, scope-aware navigation | READY FOR ACCEPTANCE |
| Contract Diary | Diary state, acknowledgement flow, evidence register, custody and digest display | READY FOR ACCEPTANCE |
| Evidence and provenance | Evidence verification action, provenance drawer, source/version/digest lineage | READY FOR ACCEPTANCE |
| Programme and actuals | Accepted baseline, task lineage, progress states, pending/unverified boundary | READY FOR ACCEPTANCE |
| BOQ and QS | Locked BOQ revision, quantities, units, QS task mapping, stale-state demo | READY FOR ACCEPTANCE |
| Review and approvals | Review queue, open-review and complete-review transitions, independent verification state | READY FOR ACCEPTANCE |
| Audit and CIPAA traceability | Chronology, audit package, evidence custody, actor and source references | READY FOR ACCEPTANCE |
| Role journeys | Project Director, Contract Administrator, Site Manager, Site Supervisor, QS, Independent Reviewer, Auditor/Legal Reviewer | READY FOR ACCEPTANCE |
| State handling | Loading, empty, denied, revoked, stale, error, and pending states | READY FOR ACCEPTANCE |
| Controlled deployment | Stable Vercel presentation deployment, synthetic/read-only banner, no customer-data claim | PENDING LIVE ACCEPTANCE |

## Release acceptance conditions

1. Every row above is demonstrated from the stable presentation URL or local app.
2. The seven role journeys can navigate only to their permitted views.
3. At least one complete scenario is shown: project selection → diary/evidence → programme/BOQ → review → audit/provenance.
4. The UI visibly states synthetic/demo mode and writes-disabled boundaries.
5. The release notes explicitly defer client-production Auth, real customer data, security hardening, and full operations.
6. The final presentation decision is recorded by the overall project owner.

## Deferred security release

Production Auth hardening, real customer identities, real Contract Diary/QS endpoints, customer data, production writes, monitoring, and external customer use remain outside this release. They require a separate secure client-production milestone.
