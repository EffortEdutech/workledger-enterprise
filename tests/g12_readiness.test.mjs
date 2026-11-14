import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const env = await readFile(new URL("../.env.example", import.meta.url), "utf8");
const readiness = await readFile(new URL("../docs/G12_INFRASTRUCTURE_STAGING_READINESS.md", import.meta.url), "utf8");
const release = await readFile(new URL("../docs/G11_RELEASE_EVIDENCE_REGISTER.md", import.meta.url), "utf8");

test("G12 local environment is non-production and writes are disabled", () => {
  assert.match(env, /WLE_LOCAL_PORT=5100/);
  assert.match(env, /WLE_ENVIRONMENT=local-fixture/);
  assert.match(env, /WLE_ENTERPRISE_WRITES=false/);
  assert.match(env, /SUPABASE_ANON_KEY=\s*$/m);
});

test("G12 readiness retains staging safety controls and evidence requirements", () => {
  for (const phrase of ["No production or customer data", "RLS", "rollback", "Pilot", "GO/NO-GO"]) assert.match(readiness, new RegExp(phrase, "i"));
  assert.match(release, /NO-GO \/ HOLD/);
});
