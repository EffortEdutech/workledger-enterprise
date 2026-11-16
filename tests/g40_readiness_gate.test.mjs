import test from "node:test";
import assert from "node:assert/strict";
import { evaluateIntegrationReadiness, requiredIntegrationInputs } from "../src/integration/readinessGate.mjs";

test("G40 synthetic development remains on HOLD without real endpoint/credential inputs", () => {
  const result = evaluateIntegrationReadiness({ WLE_ENVIRONMENT: "preview", WLE_DATA_MODE: "synthetic-read-only", WLE_ENTERPRISE_WRITES: false });
  assert.equal(result.status, "HOLD");
  assert.equal(result.networkAccess, false);
  assert.equal(result.customerDataAccess, false);
  assert.equal(result.writesEnabled, false);
  assert.deepEqual(result.missing, requiredIntegrationInputs);
});

test("G40 rejects unsafe production or write configuration", () => {
  const result = evaluateIntegrationReadiness({ ...Object.fromEntries(requiredIntegrationInputs.map((name) => [name, "synthetic-placeholder"])), WLE_ENVIRONMENT: "production", WLE_DATA_MODE: "customer-data", WLE_ENTERPRISE_WRITES: true });
  assert.equal(result.status, "HOLD");
  assert.deepEqual(result.unsafe, ["writes-enabled", "production-environment", "data-mode-not-synthetic-read-only"]);
});
