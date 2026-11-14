# WorkLedger Enterprise — Authoritative Master Record

Status: Working product and architecture baseline
Date: 14 November 2026 (MYT)
Authority: This local repository is the working source of truth. This record consolidates the current project context, the migrated WLE-E07 candidate, and the available local source repositories.

## 1. Objectives

WorkLedger Enterprise is an evidence-first construction contract and project-control platform. It connects operational records, contract administration, daily site evidence, programme progress, quantity-surveying references, approvals, and audit history into a controlled project record.

The primary objectives are to:

1. Preserve a trustworthy history of what happened, when it happened, who recorded or approved it, and what evidence supports it.
2. Connect daily Contract Diary observations to approved WorkLedger projects, contracts, work packages, BOQ items, and programme tasks.
3. Provide version-locked, source-traceable progress reporting.
4. Enforce organisation, project, contract, appointment, role, and capability boundaries.
5. Preserve immutable history, corrections, approvals, and evidence custody.
6. Improve CIPAA-related auditability and dispute-readiness without replacing legal or professional judgment.
7. Create a secure foundation for future QS, commercial, claims, EOT, and adjudication workflows.

WorkLedger Enterprise does not independently certify payment, determine contractual delay, approve variations, grant EOT, decide CIPAA entitlement, or replace the appointed QS, contract administrator, client, or legal adviser.

## 2. Product and feature scope

### Core platform

- Multi-tenant organisation, project, contract, user, appointment, and capability model.
- Contract and project records with controlled status and authority.
- Document, correspondence, notice, instruction, and submission registers.
- Version history, source lineage, timestamps, actors, approvals, and audit events.
- Searchable evidence packages and management reporting.

### Contract Diary and evidence

- Daily diary capture with local observation date.
- Evidence attachments and original-byte custody.
- Submission and acknowledgement states.
- Immutable facts digests and evidence references.
- Offline-capable capture and later synchronisation where appropriate.

### Programme and actuals

- Accepted programme baselines and immutable source crosswalks.
- Programme task, WBS, native QS ID, canonical task ID, and BOQ lineage.
- Physical quantity observations with explicit units.
- Completion assessments using explicit basis points.
- Independent review, rejection, correction, and append-only void events.
- As-of progress reports with pinned source event sequence.
- Immutable published report snapshots.

### QS and commercial foundation

- BOQ revision and digest references.
- Quantity, unit, remeasurement, and work-package provenance.
- QS source manifest and accepted baseline references.
- Future support for valuation, claims, variation, and EOT workflows subject to separate approvals.

### Audit and compliance

- Complete chronology of contract events, submissions, notices, instructions, responses, and decisions.
- Evidence integrity through hashes, immutable versions, custody references, and audit receipts.
- Named actors, appointments, capabilities, timestamps, and approval history.
- Clear distinction between factual observation, professional assessment, commercial entitlement, and legal conclusion.
- Exportable audit and dispute-readiness packages.

## 3. CIPAA-related audit and compliance capability

The platform should support CIPAA-related readiness by making the contract record complete, ordered, attributable, and evidence-backed. Relevant capabilities include:

- Contract and document version control.
- Notice, instruction, claim, response, and acknowledgement registers.
- Chronological event and decision history.
- Evidence custody and original-file integrity.
- Proof of submission, receipt, acknowledgement, review, and response.
- Immutable audit trails for corrections and superseded records.
- Searchable bundles for internal audit, dispute review, adjudication preparation, and professional/legal handoff.

The system must not label a record as legally compliant, determine adjudication entitlement, infer a valid notice, or provide legal advice without authorised professional and legal review.

## 4. System architecture

### WorkLedger

System of record for enterprise organisations, projects, contracts, memberships, appointments, operational workflows, and reporting surfaces. Enterprise functionality should be isolated behind Enterprise-only routes and feature flags where required.

### Contract Diary Platform

Source of daily site observations, diary status, evidence references, acknowledgement state, and immutable diary facts. Enterprise progress verification must re-check trusted diary state and evidence digests rather than trusting browser input.

### QS Service

Source of BOQ, programme, task, WBS, quantity, unit, pricing, and source-manifest references. WorkLedger Enterprise should retain QS native identifiers while also maintaining stable canonical identifiers and accepted source-version lineage.

### Enterprise integration boundary

The intended flow is:

Source records → trusted verification adapters → Enterprise command handlers → append-only audit/event ledger → projections and reports

Required trust boundaries:

- E01 appointment and capability verification.
- E04 diary submission/acknowledgement and facts verification.
- E03 original evidence readback and hash verification.
- E05 BOQ revision and digest verification.
- E06 accepted baseline, manifest, task crosswalk, and source-version verification.
- PostgreSQL transactions and RLS enforced by least-privileged server roles.

