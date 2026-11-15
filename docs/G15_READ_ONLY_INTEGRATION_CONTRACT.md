# G15 Controlled Supabase Read-Only Integration Contract

Status: COMPLETE for bounded synthetic staging reads — the staging UI hydrates the approved read models from Supabase; production/source schema remains unimported and writes remain disabled.

## Safety boundary

- Supabase project: `gumlaaqfxxkdlwuusfhv` staging only.
- Classification: synthetic-only.
- Enterprise writes: disabled.
- Auth users: zero.
- Candidate E07 migration: remains unexecuted.
- Browser must never receive a service-role key.
- Any exposed read table/view must have explicit RLS and a narrow synthetic-data policy; default deny remains the starting state.

## Read-model mapping

| WorkLedger read | Source authority | Native identifier | Required lineage |
|---|---|---|---|
| Project/contract context | WorkLedger/Contract Diary | Contract Diary UUID; WorkLedger UUID | organization, project, contract, appointment scope |
| Programme baseline/tasks | QS Service | QS integer project/programme/task IDs | source revision, accepted baseline, manifest digest, WBS, task snapshot |
| BOQ provenance | QS Service | QS integer BOQ/item IDs | BOQ revision and digest, task crosswalk, unit/quantity |
| Diary/evidence | Contract Diary Platform | Diary/evidence UUIDs | diary version, facts digest, custody, original evidence reference |
| Chronology/audit | Contract Diary + WorkLedger | source event IDs | actor, appointment, event sequence, as-of boundary |

## Proposed staging read model

Create only synthetic staging records in a dedicated `wle_staging` read model. Prefer immutable JSON snapshots or narrow tables with explicit source fields. Every row must carry:

`organization_id`, `project_id`, `contract_id`, `source_system`, `source_record_id`, `source_revision`, `source_digest`, `data_classification`, `appointment_scope`, and `read_only`.

No financial entitlement, payment certificate, EOT determination, CIPAA legal conclusion, or customer record is part of this read model.

## Access contract

1. Start with no Data API exposure and default-deny RLS.
2. Add only a narrow authenticated read policy after the final table shape is reviewed.
3. Test tenant, project, contract, revoked appointment, and sibling-contract denial.
4. Use `security_invoker` for any exposed view; do not use `SECURITY DEFINER` as an access workaround.
5. Verify readback through Supabase and the staging UI before enabling the next integration step.

## Current gate

The source repositories establish UUID-vs-integer identifier differences. The Supabase project contains no source tables; only the approved synthetic read slice is present. The staging UI hydrates its project, programme, BOQ, diary/evidence, and chronology read models from those rows, with fixture fallback on read failure. Full source-record replacement remains a later increment after negative RLS tests; no source or customer data is authorised.

## Implemented synthetic read slice

- Table: `public.wle_staging_read_model`.
- Rows: 5 synthetic records covering context, programme, BOQ, diary/evidence, and chronology.
- RLS: enabled and forced.
- Policy: one narrow SELECT policy for `anon` and `authenticated`, restricted to `synthetic-only` and `read_only=true`.
- Privileges: `anon` SELECT is true; `anon` INSERT is false; `authenticated` UPDATE is false.
- Staging Preview reads the table through the publishable Supabase key and displays `connected · synthetic read`.
- Live Preview verification: `BOQ-REV-02` is visible and the Supabase-backed BOQ quantity is rendered as `240.0000`; the banner states that writes are disabled.
- No service-role key, production data, or write path is present.
- Supabase security advisor remains clear for this table; the existing G12 `wle_staging.release_readiness` default-deny informational lint remains intentional.

## Integration UAT decision

Evidence: Supabase SQL readback, RLS/privilege readback, security/health advisors, local 130-test suite, and live READY Preview deployment `dpl_H3TQygW9KMYYAxkuXqG9ivuJHH7w` at `https://workledger-enterprise-b6vrkt94z-eff-edus-projects.vercel.app/`, built from commit `5c7ab402e9b819e3914eb2586b54b0be487f1395`.

Decision: **GO for bounded synthetic read-status integration; NO-GO for production/source-data integration.**

The staging UI visibly reports `Supabase read-only status: connected · synthetic read` and `Writes are disabled.` If the read request fails, the UI falls back to fixture mode. This increment does not import source tables, replace fixture models, or authorise any write operation.
