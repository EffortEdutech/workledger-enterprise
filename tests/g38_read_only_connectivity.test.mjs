import test from "node:test";
import assert from "node:assert/strict";
import { readOnlySourceRequest } from "../src/integration/readOnlyConnector.mjs";

const scope = { organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractId: "contract_syn_nb042", appointmentId: "appointment_syn_project_director" };
const transport = async (request) => ({ status: request.scope.contractId === "contract_syn_nb042" ? 200 : 403, data: { source: request.source, synthetic: true } });

test("G38 permits a synthetic scoped GET and carries no write capability", async () => {
  const result = await readOnlySourceRequest({ source: "contract-diary", resource: "diaries/D-2026-1112", token: "synthetic:g38", scope, transport });
  assert.equal(result.mode, "read-only");
  assert.equal(result.writesEnabled, false);
  assert.equal(result.data.synthetic, true);
});

test("G38 denies non-synthetic auth, unapproved source, and incomplete scope", async () => {
  await assert.rejects(() => readOnlySourceRequest({ source: "contract-diary", resource: "diary", token: "real:token", scope, transport }), { code: "AUTH_REQUIRED" });
  await assert.rejects(() => readOnlySourceRequest({ source: "unknown", resource: "diary", token: "synthetic:g38", scope, transport }), { code: "SOURCE_UNAPPROVED" });
  await assert.rejects(() => readOnlySourceRequest({ source: "qs-service", resource: "programme", token: "synthetic:g38", scope: { ...scope, appointmentId: "" }, transport }), { code: "SCOPE_INCOMPLETE" });
});

test("G38 reports source denial, timeout, and invalid resource without mutation", async () => {
  await assert.rejects(() => readOnlySourceRequest({ source: "qs-service", resource: "programme", token: "synthetic:g38", scope: { ...scope, contractId: "contract_syn_sibling" }, transport }), { code: "SCOPE_DENIED" });
  await assert.rejects(() => readOnlySourceRequest({ source: "qs-service", resource: "programme", token: "synthetic:g38", scope, transport: () => new Promise(() => {}), timeoutMs: 5 }), { code: "TIMEOUT" });
  await assert.rejects(() => readOnlySourceRequest({ source: "qs-service", resource: "../programme", token: "synthetic:g38", scope, transport }), { code: "RESOURCE_INVALID" });
});
