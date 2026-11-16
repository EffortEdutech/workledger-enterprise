import test from "node:test";
import assert from "node:assert/strict";
import { evaluateOperationsReadiness, operationsInputs } from "../src/integration/operationsGate.mjs";

test("operations gate stays HOLD without production evidence", () => {
  const result = evaluateOperationsReadiness({ "production-writes-default": "DISABLED" });
  assert.equal(result.decision, "HOLD");
  assert.equal(result.customerDataAllowed, false);
  assert.equal(result.externalUsersAllowed, false);
  assert.equal(result.missing.length, operationsInputs.length);
});

test("operations gate rejects unsafe secret exposure and untested rollback", () => {
  const evidence = Object.fromEntries(operationsInputs.map((name) => [name, "PASS"]));
  evidence["production-writes-default"] = "DISABLED";
  evidence["service-role-client-exposure"] = "YES";
  evidence["rollback-tested"] = "NO";
  const result = evaluateOperationsReadiness(evidence);
  assert.equal(result.decision, "HOLD");
  assert.deepEqual(result.unsafe, ["service-role-client-exposure", "rollback-not-tested"]);
});
