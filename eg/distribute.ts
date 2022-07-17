// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (utils) dprint dprintrc ; (yargs) nargs positionals

import { $yargs, YargsArguments } from '../src/lib/$deps.ts';
import { $version, durationText, env } from '../src/lib/$shared.ts';

import { $consoleSize, $me } from '../src/lib/$locals.ts';
import {
	$logger,
	intoPath,
	intoURL,
	logger as log, /* initialized to the suspended state */
	traversal,
	validURL,
} from '../src/lib/$shared.ts';

import { restyleYargsHelp } from '../src/lib/restyleYargsHelp.ts';
import { fetch } from '../src/lib/xFetch.ts';

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

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined);
log.debug(
	`(potential) log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

const appName = $me.name;
const version = $version.v();
const runAsName = $me.runAs;

log.mergeMetadata({ authority: appName });

performance.mark('setup:log:stop');

//===

performance.mark('setup:yargs:start');

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	.scriptName(appName)
	.epilog('* Copyright (c) 2021-2022 * Roy Ivy III (MIT license)')
	.usage(`$0 ${version}\n
Distribute/update semver SOURCE to TARGET(s).\n
Usage:\n  ${runAsName} [OPTION..] SOURCE TARGET..`)
	// ref: <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s); see listed *Options*' })
	.positional('SOURCE', { describe: `SOURCE file to distribute`, demand: 1 })
	.positional('TARGET', { describe: `TARGET file(s) of distribution`, demand: 1 })
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
	.option('version-regex', {
		describe: 'Regular expression used to match SOURCE and TARGET versions',
		default: '^\\s*(#|//)\s*v\\d+(\\.\\d+)*',
		type: 'string',
	})
	.alias('version-regex', ['r']); // .demandOption(['SOURCE']);

performance.mark('setup:yargs:stop');

//===

performance.mark('setup:parseArgs:start');

const bakedArgs = $me.args();

const argv = ((() => {
	try {
		return app.parse(bakedArgs) as YargsArguments;
	} catch (e) {
		log.error(e.message);
		return;
	}
})());

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
if (argv?.help) {
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
if (argv?.version) {
	console.log(`${appName} ${version}`);
	const onlyVersion = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['version', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyVersion ? 0 : 1);
}

//===

let usageError = false;

// positional arguments
// * SOURCE
const SOURCE = await (async () => {
	const source = argv?._?.shift()?.toString();
	if (source == null) {
		usageError = true;
		await log.error(`SOURCE is a required argument`);
	}
	return source || '';
})();

// * TARGET..
const TARGET = await (async () => {
	const target = argv ? [...argv._] : [];
	if (argv) argv._ = [];
	if (target.length < 1) {
		usageError = true;
		await log.error(`TARGET is a required argument`);
	}
	return target.map((e) => e.toString());
})();

// argument/option parsing or usage error
if (!argv || usageError) {
	console.warn(`\nUse \`${runAsName} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

console.log(`SOURCE = '%s' (aka: '%s')`, validURL(SOURCE)?.href, traversal(SOURCE));
console.log(
	'TARGET = %O (aka: %O)',
	TARGET.map((e) => validURL(e)?.href),
	TARGET.map((e) => traversal(e)),
);

TARGET.forEach((dest) => {
	remoteCopy(ensureURL(SOURCE), ensureURL(dest));
});

//===

function ensureURL(path: string | URL) {
	if (path instanceof URL) return path;
	const url = intoURL(path);
	if (url == null) throw 'ToDO-ERROR-type';
	return url;
}

function ensurePath(path?: string | URL) {
	const p = intoPath(path);
	if (p == null || p === '') throw 'ToDO-ERROR-type';
	return p;
}

import { /* copy, */ writableStreamFromWriter } from 'https://deno.land/std@0.145.0/streams/mod.ts';

async function remoteCopy(src: URL, dst: URL, _options?: { bufSize?: number }) {
	const fileResponse = await fetch(src);

	if (fileResponse.body) {
		const file = await Deno.open(ensurePath(traversal(dst)), { write: true, create: true });
		const writableStream = writableStreamFromWriter(file);
		await fileResponse.body.pipeTo(writableStream);
	}
}
