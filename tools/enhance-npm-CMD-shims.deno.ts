// files: in `which npm.cmd` directory
// pattern: "%_prog%"  "%dp0%\node_modules\rollup\dist\bin\rollup" %*
// regex: "^\s*\x22%_prog%\x22\s+(\x22%dp0%[\\/]node_modules[\\/][^\x22]+\x22)"

// `deno run --allow-... PROG`

// spell-checker:ignore (abbrev/names) Cygwin Deno MSYS Packt SkyPack
// spell-checker:ignore (env) LOGLEVEL
// spell-checker:ignore (jargon) positionals templating
// spell-checker:ignore (libraries) rambda
// spell-checker:ignore (names/people) Frederico Kereki ; Roy Ivy III * rivy

import { $colors, $fs, $lodash as _, $path, $xdgAppPaths, $yargs } from './lib/$deps.ts';
import { $me, $version, decoder, encoder } from './lib/$shared.ts';

import { $logger, logger } from './lib/$shared.ts';

import { eol as $eol } from '../src/lib/eol.ts';
import { restyleYargsHelp } from '../src/lib/restyleYargsHelp.ts';
import { collect, first, map } from './lib/funk.ts';

//===

const log = logger;
log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((s) => log.warn(s));
log.trace({ $me });
log.trace('Deno:', { args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

const version = $version.v();
const runAsName = $me.runAs;

// logger.mergeMetadata({ authority: $me.name });

const haveDenoEnvPermission = Deno.permissions.query({ name: 'env' });
if (!haveDenoEnvPermission) {
	log.warn(
		`diminished capacity; full function requires environment permissions (try \`${$me.runAs} --allow-env ...\` )`,
	);
}

async function env(varName: string) {
	try {
		return Deno.env.get(varName);
	} catch (_) {
		await log.debug(`Unable to retrieve '${varName}' from environment.`);
		return undefined;
	}
}

const logLevelFromEnv = $logger.logLevelFromEnv() ??
	((await env('DEBUG')) ? 'debug' : undefined) ??
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
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	.scriptName($me.name)
	.epilog('* Copyright (c) 2021-2022 * Roy Ivy III (MIT license)')
	.usage(`$0 ${version}\n\nUsage:\n  ${runAsName} [OPTION..]`)
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s) as listed here (below)' })
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
		// 'halt-at-non-option': true,
		// 'unknown-options-as-args': true,
	})
	// .example(`\`${runAsName} FILE\``, 'Format FILE')
	/* Options... */
	.strictOptions(/* enable */ true);

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
	const yargsHelp = await app.getHelp();
	const help = await restyleYargsHelp(yargsHelp);
	console.log(help);
	Deno.exit(1);
}
if (args.version) {
	console.log(version);
	Deno.exit(1);
}

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

const cmdShimTemplate = `@rem:: \`<%=targetBinName%>\` (*enhanced* \`npm\` CMD shim)
@setLocal
@echo off
goto :_START_

@rem:: spell-checker:ignore (shell/CMD) COMSPEC PATHEXT ; (bin) <%=targetBinName%>

:set_real_dp0
@rem:: ref: "https://stackoverflow.com/questions/19781569/cmd-failure-of-d0-when-call-quotes-the-name-of-the-batch-file"
@rem:: ref: "https://stackoverflow.com/questions/12141482/what-is-the-reason-for-batch-file-path-referenced-with-dp0-sometimes-changes-o/26851883#26851883"
@rem:: ref: "https://www.dostips.com/forum/viewtopic.php?f=3&t=5057" @@ "https://archive.is/NQ5Pv"
set dp0=%~dp0
set "dp0=%dp0:~0,-1%" &@rem:: clip trailing path separator
goto :EOF

:_START_
call :set_real_dp0

IF EXIST "%dp0%\\node.exe" (
    SET "_prog=%dp0%\\node.exe"
) ELSE (
    SET "_prog=node"
    SET PATHEXT=%PATHEXT:;.JS;=;%
)

endLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%" "<%=targetBinPath%>" %*
`;

const isWinOS = Deno.build.os === 'windows';
// const pathSeparator = isWinOS ? /[\\/]/ : /\//;
const pathListSeparator = isWinOS ? /;/ : /:/;
// const paths = Deno.env.get('PATH')?.split(pathListSeparator) || [];
// const pathExtensions = (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [];

// influenced by code from <https://github.com/npm/node-which/blob/master/which.js> (ISC License)
// handle PATHEXT for Cygwin or MSYS?

