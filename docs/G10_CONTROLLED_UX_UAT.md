# G10 Controlled UX Integration and UAT

Status: COMPLETE for local controlled synthetic UAT.  
Staging status: Supabase/Auth/RLS connection remains deferred until infrastructure is configured.

## UAT gate

`tests/g10_ux_uat.test.mjs` verifies that the structured frontend retains the approved ten-route inventory, semantic entry-point markup, adapter wiring, authorization route guard, required state patterns, provenance/evidence/review/timeline patterns, and audit-package wiring.

## Local acceptance

- Fixture mode remains the default and makes no external calls.
- Important views consume named read adapters.
- Navigation and route access pass through the local authorization policy.
- Audit, evidence, review, chronology, and provenance patterns remain visible.
- Pending, denied, stale, error, empty, and loading patterns remain available.
- Existing regression suite and G10 UAT gate pass together.

## Staging handoff holds

Supabase Auth/RLS, real source adapters, audit-package export from staging, and end-to-end network verification require the project Supabase/Git/Vercel setup and named staging approval. They are not inferred from the local fixture run.
