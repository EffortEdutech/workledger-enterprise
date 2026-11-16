import test from "node:test";
import assert from "node:assert/strict";
import { fixtureContext, navItems, roles } from "../ui/app/fixtures.js";
import { applyWorkflowAction, createWorkflowState, workflowSummary } from "../ui/app/workflows.js";

test("G28 programme and BOQ controls retain accepted and locked states", () => {
  let state = createWorkflowState();
  state = applyWorkflowAction(state, "accept-baseline");
  state = applyWorkflowAction(state, "lock-boq");
  const summary = workflowSummary(state);
  assert.equal(summary.programme, "accepted");
  assert.equal(summary.boq, "locked");
  assert.equal(summary.writesEnabled, false);
});

test("G28 provenance and audit controls are local read-only transitions", () => {
  let state = applyWorkflowAction(createWorkflowState(), "open-provenance");
  state = applyWorkflowAction(state, "filter-audit");
  const summary = workflowSummary(state);
  assert.equal(summary.provenance, "open");
  assert.equal(summary.auditFilter, "verified");
  assert.equal(summary.writesEnabled, false);
});

test("G28 all seven roles have a home route and explicit appointment context", () => {
  assert.equal(roles.length, 7);
  assert.ok(navItems.some((item) => item.id === "home"));
  assert.equal(fixtureContext.mode, "local-fixture");
  for (const role of roles) assert.ok(role.capabilities.includes("read:home"));
});
