import test from "node:test";
import assert from "node:assert/strict";
import { assertEnterpriseWriteEnabled, enterpriseWritesEnabled, G8_WRITE_FLAG } from "../src/g8_policy.mjs";

test("G8 Enterprise writes are disabled by default", () => {
  assert.equal(enterpriseWritesEnabled(), false);
  assert.throws(() => assertEnterpriseWriteEnabled(), { code: "ENTERPRISE_WRITES_DISABLED", status: 403 });
});

test("G8 write flag requires an explicit true value", () => {
  assert.equal(enterpriseWritesEnabled({ [G8_WRITE_FLAG]: "false" }), false);
  assert.equal(enterpriseWritesEnabled({ [G8_WRITE_FLAG]: "true" }), true);
  assert.equal(assertEnterpriseWriteEnabled({ [G8_WRITE_FLAG]: "true" }), true);
});
