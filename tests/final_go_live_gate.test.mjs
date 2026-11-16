import test from "node:test";
import assert from "node:assert/strict";
import { evaluateFinalGoLive, finalGoLiveInputs } from "../src/integration/finalGoLiveGate.mjs";

test("G46 remains HOLD with current synthetic evidence", () => {
  const result = evaluateFinalGoLive({ "audit-cipaa-traceability": "PASS" });
  assert.equal(result.decision, "HOLD");
  assert.equal(result.missing.length, finalGoLiveInputs.length - 1);
  assert.equal(result.productionAccessAllowed, false);
  assert.equal(result.customerDataAllowed, false);
  assert.equal(result.externalUsersAllowed, false);
  assert.equal(result.writesAllowed, false);
});

test("G46 permits GO only when every production gate is explicitly PASS", () => {
  const evidence = Object.fromEntries(finalGoLiveInputs.map((name) => [name, "PASS"]));
  const result = evaluateFinalGoLive(evidence);
  assert.equal(result.decision, "GO");
  assert.equal(result.productionAccessAllowed, true);
  assert.equal(result.customerDataAllowed, true);
  assert.equal(result.externalUsersAllowed, true);
  assert.equal(result.writesAllowed, true);
  const changed = { ...evidence, "owner-acceptance": "HOLD" };
  assert.equal(evaluateFinalGoLive(changed).decision, "HOLD");
});
