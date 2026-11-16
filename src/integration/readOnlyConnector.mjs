const ALLOWED_SOURCES = new Set(["contract-diary", "qs-service"]);

export class ConnectivityError extends Error {
  constructor(code, message) { super(message); this.name = "ConnectivityError"; this.code = code; }
}

function assertScope(scope) {
  if (!scope?.organisationId || !scope?.projectId || !scope?.contractId || !scope?.appointmentId) throw new ConnectivityError("SCOPE_INCOMPLETE", "Synthetic appointment scope is incomplete.");
}

export async function readOnlySourceRequest({ source, resource, token, scope, transport, timeoutMs = 1000 }) {
  if (!ALLOWED_SOURCES.has(source)) throw new ConnectivityError("SOURCE_UNAPPROVED", "Source is not approved for the controlled pilot.");
  if (!token?.startsWith("synthetic:")) throw new ConnectivityError("AUTH_REQUIRED", "Only synthetic pilot credentials are accepted.");
  assertScope(scope);
  if (!resource || resource.includes("..")) throw new ConnectivityError("RESOURCE_INVALID", "Resource path is invalid.");
  if (typeof transport !== "function") throw new ConnectivityError("TRANSPORT_MISSING", "Read-only transport is not configured.");
  const response = await Promise.race([
    Promise.resolve().then(() => transport({ method: "GET", source, resource, token, scope })),
    new Promise((_, reject) => setTimeout(() => reject(new ConnectivityError("TIMEOUT", "Source read timed out.")), timeoutMs)),
  ]).catch((error) => {
    if (error instanceof ConnectivityError) throw error;
    throw new ConnectivityError("UNAVAILABLE", "Source read was unavailable.");
  });
  if (!response || response.status !== 200) throw new ConnectivityError(response?.status === 403 ? "SCOPE_DENIED" : "UNAVAILABLE", "Source read was not accepted.");
  return { mode: "read-only", writesEnabled: false, source, resource, scope, data: response.data };
}
