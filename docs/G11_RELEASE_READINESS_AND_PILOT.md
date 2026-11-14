# G11 Release Readiness and Pilot Gate

Status: RELEASE HOLD — evidence register prepared; pilot approval not yet recorded.  
Date: 14 November 2026 (MYT)  
Pilot scope: controlled non-production, synthetic or explicitly authorised data only.  
Local services: WorkLedger Enterprise 5100 port family.

## Verified local evidence

- G0–G10 design, frontend, adapter, authorization, audit, actuals, schema, and UAT evidence exists in `docs/`.
- Local regression suite currently passes 128 tests.
- Enterprise writes are disabled by default.
- SQL candidate is not executed and no customer data is connected.
- Fixture-only frontend remains available at `ui/app/index.html`.

## Release gate checklist

| Gate | Status | Required evidence/owner |
|---|---|---|
| Overall project owner | READY FOR REVIEW | Named decision by project owner |
| DBA/schema review | PENDING | Reconciled migration, RLS output, rollback readback |
| Security review | PENDING | Auth/RLS, least privilege, tenant and sibling-contract proof |
| QS review | PENDING | BOQ/programme mapping and measurement rules |
| Contract/legal review | PENDING | CIPAA-related terminology, chronology, audit package boundaries |
| Supabase project and Auth/RLS | NOT CONFIGURED | Project owner / infrastructure owner |
| Git remote and branch policy | NOT CONFIGURED | Project owner / repository owner |
| Vercel environment | NOT CONFIGURED | Project owner / deployment owner |
| Pilot users and data classification | PENDING | Named pilot owner |
| Monitoring and incident response | PENDING | Operations owner |
| Rollback ticket and support plan | PENDING | Operations/DBA owner |
| Go/no-go decision | HOLD | Overall project owner after named reviews |

## Pilot constraints

1. No production or customer data.
2. No enabled Enterprise write flag without an approved change record.
3. No executed migration without DBA approval and rollback evidence.
4. No legal, payment, entitlement, or certification conclusion is produced by the factual progress workflow.
5. Every pilot result must retain source lineage, actor, appointment scope, evidence references, and as-of boundary.

Operational procedure: `docs/G11_PILOT_OPERATIONS_RUNBOOK.md`. Safe configuration template: `.env.example`.

## Final release evidence to collect

- Source repository commit hashes and migration IDs.
- Supabase environment and RLS readback, with secrets excluded.
- Vercel deployment reference and environment separation.
- Full test output, accessibility report, route screenshots, and UAT decision.
- Pilot user list, data classification, monitoring plan, rollback test, incident contacts, and signed go/no-go record.

Current observed facts and named risk ownership gaps are recorded in `docs/G11_RELEASE_EVIDENCE_REGISTER.md`.
