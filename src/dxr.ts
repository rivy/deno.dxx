// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (yargs) nargs positionals

import { $path, $yargs, YargsArguments } from './lib/$deps.ts';
import {
	$version,
	envGet,
	mightUseColor,
	mightUseUnicode,
	restyleYargsHelp,
} from './lib/$shared.ts';

import { $consoleSize, $me } from './lib/$locals.ts';
import { $logger, logger as log /* initialized to the suspended state */ } from './lib/$shared.ts';

import * as $args from './lib/xArgs.ts';

//===

const useColor = mightUseColor();
const useUnicode = mightUseUnicode();

log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((msg) => log.warn(msg));
log.trace({ $me });
log.trace('Deno', { args: Deno.args, execPath: Deno.execPath(), main: Deno.mainModule });

const version = $version.v();
const runAsName = $me.runAs;

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (envGet('DEBUG') ? 'debug' : undefined);
await log.debug(
	`log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

log.mergeMetadata({ authority: $me.name });

//===

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	.scriptName($me.name)
	.epilog('* Copyright (c) 2021 * Roy Ivy III (MIT license)')
	.usage(`$0 ${version}\n\nUsage:\n  ${runAsName} [OPTION..] SCRIPT [SCRIPT_ARG..]`)
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		if (err) throw err;
		throw new Error(msg.replace('argument', 'option'));
	})
	.strict()
	.wrap(undefined)
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
	.option('silent', {
		describe: `Silent mode; suppress non-error messages, showing 'error' level logging`,
		type: 'boolean',
	})
	.option('quiet', {
		describe: `Quiet mode; suppress informational messages, showing 'warn' level logging`,
		type: 'boolean',
	})
	.option('verbose', { describe: `Show 'info' level logging`, type: 'boolean' })
	.option('debug', { describe: `Show 'debug' level logging`, type: 'boolean' })
	.option('trace', {
		describe: `Show 'trace' (lower-level/higher-detail debug) level logging`,
		type: 'boolean',
	})
	// ref: <https://github.com/yargs/yargs-parser#configuration>
	.parserConfiguration({
		'camel-case-expansion': true,
		'short-option-groups': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'halt-at-non-option': true,
	})
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s) as listed here' })
	.positional('SCRIPT', { describe: 'Target (Deno-compatible) SCRIPT to execute' })
	.group([], 'Options:')
	.group(['silent', 'quiet', 'verbose', 'debug', 'trace'], '*Logging:')
	.group(['help', 'version'], '*Help/Info:')
	/* Options... */
	.option('unstable', {
		describe: 'Execute SCRIPT using Deno `--unstable` option',
		type: 'boolean',
	});

//===

const rawArgs = $me.args();
const argv = ((() => {
	try {
		return app.parse(rawArgs) as YargsArguments;
	} catch (e) {
		log.error(e.message);
		return;
	}
})());

await log.debug({ rawArgs, argv });

const possibleLogLevels = ((defaultLevel = 'note') => {
	const levels = [
		logLevelFromEnv,
		(argv?.silent as boolean) ? 'error' : undefined,
		(argv?.quiet as boolean) ? 'warn' : undefined,
		(argv?.verbose as boolean) ? 'info' : undefined,
		(argv?.debug as boolean) ? 'debug' : undefined,
		(argv?.trace as boolean) ? 'trace' : undefined,
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

//===

if (argv == undefined) {
	console.warn(`\nUse \`${runAsName} --help\` to show usage and available options`);
	Deno.exit(1);
}

//===

log.debug({ useColor, useUnicode });

const consoleSize = await $consoleSize.consoleSize();

await log.debug({ consoleSize });

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (argv.help) {
	const yargsHelp = await app.getHelp();
	const help = await restyleYargsHelp(yargsHelp, { consoleWidth: consoleSize?.columns ?? 80 });
	console.log(help);
	Deno.exit(1);
}
if (argv.version) {
	console.log(version);
	Deno.exit(1);
}

//===

const args = argv._.map(String);
const targetPath = (args.shift() || '').replace(/^-/, `.${$path.SEP}-`);
const targetArgs = args;

let targetURL: string;
try {
	targetURL = (new URL(targetPath, 'file://' + Deno.cwd() + '/')).href;
} catch {
	targetURL = '';
}
await log.debug({ CWD: Deno.cwd(), targetPath, targetURL, argv });

// !NOTE: maximum command line or environment variable length is likely 8192 characters; see ref: <https://superuser.com/questions/1070272/why-does-windows-have-a-limit-on-environment-variables-at-all/1070354#1070354>
// FixME: fail gracefully (with warning?) if expanded command line is longer than a <max_length>

const denoOptions = ['run', '-A', argv.unstable ? '--unstable' : '', '--'].filter(Boolean);
const runOptions: Deno.RunOptions = {
	cmd: ['deno', ...denoOptions, targetPath, ...targetArgs],
	stderr: 'inherit',
	stdin: 'inherit',
	stdout: 'inherit',
	env: {
		DENO_SHIM_ARG0: `${
			$me.shimArg0
				? $me.shimArg0
				: ['deno', ...denoOptions].join(' ')
		} ${targetPath}`,
		DENO_SHIM_ARGS: targetArgs.map($args.reQuote).join(' '),
		DENO_SHIM_URL: targetURL,
	},
};
log.trace({ runOptions });
const process = Deno.run(runOptions);
const status = await process.status();
Deno.exit(status.success ? 0 : status.code);
// }
