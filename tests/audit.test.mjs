import test from "node:test";
import assert from "node:assert/strict";
import { auditFixtures, classifyAuditRecord, isDuplicateRecord, readAuditPackage } from "../ui/app/audit.js";

test("audit package contains contract, document, evidence, and event records", () => {
  const result = readAuditPackage();
  assert.equal(result.state, "ready");
  assert.ok(result.items.length >= 8);
  assert.equal(result.sourceEventsThrough, "EV-214");
});

test("restricted audit package returns no records", () => {
  assert.deepEqual(readAuditPackage({ restricted: true }), { state: "restricted", reason: "appointment-scope-required", items: [] });
});

test("document supersession and late response states are classified", () => {
  assert.equal(classifyAuditRecord(auditFixtures.documents[0]), "superseded");
  assert.equal(classifyAuditRecord({ id: "NT-LATE", state: "response-due", responseDue: "2026-11-01" }), "late");
  assert.equal(classifyAuditRecord({ id: "COR-1", correctionOf: "EV-1", state: "corrected" }), "corrected");
});

test("duplicate evidence is detected by stable id and digest", () => {
  assert.equal(isDuplicateRecord(auditFixtures.evidence[0], auditFixtures.evidence), true);
  assert.equal(isDuplicateRecord({ id: "EVD-8801", digest: "sha256:other" }, auditFixtures.evidence), false);
});
