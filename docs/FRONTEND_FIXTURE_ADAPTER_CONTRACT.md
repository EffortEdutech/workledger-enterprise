# WorkLedger Enterprise — Fixture and Adapter Contract

Goal: G2 completion evidence
Status: Confirmed for frontend implementation
Date: 14 November 2026 (MYT)

## Contract rule

The frontend renders typed view models. It does not render raw database rows, source-system payloads, browser claims, or unverified identifiers directly.

Each adapter must return:

- data
- source and version metadata
- state
- capability context
- loading/error information
- provenance references

## Adapter boundary

| Adapter | Read responsibility | Future source |
|---|---|---|
| contextAdapter | organisation, project, contract, appointment scope | WorkLedger |
| contractAdapter | notices, instructions, submissions, responses, chronology | WorkLedger |
| diaryAdapter | diary facts, versions, acknowledgement, evidence references | Contract Diary Platform |
| evidenceAdapter | digest, custody, original-file status, access history | Contract Diary Platform / evidence store |
| programmeAdapter | accepted baseline, WBS, task lineage, dates, dependencies | QS Service |
| boqAdapter | BOQ revision, item, unit, quantity, mapping, digest | QS Service |
| progressAdapter | observations, review queue, verified projection, reports | WorkLedger Enterprise |
| auditAdapter | audit events, chronology, package contents, export status | WorkLedger Enterprise |

## Common view-model envelope

    {
      "data": {},
      "state": "ready",
      "source": {
        "system": "workledger|contract-diary|qs-service|enterprise",
        "recordId": "synthetic-id",
        "version": "v1",
        "verifiedAt": "2026-11-14T09:00:00+08:00"
      },
      "capability": {
        "allowed": true,
        "reason": null
      },
      "provenance": [],
      "error": null
    }

Allowed state values:

- loading
- ready
- empty
- pending
- stale
- superseded
- denied
- error
- offline-draft

## Fixture rules

- IDs are deterministic and synthetic.
- Dates use ISO date/time values and display in Asia/Kuala_Lumpur.
- Every fixture identifies its source system.
- Every versioned record includes version and state.
- Every progress fixture includes baseline, BOQ, diary, evidence, actor, and review references.
- Fixtures include happy paths and negative states.
- No fixture may imply payment, certification, EOT, CIPAA entitlement, or legal compliance.

## Adapter acceptance

- [x] Fixture schemas documented.
- [x] Source ownership documented.
- [x] State envelope documented.
- [x] Provenance requirements documented.
- [x] Future adapter responsibilities separated by source system.
- [x] Local fixture mode remains supported without network access.

