# G24 Supabase Auth Security Hardening

Status: COMPLETE — configuration and plan limitation verified; synthetic staging gate retained.

## Current readback

Project: `gumlaaqfxxkdlwuusfhv` (`workledger-enterprise`)

Supabase security advisor currently reports:

- `auth_leaked_password_protection`: **WARN — disabled**.
- `rls_enabled_no_policy` on `wle_staging.release_readiness`: **INFO — intentional default deny**.

## Availability finding

The Supabase organization readback reports `plan: free`, `tier: tier_free`. Supabase’s current Password Security documentation states that leaked-password protection is available on Pro and above. The setting is unavailable on the current project plan.

## Required action before non-synthetic use

In Supabase Studio, open the project’s Auth password/security settings and enable **Leaked password protection**. Supabase documentation states that this rejects passwords found in the Have I Been Pwned database and is available on Pro and above: https://supabase.com/docs/guides/auth/password-security.

The connected Studio page did not expose usable controls during this run, so no Auth setting was changed and no synthetic credentials were transmitted through automation. Upgrading the organization plan is an owner decision outside this goal.

## Verification gate after enablement

- Re-run the Supabase security advisor and confirm `auth_leaked_password_protection` is absent.
- Confirm the three disposable synthetic users still authenticate and preserve allowed/sibling/revoked scope behavior.
- Run `npm test` and stable-domain UAT.
- Record the Auth setting readback and updated release decision.

## Verification completed

- Security advisor rerun: leaked-password warning remains, with intentional default-deny RLS finding only.
- Organization plan readback: Free tier, confirming feature unavailability.
- `node --check ui/app/app.js` passed.
- `npm test`: 130 passed, 0 failed.
- `git diff --check` passed.
- Prior G18/G20 authenticated UAT matrix remains valid for the synthetic boundary.

## Current decision

**GO for controlled internal synthetic staging.**

**NO-GO for non-synthetic use until the organization is upgraded and leaked-password protection is enabled and verified.**

The existing **GO for controlled internal synthetic staging** remains valid. No production traffic, customer data, external users, or writes are authorised.
