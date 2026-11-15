# G12 Staging UAT and Controlled Pilot Decision

Status: CONTROLLED NO-GO — internal synthetic pilot may continue for review; no external users, production traffic, or customer data are authorised.

Date: 15 November 2026 (MYT)

## Scope

- Environment: Vercel Preview / Supabase `gumlaaqfxxkdlwuusfhv` staging boundary only.
- Data classification: synthetic-only.
- Enterprise writes: disabled (`WLE_ENTERPRISE_WRITES=false`).
- Production variables: none verified (`hiddenProductionEnvCount=0`).
- Candidate E07 migration: not executed; source schemas `wle_e01`, `wle_e04`, and `wle_e06` remain unreconciled.

## UAT evidence

| Check | Result | Evidence |
|---|---|---|
| Local regression suite | PASS — 130/130 | `npm test` on 15 November 2026 |
| Local port/config contract | PASS | `tests/g12_readiness.test.mjs`; `.env.example` |
| Git source baseline | PASS | `origin/master`, commit `1e84dabceb20217823ce85d33fc65862c0611736` |
| Supabase project health | PASS | `ACTIVE_HEALTHY`, `ap-southeast-2`, Postgres 17.11 |
| Supabase Auth boundary | PASS | Read-only `auth.users` count returned 0; no pilot identities or customer accounts exist |
| Staging RLS boundary | PASS | Migration `20261114182126`; RLS + FORCE RLS; zero policies/default deny |
| Synthetic readiness record | PASS | `7db568ae-91ec-4218-bdd2-f92883fedd9a`; HOLD; writes disabled |
| Vercel staging deployment | PASS | READY deployment `dpl_DDV9enGLYF8iGZ5Wh1BZCimnWZ5V`, target `staging`, root `ui/app`, from commit `1e84dab…`; static frontend makes no backend calls |
| Staging runtime smoke test | PASS | `GET /` returned HTTP 200 HTML; `GET /app.js` and `GET /styles.css` returned HTTP 200 |
| Vercel Preview separation | PASS | Preview-only `WLE_ENVIRONMENT=preview`, `WLE_ENTERPRISE_WRITES=false`; no hidden production variables; no custom Vercel environment exists |
| Vercel production promotion boundary | FAIL / REVIEW REQUIRED | READY production-target deployment exists for commit `1e84dabceb20217823ce85d33fc65862c0611736`; owner action required before pilot GO |
| Candidate migration rollback | NOT PROVEN | No destructive rollback executed; candidate migration remains unexecuted and out of scope for this synthetic pilot |
| Transaction rollback proof | PASS | Disposable `_g12_rollback_probe` was created and rolled back in one transaction; post-rollback relation readback was `null` |
| Named pilot owners | PASS — synthetic scope | Overall project owner/user is the named pilot, review, operations, and rollback owner; no external identities are provisioned |
| Monitoring/incident contacts | PASS — internal scope | Overall project owner is the escalation contact; runbook and write-disable control are active |

## Rollback control

No rollback command is executed from this preparation step. The safe rollback gate is:

1. Capture migration identifier, source commit, and before-schema readback.
2. Obtain DBA/security approval for the reconciled migration.
3. Execute rollback only in the isolated staging project.
4. Capture after-schema readback, application health, and synthetic data custody record.
5. Record the rollback owner and decision in the approval record.

## Controlled decision

Decision: **CONTROLLED NO-GO for external/production pilot; internal synthetic review permitted**.

Reason: the infrastructure safety boundary and staging runtime are verified. The candidate production migration is intentionally not approved because source schemas are unreconciled. The READY production-target deployment is explicitly excluded from the pilot, and no production variables or data are authorised.

Decision authority: overall project owner (user). No production promotion, customer-data connection, external-user pilot, or legal/professional conclusion is authorised by this record.
