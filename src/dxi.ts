// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (text) positionals

// ToDO: [2024-10-09; rivy] change from internal `xWait` spinner to `rivy/deno.progress` (or update xWait to similar capabilities)

import { Deprecated } from './lib/$deprecated.ts';
import {
	$colors,
	$lodash,
	$fs,
	$path,
	$semver,
	mergeReadableStreams,
	// readAll,
	// readerFromStreamReader,
	writeAllSync,
} from './lib/$deps.ts';
import {
	$version,
	abortIfMissingPermitsSync,
	decoder,
	encoder,
	env,
	formatDuration,
	isWinOS,
	mightUseUnicode,
	performanceDuration,
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

import { $yargs, type YargsArguments } from './lib/$deps.cli.ts';

//===

await abortIfMissingPermitsSync(
	([] as Deno.PermissionName[]).concat(
		['env'], // required shim/process argument expansion and environmental controls (eg, using DEBUG, LOG_LEVEL, NO_COLOR, NO_UNICODE, NULLGLOB, ...)
		['read'], // required for shim targeting of argument expansion and 'yargs'
		// ['run'], // (optional) required for consoleSize fallback when stdin and stderr are both redirected
		// * script specific requirements
		['run'], // required to run `deno`
	),
);

//===

const denoVersion = $semver.coerce(Deno.version.deno) ?? Deno.version.deno;

//===

log.debug('logging to *STDERR*');

// $me.warnIfImpaired((msg) => log.warn(msg)); // non-essential, so avoid for `dxi`; allows normal (non-warning) execution when used from installation via `deno install ...`
log.trace({ $me, $version });
log.trace('project', { url: projectURL?.href, projectPath, projectLocations });
log.trace('Deno', { execPath: Deno.execPath(), mainModule: Deno.mainModule, args: Deno.args });

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined);
log.debug(
	`(potential) log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

const appName = $me.name;
const appCopyright = '* Copyright (c) 2021-2024+ * Roy Ivy III (MIT license)';
const appVersion = $version.v();
const appRunAs = $me.runAs;

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
	.usage(`$0 ${appVersion}\n
Install COMMAND script as an executable (with enhanced WinOS command line capabilities [via an enhancing shim]).\n
Usage:\n  ${appRunAs} [OPTION..] [[--] [INSTALL_OPTION..]] COMMAND [COMMAND_ARGUMENT..]`)
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s), as listed here (below)' })
	.positional('INSTALL_OPTION', { describe: 'INSTALL_OPTION(s) delegated to `deno install ...`' })
	.positional('COMMAND', { describe: 'Path/URL of COMMAND to install' })
	.positional('COMMAND_ARGUMENT', { describe: 'COMMAND_ARGUMENT(s) for all executions of COMMAND' })
	// * (boilerplate)
	.scriptName(appName)
	.epilog(`${appCopyright}`)
	.wrap(/* columns */ undefined) // disable built-in Yargs display text wrapping (required for later custom formatting with `restyleYargsHelp()`)
	// * (boilerplate) revised terminology for errors/help text
	// ref: update string keys/names from <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	// .updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.updateStrings({
		'Unknown argument: %s': { one: 'Unknown option: %s', other: 'Unknown options: %s' },
	})
	// * (boilerplate) fail function
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		if (err) throw err;
		throw new Error(msg);
	})
	// * (boilerplate) help and version setup
	.help(false) // disable built-in 'help' (for later customization)
	.version(false) // disable built-in 'version' handling (for later customization)
	.option('help', {
		describe:
			'Display help text and exit (exit status => 1 if combined with other arguments/options)',
		type: 'boolean',
	})
	.alias('help', 'h')
	.option('version', {
		describe:
			'Display version text and exit (exit status => 1 if combined with other arguments/options)',
		type: 'boolean',
	})
	.alias('version', 'V')
	// * (boilerplate) logging options
	.option('log-level', {
		alias: ['\b\b\b\b LOG_LEVEL'], // fixme/hack: display option argument description (see <https://github.com/yargs/yargs/issues/833#issuecomment-982657645>)
		describe: 'Set logging level to LOG_LEVEL (overrides any prior setting)',
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
		'halt-at-non-option': true, // disable halting parse at first non-option/argument
		'unknown-options-as-args': true, // treat unknown options as arguments
		// * (boilerplate) usual parser options
		'camel-case-expansion': true, // enable camelCase aliases for hyphenated options (only within generated Yargs parse result object)
		'parse-numbers': false, // treat all arguments as strings (do not parse numbers)
		'parse-positional-numbers': false, // treat all arguments as strings (do not parse numbers)
		'strip-aliased': true, // remove option aliases from parse result object
		'strip-dashed': true, // remove hyphenated option aliases from parse result object
	})
	/* Options... */
	.strictOptions(/* enable */ false)
	/* Examples...*/
	.example(`\`${appRunAs} "https://deno.land/std@0.134.0/examples/colors.ts"\``)
	.example(`\`${appRunAs} --allow-net --allow-read "https://deno.land/std/http/file_server.ts"\``)
	.example([]);

