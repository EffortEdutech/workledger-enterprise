export const auditFixtures = {
  notices: [{ id: "NT-019", type: "notice", subject: "Temporary access arrangement", state: "acknowledged", issuedOn: "2026-11-10", responseDue: "2026-11-15" }],
  actions: [{ id: "AI-019", type: "instruction", subject: "Temporary access arrangement", state: "response-due", sourceVersion: "DOC-019-v2" }, { id: "SUB-044", type: "submission", subject: "Revised method statement", state: "acknowledged", sourceVersion: "DOC-044-v3" }],
  documents: [{ id: "DOC-019", version: 2, state: "current", supersedes: "DOC-019-v1", digest: "sha256:doc019v2" }, { id: "DOC-019", version: 1, state: "superseded", supersededBy: "DOC-019-v2", digest: "sha256:doc019v1" }],
  evidence: [{ id: "EVD-8801", sourceId: "D-2026-1112", digest: "sha256:7adf10", custodyState: "verified", accessScope: "appointment", accessedBy: ["user-project-director", "user-independent-reviewer"] }],
  events: [{ id: "EV-214", type: "observation-verified", actor: "independent-reviewer", occurredAt: "2026-11-14T09:20:00+08:00" }, { id: "EV-209", type: "diary-acknowledged", actor: "contract-diary", occurredAt: "2026-11-12T18:10:00+08:00" }]
};

export function readAuditPackage(options = {}) {
  if (options.restricted) return { state: "restricted", reason: "appointment-scope-required", items: [] };
  const items = [...auditFixtures.notices, ...auditFixtures.actions, ...auditFixtures.documents, ...auditFixtures.evidence, ...auditFixtures.events];
  return { state: "ready", asOf: "2026-11-14T12:00:00+08:00", itemCount: items.length, items, sourceEventsThrough: "EV-214" };
}

export function classifyAuditRecord(record) {
  if (record.supersedes || record.supersededBy) return "superseded";
  if (record.responseDue && record.responseDue < "2026-11-14" && record.state !== "acknowledged") return "late";
  if (record.correctionOf) return "corrected";
  return record.state || "unclassified";
}

export function isDuplicateRecord(record, records) {
  return records.some((item) => item.id === record.id && item.digest && item.digest === record.digest);
}
