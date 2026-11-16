export const requiredIntegrationInputs = [
  "CONTRACT_DIARY_READ_BASE_URL",
  "QS_SERVICE_READ_BASE_URL",
  "WLE_READ_CLIENT_ID",
  "WLE_READ_CLIENT_SECRET",
  "WLE_READ_SCOPE",
  "WLE_ROLLBACK_REFERENCE",
];

export function evaluateIntegrationReadiness(config = {}) {
  const missing = requiredIntegrationInputs.filter((name) => !config[name]);
  const unsafe = [];
  if (config.WLE_ENTERPRISE_WRITES === true) unsafe.push("writes-enabled");
  if (config.WLE_ENVIRONMENT === "production") unsafe.push("production-environment");
  if (config.WLE_DATA_MODE !== "synthetic-read-only") unsafe.push("data-mode-not-synthetic-read-only");
  return { status: missing.length || unsafe.length ? "HOLD" : "READY_FOR_OWNER_REVIEW", missing, unsafe, networkAccess: false, customerDataAccess: false, writesEnabled: false };
}
