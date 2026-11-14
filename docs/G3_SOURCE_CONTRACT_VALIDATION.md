# G3 — Source Contract Validation Record

**Date:** 14 November 2026 (MYT)  
**Status:** Complete for local contract discovery and adapter-design baseline; live staging validation deferred to implementation gates.

## Why G3 was not previously complete

The first G3 pass correctly stopped at the boundary between repository evidence and integration authority. Local schema names and route files can show what a system appears to support, but they do not prove:

- which deployment is authoritative;
- which schema generation is active;
- which endpoint or RPC is approved for Enterprise use;
- which identity and RLS rules apply in staging;
- whether a source receipt is signed, immutable, and acceptable for progress verification;
- who owns and approves the cross-system identity mapping.

Continuing past that point by guessing would create a frontend/backend contract that could be wrong or unsafe. The stop was therefore an intentional evidence gate, not a failure of the plan.

## Locally observed boundaries

### WorkLedger

- Supabase-backed application with organisation, project, contract, member, work-entry, attachment, report, and activity-log concepts.
- Frontend services access WorkLedger entities through the application Supabase client and service modules.
- Role and permission definitions exist in source and are also represented in database constraints/RLS documentation.
- WorkLedger has no locally proven Enterprise-specific baseline, diary, evidence receipt, or QS manifest endpoint.

**Validation state:** local application boundary observed; Enterprise integration contract not yet approved.

### Contract Diary Platform

- Supabase-backed contract application with contract members, diary/work-diary records, diary photos/evidence, BOQ, programme versions/items, inspections, alerts, audit logs, and event logs.
- Documentation identifies contract-scoped child modules and links between diaries, programme items, BOQ items, and audit records.
- Contract member role values include reviewer, approver, auditor, submitter, and readonly.

**Validation state:** local schema and module boundaries observed; authoritative diary verification and original-byte evidence receipt contract not yet approved.

### QS Service

The local application exposes concrete internal routes, including:

- GET/POST /api/projects
- GET/POST /api/programmes
- GET /api/programmes/:id
- GET /api/programmes/:id/cpm
- GET /api/programmes/:id/calendar
- GET /api/programmes/:id/histogram
- GET /api/programmes/:id/export/mspdi
- GET/POST /api/programmes/:id/stage/:stage
- POST /api/programmes/:id/begin-review
- POST /api/programmes/:id/stage/:stage/confirm
- POST /api/programmes/:id/stage/:stage/reopen
- BOQ, jobs, resources, rates, notes, and tender-package routes

The QS database model uses integer project, BOQ item, programme, and programme-task identifiers and supports hierarchical tasks, dependencies, resources, BOQ-to-task links, review decisions, and provenance/supersession.

**Validation state:** internal route inventory observed; no Enterprise-authorised external API, signed baseline receipt, or staging identity contract yet approved.

## Current cross-system contract decision

Until owner-approved staging contracts exist, Enterprise must use a read-only adapter boundary with the following shape:

1. WorkLedger supplies authenticated actor and current appointment scope.
2. Contract Diary supplies diary facts, immutable version, acknowledgement state, evidence references, and trusted digest.
3. QS Service supplies accepted programme/BOQ source revision, native integer IDs, task snapshots, and manifest/acceptance receipt.
4. Enterprise creates its own UUID, stores external references, records verification results, and never treats a caller-supplied source object as proof.

## Identity crosswalk proposal

| Enterprise field | WorkLedger reference | Contract Diary reference | QS Service reference | Approval |
|---|---|---|---|---|
| enterprise_organisation_id | organizations.id | organizations.id or contract_members.organization_id | profile/client scope | Pending owner approval |
| enterprise_project_id | projects.id | contract/project context | projects.project_id | Pending owner approval |
| enterprise_contract_id | contracts.id | contracts.id | external project/contract context | Pending owner approval |
| enterprise_task_id | Enterprise UUID | programme_items.id where linked | programme_tasks.task_id | Pending QS/contract approval |
| enterprise_boq_item_id | Enterprise UUID | boq_items.id where linked | boq_items.boq_item_id | Pending QS/contract approval |
| enterprise_diary_id | — | work_diaries/work_diary_entries.id | — | Pending Diary owner approval |
| enterprise_evidence_id | attachments.id where mirrored | diary_photos/evidence ID | source document ID where applicable | Pending evidence owner approval |

No row in this crosswalk is approved for production use yet.

## Required owner decisions

- Overall project owner and competent reviewer: User — owns product scope, sequencing, acceptance, source-contract review, documented-risk acceptance, and final go/no-go decisions.
- WorkLedger owner: authoritative organisation/project/contract and appointment scope.
- Contract Diary owner: authoritative diary table, acknowledgement semantics, immutable facts digest, and original evidence custody.
- QS owner: authoritative programme/BOQ source, accepted baseline state, task crosswalk, manifest, and revision semantics.
- DBA/security owner: approved read boundary, RLS behaviour, service-role restrictions, and audit requirements.
- Contract/legal owner: audit and CIPAA-related terminology, retention, and evidence-package boundaries.

The Overall Project Owner has confirmed competency and accepts responsibility for reviewing the local source-contract baseline and documented risks. Live staging tests, migration approval, and production release remain future execution gates, not blockers to continuing local development.

## G3 disposition

The Overall Project Owner has approved this local domain, identity, and trust baseline. G3 is complete for planning, frontend adapter design, and local fixture development. Authorised staging verification will be performed later under the implementation and release gates.

