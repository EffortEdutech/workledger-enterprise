import test from "node:test";
import assert from "node:assert/strict";
import { readProjectContext, readProgramme, readBoqProvenance, readDiaryEvidence, readContractChronology } from "../ui/app/adapters.js";
import { readAuditPackage } from "../ui/app/audit.js";
import { applyWorkflowAction, createWorkflowState, workflowSummary } from "../ui/app/workflows.js";

test("G32 synthetic pilot preserves the Contract Diary to QS to WorkLedger handoff", () => {
  const context = readProjectContext();
  const diary = readDiaryEvidence();
  const programme = readProgramme();
  const boq = readBoqProvenance();
  const chronology = readContractChronology();
  assert.equal(context.data.contract.number, "NB-042");
  assert.equal(diary.data.diary.state, "acknowledged");
  assert.equal(diary.data.evidence[0].id, "EVD-8801");
  assert.equal(programme.data.baseline.status, "accepted");
  assert.equal(boq.data.lines[0].taskId, "QS-1071");
  assert.equal(chronology.data.events[0].type, "observation-verified");
  assert.equal(diary.source, "contract-diary.evidence");
  assert.equal(programme.source, "qs.accepted-baseline");
});

test("G32 scenario completes without writes and retains audit provenance", () => {
  let state = createWorkflowState();
  for (const action of ["select-project", "acknowledge-diary", "verify-evidence", "open-review", "complete-review", "accept-baseline", "lock-boq", "open-provenance", "filter-audit"]) state = applyWorkflowAction(state, action);
  const summary = workflowSummary(state);
  const audit = readAuditPackage();
  assert.equal(summary.writesEnabled, false);
  assert.equal(summary.review, "verified");
  assert.equal(summary.provenance, "open");
  assert.equal(summary.auditFilter, "verified");
  assert.equal(audit.state, "ready");
  assert.equal(audit.items.some((item) => item.id === "EVD-8801"), true);
  assert.equal(audit.items.some((item) => item.id === "EV-214"), true);
});
