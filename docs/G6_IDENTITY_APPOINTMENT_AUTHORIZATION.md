# G6 Identity, Appointment, and Authorisation

Status: COMPLETE for the local trusted-policy boundary  
Mode: local trusted-policy fixtures; Supabase Auth/RLS integration is deferred to controlled infrastructure setup.

## Policy boundary

The browser role selector is only a prototype preview. The authoritative local policy resolves an identity, appointment, role, capability set, organisation, project, and contract scope in `ui/app/authorization.js`. A view is allowed only after identity status, appointment status, capability, and requested scope are checked.

## Required denial cases

- Unknown identity
- Revoked appointment
- Missing role or capability
- Cross-organisation scope
- Cross-project scope
- Sibling-contract scope
- Read-only appointment attempting an unavailable view

## Supabase handoff

When Supabase is configured, `resolveAppointment` becomes a server-side boundary backed by authenticated identity, appointment records, and RLS. Client-supplied role, actor, organisation, project, contract, or capability claims must not be trusted. The local policy and UI route guard are complete; the network-backed handoff remains a later infrastructure gate.
