export const productionEvidenceRequirements = Object.freeze([
  'production-identity',
  'source-connectivity',
  'schema-migrations',
  'rls-policy-proof',
  'write-controls',
  'auth-security',
  'secrets-and-environments',
  'monitoring-and-rollback',
  'external-uat',
  'audit-cipaa-traceability',
  'owner-acceptance',
]);

export function evaluateEvidenceManifest(evidence = {}) {
  const missing = productionEvidenceRequirements.filter((key) => evidence[key] !== 'PASS');
  return {
    status: missing.length === 0 ? 'COMPLETE' : 'INCOMPLETE',
    missing,
    productionActivationAllowed: missing.length === 0,
  };
}
