import * as Log from 'https://deno.land/std@0.93.0/log/mod.ts';

import * as Me from '../src/lib/xProcess.ts';

Me.warnIfImpaired(Log.warning);

console.log(Me.args().join(' '));
