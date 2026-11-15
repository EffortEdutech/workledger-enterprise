# G11 Release Evidence Register

Date: 14 November 2026 (MYT)  
Decision: HOLD — preparation complete; pilot authorization pending.

## Repository and build facts

| Item | Observed value | Release implication |
|---|---|---|
| Working branch | `master` | Branch policy and protected remote are not yet configured |
| Git remote | `origin` configured; `master` tracks `origin/master` at `1e84dabceb20217823ce85d33fc65862c0611736` | Hosted protection policy remains pending |
| Local port family | 5100 | Use for WorkLedger Enterprise local services |
| Test baseline | 128 passing tests | Local synthetic baseline verified |
| Supabase | `gumlaaqfxxkdlwuusfhv` active/healthy; migration `20261114182126`; FORCE RLS read back; synthetic HOLD record `7db568ae-91ec-4218-bdd2-f92883fedd9a` | E01/E04/E06 reconciliation and actual E07 migration remain pending |
| Vercel | `workledger-enterprise` verified under `eff-edus-projects`, linked to GitHub; zero project/hidden production env vars observed | Preview/staging environment separation and safe variables remain pending |
| Production migration | Not executed | No customer data may be used |

## Evidence index

- `docs/G0–G10` records and the development checklist.
- `evidence/g4-route-screenshots/` and `docs/G4_ROUTE_SCREENSHOT_MANIFEST.md`.
- `tests/` full synthetic regression and G10 UAT gate.
- `sql/008_programme_actuals_reporting_CANDIDATE.sql` — unexecuted candidate only.
- `docs/G9_DATABASE_RLS_CONCURRENCY_PROOF.md` — local proof and staging holds.

## Named risk register

| Risk | Owner | Disposition |
|---|---|---|
| Physical source schemas may differ from candidate SQL | DBA owner to be named | Hold migration; reconcile before staging |
| Auth/RLS policy not yet deployed to Supabase | Security/DBA owner to be named | Hold real identities and customer data |
| Contract/CIPAA terminology needs professional review | Contract/legal owner to be named | Hold legal-facing pilot materials |
| QS mapping and measurement interpretation require acceptance | QS owner to be named | Synthetic only until accepted |
| No protected Git remote or deployment environment | Project/infrastructure owner | Configure Git before shared pilot |
| Incident response and rollback contacts not recorded | Operations owner to be named | Pilot hold |

## Pilot decision record

Current decision: **NO-GO / HOLD** for customer or production data.  
Permitted activity: local review and controlled synthetic demonstration.  
Go criteria: named approvals, Supabase Auth/RLS readback, Git remote, isolated Vercel/staging environment, rollback test, pilot user/data classification, and signed owner decision. Approval record: `docs/G11_APPROVAL_RECORD_TEMPLATE.md`.
