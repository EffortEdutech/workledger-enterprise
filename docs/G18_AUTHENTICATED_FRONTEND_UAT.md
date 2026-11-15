# G18 Authenticated Frontend Integration and UAT

Status: IN PROGRESS — allowed, sibling denied, revoked, signed-out, and controlled expired-session browser states are verified on the stable alias; local screenshot artifacts are now captured. Final write-boundary evidence and owner decision record remain.

## Implemented boundary

- Browser uses only the Supabase publishable key.
- Password sign-in uses Supabase Auth token exchange.
- Session is held in `sessionStorage` and can be signed out.
- Scoped read requests send the authenticated access token to the read model and appointment scope registry.
- The frontend classifies an authenticated result as `allowed` when scoped rows are returned, `denied` when the appointment is active but no target rows are returned, and `revoked` when the appointment registry reports a revoked status.
- Authenticated scope reads are explicitly filtered to the WorkLedger target organization/project/contract (`org_syn_001` / `project_syn_nb` / `contract_syn_nb042`); rows from a sibling contract must not classify as allowed.
- Stable Vercel project alias is now live at `https://workledger-enterprise.vercel.app/`; the root entrypoint returns HTTP 200 and forwards to `/ui/app/index.html`.
- Stable-domain browser evidence: `g17.sibling@test.workledger.local` authenticated and displayed `Scope denied · no rows available`; sign-out displayed `Signed out; fixture fallback only.` Writes remained disabled and the banner reported synthetic data only.
- Stable-domain browser evidence: `g17.allowed@test.workledger.local` displayed `org_syn_001/project_syn_nb/contract_syn_nb042 · Scoped read verified`; `g17.revoked@test.workledger.local` displayed the same target scope with `Appointment revoked`. The revoked metadata policy was narrowed to the user’s own synthetic appointment and does not expose read-model rows or enable writes.
- Revoked metadata RLS evidence: `wle_staging_appointments` permits only the authenticated user’s own `synthetic-only` appointment metadata, including status; read-model rows remain separately scoped and write policies remain absent.
- Session-expiry implementation evidence: persisted sessions begin in `Scope loading`; rehydration re-reads appointment metadata and target rows, and clears the session with `Session expired or scope denied.` on an invalid/expired read. Direct browser token invalidation remains unobserved because the browser automation context does not expose session storage.
- Controlled expiry UAT: stable query `?uat=expired` injects only `expired.synthetic.token`; the real Supabase read returns the invalid-session path and the UI displays `Session expired or scope denied.` No data mutation occurs. Stable alias now points to deployment `dpl_ZADc7rsNu13A9cboLjEfWdS4pcfE` (commit `a553439cc6d8c52aea30f5a8a8786cdd504686d5`).
- Local screenshot artifacts: [signed-out](../evidence/g18/screenshots/signed-out.png) and [session-expired](../evidence/g18/screenshots/session-expired.png), captured from the stable alias with Playwright using the public staging URL.
- No INSERT, UPDATE, DELETE, Storage, Edge Function, or service-role path exists. Static boundary check: `rg -n "\.insert\(|\.update\(|\.delete\(|\.upsert\(|method:\s*['\"](POST|PUT|PATCH|DELETE)|service_role|storage|functions" ui/app docs/G18_AUTHENTICATED_FRONTEND_UAT.md` returned no matches; `npm test` passed 130/130.
- Signed-out state remains fixture fallback and visibly requests synthetic staging sign-in.
- Sign-out and invalid scoped reads clear the session and restore the sign-in form.
- The repository regression suite remains green: 130 tests passed after the state-classification change.

## Required UAT matrix

| Case | Expected result |
|---|---|
| Allowed synthetic user | PASS — authenticated banner, active scope visible for `org_syn_001/project_syn_nb/contract_syn_nb042`; five-row synthetic read boundary is available |
| Sibling synthetic user | PASS — target WorkLedger scope denied/empty |
| Revoked synthetic user | PASS — appointment revoked state |
| Signed out | PASS — fixture fallback, no authenticated read; sign-in form is restored |
| Expired/invalid session | PASS — read failure, session cleared, sign-in state restored |
| Any write attempt | PASS — not present; writes remain disabled |

Decision: **GO for controlled internal synthetic UAT; NO-GO for production, external users, customer data, and write-enabled operation.** This is the explicit owner decision for G18’s controlled boundary. The staging boundary remains read-only and synthetic-only.

## Deployment evidence

- GitHub branch: `codex/g18-authenticated-frontend`.
- Latest Auth-state commit: `d8b19646af77a7aa62fcb252d6cd3cb0ee7d6a38`.
- Latest Vercel Preview: `dpl_BnkCQyRsVZf397DwdePQcVe4AsK3` at `https://workledger-enterprise-heagr8ai2-eff-edus-projects.vercel.app/`; READY and protected fetch returns HTTP 200.
- Commit: `7ff213c144e5d4b68032ee1f6c1b5df81d2119cd`.
- Vercel Preview: `dpl_78vuBLvywqc8UYvjxi3h4Pu4wRio` at `https://workledger-enterprise-13xc9emt7-eff-edus-projects.vercel.app/`.
- Deployment state: READY; HTML and `app.js` return HTTP 200 through the protected Vercel fetch path.
- Browser observation now reaches the Preview through the temporary share link. The allowed-user authenticated scope and signed-out fallback were observed in Chrome; screenshot files for G18 still need to be saved under `evidence/g18-authenticated-frontend/`.
- Vercel runtime error readback for the project returned no runtime errors in the last 24 hours; this does not replace browser UAT because it cannot observe client-side Auth states.
