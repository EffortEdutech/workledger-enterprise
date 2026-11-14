import test from "node:test";
import assert from "node:assert/strict";
import { AuthorizationError, authorizeRead, resolveAppointment, visibleNavigation } from "../ui/app/authorization.js";

test("active appointment resolves trusted identity and capabilities", () => {
  const session = resolveAppointment("user-project-director");
  assert.equal(session.identity.id, "user-project-director");
  assert.ok(session.appointment.capabilities.includes("read:projects"));
});

test("navigation is capability-aware", () => {
  const routes = visibleNavigation("user-site-supervisor").map((item) => item.id);
  assert.deepEqual(routes, ["home", "diary", "progress"]);
});

test("read-only role cannot access a write-only capability route", () => {
  assert.throws(() => authorizeRead("user-project-director", "diary"), { code: "FORBIDDEN" });
});

test("cross-tenant and sibling-contract scopes are denied", () => {
  assert.throws(() => authorizeRead("user-outsider", "home", { organisationId: "org_syn_northbank" }), { code: "OUT_OF_SCOPE" });
  assert.throws(() => authorizeRead("user-sibling-contract", "contract", { contractId: "contract_syn_nb042" }), { code: "OUT_OF_SCOPE" });
});

test("revoked appointment is denied before route access", () => {
  assert.throws(() => resolveAppointment("user-revoked"), (error) => error instanceof AuthorizationError && error.code === "REVOKED");
});
