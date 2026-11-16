# G33 — Pilot Findings Consolidation and Integration Readiness

Status: COMPLETE for controlled synthetic read mapping.

## Consolidated backlog

| Priority | Item | Class | Gate |
|---|---|---|---|
| P0 | Keep production identity, customer data, and writes disabled | Safety boundary | Mandatory until a separate production decision |
| P1 | Obtain and validate authoritative source receipts/API contracts before importing rows | Integration contract | Required before source-data integration |
| P1 | Enable stronger Auth password protection on a supported Supabase plan | Production security | Required before non-synthetic identity |
| P1 | Freeze tenant/project/contract/appointment claim mapping and revoked-user lifecycle | Identity/RLS | Required before external users |
| P2 | Build controlled source adapters using the frozen read envelopes | Engineering | Next implementation phase |
| P2 | Add source reconciliation and drift reporting | Audit/operations | Required before pilot with real source data |

## Frozen read contract

Contract Diary remains authoritative for contract context, diary facts, acknowledgement, evidence custody, and chronology. QS Service remains authoritative for accepted programme baseline, programme tasks, BOQ revision, native integer IDs, task crosswalk, and manifest/acceptance semantics. WorkLedger owns the scoped read projection, Enterprise UUIDs, appointment authorization, verification outcome, and audit presentation.

Every read must retain: source system, native source ID, source revision, digest or receipt reference, organization/project/contract scope, appointment scope, freshness, and verification state. Native UUID and integer identifiers must not be cast into one another or overwritten.

## Readiness decision

GO for controlled synthetic read mapping and adapter implementation planning. NO-GO for source/customer data import, production identity, external users, write paths, and production release. The Supabase plan upgrade remains deferred during development/testing.

## Evidence

- G32 pilot record: `docs/G32_CONTROLLED_INTERNAL_PILOT.md`
- Source mapping: `docs/G16_SOURCE_SCHEMA_READ_MAPPING.md`
- Contract baseline: `docs/G3_SOURCE_CONTRACT_VALIDATION.md`
- G33 contract tests: `tests/g33_integration_readiness.test.mjs`
