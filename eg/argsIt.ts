import * as Log from 'https://deno.land/std@0.134.0/log/mod.ts';

import * as xArgs from '../src/lib/xArgs.ts';
import * as Me from '../src/lib/xProcess.ts';

Me.warnIfImpaired((s) => Log.warning(`[${Me.name}]: ` + s)); // WARN if executing with impaired command line capability

console.log(Me.name, 'xProcess:', Me);

const argsText = Me.shim.scriptArgs?.join(' ') ?? '';
const args = Me.args();

const argIts = [];
for await (const argInc of xArgs.argsIt(argsText)) {
	// console.log({ argInc });
	argIts.push(argInc);
}

console.log(Me.name, { argsText, args, argIts, vsDeno: Deno.args });
