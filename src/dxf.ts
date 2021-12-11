// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (utils) dprint dprintrc ; (yargs) nargs positionals

import { $colors, $fs, $semver, $yargs } from './lib/$deps.ts';
// import { $fs, $semver, $yargs } from './lib/$deps.ts';
import { $consoleSize, $me, $version, decode, envGet, restyleYargsHelp } from './lib/$shared.ts';

import { $logger, logger as log /* initialized to the suspended state */ } from './lib/$shared.ts';

// const isWinOS = Deno.build.os === 'windows';
// const pathSeparator = isWinOS ? /[\\/]/ : /\//;
// const pathListSeparator = isWinOS ? /;/ : /:/;
// const paths = Deno.env.get('PATH')?.split(pathListSeparator) || [];
// const pathExtensions = (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [];
// const pathCaseSensitive = !isWinOS;

// console.warn($me.name, { Me });

// const log = logger;
log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((s: string) => log.warn(s));
log.trace({ $me });
log.trace({ args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

const version = $version.v();
const runAsName = $me.runAs;

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (envGet('DEBUG') ? 'debug' : undefined);
await log.debug(
	`log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

log.mergeMetadata({
	Humane: {
		showLabel: true,
		showSymbol: 'unicodeDoubleWidth',
		// note: `labelFormatFn` should assume `s` is a unicode string (with possible surrogate pairs, not simple UTF-16 characters) and may contain ANSI escape codes
		labelFormatFn: (s: string) => ($colors.inverse(s.replace(/:$/, ''))),
	},
});

//===

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(undefined, undefined, undefined)
	.scriptName($me.name)
	.epilog('* Copyright (c) 2021 * Roy Ivy III (MIT license)')
	.usage(
		`$0 ${version}\n\nUsage:\n  ${runAsName} [OPTION..] [FILE..]`,
		undefined,
		undefined,
		undefined,
	)
	// .wrap(appHelpWrapSize)
	.wrap(undefined)
	// help and version setup
	.help(false)
	.version(false)
	.option('help', {
		describe: 'Write help text to STDOUT and exit (with exit status = 1)',
		boolean: true,
	})
	.alias('help', 'h')
	.option('version', {
		describe: 'Write version number to STDOUT and exit (with exit status = 1)',
		type: 'boolean',
	})
	.alias('version', 'V')
	.showHelpOnFail(true, `Use \`${runAsName} --help\` to show usage and available options`)
	// logging options
	.option('silent', {
		describe: `Silent mode; suppress non-error messages, showing 'error' level logging`,
		type: 'boolean',
	})
	.option('quiet', {
		describe: `Quiet mode; suppress informational messages, showing 'warn' level logging`,
		type: 'boolean',
	})
	.option('verbose', { describe: `Show 'info' level logging`, boolean: true })
	.option('debug', { describe: `Show 'debug' level logging`, boolean: true })
	.option('trace', {
		describe: `Show 'trace' (lower-level/higher-detail debug) level logging`,
		type: 'boolean',
	})
	// ref: <https://github.com/yargs/yargs-parser#configuration>
	.parserConfiguration({
		'camel-case-expansion': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'unknown-options-as-args': true,
	})
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.example(`\`${runAsName} FILE\``, 'Format FILE')
	// .positional('COMMAND', { describe: 'Path/URL of command to install' })
	.positional('OPTION', {
		describe: 'OPTION(s) as listed here; may also include any formatter command options',
	})
	.positional('FILE', { describe: 'FILE(s) to format' })
	.group([], 'Options:')
	.group(['silent', 'quiet', 'verbose', 'debug', 'trace'], '*Logging:')
	.group(['help', 'version'], '*Help/Info:')
	.option('formatter', {
		alias: ['f', '\b\b\b\b <command>'], // *hack* use backspaces to fake an option argument description
		choices: ['default', 'both', 'deno', 'dprint'],
		// default: 'default',
		describe: `Select the code formatter ('default' == 'dprint')`,
		nargs: 1,
		type: 'string',
	});

const args = app.parse($me.args(), undefined, undefined);

log.debug({ args });

const possibleLogLevels = ((defaultLevel = 'note') => {
	const levels = [
		logLevelFromEnv,
		(args.silent as boolean) ? 'error' : undefined,
		(args.quiet as boolean) ? 'warn' : undefined,
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

log.trace({ possibleLogLevels, logLevel });

log.mergeMetadata({ Filter: { level: logLevel } });
log.debug(`log level set to '${logLevel}'`);

await log.resume();

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (args.help) {
	const help = await app.getHelp();
	console.log(await restyleHelp(help));
	Deno.exit(1);
}
if (args.version) {
	console.log(version);
	Deno.exit(1);
}

//===

const files = args._;
const formatter = args.formatter as string ?? 'dprint';

const denoVersion = await haveDenoVersion();
const denoFmtHasConfig = denoVersion != undefined && $semver.gte(denoVersion, '1.14.0');
const denoConfigPaths = ['deno.json', 'tsconfig.json'];
const denoConfigPath = denoConfigPaths.filter($fs.existsSync);
const haveDenoConfig = denoConfigPath.length > 0;

const dprintVersion = await haveDprintVersion();
const dprintConfigPaths = ['.dprint.json', 'dprint.json', '.dprintrc.json'];
const dprintConfigPath = dprintConfigPaths.filter($fs.existsSync);
const haveDprintConfig = dprintConfigPath.length > 0;

await log.trace({ denoVersion, dprintVersion });

const runOptions: Partial<{ [key in 'deno' | 'dprint']: Deno.RunOptions }> = {};

runOptions['deno'] = {
	cmd: ['deno', 'fmt'].concat(
		(denoFmtHasConfig && haveDenoConfig ? ['--config', denoConfigPath[0]] : []).concat([...files]),
	),
	stderr: 'inherit',
	stdin: 'inherit',
	stdout: 'inherit',
	// env: {
	// 	DENO_SHIM_ARG0: cmdPath,
	// 	DENO_SHIM_ARGX: cmdArgs.join(' '),
	// 	DENO_SHIM_URL: cmdPath,
	// },
};

runOptions['dprint'] = {
	cmd: ['dprint', 'fmt'].concat(
		(haveDprintConfig ? ['--config', dprintConfigPath[0]] : []).concat([...files]),
	),
	stderr: 'inherit',
	stdin: 'inherit',
	stdout: 'inherit',
	// env: {
	// 	DENO_SHIM_ARG0: cmdPath,
	// 	DENO_SHIM_ARGX: cmdArgs.join(' '),
	// 	DENO_SHIM_URL: cmdPath,
	// },
};

await log.trace({ runOptions });

if (['both', 'deno'].includes(formatter)) {
	await log.info('Formatting with `deno`');
	const process = Deno.run(runOptions['deno']);
	const status = await process.status();
	if (!status.success) Deno.exit(status.code);
}

if (['default', 'both', 'dprint'].includes(formatter)) {
	await log.info('Formatting with `dprint`');
	const process = Deno.run(runOptions['dprint']);
	const status = await process.status();
	if (!status.success) Deno.exit(status.code);
}

Deno.exit(0);

//===

function haveDprintVersion() {
	try {
		const process = Deno.run({
			cmd: ['dprint', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return (process.output())
			.then((output) => decode(output).match(/^dprint\s+(\d+([.]\d+)*)/im)?.[1])
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
}

function haveDenoVersion() {
	try {
		const process = Deno.run({
			cmd: ['deno', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return (process.output())
			.then((output) => decode(output).match(/^deno\s+(\d+([.]\d+)*)/im)?.[1])
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
}
