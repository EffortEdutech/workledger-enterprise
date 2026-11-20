import test from "node:test";
import assert from "node:assert/strict";
import { clientPortfolio, getClientPortfolioSummary } from "../ui/app/clientPortfolio.js";
import { readFile } from "node:fs/promises";

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

test("G49 portfolio is wired into the shared presentation view", async () => {
  const app = await readFile(new URL("../ui/app/app.js", import.meta.url), "utf8");
  assert.match(app, /portfolioPanel/);
  assert.match(app, /client-selector/);
  assert.match(app, /Simulated client Go-Live/);
});
