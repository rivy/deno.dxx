// spell-checker:ignore (names) Deno ; (vars) ARGX LOGLEVEL PATHEXT arr gmsu ; (utils) dprint dprintrc ; (yargs) nargs positionals

import {
	copy as streamCopy,
	readableStreamFromReader,
	readAll,
	readerFromIterable,
	readerFromStreamReader,
	writableStreamFromWriter,
	writerFromStreamWriter,
} from 'https://deno.land/std@0.146.0/streams/conversion.ts';

import { $yargs, YargsArguments } from '../src/lib/$deps.ts';
import { $version, durationText, env, isEmpty, stableSort } from '../src/lib/$shared.ts';

import { $consoleSize, $me } from '../src/lib/$locals.ts';
import {
	$logger,
	intoPath,
	intoURL,
	logger as log, //* note: `log` (aka `logger`) is initialized to the suspended state */
	traversal,
	validURL,
} from '../src/lib/$shared.ts';

import { restyleYargsHelp } from '../src/lib/restyleYargsHelp.ts';
import { fetch } from '../src/lib/xFetch.ts';

//===

performance.mark('setup:start');
performance.mark('setup:log:start');

log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((msg) => log.warn(msg)); // WARN if executing with impaired command line capability
log.trace({ $me });
log.trace('Deno', { execPath: Deno.execPath(), mainModule: Deno.mainModule, args: Deno.args });

const logLevelFromEnv = log
	.logLevelDetail($logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined))
	?.levelName;
log.debug(
	`(potential) log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

const appName = $me.name;
const appCopyright = '* Copyright (c) 2021-2022 * Roy Ivy III (MIT license)';
const appVersion = $version.v();
const appRunAs = $me.runAs;

log.mergeMetadata({ authority: appName });

const logLevelOptionChoices = stableSort(
	Object.entries(log.logLevels()).filter(([key, value]) => key.length > 3 && value > 2),
	([_keyA, valueA], [_keyB, valueB]) => valueA - valueB,
)
	.map(([key, _value]) => key);
log.trace('logLevelChoices', logLevelOptionChoices);

performance.mark('setup:log:stop');

//===

performance.mark('setup:yargs:start');

let appExitValue = 0;
let appUsageError = false;

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	// * usage, description, and epilog (ie, notes/copyright)
	.usage(`$0 ${appVersion}\n
Copy SOURCE to TARGET(s).\n
* SOURCE and TARGET may be local files or URLs.\n
Usage:\n  ${appRunAs} [OPTION..] SOURCE TARGET..`)
	.updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.positional('OPTION', { describe: 'OPTION(s); see listed *Options*' })
	.positional('SOURCE', { describe: `SOURCE file to distribute`, demand: true })
	.positional('TARGET', { describe: `TARGET file(s)`, demand: true })
	.epilog(`Notes:
  '-' may be used as SOURCE to represent STDIN.
  '-' may be used as any TARGET to represent STDOUT.
\n${appCopyright}`)
	// * (boilerplate)
	.scriptName(appName)
	.wrap(/* columns */ null) // disable built-in Yargs display text wrapping (for later custom formatting)
	// * (boilerplate) revised terminology for errors/help text
	// ref: update string keys/names from <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	// .updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.updateStrings({
		'Unknown argument: %s': { 'one': 'Unknown option: %s', 'other': 'Unknown options: %s' },
	})
	// * (boilerplate) fail function
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		if (err) throw err;
		log.error(msg);
		appUsageError = true;
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
		choices: logLevelOptionChoices, // required for help display of choices
	})
	.choices('logLevel', logLevelOptionChoices) // fixme/hack: required for correct error handling of incorrect choices by Yargs
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
	// .option('force', { alias: ['f'], describe: 'Copy over existing TARGET', type: 'boolean' })
	.option('no-clobber', {
		alias: ['n'],
		describe: `Don't overwrite a TARGET that already exists`,
		type: 'boolean',
	})
	.option('serialize', { describe: 'Serialize copies to TARGET(s)', type: 'boolean' })
	/* Examples...*/
	.example(
		`${appRunAs} "https://cdn.jsdelivr.net/gh/rivy/deno.dxx@0.0.13/README.md" file1.md file2.mkd`,
		'Copy from a WAN URL to local files',
	)
	.example([]);

performance.mark('setup:yargs:stop');

//===

performance.mark('setup:parseArgs:start');

const argv = ((() => {
	try {
		return app.parse($me.args()) as YargsArguments;
	} catch (e) {
		log.error(e.message);
		return;
	}
})()) || {} as YargsArguments;

log.trace({ '$me.args()': $me.args(), argv });

const defaultLogLevel = 'notice';
const logLevelsFromOptions = [
	(argv.silent) ? 'error' : undefined,
	(argv.quiet) ? 'warn' : undefined,
	(argv.verbose) ? 'info' : undefined,
	(argv.debug) ? 'debug' : undefined,
	(argv.trace) ? 'trace' : undefined,
];
const logLevelsFromLogLevelArgv =
	(Array.isArray(argv.logLevel) ? argv.logLevel as string[] : [argv.logLevel]).filter(
		Boolean,
	) as string[];
