// spell-checker:ignore (names) Deno ; (vars) ARGF ARGX LOGLEVEL SIGBREAK SIGINT PATHEXT arr gmsu ; (yargs) nargs positionals

//===

// configure signal handlers
// * setup early to catch/handle signals during initialization

// refs
// * <https://stackoverflow.com/questions/62332153/deno-callback-on-exit>
// * <https://deno.land/manual/examples/os_signals> @@ <https://archive.is/Ak1jc>
// * <https://denolib.gitbook.io/guide/advanced/process-lifecycle> @@ <https://archive.is/8jDN6>
// * [Clean up on `Deno.exit(...)`](https://github.com/denoland/deno/issues/3603)
// * [Deno ~ OS Signals](https://deno.land/manual/examples/os_signals)
// * [Deno ~ Program Lifecycle](https://deno.land/manual/runtime/program_lifecycle)
// * [MDN ~ Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)

import * as $semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';
const isWinOS = Deno.build.os === 'windows';

try {
	const s: Deno.Signal[] = (isWinOS && ($semver
			.satisfies(Deno.version.deno, '>=1.23.0'))
		? ['SIGBREAK'] as unknown as Deno.Signal[]
		: [])
		.concat(['SIGINT']);
	// console.log('Listen for %s signals', JSON.stringify(s));
	s.forEach((signalType) =>
		Deno.addSignalListener(signalType, () => {
			// handle (ie, ignore) signals (target process will handle all signals)
		})
	);
} catch (_e) {
	// console.log('Caught exception...', { _e });
}

//===

import { Deprecated } from './lib/$deprecated.ts';
import { $path } from './lib/$deps.ts';
import {
	$version,
	abortIfMissingPermitsSync,
	env,
	intoURL,
	// mightUseColor,
	mightUseUnicode,
	projectLocations,
	projectPath,
	projectURL,
} from './lib/$shared.ts';

import { restyleYargsHelp } from './lib/restyleYargsHelp.ts';

import { $me } from './lib/$locals.ts';
import {
	$logger,
	logger as log, //* note: `log` (aka `logger`) is initialized to the suspended state */
} from './lib/$shared.ts';

import * as $args from './lib/xArgs.ts';

//===

import { $yargs, YargsArguments } from './lib/$deps.cli.ts';

//===

await abortIfMissingPermitsSync(([] as Deno.PermissionName[]).concat(
	['env'], // required shim/process argument expansion and environmental controls (eg, using DEBUG, LOG_LEVEL, NO_COLOR, NO_UNICODE, NULLGLOB, ...)
	['read'], // required for shim targeting of argument expansion and 'yargs'
	['run'], // (optional) required for consoleSize fallback when stdin and stderr are both redirected
	// * script specific requirements
	['run'], // required to run `deno` (to execute the target SCRIPT)
));

//===

log.debug(`logging to *STDERR*`);

