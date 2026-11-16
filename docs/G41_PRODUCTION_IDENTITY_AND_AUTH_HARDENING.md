# G41 — Production Identity and Auth Hardening

Status: HOLD — production identity is not ready.

## Current evidence

- Supabase organization `yibefgglaxtymfgywuzo` is on the Free tier.
- WorkLedger project `gumlaaqfxxkdlwuusfhv` is `ACTIVE_HEALTHY` in `ap-southeast-2`.
- Security advisor reports `auth_leaked_password_protection` as WARN/disabled.
- Only synthetic identities have been validated; no production identity or customer users are authorized.

## Closure actions

1. Upgrade the Supabase organization to a supported plan for leaked-password protection. This is a billing action and requires owner confirmation before execution.
2. Enable leaked-password protection and rerun the security advisor.
3. Define production Auth redirect URLs, email settings, session expiry, recovery policy, MFA decision, and rate limits.
4. Create dedicated production roles/appointments using `app_metadata`, not user-editable metadata.
5. Verify login, refresh, revocation, reset, and appointment-scope denial with authorized non-synthetic test identities.

## Decision

HOLD until the plan/security setting and production identity lifecycle are verified. Synthetic read-only development remains allowed; customer data, external users, production identity, and writes remain disabled.