const possibleLogLevelsInOrder =
	([defaultLogLevel, logLevelFromEnv, ...logLevelsFromOptions, ...logLevelsFromLogLevelArgv].filter(
		(e) => log.logLevelDetail(e)
	) as string[])
		.reverse();
const logLevel = possibleLogLevelsInOrder.length > 0 ? possibleLogLevelsInOrder[0] : Infinity;

log.trace({
	defaultLogLevel,
	logLevelFromEnv,
	logLevelsFromOptions,
	logLevelsFromLogLevelArgv,
	possibleLogLevelsInOrder,
});

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
	const onlyRequestingHelp = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['help', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyRequestingHelp ? 0 : 1);
}
if (argv.version) {
	console.log(`${appName} ${appVersion}`);
	const onlyRequestingVersion = (argv._.length === 0) &&
		Object.keys(argv).filter((s) => !['version', '_', '$0'].includes(s)).length === 0;
	Deno.exit(onlyRequestingVersion ? 0 : 1);
}

//===

// positional arguments
// * SOURCE
const SOURCE = await (async () => {
	const source = !appUsageError ? (argv._?.shift()?.toString()) : '';
	if (!appUsageError && source == null) {
		appUsageError = true;
		await log.error(`SOURCE is a required argument`);
	}
	return source || '';
})();

// * TARGET..
const TARGET = await (async () => {
	const target = !appUsageError ? [...argv._] : [];
	if (argv._?.length) argv._ = [];
	if (!appUsageError && (target.length < 1)) {
		appUsageError = true;
		await log.error(`TARGET is a required argument`);
	}
	return target.map((e) => e.toString());
})();

