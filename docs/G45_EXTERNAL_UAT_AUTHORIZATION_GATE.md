# G45 — External UAT Authorization Gate

Status: HOLD — no external UAT authorized.

Before any external or non-synthetic UAT, the project must have approved test identities, approved test data, source read receipts, completed role journeys, CIPAA/audit review, rollback drill, and explicit product-owner UAT acceptance. Customer data and writes remain disabled until every item is present.

The evaluator in `src/integration/uatGate.mjs` rejects customer-data authorization without approved test data and rejects writes without owner acceptance. It does not create users, import data, or enable writes.

Current decision: HOLD pending G41 Auth, real source contracts, schema/RLS, operations evidence, and explicit UAT authorization.
