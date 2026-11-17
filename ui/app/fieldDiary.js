const STORAGE_KEY = "wle-field-diary-draft";

export function readFieldDiaryDraft(storage = localStorage) {
  try { return JSON.parse(storage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

export function saveFieldDiaryDraft(draft, storage = localStorage) {
  const next = { ...draft, synthetic: true, readOnly: true, updatedAt: new Date().toISOString() };
  storage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function buildSyntheticSyncReceipt(draft) {
  if (!draft || !draft.date || !String(draft.activities || "").trim()) throw new Error("diary-required-fields");
  if (draft.manpower !== "" && draft.manpower != null && (!/^\d+$/.test(String(draft.manpower)) || Number(draft.manpower) < 0)) throw new Error("diary-invalid-manpower");
  return {
    receiptId: `local-diary-${draft.date}`,
    state: "pending-sync",
    sourceSystem: "field-diary-pwa",
    projectId: "project_syn_nb",
    contractId: "contract_syn_nb042",
    appointmentScope: "org_syn_001/project_syn_nb/contract_syn_nb042",
    diaryDate: draft.date,
    evidenceCount: Number(draft.photoCount || 0),
    provenance: { mode: "synthetic", custody: "local-device", auditReady: true, cipaaTraceable: true },
    writesEnabled: false,
  };
}
