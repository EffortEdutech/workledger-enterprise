import { fixtureContext, fixtureTasks } from "./fixtures.js";
import { assertReadEnvelope, createReadEnvelope } from "./source-contracts.js";

export const READ_MODE = "read-only";

export class AdapterError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "AdapterError";
    this.code = code;
    this.details = details;
  }
}

function envelope(data, source, options = {}) {
  return assertReadEnvelope(createReadEnvelope(data, source, options));
}

function outcome(options = {}) {
  if (options.forbidden) throw new AdapterError("FORBIDDEN", "Appointment does not permit this read.");
  if (options.missing) throw new AdapterError("MISSING", "Requested source record was not found.");
  if (options.error) throw new AdapterError("UNAVAILABLE", "Read-only source is unavailable.");
  return options;
}

export function readProjectContext(options = {}) {
  outcome(options);
  return envelope({ ...fixtureContext.organisation, project: fixtureContext.project, contract: fixtureContext.contract, appointment: fixtureContext.appointment }, "workledger.project-context");
}

export function readProgramme(options = {}) {
  outcome(options);
  return envelope({ baseline: { id: "baseline_syn_v3", version: "v3", status: "accepted", manifest: "sha256:synthetic-manifest-9f2a81" }, tasks: fixtureTasks }, "qs.accepted-baseline", { freshness: options.stale ? "stale" : "current" });
}

export function readBoqProvenance(options = {}) {
  outcome(options);
  return envelope({ revision: "BOQ-REV-02", digest: "sha256:synthetic-boq-02", lines: [{ id: "B-210", description: "Reinforced concrete — pile cap", unit: "m³", quantity: 240, taskId: "QS-1071" }] }, "qs.boq-revision");
}

export function readDiaryEvidence(options = {}) {
  outcome(options);
  return envelope({ diary: { id: "D-2026-1112", version: 1, state: "acknowledged", digest: "sha256:synthetic-sha-diary1112" }, evidence: [{ id: "EVD-8801", state: "verified", digest: "sha256:7adf10", custody: "Contract Diary" }] }, "contract-diary.evidence", { partial: options.partial });
}

export function readContractChronology(options = {}) {
  outcome(options);
  return envelope({ events: [{ id: "EV-214", type: "observation-verified", actor: "independent-reviewer", occurredAt: "2026-11-14T09:20:00+08:00" }, { id: "EV-209", type: "diary-acknowledged", actor: "contract-diary", occurredAt: "2026-11-12T18:10:00+08:00" }] }, "contract-diary.audit-events");
}

export function readReconciliation(options = {}) {
  outcome(options);
  const drift = options.drift === "revision" ? [{ code: "qs-revision-drift", severity: "high", state: "stale" }] : options.drift === "scope" ? [{ code: "contract-scope-mismatch", severity: "high", state: "blocked" }] : [];
  return envelope({ state: drift.length ? "blocked" : "reconciled", projectId: fixtureContext.project.id, contractId: fixtureContext.contract.id, sources: ["contract-diary.evidence", "qs.accepted-baseline", "qs.boq-revision"], drift, provenance: { diary: "D-2026-1112 · sha256:synthetic-sha-diary1112", programme: "QS-PROG-v3 · sha256:synthetic-manifest-9f2a81", boq: "BOQ-REV-02 · sha256:synthetic-boq-02" } }, "workledger.reconciliation", { freshness: drift.length ? "stale" : "current" });
}

export const readAdapters = { readProjectContext, readProgramme, readBoqProvenance, readDiaryEvidence, readContractChronology, readReconciliation };
