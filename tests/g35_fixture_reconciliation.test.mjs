import test from "node:test";
import assert from "node:assert/strict";
import { assertCertifiedFixture, certifiedFixtureManifest, contractDiaryFixture, qsFixture, reconcileSourceFixtures } from "../src/integration/sourceFixtures.mjs";

test("G35 certifies the Contract Diary and QS source-shaped fixture pair", () => {
  assert.equal(assertCertifiedFixture().fixtureId, "g35-northbank-source-shaped-v1");
  const result = reconcileSourceFixtures(contractDiaryFixture, qsFixture);
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("G35 rejects cross-contract and unacknowledged source fixtures", () => {
  const wrongScope = reconcileSourceFixtures(contractDiaryFixture, { ...qsFixture, scope: { ...qsFixture.scope, contractId: "contract_syn_sibling" } });
  assert.equal(wrongScope.ok, false);
  assert.equal(wrongScope.errors.includes("contract-scope-mismatch"), true);
  const unacknowledged = reconcileSourceFixtures({ ...contractDiaryFixture, state: "submitted" }, qsFixture);
  assert.equal(unacknowledged.errors.includes("diary-not-acknowledged"), true);
});

test("G35 rejects missing, wrong, and duplicate evidence inputs", () => {
  const missingDigest = reconcileSourceFixtures({ ...contractDiaryFixture, factsDigest: "" }, qsFixture);
  assert.equal(missingDigest.errors.includes("digest-missing"), true);
  const wrongEvidence = reconcileSourceFixtures({ ...contractDiaryFixture, evidence: [{ nativeEvidenceId: "cd-evidence-8801", digest: "sha256:other", custody: "original-reference-retained" }] }, qsFixture);
  assert.equal(wrongEvidence.errors.includes("evidence-digest-mismatch"), true);
  const duplicateEvidence = reconcileSourceFixtures({ ...contractDiaryFixture, evidence: [...contractDiaryFixture.evidence, ...contractDiaryFixture.evidence] }, qsFixture);
  assert.equal(duplicateEvidence.errors.includes("duplicate-evidence-native-id"), true);
});
