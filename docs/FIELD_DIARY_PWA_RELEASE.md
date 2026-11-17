# WorkLedger Enterprise — Field Diary PWA Release

Status: **G41 COMPLETE — STABLE DEMO RELEASE**
Release class: zero-budget functional demo  
Data mode: synthetic/local-only

Deployment readback (2026-11-17): latest Vercel deployment `dpl_FjvufkQxYVRizuhtUEQok68mKacT` is READY from commit `8bdd9107e7c1bebfd0d9f6ab441b762b06b6c0bd`. The deployed manifest and `icon.svg` both resolve successfully; stable project domain remains `workledger-enterprise.vercel.app`.

G41 stable release readback (2026-11-17): stable alias `workledger-enterprise.vercel.app` was assigned to READY deployment `dpl_4ff5LquzwUNCbtUskP73JRKMcSW5`, commit `6586cf81da...`. The default admin route remains `/ui/app/index.html`; the Field Diary route is `/ui/app/index.html#diary` and is exposed to Site Supervisor and Site Manager appointments.

## Delivered foundation

- Install metadata in `ui/app/manifest.webmanifest`.
- Local WorkLedger icon asset included for installability and offline shell caching.
- Offline shell caching in `ui/app/sw.js`.
- Mobile-responsive diary capture form on the Site Diary route.
- Fields for date, weather, manpower, activities, issues/observations, and photo selection.
- Local draft persistence using browser storage.
- Pending-sync state that clearly remains local and synthetic.
- Explicit demo boundary: no real customer data, no backend diary write, no claim of secure client production.

## Follow-on work (not a G41 release blocker)

1. Repeat install/offline checks on target mobile devices.
2. Verify photo selection count is retained locally without uploading files.
3. Add a controlled synthetic sync adapter only after the local capture flow is accepted.
4. Add real authentication and bounded writes only in a separately authorised production phase.

## Live acceptance evidence

- Site Supervisor role exposed the Site Diary route on the READY deployment.
- Weather, manpower, activities, and issues/observations were entered successfully.
- Save action produced `Draft stored on this device`.
- Submit action produced `Diary queued locally · awaiting controlled sync`.
- No credentials, customer data, file upload, or backend write was used.
- Automated PWA asset and field-contract checks pass; current regression suite: 179 tests.
- Stable-domain verification: admin shell loaded at `https://workledger-enterprise.vercel.app/ui/app/index.html`; Site Supervisor opened `#diary`; draft save produced `Draft stored on this device`.

## Manual install/offline acceptance

Owner-provided result (2026-11-17): **GREEN** for PWA installation from the browser, offline reload, and confirmation that the diary shell and saved draft remained available. Acceptance URL: `https://workledger-enterprise-git-codex-g23-lo-2f83f4-eff-edus-projects.vercel.app/ui/app/index.html`.

## G41 boundary

- This is a stable synthetic/demo presentation release, not secure client production.
- Admin and Field Diary are currently one role-based frontend application; they are not separate deployed apps.
- Supabase remains read-only/fixture fallback and writes are disabled.
- No real customer data, external-user onboarding, or production identity is authorised by this release.
