import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const sql = await readFile(new URL("../sql/008_programme_actuals_reporting_CANDIDATE.sql", import.meta.url), "utf8");

test("G9 candidate schema retains composite tenant/project/contract scope", () => {
  assert.match(sql, /UNIQUE\(organization_id,project_id,contract_id,baseline_id,measure_id\)/);
  assert.match(sql, /FOREIGN KEY\(organization_id,project_id,contract_id\)/);
  assert.match(sql, /CREATE INDEX e07_measure_scope_baseline_task_date/);
});

test("G9 candidate schema declares immutable and replay controls", () => {
  assert.match(sql, /CREATE TABLE wle_e07\.idempotent_receipts/);
  assert.match(sql, /PRIMARY KEY\(organization_id,project_id,contract_id,actor_user_id,operation,idempotency_key\)/);
  assert.match(sql, /CREATE TABLE wle_e07\.actual_events/);
  assert.match(sql, /UNIQUE\(organization_id,project_id,contract_id,event_sequence\)/);
  assert.match(sql, /CREATE TABLE wle_e07\.published_reports/);
});

test("G9 candidate schema enables and forces RLS on every Enterprise table", () => {
  for (const table of ["progress_measurements", "measurement_decisions", "published_reports", "idempotent_receipts", "actual_events"]) {
    assert.match(sql, new RegExp(`ALTER TABLE wle_e07\\.${table} ENABLE ROW LEVEL SECURITY`));
    assert.match(sql, new RegExp(`ALTER TABLE wle_e07\\.${table} FORCE ROW LEVEL SECURITY`));
  }
});
