import test from "node:test";
import assert from "node:assert/strict";
import { applyWorkflowAction, createWorkflowState, workflowSummary } from "../ui/app/workflows.js";

test("G27 project and contract workflow starts in approved synthetic scope", () => {
  const summary = workflowSummary(createWorkflowState());
  assert.equal(summary.project, "project_syn_nb");
  assert.equal(summary.contract, "contract_syn_nb042");
  assert.equal(summary.writesEnabled, false);
});

test("G27 diary and evidence workflow records deterministic local transitions", () => {
  let state = createWorkflowState();
  state = applyWorkflowAction(state, "acknowledge-diary");
  state = applyWorkflowAction(state, "verify-evidence");
  const summary = workflowSummary(state);
  assert.equal(summary.diary, "acknowledged");
  assert.equal(summary.evidence, "verified");
  assert.match(summary.lastAction, /Evidence EVD-8801 verified/);
});

test("G27 review workflow supports open and complete without persistence", () => {
  let state = applyWorkflowAction(createWorkflowState(), "open-review");
  assert.equal(workflowSummary(state).review, "in_review");
  state = applyWorkflowAction(state, "complete-review");
  assert.equal(workflowSummary(state).review, "verified");
  assert.equal(workflowSummary(state).writesEnabled, false);
});

test("G27 rejects unknown actions", () => {
  assert.throws(() => applyWorkflowAction(createWorkflowState(), "write-to-backend"), /unknown-workflow-action/);
});

test("G44 review decisions control programme actual inclusion", () => {
  let state = applyWorkflowAction(createWorkflowState(), "open-review");
  state = applyWorkflowAction(state, "reject-review");
  assert.equal(workflowSummary(state).reviewDecision, "rejected");
  state = applyWorkflowAction(createWorkflowState(), "open-review");
  state = applyWorkflowAction(state, "complete-review");
  assert.equal(workflowSummary(state).reviewDecision, "verified");
});
