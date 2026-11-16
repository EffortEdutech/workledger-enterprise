import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync("sql/20261116_production_event_candidate.sql", "utf8");
test("production schema candidate is explicitly held and append-only shaped", () => {
  assert.match(sql, /DO NOT APPLY/);
  assert.match(sql, /idempotency_key text not null unique/);
  assert.match(sql, /alter table wle\.appointments force row level security/);
  assert.match(sql, /alter table wle\.audit_events force row level security/);
  assert.match(sql, /Default deny is intentional/);
});
