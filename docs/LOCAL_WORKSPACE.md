# Local Workspace Authority

Effective 14 November 2026, this repository is the sole working source of truth for the migrated Workledger Enterprise project files.

## Local contents

- contracts/ — report and command contracts
- docs/ — architecture, lineage, policy, security, and handoff notes
- evidence/ — regression outputs, test report, gate checklist, and manifest
- scripts/ — fixture-generation utilities
- sql/ — candidate database design
- src/ — implementation
- tests/ — automated tests
- ui/ — isolated reporting prototype

## Operating rule

New implementation, documentation, tests, and evidence must be added to this repository. External document stores are not required for normal development or verification.

## Environment direction

- Local development services will use the WorkLedger Enterprise 5100 port family.
- Supabase will be configured later as the approved data/authentication boundary.
- Git remotes and repository hosting will be configured later.
- Vercel deployment will be configured after the local application and Supabase boundary are ready.
- Until those services are explicitly configured, the frontend remains local and fixture-backed.

## Migration note

The current contents were migrated from the latest available WLE-E07 candidate package. The original archive is retained only in the ignored tmp/migration/ directory for local recovery and is not part of the project source.

