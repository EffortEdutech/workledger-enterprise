# G38 — Controlled Read-Only Source Connectivity Pilot

Status: COMPLETE for disposable synthetic connectivity testing.

## Connector boundary

The controlled connector accepts only approved Contract Diary and QS Service source names, synthetic pilot credentials, complete organization/project/contract/appointment scope, and safe resource paths. It invokes an injected transport with `GET` only and returns a read-only result with writes disabled.

## Pilot outcomes

- Synthetic scoped Contract Diary GET: permitted.
- Non-synthetic credential: denied with `AUTH_REQUIRED`.
- Unapproved source: denied with `SOURCE_UNAPPROVED`.
- Incomplete appointment scope: denied with `SCOPE_INCOMPLETE`.
- Sibling-contract scope: denied with `SCOPE_DENIED`.
- Hanging source: denied with `TIMEOUT`.
- Invalid traversal resource: denied with `RESOURCE_INVALID`.
- No state mutation or write transport is exposed.

## Verification

- G38 connectivity tests: 3 passing.
- Full regression suite: 156/156 passing.
- No real source endpoint, customer row, production identity, Supabase write, or production access used.

## Decision

GO for disposable synthetic read-only connectivity testing. NO-GO for real source connectivity, customer data, external users, production identity, writes, and production release.
