# G43 — Production Schema and RLS Candidate

Status: CANDIDATE / HOLD — not applied to production or customer data.

The candidate migration defines appointments and append-only bounded audit events with tenant/project/contract scope, appointment linkage, idempotency protection, constrained event types, RLS, and FORCE RLS. Policies remain default-deny until the final `auth.app_metadata` claim contract and production appointment model are approved.

This artifact advances the production gate without changing Supabase state. It must not be applied until G41 Auth hardening, real source contracts, migration rollback, secrets, and owner approval are complete.