No browser-supplied actor, role, capability, baseline proof, diary proof, or evidence digest is authoritative.

## 5. Research findings and assumptions

### Confirmed from the local candidate

- The E07 isolated candidate contains contracts, SQL design, implementation, tests, evidence, scripts, and a UI prototype.
- The candidate test suite passes 107 tests.
- The design uses explicit typed measures, independent review, append-only correction, immutable reports, and source provenance.
- The current SQL is conceptual and not approved for execution.
- The current UI is disconnected and non-production.

### Working assumptions

- WorkLedger remains the Enterprise product host and authoritative application boundary.
- Contract Diary remains the authoritative source for diary facts and evidence custody.
- QS Service remains the authoritative source for QS programme and BOQ data.
- Enterprise must never silently convert diary text into measured progress.
- Programme progress is not automatically a payment certificate, claim, EOT decision, or legal conclusion.
- Historical observations remain attached to the accepted baseline under which they were captured.

### Unknowns requiring validation

- Exact production schemas, foreign keys, indexes, and RLS policies across all three repositories.
- Authoritative E01 capability names and appointment semantics.
- E03 evidence retention and original-byte readback contract.
- E04 acknowledgement and immutable facts contract.
- E05 and E06 signed manifest and acceptance receipts.
- QS-approved precision, remeasurement, unit conversion, and task/BOQ mapping rules.
- CIPAA document, notice, response, and legal-review workflow requirements.

## 6. Implementation roadmap

### Phase 0 — Foundation and control

- Preserve snapshots of the three dirty local repositories.
- Confirm branch and commit pins.
- Establish the authorised isolated staging environment and rollback plan.
- Approve measurement, evidence, appointment, and audit decisions.

### Phase 1 — Read-only integration map

- Trace real schemas and identifiers across WorkLedger, Contract Diary, and QS Service.
- Document adapter contracts and source-of-truth ownership.
- Build read-only verification adapters for appointment, diary, evidence, baseline, and BOQ provenance.

### Phase 2 — Enterprise actuals foundation

- Reconcile the candidate SQL with real schemas.
- Implement private server command handlers.
- Add PostgreSQL transactions, durable idempotency, append-only events, and RLS.
- Keep all Enterprise write routes feature-flagged OFF by default.

### Phase 3 — Verified progress and reporting

- Implement trusted observation capture.
- Implement independent review and correction workflows.
- Produce immutable as-of reports with complete provenance.
- Add negative, race, replay, tenant-boundary, and rollback tests.

### Phase 4 — Audit and CIPAA readiness

- Implement notices, instructions, submissions, responses, correspondence, and chronology registers.
- Add evidence-package generation and audit export.
- Add retention, custody, access logging, and professional/legal review states.

### Phase 5 — Controlled pilot

- Run synthetic UAT and accessibility checks.
- Validate WorkLedger Standard regressions.
- Obtain named owner, DBA, security, QS, contract, and legal approvals.
- Pilot only with approved non-production or controlled customer data.

## 7. Risks and open decisions

Key unresolved decisions include:

- Meaning and governance of task-level completion percentage.
- Unit precision, remeasurement, and unit conversion.
- BOQ, work-package, WBS, and programme-task mapping.
- Treatment of variations, provisional sums, claims, certificates, and EOT.
- Separation of Contract Diary acknowledgement from Enterprise factual verification.
- E03 evidence hashing, retention, and original-byte custody.
- Correction, void, non-repudiation, and retention authority.
- Accepted versus superseded baseline reporting semantics.
- Real appointment roles and Enterprise capabilities.
- QS signatures, manifest validity, and stage acceptance.
- RLS reconciliation with legacy migrations.
- CIPAA workflow ownership and the boundary between system audit support and legal advice.

## 8. Release gates

No production or customer release until all relevant gates pass:

- Authorised staging and rollback ticket.
- Real E01 appointment and capability verification.
- Real E04 diary and E03 evidence verification.
- Real E05 BOQ and E06 baseline/source-manifest verification.
- DBA-approved schema, transactions, and RLS.
- Two-tenant and sibling-contract isolation proof.
- Concurrent review, correction, replay, and report-cut proof.
- QS approval of measurement and mapping rules.
- Accessibility and WorkLedger Standard regression proof.
- CIPAA audit/export workflow review.
- Named owner, security, DBA, QS, contract, and legal approvals.

## 9. Current disposition

The local WLE-E07 candidate is an isolated engineering baseline. Its 107 tests pass, but it is not production-approved, live-integrated, legally determinative, or customer-ready.

The next recommended bounded implementation step is to map and verify the real source-system contracts, then implement a read-only Enterprise integration boundary before enabling write workflows.

