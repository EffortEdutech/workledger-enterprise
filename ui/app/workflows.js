const initialWorkflow = Object.freeze({
  selectedProjectId: "project_syn_nb",
  selectedContractId: "contract_syn_nb042",
  diaryState: "acknowledged",
  evidenceState: "verified",
  reviewState: "pending",
  lastAction: "Loaded synthetic project scope",
});

export function createWorkflowState() {
  return { ...initialWorkflow };
}

export function applyWorkflowAction(state, action) {
  const next = { ...state };
  if (action === "select-project") next.lastAction = "Northbank Mixed Development selected";
  else if (action === "acknowledge-diary") { next.diaryState = "acknowledged"; next.lastAction = "Diary D-2026-1112 acknowledged"; }
  else if (action === "verify-evidence") { next.evidenceState = "verified"; next.lastAction = "Evidence EVD-8801 verified"; }
  else if (action === "open-review") { next.reviewState = "in_review"; next.lastAction = "Observation QS-1071 opened for review"; }
  else if (action === "complete-review") { next.reviewState = "verified"; next.lastAction = "Observation QS-1071 independently verified"; }
  else throw new Error(`unknown-workflow-action:${action}`);
  return next;
}

export function workflowSummary(state) {
  return {
    project: state.selectedProjectId,
    contract: state.selectedContractId,
    diary: state.diaryState,
    evidence: state.evidenceState,
    review: state.reviewState,
    writesEnabled: false,
    lastAction: state.lastAction,
  };
}
