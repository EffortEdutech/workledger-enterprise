import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../ui/app/app.js", import.meta.url), "utf8");
const fixtures = await readFile(new URL("../ui/app/fixtures.js", import.meta.url), "utf8");
const index = await readFile(new URL("../ui/app/index.html", import.meta.url), "utf8");

test("approved route inventory remains present in the structured frontend", () => {
  for (const route of ["home", "projects", "contract", "diary", "programme", "boq", "progress", "audit", "reports", "admin"]) assert.match(fixtures, new RegExp(`id: "${route}"`));
  assert.match(app, /aria-label/);
  assert.match(index, /app/);
});

test("UX boundary remains adapter- and authorization-backed", () => {
  assert.match(app, /readProjectContext/);
  assert.match(app, /readProgramme/);
  assert.match(app, /readBoqProvenance/);
  assert.match(app, /readDiaryEvidence/);
  assert.match(app, /readContractChronology/);
  assert.match(app, /authorizeRead/);
  assert.match(app, /statePanel\("denied"\)/);
  assert.match(app, /statePanel\("stale"\)/);
  assert.match(app, /statePanel\("pending"\)/);
});

test("provenance, evidence, review, timeline, and audit UX patterns remain wired", () => {
  for (const pattern of ["provenanceDrawer", "evidenceCard", "reviewQueue", "fieldDiaryHandoff", "timeline", "readAuditPackage"]) assert.match(app, new RegExp(pattern));
});

test("G44 review and programme actuals preserve decision and lineage markers", () => {
  for (const marker of ["reject-review", "Programme actuals", "Verified diary evidence", "Excluded from verified projection", "Digest pinned"]) assert.match(app, new RegExp(marker));
});