type findFileOptions = { paths?: readonly string[]; extensions?: readonly string[] };

async function* findExecutable(
	name: string,
	options: findFileOptions = {},
): AsyncIterableIterator<string> {
	const paths = options.paths
		? options.paths
		: (isWinOS ? ['.'] : []).concat(Deno.env.get('PATH')?.split(pathListSeparator) || []);
	const extensions = options.extensions
		? options.extensions
		: (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [''];
	for (const path of paths) {
		for (const extension of extensions) {
			const p = $path.join(path, name) + extension;
			// create an `Either<Error,FileInfo>` tuple; see similar @ <https://gcanti.github.io/fp-ts/modules/Either.ts.html>
			const [err, maybeLStat] = await (async (): Promise<[Error?, Deno.FileInfo?]> => {
				try {
					return [undefined, await Deno.lstat(p)];
				} catch (e) {
					return [(typeof e === 'object' && e instanceof Error) ? e : new Error(e), undefined];
				}
			})();
			if (err) {
				const isNotFound = err instanceof Deno.errors.NotFound;
				// `NotFound` errors are logged to 'trace' but otherwise swallowed; other errors are surfaced as warnings
				await log.log(
					isNotFound ? 'trace' : 'warn',
					`Panic: ${err.name} for '${p}' ("${err.message}").`,
				);
			}
			if (maybeLStat && (isWinOS || ((maybeLStat.mode || 0) & 0o111))) {
				yield p;
			}
		}
	}
}

// function* findExecutableSync(
// 	name: string,
// 	options: findFileOptions = {},
// ): IterableIterator<string> {
// 	const paths = options.paths
// 		? options.paths
// 		: (isWinOS ? ['.'] : []).concat(Deno.env.get('PATH')?.split(pathListSeparator) || []);
// 	const extensions = options.extensions
// 		? options.extensions
// 		: (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [''];
// 	for (const path_ of paths) {
// 		for (const extension of extensions) {
// 			const p = path.join(path_, name) + extension;
// 			if (fs.existsSync(p) && (isWinOS || (Deno.lstatSync(p).mode || 0) & 0o111)) {
// 				yield p;
// 			}
// 		}
// 	}
// }

const npmPath = await first(findExecutable('npm'));
const npmBinPath = npmPath ? $path.dirname(npmPath) : void 0;

if (npmBinPath) {
	await log.info(`\`npm\` binaries folder found at "${npmBinPath}"`);
} else {
	await log.error('`npm` binaries folder not found');
	Deno.exit(1);
}

// ref: [deno issue ~ add `caseSensitive` option to `expandGlob`](https://github.com/denoland/deno/issues/9208)
// ref: [deno/std ~ `expandGlob` discussion](https://github.com/denoland/deno/issues/1856)
// const files = await collect(fs.expandGlob(path.join(npmBinPath, '*.cmd')));
const files = $fs.expandGlob($path.join(npmBinPath, '*.cmd'));

const updates = await collect(map(async function (file) {
	const name = file.path;
	const contentsOriginal = decoder.decode(await Deno.readFile(name));
	const targetBinPath = ($eol
		.LF(contentsOriginal)
		.match(/^[^\n]*?\x22%_prog%\x22\s+\x22([^\x22]*)\x22.*$/m) || [])[1] || undefined;
	const targetBinName = targetBinPath
		? $path.parse(targetBinPath).name
		: undefined;
	const contentsUpdated = $eol.CRLF(_.template(cmdShimTemplate)({ targetBinName, targetBinPath }));
	return { name, isUpdatable: !!targetBinPath, targetBinPath, contentsOriginal, contentsUpdated };
}, files));

for await (const update of updates) {
	// if (options.debug) {
	// 	console.log({ update });
	// }
	const name = $path.basename(update.name);
	if (!update.isUpdatable) {
		await log.note(`'${name}'...no changes (${$colors.italic($colors.bold('unknown format'))})`);
	} else if (update.contentsUpdated != update.contentsOriginal) {
		Deno.stdout.writeSync(encoder.encode(`'${name}'...`));
		Deno.writeFile(update.name, encoder.encode(update.contentsUpdated));
		Deno.stdout.writeSync(encoder.encode($colors.green('updated') + '\n'));
	} else {
		Deno.stdout.writeSync(encoder.encode(`'${name}'...${$colors.blue('up-to-date')}\n`));
	}
}
