<1>/* :: */ 0; /* BAT/Deno-TS chimera lead-in ## format resists reformatting by deno/dprint/prettier
@::# -*- mode: typescript; coding: dos; -*-
@::# spell-checker:ignore (names) Deno ; (shell/CMD) COMSPEC ERRORLEVEL
@rem
@if DEFINED SHIM_DEBUG @echo # SHIM_DEBUG='%SHIM_DEBUG%' ## defined and active 1>&2
@rem
@set "ERRORLEVEL=" &@:: reset ERRORLEVEL (defensive de-cloaking to avoid any prior pinned value)
@set "SHIM_ERRORLEVEL=" &@:: SHIM_ERRORLEVEL is used to report final ERRORLEVEL (and then reset to null); * use enables proper transfer of script return value to process error level
@rem
@::# NOTE: BAT/Deno-TS chimera *requires* Deno-v1.32.0+ (needed for the `ext=ts` option)
@call deno eval "const [M,m] = Deno.version.deno.split('.'); Deno.exit((M>1 || M==1 && m>=32) ? 0 : 8008)" 2>NUL
@if ERRORLEVEL 1 if NOT ERRORLEVEL 2 ((goto)2>NUL || @for %%G in ("%COMSPEC%") do @title %%~nG & echo ERROR: `deno` not found ^(try `scoop install deno`^) 1>&2 & "%COMSPEC%" /d/c "exit 9009")
@if ERRORLEVEL 8008 if NOT ERRORLEVEL 8009 ((goto)2>NUL || @for %%G in ("%COMSPEC%") do @title %%~nG & echo ERROR: `deno` does not meet minimum version requirement ^(1.32.0+ ; try `deno upgrade`^) 1>&2 & "%COMSPEC%" /d/c "exit %ERRORLEVEL%")
@rem
@setLocal
@rem
@rem:: escape closing parentheses to prevent parsing issues in the final parse group
@rem:: - ref: [SO ~ Escaping parentheses...](https://stackoverflow.com/questions/12976351/escaping-parentheses-within-parentheses-for-batch-file) @@ https://archive.is/biqAW @@ https://web.archive.org/web/20251229224524/https://stackoverflow.com/questions/12976351/escaping-parentheses-within-parentheses-for-batch-file
@rem:: * leading '.' is to avoid empty SHIM_ARGS which won't be manipulated correctly by the expansion string substitutions
@set SHIM_ARGS=.%*
@set SHIM_ARGS=%SHIM_ARGS:)=^^^)%
@rem
@set "SHIM_ARG0=%~0"
@set "SHIM_TARGET=%~0"
@rem
@(endLocal
@(goto) 2>NUL
@for %%G in ("%COMSPEC%") do @title %%~nG
@rem
@rem:: reverse parentheses escaping and remove added leading '.'
@set SHIM_ARGS=%SHIM_ARGS:^^^)=)%
@call set SHIM_ARGS=%%SHIM_ARGS:~1%%
@rem
@set "SHIM_ARG0=%SHIM_ARG0%"
@set "SHIM_TARGET=%SHIM_TARGET%"
@rem
@rem:: suppress annoying/distracting/useless-for-non-dev Deno deprecation warnings [undocumented; warnings and var included in Deno v1.40+ / removed in Deno v2+]
@set "DENO_NO_DEPRECATION_WARNINGS=1"
@rem:: suppress default [ugly UI/UX] prompting behavior in favor of panics for insufficient permissions
@REM * @set "DENO_NO_PROMPT=1" &::## *DISABLED* for user choice [USER may reset/set DENO_NO_PROMPT [or add `--no-prompt` to the SHIM `@call deno "run" ...` command]]
@rem:: suppress annoying/distracting/useless-for-non-dev Deno update check/notification
@set "DENO_NO_UPDATE_CHECK=1"
@rem
@if DEFINED SHIM_ARGS     call deno "run" "--ext=ts" "--allow-all" "--no-config" -- "%SHIM_TARGET%" %%SHIM_ARGS%%
@if NOT DEFINED SHIM_ARGS call deno "run" "--ext=ts" "--allow-all" "--no-config" -- "%SHIM_TARGET%"
@call set SHIM_ERRORLEVEL=%%ERRORLEVEL%%
@rem
@rem:: reset DENO_... ENV vars to prior values
@set "DENO_NO_DEPRECATION_WARNINGS=%DENO_NO_DEPRECATION_WARNINGS%"
@set "DENO_NO_PROMPT=%DENO_NO_PROMPT%"
@set "DENO_NO_UPDATE_CHECK=%DENO_NO_UPDATE_CHECK%"
@rem:: reset SHIM_... ENV vars
@set "SHIM_ARGS="
@set "SHIM_ARG0="
@set "SHIM_TARGET="
@if DEFINED SHIM_DEBUG @call echo # SHIM_ERRORLEVEL='%%SHIM_ERRORLEVEL%%' 1>&2
@for /f %%G in ('echo %%SHIM_ERRORLEVEL%%') do @(set "SHIM_ERRORLEVEL=" & "%COMSPEC%" /d/c "@exit %%G")
)
*/
// spell-checker:ignore (jargon) positionals

