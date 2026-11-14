# WorkLedger Enterprise — Frontend-First UX Blueprint

**Status:** UX architecture baseline  
**Date:** 14 November 2026 (MYT)  
**Purpose:** Design the complete user experience before backend implementation creates dependency or delivery risk.

## 1. UX objective

WorkLedger Enterprise should make complex construction administration feel controlled, explainable, and calm. Every important number, status, document, decision, and progress statement must answer:

- What is this?
- Who supplied or approved it?
- Which contract, project, baseline, diary, BOQ, or document version does it belong to?
- What is its current state?
- What can I do next?
- What is still unverified or awaiting review?

The interface must never make an unverified observation look like certified progress, payment entitlement, contractual delay, EOT approval, or legal compliance.

## 2. User roles and primary jobs

| Role | Primary job | Main workspace |
|---|---|---|
| Enterprise owner | Govern organisations, policies, integrations, and release controls | Enterprise Control |
| Organisation admin | Manage users, projects, contracts, and access | Administration |
| Project director / client | Understand project health, decisions, risks, and progress | Executive Overview |
| Contract administrator | Control notices, instructions, submissions, responses, and chronology | Contract Control |
| Site manager | Capture daily events, observations, constraints, and evidence | Site Diary |
| Contractor / package lead | Submit factual progress and supporting evidence | Progress Workspace |
| Quantity surveyor | Review BOQ, work packages, measurements, and commercial references | QS Workspace |
| Programme manager | Review baseline, task status, dates, dependencies, and forecast | Programme Control |
| Independent reviewer | Verify or reject factual observations | Review Queue |
| Auditor / legal reviewer | Trace evidence, chronology, versions, access, and decisions | Audit & Evidence |
| Read-only stakeholder | Consume approved information without changing it | Reports |

One person may hold multiple roles. The UI should present capabilities and current appointment scope, not merely a role label.

## 3. Product information architecture

### Global shell

- Organisation switcher
- Project and contract switcher
- Global search
- Alerts and review tasks
- Help and terminology
- User profile and current appointment
- Environment indicator: Local, Staging, or Production

### Primary navigation

1. **Home** — role-specific overview and outstanding work.
2. **Projects** — projects, contracts, packages, key dates, and status.
3. **Contract Control** — notices, instructions, submissions, responses, decisions, and chronology.
4. **Site Diary** — daily records, evidence, weather, manpower, work fronts, and acknowledgements.
5. **Programme** — baselines, WBS, tasks, dates, dependencies, and versions.
6. **BOQ & QS** — BOQ revisions, work packages, quantities, units, and source references.
7. **Progress** — observations, review queue, verified progress, and reports.
8. **Audit & Evidence** — evidence registry, integrity, custody, access, and audit packages.
9. **Reports** — approved reports, report builder, exports, and report history.
10. **Administration** — users, appointments, capabilities, integrations, policies, and feature flags.

Navigation is capability-aware. Users should see what they can understand and act on; denied pages should explain the boundary without leaking other-tenant information.

## 4. Screen system

### Home

- Role-specific action summary
- Project health cards
- Review queue count
- Pending submissions and overdue responses
- Evidence integrity alerts
- Recent decisions and changes
- Clear distinction between factual, verified, provisional, and approved information

### Project and contract overview

- Contract identity and parties
- Current status and key dates
- Baseline and BOQ version
- Work packages and responsibility map
- Open notices, instructions, submissions, and risks
- Activity chronology
- Permission and appointment summary

### Contract Control

- Notice register
- Instruction register
- Submission and response register
- Decision and approval register
- Correspondence chronology
- Document version history
- Filters by date, actor, status, contract, package, and evidence
- Exportable audit trail

### Site Diary

- Calendar and daily record list
- Diary authoring and offline draft state
- Evidence upload and attachment integrity
- Work fronts, manpower, plant, weather, constraints, and observations
- Submit, acknowledge, amend-by-new-version, and audit history
- Clear separation between diary fact and later progress assessment

### Programme

- Baseline selector with active/superseded state
- WBS tree and task list
- Timeline and dependency view
- Task source lineage
- Planned versus observed progress
- Baseline history and comparison
- No silent reassignment of historical observations to a successor baseline

### BOQ & QS

- BOQ revision selector
- Work package and item browser
- Unit and quantity display
- QS source references and manifest status
- Programme-task crosswalk
- Remeasurement and mapping warnings
- Commercial values hidden or labelled according to capability

### Progress

- Observation inbox
- New factual observation flow
- Evidence and source selection
- Quantity increment OR completion assessment, never both
- Pending review state
- Reviewer decision view
- Verified progress projection
- Correction and void history
- Report cut and publication history

### Audit & Evidence

- Evidence registry
- Original file and digest status
- Source diary and document links
- Custody timeline
- Access log
- Integrity verification
- Audit-package builder
- Professional/legal review state

### Reports

