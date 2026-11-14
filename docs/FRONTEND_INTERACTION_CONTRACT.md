# WorkLedger Enterprise — Frontend Interaction Contract

**Goal:** G2 — Frontend interaction contract  
**Status:** G2 approved baseline; production implementation follow-ups tracked  
**Date:** 14 November 2026 (MYT)  
**Prototype:** ui/enterprise_prototype.html

## 1. Contract purpose

This document is the frontend contract between product, UX, and engineering. It defines the routes, user journeys, reusable components, fixture shapes, visible states, and acceptance rules that backend integration must satisfy.

The frontend must remain usable in local fixture mode and must not wait for live APIs, database migrations, or source-system integration.

## 2. Approved role set

The approved role set includes Enterprise owner, organisation admin, project director/client, contract administrator, site manager, site supervisor, contractor/package lead, quantity surveyor, programme manager, independent reviewer, auditor/legal reviewer, and read-only stakeholder.

## 3. Route map

| Route ID | Route | Primary users | Purpose |
|---|---|---|---|
| HOME-01 | /enterprise/home | All roles | Role-specific overview and outstanding work |
| PROJ-01 | /enterprise/projects | Admin, director, stakeholder | Project and contract selection |
| CONT-01 | /enterprise/contracts/:contractId | Director, contract admin | Contract summary and control centre |
| CONT-02 | /enterprise/contracts/:contractId/chronology | Contract admin, auditor | Chronology and event history |
| CONT-03 | /enterprise/contracts/:contractId/notices | Contract admin | Notices, instructions, submissions, responses |
| DIAR-01 | /enterprise/contracts/:contractId/diary | Site manager, contract admin | Daily diary list and status |
| DIAR-02 | /enterprise/diary/:diaryId | Site manager, reviewer, auditor | Diary facts, evidence, acknowledgement, versions |
| PROG-01 | /enterprise/contracts/:contractId/programme | Programme manager, director | Baseline, WBS, tasks, dates, dependencies |
| PROG-02 | /enterprise/programmes/:baselineId/tasks/:taskId | Programme manager, QS | Task detail, lineage, and observed progress |
| BOQ-01 | /enterprise/contracts/:contractId/boq | QS, director | BOQ revision and work-package browser |
| BOQ-02 | /enterprise/boq/:itemId | QS, reviewer | Item, unit, quantity, mapping, and source |
| PRG-01 | /enterprise/contracts/:contractId/progress | QS, reviewer, director | Progress projection and review queue |
| PRG-02 | /enterprise/progress/review/:observationId | Independent reviewer | Verify, reject, or request correction |
| AUD-01 | /enterprise/contracts/:contractId/audit | Auditor, legal reviewer, director | Audit chronology, custody, and integrity |
| AUD-02 | /enterprise/audit/packages/new | Auditor, legal reviewer | Build controlled evidence package |
| RPT-01 | /enterprise/contracts/:contractId/reports | Director, stakeholder, auditor | Report catalogue and history |
| RPT-02 | /enterprise/reports/:reportId | Director, stakeholder, auditor | Immutable report view and provenance |
| ADMIN-01 | /enterprise/admin | Owner, organisation admin | People, appointments, capabilities, policies |
| ADMIN-02 | /enterprise/admin/integrations | Owner, admin | Source-system and environment status |

## 4. Role journeys

### Project director / client

1. Select organisation, project, and contract.
2. Review health, open actions, verified progress, and recent chronology.
3. Open a progress figure and inspect its provenance.
4. Compare a published report with the current baseline.
5. Export or share an approved report within appointment scope.

Acceptance: the director can understand current status without seeing unverified observations as approved progress.

### Contract administrator

1. Open Contract Control.
2. Record or review notices, instructions, submissions, responses, and decisions.
3. Link each event to documents, people, dates, and evidence.
4. Monitor overdue responses.
5. Export a chronology or audit package.

Acceptance: every contract event has an attributable actor, date, state, version, and evidence path.

### Site manager

1. Open the current diary date.
2. Record factual site observations and attach evidence.
3. Save a local draft where offline.
4. Submit the diary for acknowledgement.
5. View acknowledgement and later immutable versions.

Acceptance: the diary flow never presents a diary fact as verified programme progress.

### Site supervisor

1. Open assigned project, contract, and work-front context.
2. Review daily diary entries and attached evidence for factual completeness.
3. Add or confirm site observations within appointment scope.
4. Flag discrepancies, missing evidence, or incorrect work-front references.
5. Submit factual support for independent review without self-approving verified progress.

Acceptance: the site supervisor can support factual completeness but cannot convert an observation into verified progress unless separately appointed as an independent reviewer.

### Contractor / package lead

1. Select assigned contract and work package.
2. Review baseline task context and source lineage.
3. Submit a physical quantity or completion assessment with evidence.
4. See pending review state and reviewer outcome.
5. Correct only through a new append-only submission when permitted.

Acceptance: quantity and completion percentage are mutually exclusive and always show unit/source context.

### Quantity surveyor

1. Review BOQ revision and source manifest.
2. Inspect work-package and programme-task mapping.
3. Review observed quantities with explicit units.
4. Inspect remeasurement and mapping warnings.
5. Produce or review factual progress reports without silently creating valuation.

Acceptance: QS views retain native source IDs, revisions, units, and mapping warnings.

### Independent reviewer

1. Open the review queue.
2. Inspect observation, diary, evidence, baseline, and appointment provenance.
3. Verify or reject with a reason.
4. See stale-source or changed-digest warnings.
5. Retain the review action in the audit timeline.

