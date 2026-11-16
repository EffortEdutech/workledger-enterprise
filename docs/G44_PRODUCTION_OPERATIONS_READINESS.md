# G44 — Production Secrets, Monitoring, and Rollback Readiness

Status: HOLD — production operations are not authorized.

## Required evidence

- Production secrets stored only in an approved secret store; no service-role key in the browser.
- Preview and production environments separated with explicit write flags.
- Monitoring and alerts for Auth failures, source read failures, drift, RLS denials, write failures, and runtime errors.
- READY deployment and previous rollback deployment recorded.
- Database backup/restore evidence and migration rollback evidence.
- Incident runbook with owner, severity, containment, recovery, and audit steps.
- Production writes default disabled until the final owner decision.

The operations evaluator records HOLD when any input is missing, rollback is untested, or a service-role credential is exposed to the client. It does not create secrets, enable writes, or contact production systems.

## Current evidence

Vercel has a stable internal synthetic deployment and rollback references. Supabase remains Free tier with leaked-password protection disabled. No production secret store, customer-data environment, external monitoring, backup/restore proof, or production write activation is authorized.

## Decision

HOLD pending the operations evidence and the upstream Auth/source/schema gates.
