# G22 Source Synchronisation and Auth Security Gate

Status: COMPLETE — authoritative release source pinned; local dirty work preserved; Auth security gate recorded.

## Source decision

The authoritative staging release source is:

- Repository: `EffortEdutech/workledger-enterprise`
- Branch: `codex/g18-authenticated-frontend`
- Commit: `fb68d613f9271d22b9026613262e3a919b6c8996`
- Vercel deployment: `dpl_BwhsmbJMyMNYeaY9pan6TzWQrEeM`
- Stable alias: `https://workledger-enterprise.vercel.app/`

The local checkout remains on `master` at `1e84dab` with dirty user changes. Git metadata is read-only in this workspace and could not create a local branch/commit. No reset, checkout-overwrite, force merge, or deletion was performed. The local files remain preserved for later reconciliation when repository write permissions are available.

## Authenticated-read hardening

The deployed source now uses `state.session.access_token` for read-model hydration and skips that hydration when signed out. This removes the misleading `connected · empty` status caused by sending the publishable key as the bearer token.

## Auth security decision

Supabase security advisors still report leaked-password protection disabled. It was not enabled during this goal because the current boundary uses disposable synthetic users only and the setting change requires an explicit Auth configuration decision. Decision: **retain as a mandatory gate before non-synthetic use**.

The `wle_staging.release_readiness` RLS-with-no-policy finding remains intentional default-deny behavior.

## Verification

- Stable root and app routes: HTTP 200.
- Stable source contains authenticated bearer-token hydration and signed-out guard.
- Stable expiry path: `Session expired or scope denied.`
- Writes-disabled banner remains present.
- Projects, Contract Control, and Reports route smoke checks pass.
- Local `node --check ui/app/app.js`, `npm test` (130/130), and `git diff --check` pass.

## Release gate

**GO for controlled internal synthetic staging.**

**NO-GO for production, external users, customer/source data, and write-enabled operation.**
