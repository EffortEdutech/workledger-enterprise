export const externalUatInputs = ["approved-test-identities", "approved-test-data", "source-read-receipts", "role-journeys", "audit-cipaa-review", "rollback-drill", "owner-uat-acceptance"];

export function evaluateExternalUatReadiness(evidence = {}) {
  const missing = externalUatInputs.filter((name) => evidence[name] !== "PASS");
  const unsafe = [];
  if (evidence["customer-data-authorized"] === "YES" && evidence["approved-test-data"] !== "PASS") unsafe.push("customer-data-without-approved-test-data");
  if (evidence["writes-enabled"] === "YES" && evidence["owner-uat-acceptance"] !== "PASS") unsafe.push("writes-without-owner-acceptance");
  return { decision: missing.length || unsafe.length ? "HOLD" : "READY_FOR_OWNER_DECISION", missing, unsafe, externalUsersAllowed: false, customerDataAllowed: false, writesAllowed: false };
}