// $me.warnIfImpaired((msg) => log.warn(msg)); // WARN if executing with impaired command line capability
log.trace({ $me, $version });
log.trace('project', { url: projectURL?.href, projectPath, projectLocations });
log.trace('Deno', { execPath: Deno.execPath(), mainModule: Deno.mainModule, args: Deno.args });

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined);
log.debug(
	`(potential) log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

const version = $version.v();
const runAsName = $me.runAs;

// const useColor = mightUseColor();
const useUnicode = mightUseUnicode();

log.mergeMetadata({
	authority: $me.name,
	Humane: {
		showLabel: true,
		showSymbol: useUnicode ? 'unicodeDoubleWidth' : false,
		// note: `prefixFormatFn` should assume `s` is a unicode string (with possible surrogate pairs, not simple UTF-16 characters) and may contain ANSI escape codes
		// prefixFormatFn: (s: string) => ($colors.inverse(s.replace(/:$/, ''))),
	},
});

//===

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	.scriptName($me.name)
	.epilog('* Copyright (c) 2021-2022 * Roy Ivy III (MIT license)')
	.usage(`$0 ${version}\n
Run a JavaScript or TypeScript program (with enhanced WinOS command line capabilities).\n
Usage:\n  ${runAsName} [OPTION..] [[--] [RUN_OPTION..]] [--] SCRIPT [SCRIPT_ARG..]`)
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s) as listed here (below)' })
	.positional('RUN_OPTION', {
		describe: 'RUN_OPTION(s) delegated to `deno run ...` (when missing, defaults to `-A --quiet`)',
	})
	.positional('SCRIPT', {
		describe: '(Deno-compatible JS/TS) SCRIPT to execute (with optional SCRIPT_ARG arguments)',
	})
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		if (err) throw err;
		throw new Error(msg);
	})
	.wrap(/* columns */ undefined)
	// help and version setup
	.help(false)
	.version(false)
	.option('help', {
		describe: 'Write help text to STDOUT and exit (with exit status = 1)',
		type: 'boolean',
	})
	.alias('help', 'h')
	.option('version', {
		describe: 'Write version number to STDOUT and exit (with exit status = 1)',
		type: 'boolean',
	})
	.alias('version', 'V')
	// logging options
	.option('log-level', {
		alias: ['\b\b\b\b LOG_LEVEL'], // *hack* use backspaces to fake an option argument description (ref: <https://github.com/yargs/yargs/issues/833>)
		choices: ['error', 'warning', 'warn', 'notice', 'info', 'debug', 'trace'],
		describe: `Set logging level to LOG_LEVEL (overrides any prior setting)`,
		type: 'string',
	})
	.option('silent', {
		describe: `Silent mode; suppress non-error messages (sets 'error' level logging)`,
		type: 'boolean',
	})
	.option('quiet', {
		describe: `Quiet mode; suppress informational messages (sets 'warn' level logging)`,
		type: 'boolean',
	})
	.option('verbose', { describe: `Set 'info' level logging`, type: 'boolean' })
	.option('debug', { describe: `Set 'debug' level logging`, type: 'boolean' })
	.option('trace', { describe: `Set 'trace' (high-detail 'debug') level logging`, type: 'boolean' })
	.group([], 'Options:')
	.group(['log-level', 'silent', 'quiet', 'verbose', 'debug', 'trace'], '*Logging:')
	.group(['help', 'version'], '*Help/Info:')
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({
		'Unknown argument: %s': { 'one': 'Unknown option: %s', 'other': 'Unknown options: %s' },
	})
	// ref: <https://github.com/yargs/yargs-parser#configuration>
	.parserConfiguration({
		'camel-case-expansion': true,
		'short-option-groups': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'halt-at-non-option': true,
		'unknown-options-as-args': true,
	})
	/* Options... */
	.strictOptions(/* enable */ false);

//===

const bakedArgs = $me.args();

// 'halt-at-non-option: true' doesn't work when using 'unknown-options-as-args: true' => break up args into pre/post non-option sections
const endOfOptionsSignal = '--';
const idxFirstNonOption = ((arr) => {
	const idx = arr.findIndex((e) => e === endOfOptionsSignal || !e.startsWith('-'));
	return (idx < 0) ? arr.length : idx;
})(bakedArgs);
const usesEndOfOptions = bakedArgs[idxFirstNonOption] === endOfOptionsSignal;

log.trace({ idxFirstNonOption, usesEndOfOptions });

const optionArgs = bakedArgs.slice(0, idxFirstNonOption);
const nonOptionArgs = bakedArgs.slice(idxFirstNonOption + (usesEndOfOptions ? 1 : 0));

log.trace({ optionArgs, nonOptionArgs });

const argv = (() => {
	try {
		return app.parse(optionArgs) as YargsArguments;
	} catch (e) {
		log.error(e.message);
		return;
	}
})();
if (argv && Array.isArray(argv._)) {
	argv._.push(...nonOptionArgs);
}

log.trace({ bakedArgs, argv });

const possibleLogLevels = ((defaultLevel = 'notice') => {
	const levels = [
		logLevelFromEnv,
		(argv?.silent) ? 'error' : undefined,
		(argv?.quiet) ? 'warn' : undefined,
		(argv?.verbose) ? 'info' : undefined,
		(argv?.debug) ? 'debug' : undefined,
		(argv?.trace) ? 'trace' : undefined,
	]
		.filter(Boolean);
	const logLevelFromArgv =
		(Array.isArray(argv?.logLevel)
			? argv?.logLevel as string[]
			: [argv?.logLevel as string | undefined])
			.pop();
	log.trace({ logLevelFromEnv, levels, logLevelFromArgv });
	return [log.logLevelDetail(logLevelFromArgv)?.levelName]
		.concat(
			(levels.length > 0 ? levels : [defaultLevel])
				.map((s) => log.logLevelDetail(s)?.levelNumber)
				.filter(Boolean)
				.sort()
				.reverse()
				.map((n) => log.logLevelDetail(n)?.levelName),
		)
		.filter(Boolean);
})();
const logLevel = possibleLogLevels.length > 0 ? possibleLogLevels[0] : Infinity;

log.trace({ possibleLogLevels });

log.mergeMetadata({ Filter: { level: logLevel } });
log.debug(`log level set to '${logLevel}'`);

await log.resume();

//===

if (argv == undefined) {
	// $me.warnIfImpaired((msg) => log.warn(msg)); // WARN if executing with impaired command line capability
	console.warn(`\nUse \`${runAsName} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (argv.help) {
	// $me.warnIfImpaired((msg) => log.warn(msg)); // WARN if executing with impaired command line capability
	const yargsHelp = await app.getHelp();
	const help = await restyleYargsHelp(yargsHelp);
	console.log(help);
	Deno.exit(1);
}
if (argv.version) {
	console.log(version);
	Deno.exit(1);
}

//=== ***

const allArgs = argv._.map(String);
const delegatedArgs: string[] = [];
let idx = 0;
for (const arg of allArgs) {
	if (!arg.startsWith('-')) break;
	idx += 1;
	if (arg === endOfOptionsSignal) break;
	delegatedArgs.push(arg);
}
const args = allArgs.slice(idx);

await log.trace({ delegatedArgs, args });

//===

if (args.length < 1) {
	await log.error(`SCRIPT argument is required`);
	const yargsHelp = await app.getHelp();
	const usage = (await restyleYargsHelp(yargsHelp) as string).match(/\n(.*?usage.*?\n)\n/ims)?.[1];
	console.warn(`${usage}\nUse \`${runAsName} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//=== ***

const targetPath = (args.shift() || '').replace(/^-/, `.${$path.SEP}-`);
const targetArgs = args;

const targetURL = intoURL(targetPath)?.href;
await log.debug({ CWD: Deno.cwd(), targetPath, targetURL, argv });

// !NOTE: maximum command line or environment variable length is likely less than 8192 characters; see ref: <https://superuser.com/questions/1070272/why-does-windows-have-a-limit-on-environment-variables-at-all/1070354#1070354>
// FixME: fail gracefully (with warning?) if expanded command line is longer than a <max_length>
// !NOTE: more recent info suggests that the maximum environment space is now 64MiB!
// .. ref: [Total available space for environment vars](https://www.dostips.com/forum/viewtopic.php?t=6962) @@ <https://archive.is/G2MLG>
// .. ref: [Why does SET performance degrade as environment sie grows?](https://www.dostips.com/forum/viewtopic.php?f=3&t=2597) @@ <https://archive.is/wip/TfZPE>
// .. test this with a large environment variable (set and test size via Deno.env)
// .. additionally, is there a limit on the size of the command line?
const max_shim_args_size = 16 * 1024 * 1024; // heuristic max environment use for SHIM_ARGS (use 16MiB; max env space ~64MiB [ref: <https://devblogs.microsoft.com/oldnewthing/20100203-00/?p=15083> @@ <https://archive.is/dMe0P>])
// FixME: fall back to unexpanded args for TARGET?
// ... instead output large SHIM_ARGS to a temporary file (path in SHIM_ARGF==Deno.makeTempFile({prefix: 'SHIM_ARGS-', suffix: '.txt'})) and use SHIM_ARGF as a transport mechanism
// ... and SHIM_ARGS == undefined
// ... remove SHIM_ARGF file upon consumption (if possible, warn if not? or ignore?)
// ... spell-checker:ignore () SHIM_ARGF

const shimOptions: string[] = [];
if (delegatedArgs.length < 1) {
	delegatedArgs.push('-A', '--quiet');
} else shimOptions.push(...[usesEndOfOptions ? '--' : ''], /* .filter(Boolean) */ ...delegatedArgs);
const denoArgs = ['run', ...delegatedArgs] /* .filter(Boolean) */;
const SHIM_ARGS = targetArgs.map($args.reQuote).join(' ');
if (SHIM_ARGS.length > max_shim_args_size) {
	await log.error(
		'Command line expansion is too large (transport via SHIM_ARGS has limited space [max 8kiB]; install target with `dxi ...` and run directly for unlimited argument expansion space',
	);
	Deno.exit(1);
}
const runOptions: Deno.RunOptions = {
	// note: `Deno.run` automatically quotes any `cmd` elements which contain spaces
	cmd: ['deno', ...denoArgs, targetPath, ...targetArgs],
	stderr: 'inherit',
	stdin: 'inherit',
	stdout: 'inherit',
	env: {
		SHIM_ARG0: `${$me.runAs} ${
			[...shimOptions, targetPath]
				// .filter(Boolean)
				.map((e) => e && $args.reQuote(e))
				.join(' ')
		}`,
		SHIM_ARGS,
		SHIM_TARGET: targetURL ?? '',
	},
};
await log.trace({ runOptions });
const process = Deprecated.Deno.run(runOptions); // FixME: catch any panics
const status = await process.status();
Deno.exit(status.success ? 0 : status.code);
// }
