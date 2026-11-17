import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSyntheticSyncReceipt, readFieldDiaryDraft, saveFieldDiaryDraft } from '../ui/app/fieldDiary.js';

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('field diary draft persists locally with synthetic read-only markers', () => {
  const storage = memoryStorage();
  const saved = saveFieldDiaryDraft({ date: '2026-11-17', activities: 'Pile cap inspection' }, storage);
  assert.equal(saved.synthetic, true);
  assert.equal(saved.readOnly, true);
  assert.equal(readFieldDiaryDraft(storage).activities, 'Pile cap inspection');
});

test('synthetic sync receipt preserves scope and audit/CIPAA lineage without enabling writes', () => {
  const receipt = buildSyntheticSyncReceipt({ date: '2026-11-17', activities: 'Pile cap inspection', photoCount: 2 });
  assert.equal(receipt.state, 'pending-sync');
  assert.equal(receipt.evidenceCount, 2);
  assert.equal(receipt.provenance.cipaaTraceable, true);
  assert.equal(receipt.writesEnabled, false);
});

test('synthetic sync receipt rejects incomplete or invalid operational input', () => {
  assert.throws(() => buildSyntheticSyncReceipt({ date: '2026-11-17', activities: '' }), /diary-required-fields/);
  assert.throws(() => buildSyntheticSyncReceipt({ date: '2026-11-17', activities: 'Pour', manpower: '12.5' }), /diary-invalid-manpower/);
});
