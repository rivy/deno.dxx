import * as colors from 'https://deno.land/std@0.85.0/fmt/colors.ts';

import Yargs from 'https://deno.land/x/yargs@v17.0.1-deno/deno.ts';

import * as Me from '../src/lib/xProcess.ts';
import * as LogSymbols from '../src/lib/xWait/log_symbols.ts';

Me.warnIfImpaired((s) => console.warn(colors.yellow(`WARN/[${Me.name}]: ` + s))); // WARN if executing with impaired command line capability

const version = '0.0.1';
const runAsName = Me.runAs;

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = Yargs(undefined, undefined, undefined)
	.scriptName(Me.name)
	.usage(
		`$0 ${version}\n\nUsage:\n  ${runAsName} [options] [args]`,
		undefined,
		undefined,
		undefined,
	)
	// help and version setup
	.help(false, undefined)
	.version(false, undefined, undefined)
	.option('help', { describe: 'Show help', boolean: true })
	.alias('help', 'h')
	.option('version', { describe: 'Show version number', boolean: true })
	.alias('version', 'V')
	.showHelpOnFail(true, `Use \`${runAsName} --help\` to show available options`)
	// ref: <https://github.com/yargs/yargs-parser#configuration>
	.parserConfiguration({
		'camel-case-expansion': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'unknown-options-as-args': true,
	})
	.option('zero', { describe: 'Display $0 (executable)', boolean: true })
	.alias('zero', '0')
	.option('lines', { describe: 'Display arguments on separate lines', boolean: true })
	.alias('lines', 'l')
	.option('debug', { describe: 'Show debug logging', boolean: true });

const args = app.parse(Me.args(), undefined, undefined);

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (args.help) {
	console.log(await app.getHelp());
	Deno.exit(0);
}
if (args.version) {
	console.log(version);
	Deno.exit(0);
}

if (args.debug) {
	const symbol = LogSymbols.symbolStrings.emoji.debug;
	console.warn(symbol, Me.name, 'Deno:', { mainModule: Deno.mainModule, importMeta: import.meta });
	console.warn(symbol, Me.name, 'xProcess:', Me);
	console.warn(symbol, Me.name, { xProcessArgs: args._, DenoArgs: Deno.args });
}

if (args.zero) {
	console.log('$0 =', Me.shimArg0);
}

const output = (args._ as string[]).join(args.lines ? '\n' : ' ');
console.log(output);
