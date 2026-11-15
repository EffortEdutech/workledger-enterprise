# G16 Controlled Source-Schema Read Mapping and Negative-Access Proof

Status: COMPLETE for the controlled synthetic scope proof — source schemas reconciled locally; no source tables or customer data imported.

## Source evidence

| Source | Evidence file | Native identifier | Read boundary |
|---|---|---|---|
| Contract Diary Platform | `C:\Users\user\Documents\00 CIPAA contract work dairy\contract-diary-platform\database\Post_S14_database_schema.sql` | UUID primary keys; `contracts.id`, `boq.id`, `boq_items.id`, `contract_members.contract_id` | Contract Diary remains authority for contract, diary, evidence, document, and audit lineage. |
| QS Service | `C:\Users\user\Documents\00 QS_Service\database\migrations\01_schema.sql`; `14_work_programme.sql` | Integer identity keys; `projects.project_id`, `boq_items.boq_item_id`, `programmes.programme_id`, `programme_tasks.task_id` | QS Service remains authority for accepted programme and BOQ snapshots. |

## WorkLedger crosswalk

WorkLedger must not cast or overwrite native identifiers. Each read record carries a WorkLedger UUID plus the source system, native source record ID as text, source revision, digest, organization/project/contract scope, appointment scope, and classification.

| WorkLedger read model | Contract Diary source | QS source | Required provenance |
|---|---|---|---|
| Project/contract context | `contracts.id` UUID | `projects.project_id` integer where cross-system link is explicitly accepted | source system, native ID, revision, digest, contract scope |
| Programme task | — | `programmes.programme_id`, `programme_tasks.task_id` integers | accepted baseline, WBS, source revision, manifest digest |
| BOQ line | `boq.id`/`boq_items.id` UUID when Diary owns contract BOQ | `boq_items.boq_item_id` integer when QS owns commercial BOQ | BOQ revision, native ID, task crosswalk, unit, exact quantity |
| Diary/evidence | diary/evidence UUIDs and contract UUID | — | diary version, evidence ID, facts digest, custody/reference state |
| Chronology/audit | audit/event UUIDs and contract UUID | source event reference only where supplied | actor, appointment, sequence, as-of boundary |

## Negative-access proof status

- Confirmed: `public.wle_staging_read_model` contains synthetic-only rows, RLS and FORCE RLS are enabled, and client INSERT/UPDATE privileges are denied.
- Confirmed: the staging policy now requires the exact approved synthetic organization/project/contract/appointment scope; the sibling synthetic row is retained only as a denial probe.
- REST readback: allowed scope returned 5 rows covering all five read types; sibling project returned 0, sibling contract returned 0, and the other appointment scope returned 0.
- Confirmed: the browser uses only the publishable key and has no service-role path.
- Not yet proven: a real Supabase Auth JWT claim transition and revoked-user lifecycle. The synthetic scope policy proves the row-level boundary for the controlled staging scope, not production identity management.
- Therefore the G16 decision is **GO for controlled synthetic schema mapping and scoped read-only denial proof; NO-GO for production identity, source-data integration, or customer use**.

## Required next proof

1. Add non-production Auth identities and explicit JWT organization/project/contract/appointment scope fixtures in a disposable staging boundary.
2. Extend the policy proof to authenticated claims and revoked-user lifecycle before any source-data integration.
3. Re-read policies, privileges, advisors, and UI fallback behaviour; do not import source/customer rows.

No migration from the source repositories is authorised by this record. No write path is enabled.

## G17 handoff evidence

The authenticated RLS policy was verified with rollback-only synthetic JWT claims:

- active approved-scope claim: 5 target rows visible;
- active sibling-scope claim: 0 target-scope rows visible;
- revoked appointment claim: 0 rows visible;
- authenticated SELECT privilege: true; authenticated INSERT and UPDATE privileges: false.

Three disposable synthetic users were subsequently created through the Supabase Auth administration path and verified in `auth.users` with confirmed email state. Their UUIDs are bound to the allowed, sibling, and revoked appointment fixtures. Direct writes to Supabase internal `auth` tables were not used.

Using rollback-only authenticated JWT-claim harnesses with those real Auth UUIDs, the allowed user returned 5 target rows, the sibling user returned 0 target rows, and the revoked user returned 0 target rows. This proves the RLS decision matrix; a browser sign-in flow remains a later UI/UAT exercise.
