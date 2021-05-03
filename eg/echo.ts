import * as Log from 'https://deno.land/std@0.93.0/log/mod.ts';

import * as Me from '../src/lib/xProcess.ts';

const isWinOS = Deno.build.os === 'windows';

if (isWinOS && !Me.arg0) {
	Log.warning(
		'diminished capacity; full command line processing requires an enhanced runner (use `dxr` or install with `dxi`)',
	);
}

console.log(Me.args().join(' '));
