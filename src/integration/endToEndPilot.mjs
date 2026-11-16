import { readOnlySourceRequest } from "./readOnlyConnector.mjs";
import { buildReconciledReadModel } from "./reconciliationHarness.mjs";
import { contractDiaryFixture, qsFixture } from "./sourceFixtures.mjs";

const scope = { organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractId: "contract_syn_nb042", appointmentId: "appointment_syn_project_director" };

export async function runSyntheticConnectivityPilot(options = {}) {
  const transport = options.transport || (async ({ source }) => ({ status: 200, data: { source, synthetic: true } }));
  const diaryRead = await readOnlySourceRequest({ source: "contract-diary", resource: "diaries/D-2026-1112", token: "synthetic:g39", scope, transport, timeoutMs: options.timeoutMs || 1000 });
  const qsRead = await readOnlySourceRequest({ source: "qs-service", resource: "programme/77", token: "synthetic:g39", scope, transport, timeoutMs: options.timeoutMs || 1000 });
  const model = buildReconciledReadModel(options.diary || contractDiaryFixture, options.qs || qsFixture, options.drift);
  return { mode: "read-only", synthetic: true, requests: [diaryRead, qsRead], model, decision: model.report.ok ? "reconciled" : "blocked" };
}
