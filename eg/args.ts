// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (utils) dprint dprintrc ; (yargs) nargs positionals

import { $yargs, YargsArguments } from '../src/lib/$deps.ts';
import { $version, durationText, envGet, restyleYargsHelp } from '../src/lib/$shared.ts';

import { $consoleSize, $me } from '../src/lib/$locals.ts';
import {
	$logger,
	logger as log, /* initialized to the suspended state */
} from '../src/lib/$shared.ts';

//===

performance.mark('setup:start');
performance.mark('setup:log:start');

// const isWinOS = Deno.build.os === 'windows';
// const pathSeparator = isWinOS ? /[\\/]/ : /\//;
// const pathListSeparator = isWinOS ? /;/ : /:/;
// const paths = Deno.env.get('PATH')?.split(pathListSeparator) || [];
// const pathExtensions = (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [];
// const pathCaseSensitive = !isWinOS;

log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((msg) => log.warn(msg)); // WARN if executing with impaired command line capability
log.trace({ $me });
log.trace('Deno', { execPath: Deno.execPath(), mainModule: Deno.mainModule, args: Deno.args });

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (envGet('DEBUG') ? 'debug' : undefined);
log.debug(
	`(potential) log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

const version = $version.v();
const runAsName = $me.runAs;

log.mergeMetadata({ authority: $me.name });

performance.mark('setup:log:stop');

//===

performance.mark('setup:yargs:start');

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	.scriptName($me.name)
	.epilog('* Copyright (c) 2021 * Roy Ivy III (MIT license)')
	.usage(`$0 ${version}\n
Display all arguments.\n
Usage:\n  ${runAsName} [OPTION..] [ARG..]`)
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s) as listed here (below)' })
	.positional('ARG', { describe: `ARG(s) to display ('shell'-expanded)` })
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		if (err) throw err;
		throw new Error(msg);
	})
	.wrap(/* columns */ undefined)
	// help and version setup
	.help(false)
	.version(false)
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
	// logging options
	.option('log-level', {
		alias: ['\b\b\b\b LOG_LEVEL'],
		choices: ['error', 'warning', 'warn', 'notice', 'info', 'debug', 'trace'],
		describe: `Set logging level to LOG_LEVEL (overrides any prior setting)`,
		type: 'string',
	})
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
	// .example(`\`${runAsName} ARG\``, 'Display 'shell-expanded ARG')
	/* Options... */
	.strictOptions(/* enable */ true)
	.option('zero', { describe: 'Display $0 (executable)', boolean: true })
	.alias('zero', ['0', 'z'])
	.option('lines', { describe: 'Display arguments on separate lines', boolean: true })
	.alias('lines', 'l');

performance.mark('setup:yargs:stop');

//===

performance.mark('setup:parseArgs:start');

const bakedArgs = $me.args();

const optionArgs = bakedArgs;
const nonOptionArgs: typeof bakedArgs = [];

log.trace({ optionArgs, nonOptionArgs });

const argv = ((() => {
	try {
		return app.parse(optionArgs) as YargsArguments;
	} catch (e) {
		log.error(e.message);
		return;
	}
})());
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

performance.mark('setup:parseArgs:stop');

//===

if (argv == undefined) {
	console.warn(`\nUse \`${runAsName} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

performance.mark('setup:consoleSize');
performance.mark('setup:consoleSize:promise');
const consoleSizePromise = $consoleSize.consoleSize();
performance.mark('setup:consoleSize:promise');
performance.mark('setup:consoleSize:await');
const consoleSize = await consoleSizePromise;
performance.mark('setup:consoleSize:await');
performance.mark('setup:consoleSize');

await log.debug({ consoleSize });

//===

performance.mark('setup:stop');

await log.debug(durationText('setup:log'));
await log.debug(durationText('setup:yargs'));
await log.debug(durationText('setup:parseArgs'));
await log.debug(durationText('setup:consoleSize:promise'));
await log.debug(durationText('setup:consoleSize:await'));
await log.debug(durationText('setup:consoleSize'));
await log.debug(durationText('setup'));

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (argv.help) {
	performance.mark('run:generateHelp');
	performance.mark('run:generateHelp:yargs');
	const yargsHelp = await app.getHelp();
	performance.mark('run:generateHelp:yargs');
	await log.debug(durationText('run:generateHelp:yargs'));
	performance.mark('run:generateHelp:customize');
	const help = await restyleYargsHelp(yargsHelp, { consoleWidth: consoleSize?.columns ?? 80 });
	performance.mark('run:generateHelp:customize');
	performance.mark('run:generateHelp');
	await log.debug(durationText('run:generateHelp:customize'));
	await log.debug(durationText('run:generateHelp'));
	console.log(help);
	const onlyHelp = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['help', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyHelp ? 0 : 1);
}
if (argv.version) {
	console.log(`${$me.name} ${version}`);
	const onlyVersion = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['version', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyVersion ? 0 : 1);
}

//===

if (argv.zero) {
	console.log('$0 =', $me.shimArg0);
}

const output = (argv._.map(String))?.join(argv.lines ? '\n' : ' ');
if (output.length > 0) {
	console.log(output);
}
