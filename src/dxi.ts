// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (text) positionals

import {
	$lodash,
	$path,
	mergeReadableStreams,
	readAll,
	readerFromStreamReader,
} from './lib/$deps.ts';
import {
	$version,
	abortIfMissingPermits,
	decoder,
	encoder,
	env,
	isWinOS,
	mightUseUnicode,
	projectLocations,
	projectPath,
	// mightUseColor,
	projectURL,
} from './lib/$shared.ts';

import { restyleYargsHelp } from './lib/restyleYargsHelp.ts';

import { $me } from './lib/$locals.ts';
import {
	$logger,
	logger as log, //* note: `log` (aka `logger`) is initialized to the suspended state */
} from './lib/$shared.ts';

import * as $spin from './lib/xWait/$mod.ts';

//===

import { $yargs, YargsArguments } from './lib/$deps.cli.ts';

//===

await abortIfMissingPermits(([] as Deno.PermissionName[]).concat(
	['env'], // required shim/process argument expansion and environmental controls (eg, using DEBUG, LOG_LEVEL, NO_COLOR, NO_UNICODE, NULLGLOB, ...)
	['read'], // required for shim targeting of argument expansion and 'yargs'
	['run'], // (optional) required for consoleSize fallback when stdin and stderr are both redirected
	// * script specific requirements
	['run'], // required to run `deno`
));

//===

log.debug(`logging to *STDERR*`);

