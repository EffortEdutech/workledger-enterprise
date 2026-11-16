import { evaluateFinalGoLive, finalGoLiveInputs } from '../src/integration/finalGoLiveGate.mjs';

const evidence = Object.fromEntries(finalGoLiveInputs.map((key) => [key, 'HOLD']));
evidence['audit-cipaa-traceability'] = 'PASS';

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
