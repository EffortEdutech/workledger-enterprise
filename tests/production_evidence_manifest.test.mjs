import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateEvidenceManifest,
  productionEvidenceRequirements,
} from '../src/integration/evidenceManifest.mjs';

test('current synthetic evidence cannot complete the production manifest', () => {
  const result = evaluateEvidenceManifest({
    'audit-cipaa-traceability': 'PASS',
  });
  assert.equal(result.status, 'INCOMPLETE');
  assert.equal(result.productionActivationAllowed, false);
  assert.equal(result.missing.length, productionEvidenceRequirements.length - 1);
});

test('production activation is allowed only when every required evidence item passes', () => {
  const evidence = Object.fromEntries(productionEvidenceRequirements.map((key) => [key, 'PASS']));
  assert.deepEqual(evaluateEvidenceManifest(evidence), {
    status: 'COMPLETE',
    missing: [],
    productionActivationAllowed: true,
  });
});
