# G21 Staging Hardening and Pilot Findings Closure

Status: COMPLETE — hardening fix deployed and pilot checks re-run.

## Finding closed

The generic read-model hydration path previously sent the publishable key as the bearer token. RLS correctly returned no rows, but the UI misleadingly displayed `connected · empty` while an authenticated user was present.

Fix committed to `codex/g18-authenticated-frontend` as `fb68d613f9271d22b9026613262e3a919b6c8996`:

- authenticated hydration now sends `state.session.access_token`;
- signed-out sessions skip the Supabase read and use fixture fallback;
- stable alias now points to READY deployment `dpl_BwhsmbJMyMNYeaY9pan6TzWQrEeM`.

## Verification

- Stable `app.js` contains the authenticated bearer-token path and signed-out guard.
- Stable root and app routes remain HTTP 200.
- Stable browser smoke: writes-disabled banner present; no `connected · empty` status in signed-out state; expired-session path displays `Session expired or scope denied.`
- Projects, Contract Control, and Reports route checks remain passing.
- `node --check ui/app/app.js` passed locally.
- `git diff --check` passed locally.

## Source reconciliation

- GitHub/Vercel release source: `codex/g18-authenticated-frontend` at `fb68d613f9271d22b9026613262e3a919b6c8996`.
- Local checkout remains `master` at `1e84dab` with dirty user changes. It was not reset, overwritten, or force-merged. This remains a controlled reconciliation item for a future source-promotion task.

## Supabase Auth hardening decision

The security advisor still reports leaked-password protection disabled. No Auth setting was changed during this synthetic-only goal. Decision: retain the warning as a **precondition before any non-synthetic use**, while allowing the controlled synthetic pilot to continue with disposable users and no customer data. The intentional `wle_staging.release_readiness` RLS-with-no-policy finding remains default-deny by design.

## Decision

**GO for continued controlled internal synthetic staging.**

**NO-GO for production, external users, customer/source data, and write-enabled operation.**