import { $colors } from '../tests/$deps.ts';
import {
	$logger,
	$version,
	abortIfMissingPermitsSync,
	env,
	logger as log,
} from '../src/lib/$shared.ts';
import { $me } from '../src/lib/$locals.ts';
import { $yargs, type YargsArguments } from '../src/lib/$deps.cli.ts';
import { restyleYargsHelp } from '../src/lib/restyleYargsHelp.ts';

//===

abortIfMissingPermitsSync(
	([] as Deno.PermissionName[]).concat(
		['env'], // required for shim/process argument expansion
		['read'], // required for argument expansion and reading the selected files
	),
);

$me.warnIfImpaired((message) => log.warn(message));

log.debug('logging to *STDERR*');
log.trace({ $me, $version });
log.trace('Deno:', { execPath: Deno.execPath(), mainModule: Deno.mainModule, args: Deno.args });

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined);

const appName = $me.name;
const appVersion = $version.v();
const appRunAs = $me.runAs;
const appCopyright = '* Copyright (c) 2021-2026+ * Roy Ivy III (MIT license)';

let appUsageError = false;

log.mergeMetadata({ authority: appName });

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	.usage(
		`$0 ${appVersion}\n
Print files in modification-time order (oldest first).\n
Usage:\n  ${appRunAs} [OPTION..] FILE..`,
	)
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTION', { describe: 'OPTION(s); see listed *Options*' })
	.positional('FILE', { describe: `FILE(s) to print ('shell'-expanded)` })
	.epilog(appCopyright)
	.scriptName(appName)
	.wrap(/* columns */ null)
	.updateStrings({
		'Unknown argument: %s': { one: 'Unknown option: %s', other: 'Unknown options: %s' },
	})
	.fail((message: string, error: Error, _: ReturnType<typeof $yargs>) => {
		appUsageError = true;
		log.error(message);
		if (error) throw error;
	})
	.help(false)
	.version(false)
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
	.option('log-level', {
		alias: ['\b\b\b\b LOG_LEVEL'],
		describe: 'Set logging level to LOG_LEVEL (overrides any prior setting)',
		type: 'string',
		choices: ['error', 'warning', 'warn', 'note', 'info', 'debug', 'trace'],
	})
	.choices('logLevel', ['error', 'warning', 'warn', 'note', 'info', 'debug', 'trace'])
	.option('silent', {
		describe: `Silent mode; suppress non-error logging (sets 'error' level logging)`,
		type: 'boolean',
	})
	.option('quiet', {
		describe: `Quiet mode; suppress informational logging (sets 'warn' level logging)`,
		type: 'boolean',
	})
	.option('verbose', {
		describe: `Verbose mode; display verbose logging (sets 'info' level logging)`,
		type: 'boolean',
	})
	.option('debug', { describe: `Set 'debug' level logging`, type: 'boolean' })
	.option('trace', { describe: `Set 'trace' (high-detail 'debug') level logging`, type: 'boolean' })
	.group([], 'Options:')
	.group(['log-level', 'silent', 'quiet', 'verbose', 'debug', 'trace'], '*Logging:')
	.group(['help', 'version'], '*Help/Info:')
	.parserConfiguration({
		'boolean-negation': false,
		'halt-at-non-option': false,
		'camel-case-expansion': true,
		'parse-numbers': false,
		'parse-positional-numbers': false,
		'strip-aliased': true,
		'strip-dashed': true,
	})
	.strictOptions(/* enable */ true)
	.example(`${appRunAs} README.md CHANGELOG.mkd`, 'Print older files before newer files')
	.example(`${appRunAs} **/*.ts`, 'Expand globs and print matching files in time order')
	.example([]);

