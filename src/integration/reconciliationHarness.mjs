import { assertCertifiedFixture, certifiedFixtureManifest, contractDiaryFixture, qsFixture, reconcileSourceFixtures } from "./sourceFixtures.mjs";

export function buildReconciledReadModel(diary = contractDiaryFixture, qs = qsFixture, options = {}) {
  assertCertifiedFixture(certifiedFixtureManifest);
  const drift = [];
  const pair = reconcileSourceFixtures(diary, qs);
  for (const error of pair.errors) drift.push({ code: error, severity: "high", state: "blocked" });
  if (options.diaryRevision && options.diaryRevision !== diary.diaryVersion) drift.push({ code: "diary-revision-drift", severity: "high", state: "stale" });
  if (options.qsRevision && options.qsRevision !== qs.programmeRevision) drift.push({ code: "qs-revision-drift", severity: "high", state: "stale" });
  if (options.expectedManifestDigest && options.expectedManifestDigest !== qs.manifestDigest) drift.push({ code: "manifest-digest-drift", severity: "high", state: "blocked" });
  const sourceState = diary.state === "acknowledged" && pair.ok ? "reconciled" : "blocked";
  return {
    mode: "read-only",
    synthetic: true,
    sourceState,
    scope: diary.scope,
    project: { id: diary.scope.projectId, qsNativeId: String(qs.nativeProjectId) },
    contract: { id: diary.scope.contractId, diaryNativeId: diary.nativeContractId, qsLinkedId: qs.linkedContractId },
    programme: { revision: qs.programmeRevision, taskNativeId: String(qs.nativeTaskId), state: sourceState },
    boq: { revision: qs.boqRevision, itemNativeId: String(qs.nativeBoqItemId), state: sourceState },
    evidence: diary.evidence.map((item) => ({ nativeId: item.nativeEvidenceId, digest: item.digest, custody: item.custody })),
    drift,
    report: { ok: sourceState === "reconciled" && drift.length === 0, errors: drift.map((item) => item.code) },
  };
}
