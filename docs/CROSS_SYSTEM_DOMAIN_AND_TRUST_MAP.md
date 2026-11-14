# WorkLedger Enterprise — Cross-System Domain and Trust Map

Goal: G3 — Cross-system domain and trust mapping
Status: Approved local domain and trust baseline; live staging validation deferred to implementation
Date: 14 November 2026 (MYT)
Source basis: Pinned local repositories recorded in SOURCE_REPOSITORY_BASELINE.md. No source repository was modified.

## 1. System responsibilities

| System | Primary responsibility | Enterprise trust position |
|---|---|---|
| WorkLedger | Organisation, membership, project, contract, work-entry, attachment, report, and application workflow | Owns Enterprise user/org scope and WorkLedger operational records |
| Contract Diary Platform | Construction contract lifecycle, diary records, evidence/photos, BOQ, programme versions/items, notices, events, and audit records | Owns daily diary facts, acknowledgement, contract chronology, and source evidence |
| QS Service | BOQ pricing/structuring, work-programme generation, WBS/task hierarchy, dependencies, resources, productivity, and programme review provenance | Owns QS source data and professional programme/BOQ references |
| WorkLedger Enterprise | Cross-system verification, factual progress observations, independent review, immutable reporting, and audit-package projection | Must not replace any source system or accept unverified caller claims |

## 2. Domain ownership map

| Enterprise concept | WorkLedger | Contract Diary | QS Service | Canonical Enterprise rule |
|---|---|---|---|---|
| Organisation | organizations, org_members, user_profiles | organizations, contract_members | profiles, client_user_id, RLS roles | Enterprise organisation identity must be verified against the appointed WorkLedger context |
| Project | projects | contract/project context | projects with integer project_id | Preserve WorkLedger project ID and external QS project ID as separate references |
| Contract | contracts, contract layouts/templates | contracts, contract_members | contract/project context may be external | WorkLedger contract ID is the Enterprise scope key; external contract IDs remain source references |
| User/actor | auth.users, user_profiles, org_members | auth.users, contract_members | profiles/auth roles | Actor identity comes from authenticated server context, never request body |
| Appointment/capability | roles and permissions constants, org membership | contract member roles including reviewer/approver/auditor | internal/client RLS roles | Enterprise capability is evaluated at operation time and is not inferred from display role |
| Diary | work_entries and attachments are WorkLedger operational records | work_diaries/work_diary_entries, diary_photos, evidence-related records | not authoritative | Contract Diary owns diary facts, status, version, and source evidence |
| Evidence | attachments and storage references | diary photos, evidence and audit references | source files for QS inputs | Evidence record must retain original source ID, digest, custody state, and access history |
| BOQ | contract/project context | boq, boq_sections, boq_items, breakdowns, claims references | boq_items and pricing/resource tables | BOQ revision and source digest must be pinned; no silent latest-version substitution |
| Programme | WorkLedger may consume project/contract context | programme_versions, programme_items, programme-to-BOQ links | programmes, programme_tasks, dependencies, resources | Accepted baseline must retain source system, source revision, native task ID, canonical task ID, and manifest |
| Progress | work entries and approvals | diary observations and linked programme/BOQ context | programme task planned data | Enterprise owns factual progress observation and review state, not source facts |
| Audit | activity_logs, reject history, generated_reports | audit_log, event_log, audit snapshots | review decisions, provenance, supersession records | Enterprise audit projection must link source events and preserve append-only history |
| Reports | generated_reports and report layouts | report-supporting records | programme/BOQ exports | Enterprise published report is immutable and explicitly non-contractual unless a separate approved workflow exists |

## 3. Identifier strategy

### Internal identifiers

- Enterprise IDs: UUIDs generated and owned by Enterprise.
- WorkLedger IDs: UUIDs for organisations, projects, contracts, users, work entries, and attachments.
- Contract Diary IDs: UUIDs for contracts, diaries, evidence, BOQ, programme versions, programme items, and audit records.
- QS Service IDs: integer identifiers for projects, BOQ items, programmes, programme tasks, resources, and review records.

### Required crosswalk

Every Enterprise record that crosses a source boundary must retain:

- enterprise record ID
- source system
- source record type
- source record ID
- source version or revision
- source digest or manifest reference where available
- organisation, project, and contract scope
- imported-at and verified-at timestamps
- verification status

QS integer IDs must never be used as Enterprise primary keys. They are immutable external references within the accepted source version.

## 4. Trust boundaries

### Identity and appointment

