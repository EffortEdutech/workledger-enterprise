import test from "node:test";
import assert from "node:assert/strict";
import { buildReconciledReadModel } from "../src/integration/reconciliationHarness.mjs";
import { contractDiaryFixture, qsFixture } from "../src/integration/sourceFixtures.mjs";

test("G36 builds a reconciled synthetic WorkLedger read model", () => {
  const model = buildReconciledReadModel();
  assert.equal(model.report.ok, true);
  assert.equal(model.sourceState, "reconciled");
  assert.equal(model.mode, "read-only");
  assert.equal(model.synthetic, true);
  assert.equal(model.project.qsNativeId, "1042");
  assert.equal(model.programme.taskNativeId, "1071");
  assert.equal(model.boq.itemNativeId, "210");
  assert.equal(model.evidence[0].nativeId, "cd-evidence-8801");
});

test("G36 reports revision and digest drift without producing a read model as valid", () => {
  const model = buildReconciledReadModel(contractDiaryFixture, qsFixture, { qsRevision: "QS-PROG-v2", expectedManifestDigest: "sha256:other" });
  assert.equal(model.report.ok, false);
  assert.equal(model.sourceState, "reconciled");
  assert.deepEqual(model.report.errors, ["qs-revision-drift", "manifest-digest-drift"]);
});

test("G36 blocks scope and source-state conflicts", () => {
  const model = buildReconciledReadModel({ ...contractDiaryFixture, state: "submitted" }, { ...qsFixture, scope: { ...qsFixture.scope, contractId: "contract_syn_sibling" } });
  assert.equal(model.report.ok, false);
  assert.equal(model.sourceState, "blocked");
  assert.equal(model.report.errors.includes("contract-scope-mismatch"), true);
  assert.equal(model.report.errors.includes("diary-not-acknowledged"), true);
});
