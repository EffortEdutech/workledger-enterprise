export const mandatoryProductionGates = [
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

export function evaluateProductionGate(evidence = {}) {
  const missing = mandatoryProductionGates.filter((gate) => evidence[gate] !== "PASS");
  return {
    decision: missing.length === 0 ? "GO" : "HOLD",
    missing,
    customerDataAllowed: false,
    externalUsersAllowed: false,
    writesAllowed: false,
    productionAccessAllowed: false,
  };
}
