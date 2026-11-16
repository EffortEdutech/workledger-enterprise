import { readFile } from 'node:fs/promises';
import { evaluateFinalGoLive, finalGoLiveInputs } from '../src/integration/finalGoLiveGate.mjs';

const evidence = Object.fromEntries(finalGoLiveInputs.map((key) => [key, 'HOLD']));
evidence['audit-cipaa-traceability'] = 'PASS';

const evidencePath = process.argv[2];
if (evidencePath) {
  Object.assign(evidence, JSON.parse(await readFile(evidencePath, 'utf8')));
}

const result = evaluateFinalGoLive(evidence);
console.log(JSON.stringify({
  decision: result.decision,
  missing: result.missing,
  productionAccessAllowed: result.productionAccessAllowed,
  customerDataAllowed: result.customerDataAllowed,
  externalUsersAllowed: result.externalUsersAllowed,
  writesAllowed: result.writesAllowed,
}, null, 2));

if (result.decision !== 'GO') process.exitCode = 1;
