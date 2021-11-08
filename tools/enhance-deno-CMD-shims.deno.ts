// files: in Deno install root 'bin' directory
// pattern: `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
// regex: /^@deno[.]exe\s+\x22run\x22\s+(\x22.*\x22)\s+(\x22[^\x22]*\x22)\s+%*.*$/m

// `deno run --allow-... PROG`

// spell-checker:ignore (abbrev/names) Deno Packt SkyPack
// spell-checker:ignore (env) LOGLEVEL
// spell-checker:ignore (jargon) globstar positionals templating
// spell-checker:ignore (libraries) rambda
// spell-checker:ignore (people) Frederico Kereki
// spell-checker:ignore (shell/cmd) COMSPEC ERRORLEVEL PATHEXT

import OSPaths from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';

import { $colors, $fs, $lodash as _, $path, $xdgAppPaths, $xWalk, $yargs } from './lib/$deps.ts';
import { $consoleSize, $me, $version, decoder, encoder } from './lib/$shared.ts';

import { $logger, logger } from './lib/$shared.ts';

import { eol as $eol } from '../src/lib/eol.ts';
import { collect, filter, map } from './lib/funk.ts';

//===

const log = logger;
log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((s) => log.warn(s));
log.trace({ $me });
log.trace({ args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

const version = $version.v();
const runAsName = $me.runAs;

// logger.mergeMetadata({ authority: $me.name });

const haveDenoEnvPermission = Deno.permissions.query({ name: 'env' });
if (!haveDenoEnvPermission) {
	log.warn(
		`diminished capacity; full function requires environment permissions (try \`${$me.runAs} --allow-env ...\` )`,
	);
}

async function envGet(varName: string) {
	try {
		return Deno.env.get(varName);
	} catch (_) {
		await log.debug(`Unable to retrieve '${varName}' from environment.`);
		return undefined;
	}
}

const logLevelFromEnv = $logger.logLevelFromEnv() ??
	((await envGet('DEBUG')) ? 'debug' : undefined) ??
	undefined;
await log.debug(
	`log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

log.mergeMetadata({
	// Humane: { showLabel: true, showSymbol: false },
	// Humane: { showLabel: false, showSymbol: 'ascii' },
	// Humane: { showLabel: false, showSymbol: 'unicodeDoubleWidth' },
	// Humane: { showLabel: true, showSymbol: 'unicodeDoubleWidth' },
	Humane: {
		showLabel: true,
		showSymbol: 'unicodeDoubleWidth',
		// note: `labelFormatFn` should assume `s` is a unicode string (with possible surrogate pairs, not simple UTF-16 characters) and may contain ANSI escape codes
		labelFormatFn: (s: string) => ($colors.inverse(s.slice(0, -1))),
	},
	// Humane: {
	// 	showLabel: false,
	// 	showSymbol: 'unicodeDoubleWidth',
	// 	labelFormatFn: (s: string) =>
	// 		$colors.bgBrightMagenta($colors.yellow($colors.stripColor(s))) + ' ',
	// },
});

log.trace({ $xdgAppPaths, state: $xdgAppPaths.state() });

const logPath = $path.join($xdgAppPaths.state({ isolated: true }), 'log');
if (!$fs.existsSync(logPath)) {
	Deno.mkdirSync(logPath, { recursive: true });
	log.debug(`log path ('${logPath}') created.`);
}

const logUnfilteredFileName = 'logUnfiltered.txt';
const logUnfilteredFilePath = $path.join(logPath, logUnfilteredFileName);
const logUnfilteredFile = await Deno.open(logUnfilteredFilePath, { append: true, create: true });
const logUnfiltered = new $logger.Logger().into(logUnfilteredFile);
log.previewInto(logUnfiltered);
log.debug(`logging pre-transform inputs to '${logUnfilteredFilePath}'`);

const logFileName = 'log.txt';
const logFilePath = $path.join(logPath, logFileName);
const logFile = await Deno.open(logFilePath, { append: true, create: true });
log.into(logFile);
log.debug(`logging to '${logFilePath}'`);

// await log.resume();

//===

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(undefined, undefined, undefined)
	.scriptName($me.name)
	.usage(`$0 ${version}\n\nUsage:\n  ${runAsName} [OPTIONS..]`, undefined, undefined, undefined)
	.wrap(Math
		.min(
			(await $consoleSize.consoleSize())
				?.columns ?? 80,
			100,
		))
	// help and version setup
	.help(false)
	.version(false)
	.option('help', { describe: 'Show help and exit (with exit status = 1)', boolean: true })
	.alias('help', 'h')
	.option('version', {
		describe: 'Show version number and exit (with exit status = 1)',
		boolean: true,
	})
	.alias('version', 'V')
	.showHelpOnFail(true, `Use \`${runAsName} --help\` to show available options`)
	// logging options
	.option('quiet', {
		describe: "Quiet mode; suppress informational messages, showing 'warn' level logging",
		boolean: true,
	})
	.option('silent', {
		describe: "Silent mode; suppress non-error messages, showing 'error' level logging",
		boolean: true,
	})
	.option('verbose', { describe: "Show 'info' level logging", boolean: true })
	.option('debug', { describe: "Show 'debug' level logging", boolean: true })
	.option('trace', {
		describe: "Show 'trace' (lower-level/higher-detail debug) level logging",
		boolean: true,
	})
	// ref: <https://github.com/yargs/yargs-parser#configuration>
	.parserConfiguration({
		'camel-case-expansion': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'unknown-options-as-args': true,
	})
	.updateStrings({ 'Positionals:': 'Arguments:' })
	// .positional('COMMAND', { describe: 'Path/URL of command to install' })
	.positional('OPTIONS', {
		// describe: ... (eg, 'options (as listed; may also include any `deno install` options)'),
	})
	.group([], 'Options:')
	.group(['quiet', 'silent', 'verbose', 'debug', 'trace'], 'Logging:')
	.group(['help', 'version'], 'Info/Help:')
	.option('force', { describe: 'Force update', boolean: true, group: 'Options:' })
	.option('pipe', {
		describe: 'Enable piping of ENV/CWD from script up to shim',
		boolean: true,
		default: true,
		group: 'Options:',
	});

const args = app.parse($me.args(), undefined, undefined);

await logger.debug({ args });

const possibleLogLevels = ((defaultLevel = 'note') => {
	const levels = [
		logLevelFromEnv,
		(args.quiet as boolean) ? 'warn' : undefined,
		(args.silent as boolean) ? 'error' : undefined,
		(args.verbose as boolean) ? 'info' : undefined,
		(args.debug as boolean) ? 'debug' : undefined,
		(args.trace as boolean) ? 'trace' : undefined,
	]
		.filter(Boolean);
	return (levels.length > 0 ? levels : [defaultLevel])
		.map((s) => log.logLevelDetail(s)?.levelNumber)
		.filter(Boolean)
		.sort()
		.reverse()
		.map((n) => log.logLevelDetail(n)?.levelName);
})();
const logLevel = possibleLogLevels.length > 0 ? possibleLogLevels[0] : Infinity;

log.debug({ possibleLogLevels, logLevel });

log.mergeMetadata({ Filter: { level: logLevel } });
await log.debug(`log level set to '${logLevel}'`);

await logger.resume();

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (args.help) {
	console.log(await app.getHelp());
	Deno.exit(1);
}
if (args.version) {
	console.log(version);
	Deno.exit(1);
}

//===

const enablePipe = args.pipe as boolean;
const forceUpdate = args.force as boolean;

//===

// templating engines ~ <https://colorlib.com/wp/top-templating-engines-for-javascript> @@ <https://archive.is/BKYMw>

// lodash
// ref: <https://github.com/denoland/deno/issues/3957>
// ref: <https://ada.is/blog/2020/08/03/using-node-modules-in-deno> @@ <https://archive.is/5xbLy>
// ref: <https://stackoverflow.com/questions/64979829/deno-import-lodash-from-deno-land-x>
//
// import { ld as _ } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts';
// import _ from 'https://cdn.skypack.dev/lodash-es?dts';
// import * as _ from 'https://cdn.pika.dev/lodash-es@4.17.15';
// import * as _ from 'https://deno.land/x/lodash@4.17.15-es/';
// // * [skypack "pinned" URLs](https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized)
// import * as _ from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/min/lodash.js';
// import * as _ from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';

const isWinOS = Deno.build.os === 'windows';
// const pathSeparator = isWinOS ? /[\\/]/ : /\//;
// const pathListSeparator = isWinOS ? /;/ : /:/;
// const paths = Deno.env.get('PATH')?.split(pathListSeparator) || [];
// const pathExtensions = (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [];
const pathCaseSensitive = !isWinOS;

function joinFullyDefinedPaths(...paths: (string | undefined)[]): string | undefined {
	if (paths.find((v) => typeof v === 'undefined')) {
		return void 0;
	}
	return $path.join(...(paths as string[])); // noSonar // false positive ("assertion not necessary"); ref: <https://github.com/SonarSource/SonarJS/issues/1961>
}

const denoInstallRoot = joinFullyDefinedPaths(
	Deno.env.get('DENO_INSTALL_ROOT') ?? joinFullyDefinedPaths(OSPaths.home(), '.deno'),
	'bin',
);

if (denoInstallRoot && $fs.existsSync(denoInstallRoot)) {
	await log.info(`\`deno\` binaries folder found at ${denoInstallRoot}`);
} else {
	await log.error('`deno` binaries folder not found');
	Deno.exit(1);
}

// ref: [deno issue ~ add `caseSensitive` option to `expandGlob`](https://github.com/denoland/deno/issues/9208)
// ref: [deno/std ~ `expandGlob` discussion](https://github.com/denoland/deno/issues/1856)

function disableWinGlobEscape(s: string) {
	// * disable '`' escape character (by escaping all occurrences)
	const winGlobEscapeChar = '`';
	return s.replace(winGlobEscapeChar, winGlobEscapeChar + winGlobEscapeChar);
}

const cmdGlob = '*.cmd';
// configure regex (`[\\/]` as path separators, no escape characters (use character sets (`[..]`)instead) )
const re = new RegExp(
	// $path.globToRegExp(cmdGlob, { extended: true, globstar: true, os: 'windows' }),
	$path
		.globToRegExp(disableWinGlobEscape(cmdGlob), { extended: true, globstar: true, os: 'windows' })
		.source
		.replace(
			// * remove leading "anchor"
			/^[^]/,
			'',
		),
	// * configure case sensitivity
	pathCaseSensitive ? void 0 : 'i',
);

// const identity = <T>(x: T) => x;

const res = [re];
const fileEntries = await collect(filter(
	// 	// (walkEntry) => walkEntry.path !== denoInstallRoot,
	() => true,
	$xWalk.walkSync(denoInstallRoot + '/.', {
		maxDepth: 1,
		match: res,
		// skip: [/[.]/],
	}),
));
// console.log({
// 	denoInstallRoot,
// 	res,
// 	fileEntries,
// });

// // deno-lint-ignore no-explicit-any
// function isString(x: any): x is string {
// 	return typeof x === 'string';
// }

// const isEmpty = <T>(x: T) => typeof x === 'undefined' || x === null || (isString(x) && x === '');

import { cmdShimTemplate, shimInfo } from '../src/lib/shim.windows.ts';

const updates = await collect(map(async function (fileEntry) {
	const shimPath = fileEntry.path;
	const contentsOriginal = $eol.LF(decoder.decode(await Deno.readFile(shimPath)));
	const shimBinName = $path.parse(shimPath).name;
	const info = shimInfo(contentsOriginal);
	const { denoRunOptions, denoRunTarget } = info;
	const contentsUpdated = $eol.CRLF(
		_.template(cmdShimTemplate(enablePipe))({ denoRunOptions, denoRunTarget, shimBinName }),
	);
	return { shimPath, ...info, contentsOriginal, contentsUpdated };
}, fileEntries));

for await (const update of updates) {
	await log.trace({ update });
	const name = $path.basename(update.shimPath);
	if (!update.isEnhanced || forceUpdate) {
		Deno.stdout.writeSync(encoder.encode(`'${name}'...`));
		Deno.writeFile(update.shimPath, encoder.encode(update.contentsUpdated));
		Deno.stdout.writeSync(encoder.encode($colors.green('updated') + '\n'));
	} else if (update.isEnhanced) {
		Deno.stdout.writeSync(encoder.encode(`'${name}'...${$colors.blue('up-to-date')}\n`));
	}
}
