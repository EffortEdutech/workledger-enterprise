import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("ui/app/app.js", "utf8");
test("G29 workflow confirmation is exposed as a live status region", () => {
  assert.match(app, /role=\"status\" aria-live=\"polite\"/);
  assert.match(app, /workflowMessage/);
});
test("G29 role and authentication controls retain accessible labels", () => {
  assert.match(app, /aria-label=\"Preview role\"/);
  assert.match(app, /aria-label=\"Synthetic user email\"/);
});
