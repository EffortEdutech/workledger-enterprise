# WorkLedger Enterprise — Source Repository Baseline

**Baseline date:** 14 November 2026 (MYT)  
**Purpose:** Record the source repositories and preserve their pre-implementation state.

## Repository pins

| Repository | Local path | Remote | Branch | HEAD commit | Working-tree status |
|---|---|---|---|---|---|
| WorkLedger | C:/Users/user/Documents/00 aWL_platform/workledger | https://github.com/EffortEdutech/workledger.git | main | e78a5a6a7426f149ab89dc2707e3cc8ab1c85168 | Dirty — 24 status entries |
| Contract Diary Platform | C:/Users/user/Documents/00 CIPAA contract work dairy/contract-diary-platform | https://github.com/EffortEdutech/contract-diary-platform.git | main | 6d3a9ad292e702100d133095bb03362ab38638dc | Dirty — 121 status entries |
| QS Service | C:/Users/user/Documents/00 QS_Service | https://github.com/EffortEdutech/QS-Service.git | main | 9dc3555b841b9fe1cc0b1d07a62648d2b8a116be | Dirty — 33 status entries |

These are observation pins only. No source repository was reset, cleaned, committed, rebased, or modified during this baseline operation.

## Preservation snapshots

Recoverable local snapshots were created under:

data/source-snapshots/2026-11-14/

Each repository snapshot contains:

- tracked-changes.patch — binary-capable Git diff from HEAD
- status.txt — status captured at baseline time
- untracked-files.txt — untracked project files captured at baseline time
- untracked/ — copies of untracked project files, excluding dependency/build directories

Snapshot inventory:

| Repository | Tracked diff | Untracked entries | Snapshot location |
|---|---:|---:|---|
| WorkLedger | 95,587 bytes | 9 | data/source-snapshots/2026-11-14/workledger/ |
| Contract Diary Platform | 1,777,944 bytes | 71 | data/source-snapshots/2026-11-14/contract-diary-platform/ |
| QS Service | 12,559 bytes | 80 | data/source-snapshots/2026-11-14/qs-service/ |

## Working rules from this baseline

1. Do not reset, clean, checkout, rebase, or commit these repositories without explicit approval.
2. Do not modify their main branches for Enterprise work.
3. Use a separate branch or worktree for each approved implementation change.
4. Re-run the baseline status and compare against these pins before integrating changes.
5. Keep Enterprise-specific work in the local WorkLedger Enterprise repository unless a source-repository change is explicitly required and documented.

## G1 disposition

Goal G1 is complete for repository discovery and preservation. The next goal is G2 completion: approve the frontend interaction contract and formalise the production component and fixture contracts before connecting backend data.

