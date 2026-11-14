export const G8_WRITE_FLAG = "WORKLEDGER_ENTERPRISE_WRITES";

export function enterpriseWritesEnabled(environment = {}) {
  return environment[G8_WRITE_FLAG] === "true";
}

export function assertEnterpriseWriteEnabled(environment = {}) {
  if (!enterpriseWritesEnabled(environment)) {
    const error = new Error("Enterprise write workflows are disabled by default.");
    error.code = "ENTERPRISE_WRITES_DISABLED";
    error.status = 403;
    throw error;
  }
  return true;
}
