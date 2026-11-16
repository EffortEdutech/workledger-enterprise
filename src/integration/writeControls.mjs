export const boundedWriteActions = new Set(["acknowledge-diary", "verify-evidence", "complete-review", "void-observation"]);

export function prepareBoundedWrite({ action, actor, appointment, scope, idempotencyKey, payload = {} }) {
  if (!boundedWriteActions.has(action)) throw new Error("WRITE_ACTION_NOT_ALLOWED");
  if (!actor?.userId || !actor?.role) throw new Error("WRITE_ACTOR_REQUIRED");
  if (!appointment?.active || appointment.userId !== actor.userId) throw new Error("WRITE_APPOINTMENT_INVALID");
  if (!scope?.organisationId || !scope?.projectId || !scope?.contractId) throw new Error("WRITE_SCOPE_REQUIRED");
  if (!idempotencyKey || !/^wle-[a-z0-9-]{8,}$/.test(idempotencyKey)) throw new Error("WRITE_IDEMPOTENCY_REQUIRED");
  return {
    eventType: `workledger.${action}`,
    actor: { userId: actor.userId, role: actor.role },
    appointmentId: appointment.id,
    scope: { organisationId: scope.organisationId, projectId: scope.projectId, contractId: scope.contractId },
    idempotencyKey,
    payload,
    appendOnly: true,
    sourceOfTruth: "workledger",
    enabled: false,
  };
}
