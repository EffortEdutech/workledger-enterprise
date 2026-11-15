# G26 Supabase Plan Upgrade and Auth Protection Activation

Status: COMPLETE — owner decision recorded to defer Supabase upgrade during development and testing.

## Current state

- Organization: `effortstudio's Org` (`yibefgglaxtymfgywuzo`).
- Current plan: Free (`tier_free`).
- Project: `workledger-enterprise` (`gumlaaqfxxkdlwuusfhv`), `ACTIVE_HEALTHY`.
- Auth advisor: leaked-password protection disabled.

## Upgrade information

Supabase’s current pricing page lists Pro at **$25 USD/month** before any additional usage. It includes leaked-password protection; the Free plan does not. Organization billing applies to all projects in the organization.

Source: https://supabase.com/pricing

No billing action has been taken. Owner decision: do not upgrade the organization during the current development and testing phase. The Free-tier limitation is therefore an accepted scope boundary, not an active development blocker.

## Deferred future action

1. If production readiness is later authorised, upgrade the organization to Pro in Supabase Billing.
2. Enable leaked-password protection under Auth settings.
3. Re-run security advisors and confirm the Auth warning clears.
4. Re-run synthetic allowed/sibling/revoked/sign-out/expiry UAT.
5. Update the pre-production readiness decision.

Current boundary remains synthetic-only, read-only, and internal. Production traffic, customer data, external users, and writes remain prohibited. Leaked-password protection remains a future production-readiness requirement.

## Current decision

**GO for continued internal development and synthetic testing.**

**NO-GO for production, external users, customer/source data, and writes.**
