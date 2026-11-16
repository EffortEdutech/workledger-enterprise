# G40 — Controlled Integration Gate and Non-Synthetic Readiness

Status: COMPLETE as a readiness gate; non-synthetic integration remains HOLD.

## Required inputs before a limited non-synthetic read pilot

- Contract Diary read-only base URL and documented response contract.
- QS Service read-only base URL and documented response contract.
- Dedicated read-client identity and secret storage in the target environment.
- Explicit organization/project/contract/appointment scope claims.
- Source revision/digest/receipt semantics and reconciliation mapping.
- Rollback reference, incident owner, and audit retention decision.
- Supabase Auth protection and production RLS decision completed separately.

The required configuration names are recorded in `src/integration/readinessGate.mjs`. No secret values are stored in the repository.

## Safety gate

The readiness evaluator remains HOLD when inputs are absent, the environment is production, writes are enabled, or data mode is not `synthetic-read-only`. It performs no network request and exposes no customer-data path.

## Current decision

GO for continued synthetic development and contract preparation. HOLD for any non-synthetic read pilot until the required endpoint, credential, scope, rollback, audit, Auth, and RLS decisions are explicitly available. NO-GO for production writes and customer use.
