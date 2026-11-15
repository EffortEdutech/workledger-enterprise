# G25 Pre-Production Readiness Decision

Status: COMPLETE — readiness audit and decision recorded.

## Gate matrix

| Gate | Evidence | Result |
|---|---|---|
| Supabase project health | `gumlaaqfxxkdlwuusfhv` is `ACTIVE_HEALTHY`; Postgres 17.11 | PASS |
| Supabase plan/Auth security | Organization `yibefgglaxtymfgywuzo` is Free tier; leaked-password protection is unavailable and advisor WARN remains | NO-GO for non-synthetic |
| RLS/read-only boundary | Authenticated SELECT policies only on appointments/read model; no write policies | PASS |
| Source pin | G23 reconciliation branch and commit `5d8ba6cebeb39ba760c3d6d316871da795ab4d50` | PASS |
| Vercel deployment | Stable deployment `dpl_AXX3vtBWURwwEo5z2dKmaQX4C6ce`, READY, stable alias assigned | PASS |
| Route smoke | Root and `/ui/app/index.html` return HTTP 200 | PASS |
| Authenticated UAT | G18/G20 allowed, sibling, revoked, signed-out, and expired-session evidence | PASS for synthetic staging |
| Regression suite | `npm test`: 130 passed; syntax and diff checks passed | PASS |
| Rollback and evidence | G19/G20/G23 rollback, screenshots, and runbooks recorded | PASS |
| Data boundary | Synthetic-only; no customer/source data, external users, or writes | PASS |

## Decision

**GO for controlled internal synthetic staging and pilot operations.**

**NO-GO for pre-production/customer readiness, production traffic, external users, customer/source data, and write-enabled operation.**

The remaining pre-production gate is an owner decision to upgrade the Supabase organization to Pro or above, enable leaked-password protection, and verify the advisor clears. No upgrade or billing change was made in this goal.

## References

- [G24 Auth hardening](G24_SUPABASE_AUTH_SECURITY_HARDENING.md)
- [G23 source reconciliation](G23_LOCAL_WORKSPACE_RECONCILIATION_AND_RELEASE.md)
- [G20 pilot report](G20_CONTROLLED_INTERNAL_SYNTHETIC_PILOT.md)
