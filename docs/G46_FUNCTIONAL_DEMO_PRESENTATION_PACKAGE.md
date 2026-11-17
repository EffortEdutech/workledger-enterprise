# G46 — Functional Demo Release Packaging and Presentation Readiness

Status: **READY — FUNCTIONAL SYNTHETIC DEMO PACKAGE**  
Stable URL: `https://workledger-enterprise.vercel.app/ui/app/index.html`  
Field Diary route: `https://workledger-enterprise.vercel.app/ui/app/index.html#diary`  
Admin review route: `https://workledger-enterprise.vercel.app/ui/app/index.html#progress`

## Demo boundary

This package demonstrates WorkLedger Enterprise using seeded synthetic data and simulated source processes. It is suitable for stakeholder presentation and controlled evaluation. It is not secure client production and does not authorize real customer data, external users, production identity, or live writes.

## Reset and setup

1. Open the stable URL in a fresh browser tab.
2. Confirm the banner says `Synthetic data only` and `Writes are disabled`.
3. Use the Preview role selector rather than entering real credentials.
4. For a clean local diary state, clear the browser site storage for the WorkLedger domain, then reload. This removes only the local synthetic diary draft.
5. Use the seeded Northbank Mixed Development / NB-042 context.

## Presentation script

### 1. Executive overview — Project Director

Open Home and show project health, programme-at-a-glance, trust boundary, source-traceable status, and non-contractual boundary.

### 2. Field capture — Site Supervisor

Open `#diary`, capture date, weather, manpower, activities, observations, and optional evidence photos. Select **Save offline draft**, then show the local draft status. Select **Submit to pending sync** and show the synthetic receipt.

### 3. Site management handoff — Site Manager

Show the retained draft/receipt, pending-sync state, evidence count, project/contract scope, and local custody. Explain that no backend write occurs.

### 4. Admin/QS review — Quantity Surveyor

Open `#progress`. Show the Field Diary handoff, `QS-1071` programme link, evidence custody, Contract Diary lineage, audit/CIPAA traceability, and write boundary. Open review, then verify the observation.

### 5. Programme actuals — Quantity Surveyor

Open Programme. Show `Programme actuals · QS-1071`, `18.5000 m³ verified`, inclusion in the observational projection, and pinned diary/evidence/digest lineage.

### 6. Independent review and audit — Independent Reviewer

Return to Progress and Audit & Evidence. Show the verified review state, provenance drawer, chronology, source digest, evidence custody, and appointment-scoped access.

### 7. Reports and close — Auditor / Legal Reviewer

Open Reports and show published/draft report states and provenance actions. Reiterate that CIPAA markers demonstrate audit traceability capability, not legal advice or a legal conclusion.

## Role coverage

| Role | Demonstration routes |
|---|---|
| Project Director | Home, Projects, Contract Control, Reports |
| Contract Administrator | Home, Projects, Contract Control, Site Diary, Audit & Evidence |
| Site Manager | Home, Site Diary, Progress |
| Site Supervisor | Home, Site Diary, Progress |
| Quantity Surveyor | Programme, BOQ & QS, Progress, Reports |
| Independent Reviewer | Home, Progress, Audit & Evidence |
| Auditor / Legal Reviewer | Home, Contract Control, Audit & Evidence, Reports |

## Capability matrix

| Capability | Demo evidence | Boundary |
|---|---|---|
| Field diary PWA | Offline draft, pending-sync receipt, local evidence count | No upload or backend write |
| Contract control | Chronology, instructions, submissions | Synthetic fixtures |
| Programme actuals | Verified diary observation linked to QS task | Observational, non-commercial |
| BOQ/QS | Locked revision, quantities, task mapping | Read-only |
| Evidence/CIPAA audit | Digest, custody, source, actor, chronology | Not legal advice |
| Review decisions | Pending, in review, verified, rejected, stale | Local simulated actions |
| Reports | Published and draft catalogue with provenance | Non-contractual |

## Acceptance evidence

- G45 simulated go-live proof accepted.
- G44 review-to-programme-actuals flow verified.
- Latest regression suite: 182 tests passing.
- Stable Vercel presentation URL and Field Diary PWA route documented above.
- Latest functional acceptance record: `docs/G45_SIMULATED_GO_LIVE_ACCEPTANCE.md`.

## Explicit limitations

- No real authentication or production identity.
- No real Contract Diary or QS endpoint writes.
- No customer data.
- No production RLS/migration claim.
- No monitoring, rollback, or external-user authorization claim.
- No legal or CIPAA compliance conclusion.
