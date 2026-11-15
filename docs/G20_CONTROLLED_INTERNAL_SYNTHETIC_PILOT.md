# G20 Controlled Internal Synthetic Pilot

Status: COMPLETE — controlled internal synthetic pilot passed.

## Boundary

Pilot URL: `https://workledger-enterprise.vercel.app/ui/app/index.html`

Data is synthetic only. The pilot does not authorise production traffic, customer/source data, external users, or write-enabled operations.

## Execution evidence — 15 November 2026

| Check | Result | Evidence |
|---|---|---|
| Stable root route | PASS | HTTP 200; WorkLedger Enterprise title |
| Stable app route | PASS | HTTP 200; WorkLedger Enterprise title |
| Projects route | PASS | Rendered `Projects` heading |
| Contract Control route | PASS | Rendered `Contract Control` heading |
| Reports route | PASS | Rendered `Reports` heading |
| Allowed synthetic user | PASS | G18 stable browser evidence: authenticated target scope and scoped read verified |
| Sibling synthetic user | PASS | G18 stable browser evidence: scope denied and no rows available |
| Revoked synthetic user | PASS | G18 stable browser evidence: target scope shown with appointment revoked |
| Signed-out state | PASS | G18 stable browser evidence and local screenshot |
| Expired-session state | PASS | Stable `?uat=expired` browser smoke reached `Session expired or scope denied.` |
| No-write boundary | PASS | Stable UI displayed `Writes are disabled.`; static write-path scan returned no mutation/storage/service-role paths |
| Recovery record | PASS | G19 rollback target and recovery steps are documented |

## Defects and observations

- No blocking pilot defect observed.
- The stable UI can show `Supabase read-only status: connected · empty` when the generic read-model hydration is unauthenticated; authenticated scope reads remain separately verified through the appointment/read-model boundary. This is a presentation issue for a later hardening goal, not a pilot authorization failure.
- Supabase security advisors continue to report the intentional default-deny `wle_staging.release_readiness` table and disabled leaked-password protection. The latter must be addressed before any non-synthetic use.

## Decision

**GO for controlled internal synthetic pilot operations.**

**NO-GO for production traffic, external users, customer/source data, and write-enabled operations.**

## References

- [G18 Authenticated Frontend UAT](G18_AUTHENTICATED_FRONTEND_UAT.md)
- [G19 Release Hardening and Pilot Operations](G19_RELEASE_HARDENING_AND_PILOT_OPERATIONS.md)
- [Local screenshots](../evidence/g18/screenshots/)