// $me.warnIfImpaired((msg) => log.warn(msg)); // non-essential, so avoid for `dxi`; allows normal (non-warning) execution from installation via `deno install ...`
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
Install command script as an executable (with enhanced WinOS command line capabilities [via an enhancing shim]).\n
Usage:\n  ${runAsName} [OPTION..] [[--] [INSTALL_OPTION..]] COMMAND`)
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s), as listed here (below)' })
	.positional('INSTALL_OPTION', { describe: 'INSTALL_OPTION(s) delegated to `deno install ...`' })
	.positional('COMMAND', { describe: 'Path/URL of COMMAND to install' })
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
	.example(`\`${runAsName} "https://deno.land/std@0.134.0/examples/colors.ts"\``)
	.example(`\`${runAsName} --allow-net --allow-read "https://deno.land/std/http/file_server.ts"\``)
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
	console.warn(`\nUse \`${runAsName} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (argv.help) {
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
	await log.error(`COMMAND argument is required`);
	const yargsHelp = await app.getHelp();
	const usage = (await restyleYargsHelp(yargsHelp) as string).match(/\n(.*?usage.*?\n)\n/ims)?.[1];
	console.warn(`${usage}\nUse \`${runAsName} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//=== ***

// install (using `deno install`)
const spinnerInstallTextBase = 'Installing (using `deno install ...`) ...';
const spinnerForInstall = $spin
	.wait({
		text: spinnerInstallTextBase,
		spinner: 'dotsHigh3Dual',
		symbols: $spin.symbolStrings.emoji,
	})
	.start();
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ref: <https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultController>
// ref: <https://deno.land/std@0.128.0/streams/merge.ts>

// import { deferred } from 'https://deno.land/std@0.128.0/async/deferred.ts';
// /**
//  * Merge multiple streams into a single one, not taking order into account.
//  * If a stream ends before other ones, the other will continue adding data,
//  * and the finished one will not add any more data.
//  */
// export function mergeReadableStreams<T>(...streams: ReadableStream<T>[]): ReadableStream<T> {
// 	const resolvePromises = streams.map(() => deferred<void>());
// 	return new ReadableStream<T>({
// 		start(controller) {
// 			Promise.all(resolvePromises).then(() => {
// 				controller.close();
// 			});
// 			try {
// 				for (const [key, stream] of Object.entries(streams)) {
// 					(async () => {
// 						for await (const data of stream) controller.enqueue(data);
// 						resolvePromises[+key].resolve();
// 					})();
// 				}
// 			} catch (e) {
// 				controller.error(e);
// 			}
// 		},
// 	});
// }

// ref: <https://deno.land/std@0.128.0/streams/conversion.ts>

// import { Buffer } from 'https://deno.land/std@0.128.0/io/buffer.ts';
// /** Read Reader `r` until EOF (`null`) and resolve to the content as
//  * Uint8Array`.
//  *
//  * ```ts
//  * import { Buffer } from "../io/buffer.ts";
//  * import { readAll } from "./conversion.ts";
//  *
//  * // Example from stdin
//  * const stdinContent = await readAll(Deno.stdin);
//  *
//  * // Example from file
//  * const file = await Deno.open("my_file.txt", {read: true});
//  * const myFileContent = await readAll(file);
//  * Deno.close(file.rid);
//  *
//  * // Example from buffer
//  * const myData = new Uint8Array(100);
//  * // ... fill myData array with data
//  * const reader = new Buffer(myData.buffer);
//  * const bufferContent = await readAll(reader);
//  * ```
//  */
// export async function readAll(r: Deno.Reader): Promise<Uint8Array> {
// 	const buf = new Buffer();
// 	await buf.readFrom(r);
// 	return buf.bytes();
// }

// Track and remove `--quiet` and `-q` from delegatedArgs
// * `deno install...` non-quiet output is needed to determine the final shim location
// * a bug was introduced into deno v1.29.0+ which suppresses `deno install...` output when supplying `--quiet` to the installed script
// * ref: <https://github.com/denoland/deno/issues/19037>
let quietShim = false;
const filteredDelegatedArgs = delegatedArgs.flatMap((arg) => {
	if (arg === '--quiet' || arg === '-q') {
		quietShim = true;
		return [];
	}
	const matches = arg.match(/^-[^-].*/);
	if (matches) {
		// `arg` matches a combined short option
		const matches = arg.match(/q/);
		if (matches) {
			quietShim = true;
			arg = arg.replace('q', '');
		}
	}
	return [arg];
});

const denoArgs = ['install', ...filteredDelegatedArgs].filter(Boolean);

await log.trace({ quietShim, denoArgs, delegatedArgs, filteredDelegatedArgs });

const runOptions: Deno.RunOptions = {
	cmd: ['deno', ...denoArgs, ...args],
	stderr: 'piped',
	stdin: 'null',
	stdout: 'piped',
};
await log.debug({ runOptions });
// deno-lint-ignore no-deprecated-deno-api
const process = Deno.run(runOptions);
const mergedOutput = mergeReadableStreams(
	// readableStreamFromReader(process.stderr || { read: (_) => Promise.resolve(null) }),
	// readableStreamFromReader(process.stdout || { read: (_) => Promise.resolve(null) }),
	process.stderr?.readable || new ReadableStream(),
	process.stdout?.readable || new ReadableStream(),
);
const status = (await Promise.all([delay(1000), process.status()]))[1]; // add simultaneous delay to avoid visible spinner flash
const out =
	(await readAll(readerFromStreamReader(mergedOutput.getReader())).then((arr) =>
		decoder.decode(arr)
	))
		?.replace(/^(\S+)(?=\s+Success)/gmsu, $spin.symbolStrings.emoji.success);

if (status.success) {
	spinnerForInstall.succeed(spinnerInstallTextBase + ' done');
} else spinnerForInstall.fail(spinnerInstallTextBase + ' failed');

Deno.stdout.writeSync(encoder.encode(out));

const shimBinPath = (() => {
	const m = out.match(/^\s*(.*[.](?:bat|cmd))\s*$/mu);
	if (m) return m[1];
	return '';
})();

await log.trace({ status, process, out });
await log.debug({ shimBinPath });

if (shimBinPath === '') {
	await log.error('Could not find shim path');
	Deno.exit(1);
}

import { eol } from './lib/eol.ts';
import { cmdShimTemplate, shimInfo } from './lib/shim.windows.ts';

const enablePipe = true;

// enhance shim for successful installs on the Windows platform
if (status.success && isWinOS) {
	const contentsOriginal = eol.LF(decoder.decode(await Deno.readFile(shimBinPath)));
	const shimBinName = $path.parse(shimBinPath).name;
	const info = shimInfo(contentsOriginal);
	const { denoRunOptions, denoRunTarget } = info;
	const addQuietOption = quietShim && !denoRunOptions.match(/(^|\s|'|")--quiet("|'|\s|$)/);
	await log.trace({ info, denoRunOptions, denoRunTarget, shimBinName, addQuietOption });
	// const denoRunOptionsUpdated = denoRunOptions.
	const contentsUpdated = eol.CRLF(
		$lodash.template(cmdShimTemplate(enablePipe))({
			denoRunOptions: denoRunOptions
				.concat(addQuietOption ? ' "--quiet"' : '')
				.trim(),
			denoRunTarget,
			shimBinName,
		}),
	);
	Deno.writeFileSync(shimBinPath, encoder.encode(contentsUpdated));
	Deno.stdout.writeSync(
		encoder.encode(
			`${$spin.symbolStrings.emoji.success} Successfully enhanced installation of \`${shimBinName}\`\n`,
		),
	);
}

// done
Deno.exit(status.success ? 0 : status.code);
