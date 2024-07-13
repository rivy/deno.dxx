import {
	logger as log /* note: `log` (aka `logger`) is initialized to the suspended state */,
} from '../src/lib/$shared.ts';

import * as $me from '../src/lib/xProcess.ts';

$me.warnIfImpaired((s) => log.warn(s));
await log.resume();

console.log($me.args().join(' '));
