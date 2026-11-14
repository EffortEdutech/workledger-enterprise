# WorkLedger Enterprise — G11 Release Notes

Release channel: controlled non-production pilot preparation  
Date: 14 November 2026 (MYT)  
Decision: HOLD / NO-GO for production or customer data

## Included

- G4 structured frontend and route evidence.
- G5 read-only adapter boundary.
- G6 identity, appointment, capability, and scope policy.
- G7 evidence and contract audit foundation.
- G8 trusted programme actuals and independent review workflow.
- G9 candidate schema, RLS declarations, concurrency, idempotency, replay, and rollback proof.
- G10 controlled synthetic UX/UAT gate.
- G11 pilot runbook, risk register, and approval record.

## Verification baseline

- Full local test suite: 128 passing tests.
- Enterprise writes: disabled by default.
- Local port family: 5100.
- External data: not connected.
- Production migration: not executed.

## Known holds

- Git remote and protected branch are not configured.
- Supabase Auth/RLS staging is not configured or read back.
- Vercel preview/staging environment is not configured.
- Physical source-schema migration IDs and rollback readback are pending DBA review.
- Named security, QS, contract/legal, operations, and pilot-user approvals are not recorded.

## Required attachments before pilot Go

- [ ] Source commit hashes and repository remote record.
- [ ] Migration IDs, schema/RLS readback, and rollback evidence.
- [ ] Full test output and accessibility/UAT evidence.
- [ ] Pilot user/scope/data-classification record.
- [ ] Monitoring, support, incident contacts, and signed approval record.
