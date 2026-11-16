# WorkLedger Enterprise — Production Release Evidence Manifest

Status: **HOLD — evidence collection in progress**  
Last reviewed: 2026-11-16  
Release scope: controlled production release only

This manifest is the handoff checklist for G41–G46. A gate may be marked `PASS` only when the listed evidence exists in the repository or in an approved operational system and has been read back. Until every gate is `PASS`, production identity, customer data, external users, and bounded writes remain disabled.

| Gate | Required evidence | Current state | Activation boundary |
|---|---|---|---|
| G41 Production identity/Auth | Production Auth configuration readback; approved identity matrix; leaked-password protection enabled; lifecycle/expiry proof | HOLD | No production users or customer identities |
| G41 Real source connectivity | Contract Diary and QS endpoint contracts, credentials, scope mapping, health/read receipts, denial proof | HOLD | Synthetic adapters only |
| G43 Schema/migrations | Reviewed migration checksum, controlled apply log, schema readback, rollback rehearsal | HOLD | Candidate SQL remains `DO NOT APPLY` |
| G43 RLS proof | Policy/privilege readback, FORCE RLS confirmation, allowed/sibling/revoked denial tests | HOLD | No production data access |
| G42 Bounded writes | Approved action list, actor/appointment/scope proof, idempotency proof, append-only audit readback | HOLD | `enabled: false` |
| G44 Secrets/environments | Vercel/Supabase environment separation readback; secret inventory without values; service-role exposure scan | HOLD | No production secrets configured |
| G44 Monitoring/rollback | Alerts, database backup evidence, incident runbook, rollback deployment and migration rehearsal | HOLD | No production operations activated |
| G45 External UAT | Named authorized testers, approved data scope, UAT results, source receipts, audit/CIPAA review | HOLD | No external/customer UAT |
| G46 Owner acceptance | Explicit production owner acceptance referencing all evidence and residual risks | HOLD | No GO decision |
| G46 Final decision | All mandatory gates exactly `PASS`; evaluator output `GO`; decision record committed | HOLD | Production release not authorized |

## Evidence rules

- Never store passwords, service-role keys, access tokens, or customer records in this repository.
- Record identifiers, timestamps, checksums, redacted readbacks, and links to approved operational evidence instead.
- Synthetic evidence cannot satisfy a production gate unless the gate explicitly says synthetic.
- A missing, stale, contradictory, or unreviewed artifact is `HOLD`, not `PASS`.
- The final GO decision must be produced by `src/integration/finalGoLiveGate.mjs` and reviewed against this manifest.
- Local completeness is machine-checked by `src/integration/evidenceManifest.mjs` and its regression tests.

## Current decision

The only currently verified production-relevant capability is the existing synthetic audit/CIPAA traceability foundation. The release remains **HOLD** pending the nine gate areas above.
