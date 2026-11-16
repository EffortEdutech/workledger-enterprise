# G32 — Controlled Internal Pilot Run and Operational Feedback

Status: COMPLETE for controlled internal synthetic pilot.

## Pilot scenario

The deterministic pilot followed one Northbank / NB-042 scenario:

1. Contract Diary provides acknowledged diary `D-2026-1112` and verified evidence `EVD-8801`.
2. QS Service provides accepted Programme v3 and BOQ revision `BOQ-REV-02`, linked to task `QS-1071`.
3. WorkLedger presents the scoped project/contract context, review state, chronology, provenance, and audit package.
4. The local workflow advances through selection, acknowledgement, evidence verification, review, baseline acceptance, BOQ lock, provenance opening, and audit filtering.

## Operational feedback register

| ID | Observation | Class | Disposition |
|---|---|---|---|
| G32-01 | Role-aware navigation and appointment context are understandable across all seven journeys | Positive | Accepted |
| G32-02 | Source lineage is visible from diary evidence through QS task and WorkLedger audit event | Positive | Accepted |
| G32-03 | Synthetic-only and writes-disabled boundaries are continuously visible | Positive | Accepted |
| G32-04 | No blocking workflow, provenance, or authorization defect observed | Finding | Closed |
| G32-05 | Production Auth hardening remains deferred because the Supabase project is on the Free tier | Deferred gate | Retained for a future production decision |

## Verification

- Browser route matrix: 7/7 authorized journeys passed.
- Capability denial: unauthorized Project Director Audit route denied.
- State checks: stale, pending, denied, read-only, and synthetic-only passed.
- Handoff/provenance tests: 2 G32 tests passed.
- Full regression suite: 142/142 passed.
- Stable pilot URL: [workledger-enterprise.vercel.app](https://workledger-enterprise.vercel.app/)
- Evidence screenshot: `evidence/g30-release-candidate.png`

## Pilot decision

GO for continued controlled internal synthetic pilot operations. NO-GO for customer data, external users, production identity, writes, or production release.
