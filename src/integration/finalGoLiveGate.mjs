import { productionEvidenceRequirements } from './evidenceManifest.mjs';

export const finalGoLiveInputs = productionEvidenceRequirements;

export function evaluateFinalGoLive(evidence = {}) {
  const missing = finalGoLiveInputs.filter((name) => evidence[name] !== "PASS");
  const decision = missing.length === 0 ? "GO" : "HOLD";
  return {
    decision,
    missing,
    productionAccessAllowed: decision === "GO",
    customerDataAllowed: decision === "GO",
    externalUsersAllowed: decision === "GO",
    writesAllowed: decision === "GO",
  };
}
