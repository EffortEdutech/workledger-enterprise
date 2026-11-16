import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { readReconciliation } from "../ui/app/adapters.js";

const app = fs.readFileSync("ui/app/app.js", "utf8");
test("G37 audit UX exposes reconciled source provenance", () => {
  const read = readReconciliation();
  assert.equal(read.data.state, "reconciled");
  assert.equal(read.data.sources.length, 3);
  assert.match(app, /Cross-system reconciliation/);
  assert.match(app, /Reconciled/);
});

test("G37 audit UX represents synthetic revision and scope drift as blocked", () => {
  assert.equal(readReconciliation({ drift: "revision" }).data.state, "blocked");
  assert.equal(readReconciliation({ drift: "revision" }).freshness, "stale");
  assert.equal(readReconciliation({ drift: "scope" }).data.drift[0].code, "contract-scope-mismatch");
});
