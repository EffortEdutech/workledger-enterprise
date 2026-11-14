import { navItems, roles } from "./fixtures.js";

export class AuthorizationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "AuthorizationError";
    this.code = code;
  }
}

export const identities = {
  "user-project-director": { id: "user-project-director", roleId: "project-director", organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractIds: ["contract_syn_nb042"], status: "active" },
  "user-site-supervisor": { id: "user-site-supervisor", roleId: "site-supervisor", organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractIds: ["contract_syn_nb042"], status: "active" },
  "user-sibling-contract": { id: "user-sibling-contract", roleId: "project-director", organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractIds: ["contract_syn_sibling"], status: "active" },
  "user-outsider": { id: "user-outsider", roleId: "project-director", organisationId: "org_other", projectId: "project_other", contractIds: ["contract_other"], status: "active" },
  "user-revoked": { id: "user-revoked", roleId: "project-director", organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractIds: ["contract_syn_nb042"], status: "revoked" }
};

for (const role of roles) {
  const id = `user-preview-${role.id}`;
  if (!identities[id]) identities[id] = { id, roleId: role.id, organisationId: "org_syn_northbank", projectId: "project_syn_northbank", contractIds: ["contract_syn_nb042"], status: "active" };
}

export function resolveAppointment(identityId = "user-project-director") {
  const identity = identities[identityId];
  if (!identity) throw new AuthorizationError("IDENTITY_NOT_FOUND", "Authenticated identity was not found.");
  if (identity.status !== "active") throw new AuthorizationError("REVOKED", "Appointment is revoked.");
  const role = roles.find((item) => item.id === identity.roleId);
  if (!role) throw new AuthorizationError("ROLE_NOT_FOUND", "Appointment role is not configured.");
  return { identity, role, appointment: { status: "active", organisationId: identity.organisationId, projectId: identity.projectId, contractIds: identity.contractIds, capabilities: role.capabilities } };
}

export function authorizeRead(identityId, routeId, scope = {}) {
  const session = resolveAppointment(identityId);
  const route = navItems.find((item) => item.id === routeId);
  if (!route || !session.role.capabilities.includes(route.capability)) throw new AuthorizationError("FORBIDDEN", "Appointment does not permit this view.");
  if (scope.organisationId && scope.organisationId !== session.appointment.organisationId) throw new AuthorizationError("OUT_OF_SCOPE", "Organisation scope does not match appointment.");
  if (scope.projectId && scope.projectId !== session.appointment.projectId) throw new AuthorizationError("OUT_OF_SCOPE", "Project scope does not match appointment.");
  if (scope.contractId && !session.appointment.contractIds.includes(scope.contractId)) throw new AuthorizationError("OUT_OF_SCOPE", "Contract scope does not match appointment.");
  return session;
}

export function visibleNavigation(identityId) {
  const session = resolveAppointment(identityId);
  return navItems.filter((item) => session.role.capabilities.includes(item.capability));
}
