import test from "node:test";
import assert from "node:assert/strict";
import { evaluateExternalUatReadiness, externalUatInputs } from "../src/integration/uatGate.mjs";

test("external UAT remains HOLD without approved identities and evidence", () => {
  const result = evaluateExternalUatReadiness({});
  assert.equal(result.decision, "HOLD");
  assert.equal(result.missing.length, externalUatInputs.length);
  assert.equal(result.externalUsersAllowed, false);
  assert.equal(result.customerDataAllowed, false);
  assert.equal(result.writesAllowed, false);
});

test("external UAT rejects customer data or writes without explicit approvals", () => {
  const result = evaluateExternalUatReadiness({ "customer-data-authorized": "YES", "writes-enabled": "YES" });
  assert.equal(result.decision, "HOLD");
  assert.deepEqual(result.unsafe, ["customer-data-without-approved-test-data", "writes-without-owner-acceptance"]);
});

test("external UAT can reach owner-decision readiness only with every required evidence item", () => {
  const evidence = Object.fromEntries(externalUatInputs.map((name) => [name, "PASS"]));
  const result = evaluateExternalUatReadiness(evidence);
  assert.equal(result.decision, "READY_FOR_OWNER_DECISION");
  assert.equal(result.externalUsersAllowed, false);
});
