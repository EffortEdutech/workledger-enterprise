# G30 — Internal UAT Completion and Release Candidate Validation

Status: COMPLETE for internal synthetic read-only UAT.

## Route and role matrix

The stable staging deployment passed all seven authorized journeys:

| Role | Authorized route exercised |
|---|---|
| Project Director | Home |
| Contract Administrator | Contract Control |
| Site Manager | Site Diary |
| Site Supervisor | Progress |
| Quantity Surveyor | Programme |
| Independent Reviewer | Progress |
| Auditor / Legal Reviewer | Reports |

The matrix also confirmed capability denial for an unauthorized Project Director Audit route.

## State and boundary validation

The release candidate verified stale, pending, denied, synthetic-only, and writes-disabled states. All checks ran against deterministic synthetic fixtures and the stable alias. No customer data, external users, production identity, or write operation was used.

## Deployment and rollback

- Stable alias: [workledger-enterprise.vercel.app](https://workledger-enterprise.vercel.app/)
- Current READY deployment: `dpl_Bma92GWoWNVDK9otqf2WithWmHdY`
- Release commit: `e49ac0d76b4b43c36a752a50f79ac5768b6b7e55`
- Previous READY rollback reference: `dpl_CPKLgXm3ttKrCHtWM4ogECwvB8rw`

## Evidence

- G30 route/state runner: `scripts/g30_release_candidate.mjs`
- Final screenshot: `evidence/g30-release-candidate.png`
- Browser matrix: 7/7 authorized journeys passed.
- State checks: stale, pending, denied, read-only, and synthetic-only passed.
- Regression suite: 140/140 passed.

## Decision

GO for controlled internal synthetic UAT release-candidate use. NO-GO for production, customer data, external users, writes, and production access.
