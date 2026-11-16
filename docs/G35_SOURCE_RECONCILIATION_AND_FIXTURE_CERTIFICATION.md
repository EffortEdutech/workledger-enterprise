# G35 — Controlled Source Reconciliation and Fixture Certification

Status: COMPLETE for controlled synthetic integration testing.

## Certified fixture

Fixture manifest: `g35-northbank-source-shaped-v1`

- Contract Diary-shaped source: native contract `cd-contract-7f42`, diary `cd-diary-1112`, evidence `cd-evidence-8801`, acknowledged state, facts digest retained.
- QS-shaped source: native project `1042`, programme `77`, task `1071`, BOQ item `210`, Programme v3, BOQ-REV-02, manifest digest retained.
- Shared scope: `org_syn_northbank` / `project_syn_northbank` / `contract_syn_nb042` with a synthetic appointment scope.

## Reconciliation controls

- Contract scope must match across sources.
- Contract Diary native contract link must match the QS cross-system link.
- Diary must be acknowledged before evidence is accepted.
- Facts, manifest, and evidence digests are required and verified.
- Duplicate native evidence IDs are rejected.
- Sibling-contract, stale/unacknowledged, missing, and wrong-digest fixtures are rejected.

## Verification

- G35 fixture tests: 3 passing.
- Full regression suite: 148/148 passing.
- No source/customer rows imported.
- No Supabase migration, write operation, external identity, or production access enabled.

## Decision

GO for certified synthetic integration testing. NO-GO for real source-data import, production identity, external users, writes, and production release.
