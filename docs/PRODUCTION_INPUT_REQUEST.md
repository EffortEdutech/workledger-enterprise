# Production Closure Input Request

This is the controlled handoff for completing G41–G46. Send identifiers, redacted readbacks, or configure the connected systems directly. Do **not** commit passwords, service-role keys, access tokens, customer records, or private endpoint secrets.

## Required external inputs

### 1. Production identity and Auth

- Confirm the intended production Supabase project/environment.
- Confirm the Auth protection plan and readback showing leaked-password protection enabled.
- Provide the approved production role matrix and identity lifecycle test accounts.
- Confirm the app uses trusted `app_metadata` claims for roles/scopes.

### 2. Contract Diary and QS Service

- Approved base URLs and API/version contracts for Contract Diary and QS Service.
- Credential method and environment mapping, supplied through the approved secret store.
- Tenant/organization/project/contract/appointment scope mapping.
- One approved read receipt and one sibling-scope denial receipt per service.
- Freshness, revision, timeout, and rollback expectations.

### 3. Database and RLS

- Approval to apply the candidate migration in the production-controlled environment.
- Migration checksum and apply log.
- Schema, privilege, RLS, and FORCE RLS readbacks.
- Allowed, sibling, revoked-appointment, and unauthenticated denial results.

### 4. Bounded writes

- Approved write actions and appointment roles.
- Idempotency/retry policy.
- Append-only audit event retention policy.
- Controlled write rehearsal and rollback result.

### 5. Operations and UAT

- Secret/environment separation readback without secret values.
- Monitoring and alert destinations.
- Backup and restore evidence.
- Rollback deployment and incident-runbook rehearsal.
- Named authorized external UAT participants, approved synthetic/real data scope, and UAT results.
- Explicit production owner acceptance referencing the completed evidence manifest.

## Submission rule

Each input must identify its environment, timestamp, source system, and redaction status. Until the evidence is read back and recorded in `docs/PRODUCTION_RELEASE_EVIDENCE_MANIFEST.md`, the corresponding gate remains `HOLD`.