//===

const bakedArgs = $me.args();
const argv = (() => {
	try {
		return app.parse(bakedArgs) as YargsArguments;
	} catch (error) {
		if (error instanceof Error) log.error(error.message);
		else log.error(`ERROR: Unknown error parsing arguments (${String(error)})`);
		return undefined;
	}
})();

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
			? (argv.logLevel as string[])
			: [argv?.logLevel as string | undefined]
	).pop();
	return [log.logLevelDetail(logLevelFromArgv)?.levelName]
		.concat(
			(levels.length > 0 ? levels : [defaultLevel])
				.map((level) => log.logLevelDetail(level)?.levelNumber)
				.filter(Boolean)
				.sort()
				.reverse()
				.map((level) => log.logLevelDetail(level)?.levelName),
		)
		.filter(Boolean);
})();
const logLevel = possibleLogLevels.length > 0 ? possibleLogLevels[0] : Infinity;

log.mergeMetadata({ Filter: { level: logLevel } });
log.debug(`log level set to '${logLevel}'`);

await log.resume();

if (argv == null) {
	console.warn(`\nUse \`${appRunAs} --help\` to show full usage and available options`);
	Deno.exit(1);
}

if (argv.help) {
	const help = await restyleYargsHelp(await app.getHelp());
	console.log(help);
	const onlyHelp =
		argv._.length === 0 &&
		Object.keys(argv).filter((key) => !['help', '_', '$0'].includes(key)).length === 0;
	Deno.exit(onlyHelp ? 0 : 1);
}

if (argv.version) {
	console.log(`${appName} ${appVersion}`);
	const onlyVersion =
		argv._.length === 0 &&
		Object.keys(argv).filter((key) => !['version', '_', '$0'].includes(key)).length === 0;
	Deno.exit(onlyVersion ? 0 : 1);
}

const names = argv._.map(String);
if (names.length === 0) {
	await log.error('FILE argument is required');
	console.warn(`\nUse \`${appRunAs} --help\` to show full usage and available options`);
	Deno.exit(1);
}

//===

const files = await Promise.all(
	names.map(async (name) => {
		await log.debug(`reading file metadata: '${name}'`);
		const info = await Deno.stat(name);

		if (!info.isFile) {
			throw new Error(`Not a file: ${name}`);
		}

		return {
			name,
			modifiedAt: info.mtime?.getTime() ?? 0,
		};
	}),
);

files.sort((a, b) => a.modifiedAt - b.modifiedAt || a.name.localeCompare(b.name));
await log.debug('files sorted in modification-time order:', files);

for (const [index, file] of files.entries()) {
	await log.debug(`reading file contents: '${file.name}'`);
	const contents = await Deno.readTextFile(file.name);

	if (index > 0) console.log();
	console.log($colors.green('* ' + file.name));
	console.log(contents.replace(/\r?\n$/, ''));
}

if (appUsageError) Deno.exit(1);
