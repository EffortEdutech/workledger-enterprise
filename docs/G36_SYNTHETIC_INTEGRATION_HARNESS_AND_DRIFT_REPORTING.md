# G36 — Synthetic Cross-System Integration Harness and Drift Reporting

Status: COMPLETE for controlled synthetic integration.

## Harness output

The new reconciliation harness combines the certified Contract Diary and QS fixtures into a WorkLedger read model containing:

- Shared organization/project/contract scope.
- WorkLedger project identity plus preserved QS native project ID.
- Contract Diary native contract ID and QS linked contract ID.
- QS programme revision/task ID and BOQ revision/item ID.
- Contract Diary evidence native ID, digest, and custody state.
- Read-only, synthetic, reconciled/blocked source state.
- Structured drift report with code, severity, and state.

## Drift outcomes

- Scope and native contract-link mismatch: blocked.
- Diary not acknowledged: blocked.
- Programme revision drift: stale.
- Manifest digest drift: blocked.
- Missing, wrong, or duplicate evidence provenance: blocked by the source reconciliation layer.

## Verification

- Valid reconciled model test passed.
- Revision/digest drift test passed.
- Scope/source-state conflict test passed.
- Full regression suite: 151/151 passed.
- No source/customer rows imported and no writes enabled.

## Decision

GO for synthetic cross-system integration testing and drift-report development. NO-GO for real source-data import, external users, production identity, writes, and production release.
