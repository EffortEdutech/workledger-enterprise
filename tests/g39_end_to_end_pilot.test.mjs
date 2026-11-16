import test from "node:test";
import assert from "node:assert/strict";
import { runSyntheticConnectivityPilot } from "../src/integration/endToEndPilot.mjs";

test("G39 completes connector-to-reconciliation synthetic flow", async () => {
  const result = await runSyntheticConnectivityPilot();
  assert.equal(result.decision, "reconciled");
  assert.equal(result.requests.length, 2);
  assert.equal(result.requests.every((request) => request.mode === "read-only" && request.data.synthetic), true);
  assert.equal(result.model.report.ok, true);
});

test("G39 surfaces source denial before reconciliation", async () => {
  await assert.rejects(() => runSyntheticConnectivityPilot({ transport: async ({ source }) => ({ status: source === "qs-service" ? 403 : 200, data: { synthetic: true } }) }), { code: "SCOPE_DENIED" });
});

test("G39 carries stale and drift outcomes through the end-to-end result", async () => {
  const result = await runSyntheticConnectivityPilot({ drift: { qsRevision: "QS-PROG-v2" } });
  assert.equal(result.decision, "blocked");
  assert.equal(result.model.report.errors.includes("qs-revision-drift"), true);
});
