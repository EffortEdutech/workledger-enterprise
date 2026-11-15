# G12 Git Branch and Review Policy

Repository: `https://github.com/EffortEdutech/workledger-enterprise.git`  
Local default branch observed: `master`  
Status: lightweight source-control policy; hosted branch protection is optional and is not a G13 completion gate. The connected GitHub integration returned HTTP 403 for the branch-protection endpoint.

## Required hosted controls

- Recommended for team-scale production work, but not required for the current owner-controlled synthetic pilot.
- Keep the default branch and source commit explicit.
- Run the local test suite before any deployment.
- Do not store Supabase service-role keys, Vercel tokens, or customer data in Git.
- Tag pilot release candidates with source commit and migration ID.
- Keep infrastructure configuration separate from local fixture defaults.

## Current local controls

- `origin` is configured locally.
- No push has been performed by this workspace.
- Local fixture mode and disabled writes remain the default.
- Hosted branch protection is not required for the current G13 synthetic pilot; it may be enabled later if the team expands or production release begins.
