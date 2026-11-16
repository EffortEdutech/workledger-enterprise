export const READ_CONTRACT_VERSION = "wle-read-v1";

export function createReadEnvelope(data, source, options = {}) {
  const scope = options.scope || {
    organisationId: "org_syn_northbank",
    projectId: "project_syn_northbank",
    contractId: "contract_syn_nb042",
    appointmentRequired: true,
  };
  return {
    contractVersion: READ_CONTRACT_VERSION,
    mode: "read-only",
    source,
    data,
    scope,
    freshness: options.freshness || "current",
    partial: Boolean(options.partial),
    verified: options.verified !== false,
    receivedAt: "2026-11-14T00:00:00+08:00",
  };
}

export function assertReadEnvelope(envelope) {
  if (envelope?.contractVersion !== READ_CONTRACT_VERSION) throw new Error("invalid-read-contract-version");
  if (envelope?.mode !== "read-only") throw new Error("read-contract-writes-not-permitted");
  if (!envelope?.source || !envelope?.scope?.contractId) throw new Error("read-contract-provenance-missing");
  return envelope;
}

export function reconcileSourceLink({ source, nativeId, revision, digest, scope }) {
  if (!source || nativeId === undefined || nativeId === null || !revision || !digest || !scope?.contractId) throw new Error("source-link-incomplete");
  return { source, nativeId: String(nativeId), revision, digest, scope };
}
