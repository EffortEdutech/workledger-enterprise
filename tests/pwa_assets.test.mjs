import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('field diary PWA assets declare an installable offline shell', async () => {
  const manifest = JSON.parse(await readFile(new URL('../ui/app/manifest.webmanifest', import.meta.url), 'utf8'));
  const worker = await readFile(new URL('../ui/app/sw.js', import.meta.url), 'utf8');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, './index.html#diary');
  assert.match(worker, /caches\.open/);
  assert.match(worker, /skipWaiting/);
  assert.match(worker, /catch\(\(\) => caches\.match\('\.\/index\.html'\)\)/);
});

test('field diary capture exposes required fields and demo-only boundaries', async () => {
  const app = await readFile(new URL('../ui/app/app.js', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../ui/app/styles.css', import.meta.url), 'utf8');
  assert.match(app, /name="weather"/);
  assert.match(app, /name="manpower"/);
  assert.match(app, /name="activities"/);
  assert.match(app, /name="observations"/);
  assert.match(app, /accept="image\/\*"/);
  assert.match(app, /controlled adapter is enabled/);
  assert.match(app, /synthetic only/);
  assert.match(styles, /@media\(max-width:720px\)/);
  assert.match(styles, /@media\(max-width:440px\)/);
  assert.match(styles, /field-diary-form/);
});
