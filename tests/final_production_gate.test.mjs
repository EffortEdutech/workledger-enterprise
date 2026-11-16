import test from "node:test";
import assert from "node:assert/strict";
import { evaluateProductionGate, mandatoryProductionGates } from "../src/integration/productionGate.mjs";

test("final production gate remains HOLD with current synthetic-only evidence", () => {
  const result = evaluateProductionGate({ "audit-cipaa-traceability": "PASS" });
  assert.equal(result.decision, "HOLD");
  assert.equal(result.customerDataAllowed, false);
  assert.equal(result.externalUsersAllowed, false);
  assert.equal(result.writesAllowed, false);
  assert.equal(result.productionAccessAllowed, false);
  assert.equal(result.missing.length, mandatoryProductionGates.length - 1);
});

test("production GO requires every mandatory gate", () => {
  const evidence = Object.fromEntries(mandatoryProductionGates.map((gate) => [gate, "PASS"]));
  assert.equal(evaluateProductionGate(evidence).decision, "GO");
});
