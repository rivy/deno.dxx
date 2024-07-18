// ref: <https://github.com/c4spar/deno-cliffy>

import { Command } from 'https://deno.land/x/cliffy@v0.23.0/command/mod.ts'; // *pin*; cliffy@v0.23.0 == last version to use std@0.134.0 (or lower)
import { parseFlags } from 'https://deno.land/x/cliffy@v0.23.0/flags/mod.ts'; // *pin*; cliffy@v0.23.0 == last version to use std@0.134.0 (or lower)

import * as Me from '../src/lib/xProcess.ts';

Me.warnIfImpaired();

const parseResult = parseFlags(Me.args());
console.log({ parseResult });

await new Command()
	// .stopEarly() // <-- enable stop early
	.name(Me.name ?? import.meta.url)
	.option('-d, --debug-level <level:string>', 'Debug level.')
	// .option('-~ --~', 'command line expansion stop signal', { hidden: true })
	.option('-+ --+', 'command line expansion stop signal', { hidden: true })
	.arguments('[script:string] [...args:string]')
	.action((options: unknown, script?: string, args?: string[]) => {
		console.log('options:', options);
		console.log('script:', script);
		console.log('args:', args);
	})
	.parse(Me.args());
