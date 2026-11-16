export const certifiedFixtureManifest = {
  fixtureId: "g35-northbank-source-shaped-v1",
  synthetic: true,
  organisationId: "org_syn_northbank",
  projectId: "project_syn_northbank",
  contractId: "contract_syn_nb042",
  appointmentId: "appointment_syn_project_director",
  sourceCutoff: "2026-11-14T12:00:00+08:00",
};

export const contractDiaryFixture = {
  source: "contract-diary",
  nativeContractId: "cd-contract-7f42",
  nativeDiaryId: "cd-diary-1112",
  diaryVersion: 1,
  state: "acknowledged",
  factsDigest: "sha256:synthetic-sha-diary1112",
  evidence: [{ nativeEvidenceId: "cd-evidence-8801", digest: "sha256:7adf10", custody: "original-reference-retained" }],
  scope: { organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractId: "contract_syn_nb042" },
};

export const qsFixture = {
  source: "qs-service",
  nativeProjectId: 1042,
  nativeProgrammeId: 77,
  nativeTaskId: 1071,
  nativeBoqItemId: 210,
  programmeRevision: "QS-PROG-v3",
  boqRevision: "BOQ-REV-02",
  manifestDigest: "sha256:synthetic-manifest-9f2a81",
  linkedContractId: "cd-contract-7f42",
  scope: { organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractId: "contract_syn_nb042" },
};

export function reconcileSourceFixtures(diary, qs) {
  const errors = [];
  if (diary.scope.contractId !== qs.scope.contractId) errors.push("contract-scope-mismatch");
  if (diary.nativeContractId !== qs.linkedContractId) errors.push("native-contract-link-mismatch");
  if (diary.state !== "acknowledged") errors.push("diary-not-acknowledged");
  if (!diary.factsDigest || !qs.manifestDigest) errors.push("digest-missing");
  if (!diary.evidence.some((item) => item.digest === "sha256:7adf10")) errors.push("evidence-digest-mismatch");
  const evidenceIds = diary.evidence.map((item) => item.nativeEvidenceId);
  if (new Set(evidenceIds).size !== evidenceIds.length) errors.push("duplicate-evidence-native-id");
  return { ok: errors.length === 0, errors, fixtureId: certifiedFixtureManifest.fixtureId };
}

export function assertCertifiedFixture(manifest = certifiedFixtureManifest) {
  if (!manifest.synthetic) throw new Error("fixture-must-be-synthetic");
  if (!manifest.organisationId || !manifest.projectId || !manifest.contractId || !manifest.appointmentId) throw new Error("fixture-scope-incomplete");
  return manifest;
}
