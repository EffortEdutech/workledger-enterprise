export const finalGoLiveInputs = [
  "production-identity",
  "source-connectivity",
  "schema-migrations",
  "rls-policy-proof",
  "write-controls",
  "auth-security",
  "secrets-and-environments",
  "monitoring-and-rollback",
  "external-uat",
  "audit-cipaa-traceability",
  "owner-acceptance",
];

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
