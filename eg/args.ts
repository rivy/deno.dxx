import * as Log from 'https://deno.land/std@0.93.0/log/mod.ts';

import * as Me from '../src/lib/xProcess.ts';

const isWinOS = Deno.build.os === 'windows';

if (isWinOS && !Me.enhanced) {
	Log.warning(
		'diminished capacity; full command line processing requires an enhanced runner (use `dxr` or install with `dxi`)',
	);
}

console.log(Me.name, 'Deno:', { mainModule: Deno.mainModule, importMeta: import.meta });
console.log(Me.name, 'xProcess:', Me);

const argsText = Me.argsText;
const args = Me.args();

console.log(Me.name, { argsText, args, vsDeno: Deno.args });
