# G8 Programme Actuals and Independent Review

Status: COMPLETE for the synthetic, local Enterprise workflow.  
Write posture: disabled by default.  
Infrastructure posture: no Supabase or production source connection.

## Delivered capability

The existing `src/actuals.mjs` engine provides:

- Server-port verification of identity, capability, scope, accepted baseline, and acknowledged diary/evidence receipts.
- Typed quantity observations with exact four-decimal arithmetic.
- Completion observations with bounded basis points.
- Pending-review records and independent verify/reject separation of duties.
- Stale version and idempotency protection.
- Append-only verify, reject, and void events with chained audit hashes.
- Immutable factual as-of reports pinned to baseline, BOQ, source event sequence, and report digest.

`src/g8_policy.mjs` adds the explicit `WORKLEDGER_ENTERPRISE_WRITES` flag. It is disabled unless the exact value `true` is deliberately supplied.

## Acceptance evidence

- Existing actuals suite plus G8 policy tests pass.
- No write workflow is enabled by default.
- Source lineage is retained on observations and reports.
- Existing negative tests cover unverified baseline/diary, reviewer separation, stale versions, duplicate measures, replay, corrections, voids, report immutability, scope, and rollback/concurrency behavior.

This remains a factual progress workflow and makes no legal, payment, or entitlement determination.
