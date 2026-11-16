export const operationsInputs = ["production-secret-store", "preview-production-separation", "monitoring-alerts", "rollback-deployment", "database-backup", "incident-runbook"];

export function evaluateOperationsReadiness(evidence = {}) {
  const missing = operationsInputs.filter((name) => evidence[name] !== "PASS");
  const unsafe = [];
  if (evidence["service-role-client-exposure"] === "YES") unsafe.push("service-role-client-exposure");
  if (evidence["production-writes-default"] !== "DISABLED") unsafe.push("production-writes-not-disabled");
  if (evidence["rollback-tested"] !== "YES") unsafe.push("rollback-not-tested");
  return { decision: missing.length || unsafe.length ? "HOLD" : "READY_FOR_OWNER_REVIEW", missing, unsafe, customerDataAllowed: false, externalUsersAllowed: false };
}
