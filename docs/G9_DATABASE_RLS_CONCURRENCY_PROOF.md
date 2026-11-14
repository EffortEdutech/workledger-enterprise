# G9 Database, RLS, and Concurrency Proof

Status: COMPLETE for the local candidate and synthetic transaction proof.  
Production posture: no migration has been executed; DBA/RLS review remains a release gate.

## Schema reconciliation

`sql/008_programme_actuals_reporting_CANDIDATE.sql` defines the local E07 candidate tables for measurements, decisions, immutable reports, idempotent receipts, and chained events. Composite organisation/project/contract/baseline keys are retained on business tables and foreign-key references. Scope/date/task and diary indexes are present.

## RLS and privilege posture

Every candidate E07 table declares `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`. The candidate intentionally does not create runtime grants, policies, security-definer functions, or bypass roles. Those must be designed and reviewed against actual source schemas before staging execution.

## Proof coverage

The synthetic actuals suite verifies cross-tenant and sibling-contract denial, read-only capability denial, concurrent idempotent recording, concurrent report publication, stale sequence rejection, replay behavior, transaction rollback, append-only voids, immutable reports, and source-lineage retention. The static schema gate verifies that composite scope, idempotency, event sequence, report snapshot, and FORCE RLS declarations remain in the SQL candidate.

## Release holds

- Do not execute the candidate SQL until E01/E04/E06 physical schemas and composite indexes are reconciled.
- Add reviewed RLS policies and least-privilege grants only in approved staging.
- Execute migration/readback and rollback tests in the 5100-family local/staging workflow before any customer data.