// argument/option parsing or usage error
if (isEmpty(argv) || appUsageError) {
	console.warn(`\nUse \`${appRunAs} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

await log.debug(`SOURCE = '%s'`, SOURCE);
await log.debug('TARGET = %O', TARGET);

await log.trace(
	`SOURCE = '%s' is '%s' (aka/traversal: '%s')`,
	SOURCE,
	validURL(SOURCE)?.href,
	traversal(SOURCE),
);
await log.trace(
	'TARGET = %O is %O (aka/traversal: %O)',
	TARGET,
	TARGET.map((e) => validURL(e)?.href),
	TARGET.map((e) => traversal(e)),
);

// ref: <https://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap12.html> @@ <https://archive.is/lEmhf>
const source = (SOURCE === '-')
	// * stdin is readable only once; for multiple targets, cache stdin into a Uint8Array for repeated use
	? ((TARGET.length < 2) ? Deno.stdin : await readAll(Deno.stdin))
	: intoURL(SOURCE);
if (source == null) {
	await log.error(`'${SOURCE}' is an invalid source`);
	Deno.exit(1);
}
log.trace({ SOURCE }, '=>', source instanceof Uint8Array ? `Uint8Array[${source.length}]` : source);

performance.mark('copy');

await log.debug({ serialize: argv?.serialize });
if (!argv?.serialize) {
	await Promise.all(TARGET.map(async (t) => {
		// ref: <https://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap12.html> @@ <https://archive.is/lEmhf>
		const target = (t === '-') ? Deno.stdout : intoURL(t);
		if (!target) {
			await log.error(`'${t}' is an invalid target`);
			appExitValue = 1;
		} else {
			const protectTarget = argv.noClobber ?? false;
			const preventTargetClose = (target === Deno.stdout);
			await log.trace({
				source: source instanceof Uint8Array ? `Uint8Array[${source.length}]` : source,
				target,
			});
			await copy(source instanceof Uint8Array ? readerFromIterable([source]) : source, target, {
				protectTarget,
				preventTargetClose,
			})
				.then(() => log.info(`'${SOURCE}' copied to '${t}'`))
				.catch((e) => {
					log.error(`Failed to copy '${SOURCE}' to '${t}' (${e})`);
					appExitValue = 1;
				});
		}
	}));
} else {
	// note: if targets may overlap, need to serialize copy work
	// note: `rcp FILE - - -` "succeeds" when in parallel but has "BadResource" promise rejection errors (from auto-closure within `pipeTo()`)
	//   ... partially fixed with `t === '-'`, but might need more definitive comparison to STDOUT
	// * maybe check for overlaps with `traversal`, and parallelize if no overlap?
	// await TARGET.reduce((chain, t) => {
	// 	return chain.then(async () => {
	//    // ref: <https://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap12.html> @@ <https://archive.is/lEmhf>
	//    ...
	// ...or, as async function...
	await TARGET.reduce(async (chain, t) => {
		await chain;
		// ref: <https://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap12.html> @@ <https://archive.is/lEmhf>
		const target = (t === '-') ? Deno.stdout : intoURL(t);
		if (!target) {
			await log.error(`'${t}' is an invalid target`);
			appExitValue = 1;
		} else {
			const protectTarget = argv.noClobber ?? false;
			const preventTargetClose = (t === '-');
			await log.trace({
				source: source instanceof Uint8Array ? `Uint8Array[${source.length}]` : source,
				target,
			});
			await copy(source instanceof Uint8Array ? readerFromIterable([source]) : source, target, {
				protectTarget,
				preventTargetClose,
			})
				.then(() => log.info(`'${SOURCE}' copied to '${t}'`))
				.catch((e) => {
					log.error(`Failed to copy '${SOURCE}' to '${t}' (${e})`);
					appExitValue = 1;
				});
		}
	}, Promise.resolve());
}

performance.mark('copy');
await log.debug(durationText('copy'));

await log.debug({ appExitValue });
Deno.exit(appExitValue);

//===

function _ensureAsURL(path: string | URL) {
	if (path instanceof URL) return path;
	const url = intoURL(path);
	if (url == null) throw new Deno.errors.InvalidData('Invalid URL');
	return url;
}

function ensureAsPath(path?: string | URL) {
	const p = intoPath(path);
	if (p == null || p === '') throw new Deno.errors.InvalidData('Invalid path');
	return p;
}

// `copy()`
// * wsCopy()? (wan-stream-copy)
// refs:
// https://stackoverflow.com/questions/19553837/node-js-piping-the-same-readable-stream-into-multiple-writable-targets
// https://deno.land/x/readable_stream@v3.6.0-deno.0.3.0/_stream_readable.ts
// https://nodejs.org/en/knowledge/advanced/streams/how-to-use-stream-pipe/
// https://github.com/mcollina/cloneable-readable ; https://www.npmjs.com/package/cloneable-readable ; https://www.npmjs.com/package/pump
// https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-streams-in-node-js
// https://github.com/denoland/deno/issues/3756
async function copy(
	source: URL | Deno.Reader,
	target: URL | Deno.Writer | (URL | Deno.Writer)[],
	options?: { bufSize?: number; preventTargetClose?: boolean | boolean[]; protectTarget?: boolean },
) {
	target = Array.isArray(target) ? target : [target];
	const preventTargetClose =
		((options?.preventTargetClose != null) && Array.isArray(options?.preventTargetClose))
			? options?.preventTargetClose
			: ((options?.preventTargetClose != null)
				? (Array(target.length) as boolean[]).fill(options?.preventTargetClose)
				: (Array(target.length) as boolean[]).fill(false));
	const protectTarget = options?.protectTarget ?? false;
	const readableStream = await (async () => {
		if (source instanceof URL) {
			// ToDO: add support for non-['file:','http:','https:'] protocols to `fetch` by using `curl`
			const fileResponse = await fetch(source).catch((e) => {
				throw new Error(e.message);
			});
			// note: response status codes >= 200 < 300 should be ok
			if (!fileResponse.ok) {
				const msg = [fileResponse.statusText, `[status: ${fileResponse.status}]`]
					.filter(Boolean)
					.join(' ');
				if (fileResponse.status === 404) {
					throw new Deno.errors.NotFound(`'${source}' not found; ${msg}`);
				}
				throw new Error(`'${source}' fetch failed; ${msg}`);
			}
			if (fileResponse.body == null) {
				throw new Deno.errors.NotFound(`'${source}' content not found`);
			}
			return fileResponse.body;
		} else return readableStreamFromReader(source);
	})();

	await Promise.all(target.map(async (t, index) => {
		const writableStream = await (async () => {
			if (t instanceof URL) {
				const file = await Deno.open(ensureAsPath(traversal(t)), {
					// ref: <https://doc.deno.land/deno/stable/~/Deno.OpenOptions>
					create: !protectTarget,
					createNew: protectTarget,
					truncate: true, // or alternatively, follow with `await file.truncate();`
					write: true,
				});
				return writableStreamFromWriter(file);
			} else return writableStreamFromWriter(t);
		})();
		return readableStream.pipeTo(writableStream, {
			preventClose: preventTargetClose[index] || false,
		});
	}));
}

async function _remoteCopyUsingCopy(
	src: URL | Deno.Reader,
	dst: URL | Deno.Writer,
	_options?: { bufSize?: number },
) {
	const readableStream = await (async () => {
		if (src instanceof URL) {
			const fileResponse = await fetch(src);
			if (!fileResponse.body) throw 'ToDO-ERROR-type';
			return readerFromStreamReader(fileResponse.body.getReader());
		} else return src;
	})();
	const writeableStream = await (async () => {
		if (dst instanceof URL) {
			const file = await Deno.open(ensureAsPath(traversal(dst)), {
				// ref: <https://doc.deno.land/deno/stable/~/Deno.OpenOptions>
				// create: argv?.noClobber ?? true,
				createNew: argv?.noClobber ?? true,
				truncate: true,
				write: true,
			});
			return writerFromStreamWriter(file.writable.getWriter());
		} else return dst;
	})();

	await streamCopy(readableStream, writeableStream);
}