// spell-checker:ignore (jargon) positionals

import { $yargs, YargsArguments } from '../src/lib/$deps.cli.ts';

//===

const appName = 'appName';
const appCopyright = '* Copyright (c) 2021-2022 * Roy Ivy III (MIT license)';
const appVersion = '0.0.0';
const appRunAs = 'deno run -A APP_NAME';

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	// * usage, description, and epilog (ie, notes/copyright)
	.usage(`$0 ${appVersion}\n
Display all arguments.\n
Usage:\n  ${appRunAs} [OPTION..] [ARG..]`)
	.updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.positional('OPTION', { describe: 'OPTION(s); see listed *Options*' })
	.positional('ARG', { describe: `ARG(s) to display ('shell'-expanded)` })
	.epilog(`${appCopyright}`)
	// * (boilerplate)
	.scriptName(appName)
	.wrap(/* columns */ null) // disable built-in Yargs display text wrapping (required for later custom formatting with `restyleYargsHelp()`)
	// * (boilerplate) revised terminology for errors/help text
	// ref: update string keys/names from <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	// .updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.updateStrings({
		'Unknown argument: %s': { 'one': 'Unknown option: %s', 'other': 'Unknown options: %s' },
	})
	// * (boilerplate) fail function
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		if (err) throw err;
		console.warn(msg);
		// appUsageError = true;
	})
	// * (boilerplate) help and version setup
	.help(false) // disable built-in 'help' (for later customization)
	.version(false) // disable built-in 'version' handling (for later customization)
	.option('help', {
		describe:
			'Write help text to STDOUT and exit (exit status => 1 if combined with other arguments/options)',
		type: 'boolean',
	})
	.alias('help', 'h')
	.option('version', {
		describe:
			'Write version text to STDOUT and exit (exit status => 1 if combined with other arguments/options)',
		type: 'boolean',
	})
	.alias('version', 'V')
	// * (boilerplate) logging options
	.option('log-level', {
		alias: ['\b\b\b\b LOG_LEVEL'], // fixme/hack: display option argument description (see <https://github.com/yargs/yargs/issues/833#issuecomment-982657645>)
		describe: `Set logging level to LOG_LEVEL (overrides any prior setting)`,
		type: 'string',
		choices: ['error', 'warning', 'warn', 'note', 'info', 'debug', 'trace'], // required for help display of choices
	})
	.choices('logLevel', ['error', 'warning', 'warn', 'note', 'info', 'debug', 'trace']) // fixme/hack: required for correct error handling of incorrect choices by Yargs
	.option('silent', {
		describe: `Silent mode; suppress non-error output (sets 'error' level logging)`,
		type: 'boolean',
	})
	.option('quiet', {
		describe: `Quiet mode; suppress informational output (sets 'warn' level logging)`,
		type: 'boolean',
	})
	.option('verbose', {
		describe: `Verbose mode; display verbose output (sets 'info' level logging)`,
		type: 'boolean',
	})
	.option('debug', { describe: `Set 'debug' level logging`, type: 'boolean' })
	.option('trace', { describe: `Set 'trace' (high-detail 'debug') level logging`, type: 'boolean' })
	// * (boilerplate) configure Options, Logging, and Help/Info groups
	.group([], 'Options:')
	.group(['log-level', 'silent', 'quiet', 'verbose', 'debug', 'trace'], '*Logging:')
	.group(['help', 'version'], '*Help/Info:')
	// * Yargs parser configuration
	// ref: [Yargs Parser ~ Configuration](https://github.com/yargs/yargs-parser#configuration)
	.parserConfiguration({
		// * per app configuration options
		'boolean-negation': false, // disable automatic interpretation of `--no-...` as option negations (required when configuring options which are *only* `--no-...`)
		'halt-at-non-option': false, // disable halting parse at first non-option/argument
		// 'unknown-options-as-args': true, // treat unknown options as arguments
		// * (boilerplate) usual parser options
		'camel-case-expansion': true, // enable camelCase aliases for hyphenated options (only within generated Yargs parse result object)
		'strip-aliased': true, // remove option aliases from parse result object
		'strip-dashed': true, // remove hyphenated option aliases from parse result object
	})
	/* Options... */
	.strictOptions(/* enable */ true)
	.option('zero', { describe: 'Display $0 (executable)', boolean: true })
	.alias('zero', ['0', 'z'])
	.option('lines', { describe: 'Display arguments on separate lines', boolean: true })
	.alias('lines', 'l')
	/* Examples...*/
	.example([]);

//===

const argv = (() => {
	try {
		return app.parse(Deno.args) as YargsArguments;
	} catch (e) {
		console.warn(e.message);
		return;
	}
})();

//===

if (argv == undefined) {
	console.warn(`\nUse \`${appRunAs} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (argv.help) {
	const yargsHelp = await app.getHelp();
	console.log(yargsHelp);
	// const help = await restyleYargsHelp(yargsHelp, { consoleWidth: consoleSize?.columns ?? 80 });
	// console.log(help);
	const onlyHelp = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['help', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyHelp ? 0 : 1);
}
if (argv.version) {
	console.log(`${appName} ${appVersion}`);
	const onlyVersion = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['version', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyVersion ? 0 : 1);
}

//===

console.log({ argv });
