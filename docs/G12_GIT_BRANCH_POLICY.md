# G12 Git Branch and Review Policy

Repository: `https://github.com/EffortEdutech/workledger-enterprise.git`  
Local default branch observed: `master`  
Status: policy prepared; hosted protection not yet verified.

## Required hosted controls

- Protect the default branch against direct pushes.
- Require pull request review before merge.
- Require passing test checks before merge.
- Do not store Supabase service-role keys, Vercel tokens, or customer data in Git.
- Tag pilot release candidates with source commit and migration ID.
- Keep infrastructure configuration separate from local fixture defaults.

## Current local controls

- `origin` is configured locally.
- No push has been performed by this workspace.
- Local fixture mode and disabled writes remain the default.
- Hosted branch protection remains a required external verification step.
