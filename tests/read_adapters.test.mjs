import test from "node:test";
import assert from "node:assert/strict";
import { AdapterError, readBoqProvenance, readContractChronology, readDiaryEvidence, readAdapters, readProgramme, readProjectContext } from "../ui/app/adapters.js";

test("all G5 adapters are read-only and return trusted envelopes", () => {
  for (const adapter of Object.values(readAdapters)) {
    const result = adapter();
    assert.equal(result.mode, "read-only");
    assert.equal(result.verified, true);
    assert.ok(result.source);
  }
});

test("project, programme, BOQ, diary, and chronology reads expose required lineage", () => {
  assert.equal(readProjectContext().data.contract.number, "NB-042");
  assert.equal(readProgramme().data.baseline.status, "accepted");
  assert.equal(readBoqProvenance().data.revision, "BOQ-REV-02");
  assert.equal(readDiaryEvidence().data.diary.id, "D-2026-1112");
  assert.equal(readContractChronology().data.events[0].id, "EV-214");
});

test("stale and partial source conditions are explicit", () => {
  assert.equal(readProgramme({ stale: true }).freshness, "stale");
  assert.equal(readDiaryEvidence({ partial: true }).partial, true);
});

test("missing, forbidden, and unavailable reads fail with stable codes", () => {
  for (const options of [{ missing: true }, { forbidden: true }, { error: true }]) {
    assert.throws(() => readProgramme(options), (error) => error instanceof AdapterError);
  }
  assert.throws(() => readProgramme({ missing: true }), { code: "MISSING" });
  assert.throws(() => readProgramme({ forbidden: true }), { code: "FORBIDDEN" });
  assert.throws(() => readProgramme({ error: true }), { code: "UNAVAILABLE" });
});
