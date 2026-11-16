# G34 — Controlled Source Adapter Integration and Data Contract Implementation

Status: COMPLETE for local controlled integration planning and synthetic contract-shaped fixtures.

## Implemented

- Added versioned read contract `wle-read-v1` for all WorkLedger source adapters.
- Every adapter envelope now carries read-only mode, source system, scope, freshness, partial/verified state, and receipt timestamp.
- Added source-link reconciliation that requires source, native ID, revision, digest, and contract scope.
- Preserved Contract Diary UUIDs and QS integer identifiers without casting them into one shared identity.
- Added negative tests for incomplete provenance and retained existing forbidden/missing/unavailable adapter behavior.

## Source boundaries

- Contract Diary remains the authority for contract context, diary facts, evidence custody, and chronology.
- QS Service remains the authority for accepted programme and BOQ revisions, task crosswalks, and manifest semantics.
- WorkLedger owns the scoped projection and verification presentation; it does not treat caller-supplied source objects as proof.

## Verification

- Full test suite: 145/145 passed.
- Adapter syntax check passed.
- `git diff --check` passed.
- Local source repositories were used only for schema/contract alignment; no customer/source rows were imported.

## Decision

GO for controlled adapter implementation and synthetic read mapping. NO-GO for source-data import, production identity, external users, writes, and production access.