//===

const bakedArgs = $me.args();

// 'halt-at-non-option: true' doesn't work when using 'unknown-options-as-args: true' => break up args into pre/post non-option sections
const endOfOptionsSignal = '--';
const idxFirstNonOption = ((arr) => {
	const idx = arr.findIndex((e) => e === endOfOptionsSignal || !e.startsWith('-'));
	return idx < 0 ? arr.length : idx;
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
		if (e instanceof Error) log.error(e.message);
		else log.error(`ERROR: Unknown error parsing arguments (${String(e)})`);
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
		argv?.silent ? 'error' : undefined,
		argv?.quiet ? 'warn' : undefined,
		argv?.verbose ? 'info' : undefined,
		argv?.debug ? 'debug' : undefined,
		argv?.trace ? 'trace' : undefined,
	].filter(Boolean);
	const logLevelFromArgv = (
		Array.isArray(argv?.logLevel)
			? (argv?.logLevel as string[])
			: [argv?.logLevel as string | undefined]
	).pop();
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

if (argv == null) {
	console.warn(`\nUse \`${appRunAs} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (argv.help) {
	const yargsHelp = await app.getHelp();
	const help = await restyleYargsHelp(yargsHelp);
	console.log(help);
	const onlyHelp =
		argv._.length === 0 &&
		Object.keys(argv).filter((s) => !['help', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyHelp ? 0 : 1);
}
if (argv.version) {
	console.log(`${appName} ${appVersion}`);
	const onlyVersion =
		argv._.length === 0 &&
		Object.keys(argv).filter((s) => !['version', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyVersion ? 0 : 1);
}

//=== ***

const allArgs = argv._.map(String);
const delegatedDenoArgs: string[] = [];
let idx = 0;
for (const arg of allArgs) {
	if (!arg.startsWith('-')) break;
	idx += 1;
	if (arg === endOfOptionsSignal) break;
	delegatedDenoArgs.push(arg);
}
const args = allArgs.slice(idx);

await log.trace({ allArgs, delegatedDenoArgs, args });

//===

if (args.length < 1) {
	await log.error('COMMAND argument is required');
	const yargsHelp = await app.getHelp();
	const usage = ((await restyleYargsHelp(yargsHelp)) as string).match(
		/\n(.*?usage.*?\n)\n/ims,
	)?.[1];
	console.warn(`${usage}\nUse \`${appRunAs} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//=== ***

// install (using `deno install`)

performance.mark('install.deno-install:start');

const spinnerInstallTextBase = '';
const spinnerForInstall = $spin
	.wait({
		color: 'blue',
		text: spinnerInstallTextBase,
		// spinner: 'line', // default == 'dots'
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
const filteredDelegatedDenoArgs = delegatedDenoArgs.flatMap((arg) => {
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

// determine if `--help` or `-h` is present in the delegatedArgs
const hasDenoHelpOption =
	filteredDelegatedDenoArgs.find((arg) => {
		if (arg === '--help' || arg === '-h') {
			return true;
		}
		const matches = arg.match(/^-[^-].*/);
		if (matches) {
			// `arg` matches a combined short option
			const matches = arg.match(/h/);
			if (matches) {
				return true;
			}
		}
		return false;
	}) != null;

// determine if `--global` or `-g` is present in the delegatedArgs
const hasDenoGlobalOption =
	filteredDelegatedDenoArgs.find((arg) => {
		if (arg === '--global' || arg === '-g') {
			return true;
		}
		const matches = arg.match(/^-[^-].*/);
		if (matches) {
			// `arg` matches a combined short option
			const matches = arg.match(/g/);
			if (matches) {
				return true;
			}
		}
		return false;
	}) != null;

// suppress deno behaviors change warning about `--global` option (for Deno v1.42.0+)
if (!hasDenoGlobalOption && $semver.satisfies(denoVersion, '>=1.42.0')) {
	const _ = filteredDelegatedDenoArgs.unshift('--global');
}

const denoArgs = ['install', ...filteredDelegatedDenoArgs].filter(Boolean);

await log.trace({
	quietShim,
	hasDenoHelpOption,
	denoArgs,
	delegatedDenoArgs,
	filteredDelegatedDenoArgs,
});

// # spell-checker:ignore () preinstall GOBIN swaggo jinyaoMa Dload Xferd
// # `pnpm` exemplar display output...
// . preinstall$ pnpm preinstall:air && pnpm preinstall:wails && pnpm preinstall:swag && pnpm preinstall:upx
// [4 lines collapsed]
// │ > my-app@1.0.0 preinstall:swag C:\Users\Roy\AARK\Projects\wails\jinyaoMa.personal-service-collection
// │ > cross-env GOBIN="%cd%\.tools" go install github.com/swaggo/swag/cmd/swag@latest
// │ > my-app@1.0.0 preinstall:upx C:\Users\Roy\AARK\Projects\wails\jinyaoMa.personal-service-collection
// │ > curl -L https://github.com/upx/upx/releases/download/v3.96/upx-3.96-win64.zip > upx.zip && unzip -p upx.zip "*/upx.e…
// │   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
// │                                  Dload  Upload   Total   Spent    Left  Speed
// │   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
// │   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
// │   2  457k    2 11015    0     0  12127      0  0:00:38 --:--:--  0:00:38 12127
// │ 100  457k  100  457k    0     0   475k      0 --:--:-- --:--:-- --:--:-- 8435k
// └─ Done in 9s

const runOptions: Deprecated.Deno.RunOptions = {
	cmd: ['deno', ...denoArgs, '--', ...args],
	stdin: 'null',
	stderr: 'piped',
	stdout: 'piped',
};
await log.debug({ runOptions });

const spinnerText = `$ ${runOptions.cmd.join(' ')}`;
spinnerForInstall.clear();
spinnerForInstall.text = spinnerText;
spinnerForInstall.render();

const process = Deprecated.Deno.run(runOptions);
const mergedOutput = mergeReadableStreams(
	process.stderr?.readable || new ReadableStream<Uint8Array>(),
	process.stdout?.readable || new ReadableStream<Uint8Array>(),
);
const outputReader = mergedOutput.getReader();

// const out = await readAll(readerFromStreamReader(outputReader)).then((arr) =>
// 	decoder.decode(arr)
// );
// ?.replace(/^(\S+)(?=\s+Success)/gmsu, $spin.symbolStrings.emoji.success);
// ?.replace(/^/gmsu, '| ')

let out = '';
const status = (
	await Promise.all([
		(() => process.status())().finally(() => {
			performance.mark('install.deno-install:end');
		}),
		(async () => {
			let buffer = '';
			while (true) {
				const { value, done } = await outputReader.read();
				if (done) break;
				buffer += decoder.decode(value as Uint8Array | undefined);
				let newlineIndex;
				while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
					const line = buffer.slice(0, newlineIndex);
					out += `${line}\n`;
					const s = line?.trimEnd().replace(/^/gmsu, '* ');
					spinnerForInstall.text = `${spinnerText}\n${s}\n`;
					spinnerForInstall.render();
					buffer = buffer.slice(newlineIndex + 1);
				}
			}
		})(),
		delay(200), // 200 ms minimum display time to avoid visible spinner flash
	])
)[0]; // await completion status with simultaneous output display

spinnerForInstall.stop();
const prefixChar = status.success ? $colors.green('.') : $colors.red('*');
writeAllSync(Deno.stdout, encoder.encode(`${prefixChar} ${spinnerText}\n`));

writeAllSync(Deno.stdout, encoder.encode(`${out?.trimEnd().replace(/^/gmsu, '│ ')}\n`));

const installDuration = performanceDuration('install.deno-install');

writeAllSync(
	Deno.stdout,
	encoder.encode(
		`└─ ${status.success ? $colors.green('Done') : $colors.red('Failed')}${
			installDuration ? ` in ${formatDuration(installDuration, { maximumFractionDigits: 3 })}` : ''
		}\n`,
	),
);
if (!status.success) await log.error('`deno install ...` failed');

performance.mark('install.enhance-shim:start');

const shimPath = (() => {
	// `deno install ...` output format (for Deno-v1 and Deno-v2):
	// ```shell
	// ...
	// Download ...
	// ...
	// ✅ Successfully installed <name>
	// <shimPath>
	// <WinOS-only: shShimPath>
	// <possible additional empty line(s)>
	// ```
	if (!status.success) return '';
	const anyNewline = /\r?\n|\r/;
	const outLines = out.split(anyNewline).filter(Boolean);
	return outLines.length > 2 ? outLines.slice(isWinOS ? -2 : -1)[0] : undefined;
})();

await log.trace({ status, process, out });
await log.trace({ count: out.split('\n').length, outTail30: out.split('\n').slice(-30) });
await log.debug({ shimPath });

if (status.success && hasDenoHelpOption) {
	Deno.exit(0);
}

if (status.success && !(shimPath && $fs.existsSync(shimPath))) {
	await log.error('Could not find shim path' + (shimPath ? ` ('${shimPath}')` : ''));
	Deno.exit(1);
}

import { eol } from './lib/eol.ts';
import { cmdShimTemplate, shimInfo } from './lib/shim.windows.ts';

const enablePipe = true;

// enhance shim for successful installs on the Windows platform
if (status.success && isWinOS && shimPath) {
	const contentsOriginal = eol.LF(decoder.decode(await Deno.readFile(shimPath)));
	const shimName = $path.parse(shimPath).name;
	const info = shimInfo(contentsOriginal);
	const { denoRunOptions, denoRunTarget, denoRunTargetArgs } = info;
	const addQuietOption = quietShim && !denoRunOptions?.match(/(^|\s|'|")--quiet("|'|\s|$)/);
	await log.trace({
		info,
		denoRunOptions,
		denoRunTarget,
		denoRunTargetArgs,
		shimName,
		addQuietOption,
	});
	const appNameVersion = `\`${$me.name}\` ${appVersion}`;
	const contentsUpdated = eol.CRLF(
		$lodash.template(cmdShimTemplate(enablePipe))({
			denoRunOptions: denoRunOptions?.concat(addQuietOption ? ' "--quiet"' : '').trim(),
			denoRunTarget,
			// remove leading '--' (only the first, quoted or not) from target args for compatibility with `deno install` functionality
			denoRunTargetArgs: denoRunTargetArgs?.replace(
				/^\s*(?:--|[\x22]--[\x22]|[\x27]--[\x27])\s*(.*)$/,
				'$1',
			),
			shimName,
			appNameVersion,
		}),
	);
	Deno.writeFileSync(shimPath, encoder.encode(contentsUpdated));
	performance.mark('install.enhance-shim:stop');
	const enhanceShimDuration = performanceDuration('install.enhance-shim');
	writeAllSync(
		Deno.stdout,
		encoder.encode(
			`${$spin.symbolStrings.emoji.success} Successfully enhanced installation of \`${shimName}\` (in ${
				enhanceShimDuration ? formatDuration(enhanceShimDuration) : 'unknown time'
			})
			\n`,
		),
	);
}

// done
Deno.exit(status.success ? 0 : status.code);
