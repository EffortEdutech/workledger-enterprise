import test from "node:test";
import assert from "node:assert/strict";
import { readProjectContext, readProgramme, readBoqProvenance, readDiaryEvidence, readContractChronology } from "../ui/app/adapters.js";

test("G33 frozen read contracts expose source, freshness, verification, and scope-bearing data", () => {
  const reads = [readProjectContext(), readProgramme(), readBoqProvenance(), readDiaryEvidence(), readContractChronology()];
  for (const read of reads) {
    assert.equal(read.mode, "read-only");
    assert.equal(read.verified, true);
    assert.equal(read.freshness, "current");
    assert.match(read.source, /[a-z-]+\./);
  }
  const context = reads[0].data;
  assert.equal(context.project.id, "project_syn_northbank");
  assert.equal(context.contract.id, "contract_syn_nb042");
});

test("G33 source contract keeps native IDs and exact provenance links distinct", () => {
  const programme = readProgramme().data;
  const boq = readBoqProvenance().data;
  const diary = readDiaryEvidence().data;
  assert.equal(programme.baseline.id, "baseline_syn_v3");
  assert.equal(boq.lines[0].id, "B-210");
  assert.equal(boq.lines[0].taskId, "QS-1071");
  assert.equal(diary.diary.id, "D-2026-1112");
  assert.equal(diary.evidence[0].digest, "sha256:7adf10");
  assert.equal(diary.evidence[0].custody, "Contract Diary");
});
