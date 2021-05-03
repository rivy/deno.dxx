// ref: <https://github.com/c4spar/deno-cliffy>

import { Command } from 'https://deno.land/x/cliffy@v0.18.2/command/mod.ts';
import { parseFlags } from 'https://deno.land/x/cliffy@v0.18.2/flags/mod.ts';

import * as Me from '../src/lib/xProcess.ts';

const parseResult = parseFlags(Me.args());
console.log({ parseResult });

await new Command()
	// .stopEarly() // <-- enable stop early
	.name(Me.arg0 || Me.name)
	.option('-d, --debug-level <level:string>', 'Debug level.')
	// .option('-~ --~', 'command line expansion stop signal', { hidden: true })
	.option('-+ --+', 'command line expansion stop signal', { hidden: true })
	.arguments('[script:string] [...args:string]')
	// deno-lint-ignore no-explicit-any
	.action((options: any, script: string, args: string[]) => {
		console.log('options:', options);
		console.log('script:', script);
		console.log('args:', args);
	})
	.parse(Me.args());
