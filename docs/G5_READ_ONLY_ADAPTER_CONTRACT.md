# G5 Read-only Enterprise Data Boundary

Status: COMPLETE for the local fixture-first boundary  
Local port family: 5100  
Backend mode: fixture-first; Supabase connection deferred until the adapter contract is accepted.

## Boundary rule

The frontend consumes read models through named adapters. It does not access Supabase tables, service-role credentials, or source-system tables directly. Every adapter returns a read-only envelope containing source identity, freshness, verification, partial-data status, and receipt time.

## Adapter inventory

| Adapter | Source authority | Read model |
|---|---|---|
| `readProjectContext` | WorkLedger | organisation, project, contract, appointment |
| `readProgramme` | QS Service | accepted baseline, manifest, tasks |
| `readBoqProvenance` | QS Service | BOQ revision, digest, line-to-task mapping |
| `readDiaryEvidence` | Contract Diary | diary version, digest, evidence custody |
| `readContractChronology` | Contract Diary / WorkLedger | audit events and chronology |

## Failure contract

Adapters expose stable conditions for `MISSING`, `FORBIDDEN`, `UNAVAILABLE`, stale freshness, and partial data. These conditions must map to the reusable UI states already delivered in G4. No adapter may silently substitute unverified or caller-supplied data.

## Verification

Run `node --test tests/*.test.mjs`. The G5 adapter tests verify read-only envelopes, lineage fields, stale and partial states, and stable failure codes; the full suite currently passes 111 tests. Fixture mode remains the default until Supabase and Git infrastructure are deliberately configured. Live Supabase staging and no-write network verification are deferred to the controlled integration gates.
