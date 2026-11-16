import test from "node:test";
import assert from "node:assert/strict";
import { prepareBoundedWrite } from "../src/integration/writeControls.mjs";

const base = { action: "acknowledge-diary", actor: { userId: "user-syn-1", role: "contract-admin" }, appointment: { id: "appt-syn-1", userId: "user-syn-1", active: true }, scope: { organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractId: "contract_syn_nb042" }, idempotencyKey: "wle-diary-1112-ack", payload: { diaryId: "D-2026-1112" } };

test("bounded writes are actor-, appointment-, scope-, and idempotency-bound", () => {
  const command = prepareBoundedWrite(base);
  assert.equal(command.appendOnly, true);
  assert.equal(command.enabled, false);
  assert.equal(command.scope.contractId, "contract_syn_nb042");
  assert.equal(command.payload.diaryId, "D-2026-1112");
});

test("bounded writes reject unauthorized actions and forged appointments", () => {
  assert.throws(() => prepareBoundedWrite({ ...base, action: "publish-commercial-claim" }), /WRITE_ACTION_NOT_ALLOWED/);
  assert.throws(() => prepareBoundedWrite({ ...base, appointment: { ...base.appointment, userId: "other" } }), /WRITE_APPOINTMENT_INVALID/);
  assert.throws(() => prepareBoundedWrite({ ...base, idempotencyKey: "bad" }), /WRITE_IDEMPOTENCY_REQUIRED/);
});