Acceptance: a reviewer cannot verify their own observation and cannot review outside current appointment scope.

### Auditor / legal reviewer

1. Select a contract and date range.
2. Browse chronology, document versions, evidence custody, and access history.
3. Verify hashes and source links.
4. Build an audit package.
5. Record professional/legal review status without changing factual source records.

Acceptance: the package is evidence-backed and clearly labelled as supporting professional/legal review, not legal advice.

## 5. Production component inventory

### Shell and navigation

- AppShell
- EnterpriseBanner
- OrganisationSwitcher
- ProjectContractSwitcher
- CapabilityAwareNav
- GlobalSearch
- UserAppointmentMenu
- EnvironmentBadge

### Data display

- MetricCard
- StatusPill
- DataTable
- FilterBar
- EmptyState
- LoadingState
- ErrorState
- StaleDataState
- DeniedState
- PendingState
- ProvenanceDrawer
- SourceBadge
- VersionTimeline
- ActivityTimeline
- EvidenceCard
- AuditEventRow

### Workflows

- ReviewQueue
- ReviewDecisionPanel
- ObservationForm
- DiaryForm
- EvidenceUploadPanel
- NoticeForm
- SubmissionResponseForm
- ReportCutForm
- AuditPackageBuilder
- ConfirmationDialog

### Domain views

- ProjectOverview
- ContractControlBoard
- DiaryList
- DiaryDetail
- ProgrammeBaselineView
- ProgrammeTaskDetail
- BoqRevisionView
- BoqItemDetail
- ProgressReviewView
- AuditEvidenceView
- ReportCatalogue
- PublishedReportView
- AdministrationView

## 6. Fixture schemas

Fixtures use stable IDs and preserve the same shape expected from future adapters. Synthetic records must be labelled as synthetic.

### Context fixture

    {
      "organisationId": "org_syn_northbank",
      "projectId": "project_syn_northbank",
      "contractId": "contract_syn_nb042",
      "name": "Northbank Mixed Development",
      "environment": "local-fixture",
      "appointment": {
        "role": "project-director",
        "capabilities": ["read:reports", "read:contract"],
        "status": "active"
      }
    }

### Source lineage fixture

    {
      "baselineId": "baseline_syn_v3",
      "baselineVersion": 3,
      "baselineStatus": "active",
      "qsProgrammeId": 91,
      "qsSourceRevision": "r3",
      "manifestSha256": "synthetic-sha-9f2a81",
      "boqRevision": "02",
      "boqSha256": "synthetic-sha-boq02",
      "canonicalTaskId": "task_syn_1071",
      "nativeQsTaskId": 1071
    }

### Diary fixture

    {
      "diaryId": "diary_syn_1112",
      "version": 1,
      "localDate": "2026-11-12",
      "status": "acknowledged",
      "factsSha256": "synthetic-sha-diary1112",
      "evidenceIds": ["evidence_syn_8801"],
      "authorId": "user_syn_site_manager",
      "acknowledgedBy": "user_syn_contract_admin"
    }

### Progress observation fixture

    {
      "observationId": "observation_syn_0042",
      "taskId": "task_syn_1071",
      "measureType": "physical_quantity",
      "quantity": "18.5000",
      "unit": "m3",
      "status": "pending_review",
      "diaryId": "diary_syn_1112",
      "baselineId": "baseline_syn_v3",
      "createdBy": "user_syn_package_lead",
      "review": null
    }

### Audit event fixture

    {
      "eventId": "event_syn_0214",
      "eventType": "diary_acknowledged",
      "occurredAt": "2026-11-12T18:10:00+08:00",
      "actorId": "user_syn_contract_admin",
      "contractId": "contract_syn_nb042",
      "sourceRefs": ["diary_syn_1112", "evidence_syn_8801"],
      "previousEventHash": "synthetic-prev-hash",
      "eventHash": "synthetic-event-hash"
    }

## 7. Required UI states

Every data-bearing route must implement:

- Loading — explain what is being loaded.
- Empty — explain why no record exists and what action is available.
- Error — explain whether retry or support is required.
- Denied — explain the current scope boundary without leaking data.
- Stale — identify the source version and last verified time.
- Pending — show what is awaiting acknowledgement or review.
- Superseded — preserve historical context and prevent new observations where prohibited.
- Offline draft — show local save and synchronisation state where supported.
- Synthetic — visibly label fixture data and disabled real actions.

## 8. Interaction rules

1. Primary actions must be visible only when the current capability allows them.
2. Destructive or legally meaningful actions require confirmation and a reason.
3. Every progress value must expose provenance.
4. Every versioned record must show current version, prior versions, actor, time, and reason.
5. A pending record must never enter a verified projection.
6. A correction must create a new event; the original record remains visible.
7. A published report cannot be edited in place.
8. The UI must never imply payment, certification, EOT, CIPAA entitlement, or legal compliance without a separately approved workflow.

## 9. G2 acceptance criteria

- [x] Route map defined.
- [x] Primary role journeys defined.
- [x] Production component inventory defined.
- [x] Fixture schemas defined.
- [x] Required UI states defined.
- [x] Interaction rules defined.
- [x] Product owner approves the route map and role journeys, with Site Supervisor added.
- [x] UX review approves design tokens and component visual treatment.
- [x] Engineering confirms the fixture shapes and adapter boundary.
- [x] Accessibility reviewer accepts keyboard, focus, labels, contrast, and responsive behaviour for the prototype.

## 10. Change control

Any backend requirement that changes a route, role journey, state, provenance pattern, or component contract must be recorded as a UX change before implementation. The prototype may evolve, but the interaction contract must remain explicit.