1. Authenticate the user through the approved WorkLedger identity boundary.
2. Resolve current organisation, project, contract, and appointment scope server-side.
3. Resolve capabilities from server-side membership and appointment records.
4. Re-check capability for every read/write operation and replay.

### Contract Diary and evidence

1. Read the diary by source ID and immutable version.
2. Confirm submitted or acknowledged state as required by the operation.
3. Read the trusted facts digest and original evidence references.
4. Re-read the source digest before independent review.
5. Fail closed if the diary changed, evidence is missing, or original-byte custody is not verified.

### QS baseline and BOQ

1. Read the accepted source manifest or equivalent acceptance receipt.
2. Confirm organisation, project, contract, programme, revision, and status.
3. Confirm the complete task crosswalk and immutable task snapshot.
4. Confirm the accepted BOQ revision and digest.
5. Reject unknown tasks, partial crosswalks, changed source lineage, and superseded baselines for new observations.

### Enterprise persistence

1. Accept only verified source receipts.
2. Store all source IDs, versions, digests, and verification results.
3. Append audit events and preserve previous hashes where the event ledger requires it.
4. Use transaction boundaries for idempotency, review, correction, and report publication.
5. Enforce tenant and contract boundaries with RLS and least-privileged roles.

## 5. Confirmed repository findings

### WorkLedger

- The schema includes organizations, org_members, projects, contracts, work_entries, attachments, activity_logs, generated_reports, and subcontractor relationships.
- Current role constants include org admin, manager, technician, subcontractor, worker, and client variants.
- Permission logic distinguishes platform roles, organisation roles, field workers, and organisation managers.
- Existing UI and database logic already include project, contract, work-entry, attachment, approval, report, and offline/PWA concepts.

### Contract Diary Platform

- The schema includes contracts, contract_members, work diary records, diary photos, BOQ sections/items, programme versions/items, inspections, notices/events, alerts, and audit/event logs.
- Contract member roles include owner, admin, editor, viewer, submitter, reviewer, approver, auditor, and readonly.
- Existing documentation identifies programme versions/items, BOQ items, diary entries, contract chronology, and audit as linked contract modules.
- The repository contains extensive contract-document, work-programme, diary, evidence, and audit planning material.

### QS Service

- The database has a pricing/BOQ foundation with profiles and RLS documentation.
- Work-programme migrations define programmes, hierarchical programme_tasks, task dependencies, resources, assignments, productivity rates, and BOQ-to-task links.
- Governance migrations add planning disciplines, activity templates, mapping precedents, review decisions, knowledge candidates, and approvals.
- Provenance/supersession migrations show that programme review and source lineage must preserve history rather than silently delete or overwrite prior decisions.

## 6. Conflicts and integration risks

1. Project and contract identity is not yet a single shared key across all three systems.
2. WorkLedger and Contract Diary both contain organisation, project, contract, member, BOQ, audit, and attachment concepts; ownership must be explicit per field.
3. Contract Diary and QS Service both contain programme/BOQ structures with different schemas and likely different lifecycle semantics.
4. QS Service uses integer native IDs while WorkLedger and Contract Diary primarily use UUIDs.
5. Role labels differ across systems; a display role cannot be treated as an Enterprise capability.
6. Existing repositories are dirty and contain multiple schema/document generations; current files must be pinned per integration decision.
7. Some schema files are context or generated snapshots rather than approved executable migrations.
8. Real API/RPC/event contracts and signed source receipts are not yet validated.

## 7. Adapter contract requirements

Before G5 read-only integration, each adapter must specify:

- endpoint or database/RPC boundary
- authentication method
- caller scope
- input identifiers
- response shape
- version and status fields
- digest/manifest fields
- failure and stale-source semantics
- rate and retry behaviour
- audit event produced by the read
- fixture and contract-test reference

No adapter is approved merely because a similarly named table exists.

## 8. G3 exit criteria

- [x] System responsibilities mapped.
- [x] Major domain entities mapped.
- [x] Identifier strategy defined.
- [x] Trust boundaries defined.
- [x] Initial repository findings recorded.
- [x] Integration conflicts and risks recorded.
- [x] Local API/RPC boundary inventory documented for adapter design.
- [x] Shared project/contract identity crosswalk approved as the local working baseline.
- [x] E01/E03/E04/E05/E06 adapter requirements approved as the local working baseline.

## 9. Current disposition

G3 has produced and received Overall Project Owner approval for the authoritative local read-only domain and trust map. It guides adapter design and frontend data boundaries. Live integration, database changes, and production release remain governed by later implementation gates.

