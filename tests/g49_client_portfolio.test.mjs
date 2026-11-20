import test from "node:test";
import assert from "node:assert/strict";
import { clientPortfolio, getClientPortfolioSummary } from "../ui/app/clientPortfolio.js";

test("G49 portfolio contains fictional multi-client presentation data", () => {
  assert.equal(clientPortfolio.length, 3);
  for (const client of clientPortfolio) {
    assert.match(client.id, /^client_/);
    assert.ok(client.projects.length > 0);
    assert.ok(client.projects.every((project) => project.contract && project.programme && project.boq));
  }
});

test("G49 portfolio summary retains synthetic diary and evidence totals", () => {
  const summary = getClientPortfolioSummary();
  assert.equal(summary.reduce((total, client) => total + client.totalDiaries, 0), 26);
  assert.equal(summary.reduce((total, client) => total + client.totalEvidence, 0), 111);
});
