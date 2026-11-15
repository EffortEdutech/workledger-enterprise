# G14 Internal Synthetic Staging Pilot — UAT Report

Status: COMPLETE — internal synthetic staging UAT passed; production/external use remains out of scope.

Date: 15 November 2026 (MYT)

## Staging target

- URL: `https://workledger-enterprise-nhfhcgu82-eff-edus-projects.vercel.app/`
- Deployment: `dpl_DDV9enGLYF8iGZ5Wh1BZCimnWZ5V`
- Current UAT deployment: `dpl_D1PcSJ1eBK7q2CPcjmxxRcjuznRH` (READY, staging)
- Current UAT URL: `https://workledger-enterprise-rgd3spr0w-eff-edus-projects.vercel.app/`
- Source: GitHub `master`, commit `1e84dabceb20217823ce85d33fc65862c0611736`
- Root: `ui/app`
- Runtime: HTTP 200; HTML, `app.js`, and `styles.css` load successfully.

## Visible safety evidence

- Banner states: `Local fixture mode. Synthetic data only. Backend integration is intentionally disabled.`
- Sidebar states: `Frontend foundation · no network calls`.
- Current context is synthetic Northbank Mixed Development / NB-042.
- No login, customer data, Supabase data, or write action is exposed by the staging UI.

## Role navigation matrix

| Role | Visible routes observed | Result |
|---|---|---|
| Project Director | Home, Projects, Contract Control, Reports | PASS |
| Contract Administrator | Home, Projects, Contract Control, Site Diary, Audit & Evidence | PASS |
| Site Manager | Home, Site Diary, Progress | PASS |
| Site Supervisor | Home, Site Diary, Progress | PASS |
| Quantity Surveyor | Home, Programme, BOQ & QS, Progress, Reports | PASS |
| Independent Reviewer | Home, Progress, Audit & Evidence | PASS |
| Auditor / Legal Reviewer | Home, Contract Control, Audit & Evidence, Reports | PASS |

## First UAT result

- Live page rendered successfully in the staging browser.
- Role selector changed from Project Director to Quantity Surveyor and updated navigation immediately.
- Quantity Surveyor view visibly exposed Programme, BOQ & QS, Progress, and Reports.
- Screenshot evidence captured during the staging session.
- The limited Project Director navigation is expected capability-based behavior, not a defect.
- Route coverage completed for every visible role route; headings rendered for all non-Home routes.
- Provenance drawer opened successfully from the Contract Administrator Site Diary view.
- Initial defect found: `Show stale state` did nothing. Fixed in commit `9c4ca52c853b89931dda38f769c78cbcab7c50d6`, redeployed to the current staging target, and verified that `Source needs refresh` appears after click.
- Local regression suite remains PASS — 130/130 tests.

## Accessibility and interaction evidence

- Document language: `en`.
- Search field has accessible label `Search current view`.
- Role selector has accessible label `Preview role`.
- Navigation and action controls expose visible accessible names.
- Keyboard Tab traversal reached the rendered action controls and navigation buttons.
- Responsive staging screenshot captured at the active viewport.
- No unresolved UI defect remains within the tested synthetic journeys.

## Final decision

**GO — internal synthetic staging review only.**

The UI is suitable for continued internal review using fixture data. It is not approved for production, external users, customer data, backend writes, payment/entitlement decisions, or legal/professional conclusions.

## Remaining UAT checks

- Exercise every visible route for each role.
- Test provenance drawer, evidence card, review queue, timeline, and state panels.
- Test keyboard focus and responsive layout.
- Confirm prototype actions never create network requests or writes.
- Record defects and issue final internal synthetic GO/NO-GO.
