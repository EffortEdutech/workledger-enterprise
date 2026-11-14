# G11 Pilot Operations Runbook

## Pilot boundary

- Environment: isolated non-production only.
- Data: synthetic or explicitly authorised, classified before loading.
- Local service family: 5100.
- Enterprise writes: `false` unless a named change record authorizes a controlled test.
- Supabase service-role keys: server-side only, never browser or repository.

## Go/no-go checks

1. Project owner records the decision and pilot scope.
2. DBA confirms migration, RLS, rollback, and readback evidence.
3. Security confirms identity, appointment, scope, and least-privilege paths.
4. QS confirms programme, BOQ, and measurement mapping.
5. Contract/legal reviewers confirm audit terminology and boundaries.
6. Pilot users and data classification are recorded.
7. Monitoring, support contact, incident channel, and rollback owner are named.

## Incident response

- Stop pilot traffic and disable Enterprise writes.
- Preserve request IDs, event sequences, source receipts, and logs.
- Do not delete or rewrite audit records.
- Notify the named operations, DBA, security, and project owners.
- Classify tenant/scope impact and record the affected release/migration.
- Restore only through the approved rollback procedure and verify readback.

## Rollback

Rollback must be a tested migration ticket with before/after schema readback, application version reference, data custody record, and explicit owner sign-off. No rollback command is executed from this local preparation step.