- Report catalogue
- Draft, provisional, verified, and published states
- As-of date and source-event cut
- Scope and filter summary
- Provenance drawer on every important result
- Export preview
- Immutable published report history

## 5. Core interaction patterns

### Provenance drawer

Every progress figure, status, or decision opens a side panel showing source IDs, version, actor, date, evidence, verification state, and related events.

### Review queue

Reviewers see only items within current appointment scope. Each item shows source evidence, conflicts, stale-source warnings, prior actions, and a required reason for rejection or correction.

### Version timeline

Documents, diaries, baselines, BOQ revisions, and reports use the same timeline pattern: current version, prior versions, actor, timestamp, reason, and linked evidence.

### State language

Use consistent labels:

- Draft
- Submitted
- Acknowledged
- Pending review
- Verified factual record
- Rejected
- Voided with retained history
- Provisional report
- Published report
- Superseded
- Access restricted

Avoid labels such as certified completion, amount payable, EOT granted, CIPAA served, or critical delay confirmed unless a separately approved workflow explicitly supports that decision.

## 6. Design system direction

### Visual character

Professional, dense but readable, evidence-oriented, and suitable for long working sessions. Use a restrained neutral base with one strong action colour and distinct semantic states.

### Layout

- Persistent left navigation on desktop
- Responsive drawer on tablet/mobile
- Wide data tables with sticky identity columns
- Detail pages using summary header, tabs, activity timeline, and provenance side panel
- Avoid dashboard decoration that hides operational work

### Components required

- App shell
- Organisation/project/contract switchers
- Permission-aware navigation
- Status badge
- Review queue item
- Provenance drawer
- Version timeline
- Evidence card
- Audit event row
- Data table with filters
- Timeline/Gantt view
- Empty/loading/error/stale states
- Confirmation and destructive-action dialogs
- Export preview

### Accessibility

- Keyboard-complete workflows
- Visible focus
- Semantic table headers
- Labels not dependent on colour
- Screen-reader state announcements
- Sufficient contrast
- Responsive overflow for tables
- Clear error and recovery instructions

## 7. Frontend-first delivery contract

Backend work must not block frontend delivery. Each screen is built against a local typed view model and deterministic fixtures first.

For every screen, define:

1. Route and navigation entry.
2. Persona and capability.
3. View model.
4. Fixture data.
5. Loading, empty, error, stale, denied, and pending states.
6. User actions and confirmation rules.
7. Provenance and audit display.
8. Accessibility acceptance criteria.
9. API adapter interface to be connected later.

The frontend may use mock adapters, but must never fabricate success states that the eventual backend cannot represent. Mock data must visibly identify synthetic or illustrative content.

## 8. Recommended frontend build sequence

### UX-01 — Shell and navigation

Deliver the app shell, role-aware navigation, project/contract context, environment banner, global search, and responsive behaviour.

### UX-02 — Design system and states

Deliver typography, spacing, colour tokens, tables, statuses, timelines, drawers, forms, errors, and accessibility primitives.

### UX-03 — Read-only project and contract control

Deliver project overview, contract summary, document versions, chronology, notices, instructions, submissions, and responses using fixtures.

### UX-04 — Site Diary and evidence

Deliver diary list/detail, evidence cards, version timeline, submission/acknowledgement states, and custody views.

### UX-05 — Programme, BOQ, and provenance

Deliver baseline selector, WBS/task browser, BOQ revision views, source crosswalk, and provenance drawer.

### UX-06 — Progress and review

Deliver observation form, pending review, reviewer queue, verify/reject flows, correction history, and verified progress projection.

### UX-07 — Reports and audit packages

Deliver report catalogue, as-of report preview, immutable publication state, audit chronology, and evidence-package builder.

### UX-08 — Role and permission journeys

Walk every major screen through all relevant personas, including denied, stale, revoked, read-only, and multi-contract cases.

## 9. UX acceptance gates

The frontend is not ready for backend integration until:

- Every primary persona has a defined journey.
- Every primary screen has loading, empty, error, denied, stale, and pending states.
- All important values expose provenance.
- No screen implies legal, commercial, or certification authority it does not possess.
- Mock data and real data use the same typed view-model shape.
- Navigation and actions are capability-aware.
- Accessibility checks pass for keyboard, focus, labels, contrast, and responsive tables.
- Screens have stable IDs and acceptance criteria for automated testing.
- The backend adapter contract is documented before implementation begins.

## 10. Prototype deliverable

The first clickable local prototype is available at:

ui/enterprise_prototype.html

It covers the shell, role preview, navigation, project overview, contract control, site diary, programme, BOQ & QS, progress/review, audit & evidence, reports, and administration views. It uses only in-file synthetic fixtures and makes no network calls.

The prototype becomes the visual and interaction contract for subsequent backend work. Later implementation should preserve its information architecture, state language, provenance patterns, and role journeys unless a UX decision records the change.

