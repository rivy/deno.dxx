<1> /*! :: note: TypeScript-only chimera lead-in which is *preserved* after reformatting by deno/dprint
@::# --* typescript *--
@::# (emacs/sublime) -*- mode: typescript; coding: dos; -*-
@::# spell-checker:ignore (names) Deno ; (shell/CMD) ERRORLEVEL
@set "ERRORLEVEL=" &@:: reset ERRORLEVEL (defensive avoidance of any prior pinned value)
@set "SHIM_ERRORLEVEL=" &@:: SHIM_ERRORLEVEL, upon script completion, will be equal to final ERRORLEVEL; * side-effect of proper return of process and script error levels
@setLocal
@set SHIM_RUNNER=deno.exe "run" --allow-all --no-prompt --quiet --
@if DEFINED SHIM_TARGET if "%SHIM_TARGET%"=="%~f0" goto :post_SHIM_args_setup
@set SHIM_ARGS=%*
@set "SHIM_ARG0=%~0"
@:post_SHIM_args_setup
@set "SHIM_ORIGIN=%~f0"
@set "SHIM_TARGET=%~f0.$deno$ext.ts"
@copy /y "%SHIM_ORIGIN%" "%SHIM_TARGET%" >NUL
@deno.exe fmt "%SHIM_TARGET%" >NUL 2>NUL &@:: HACK: (optional) quick conversion to LF EOLs to avoid error/panic source map bug (see https://github.com/denoland/deno/issues/16815)
@set "SHIM_EXEC=%~f0.$shim$exec.cmd"
@> "%SHIM_EXEC%" echo @rem # `%~0 %SHIM_ARGS%`
@>>"%SHIM_EXEC%" echo @setLocal
@>>"%SHIM_EXEC%" echo @set DENO_NO_PROMPT=1 ^&:: suppress default (0ugly UI/UX) prompting behavior in favor of panics for insufficient permissions
@>>"%SHIM_EXEC%" echo @set DENO_NO_UPDATE_CHECK=1 ^&:: suppress annoying/distracting/useless-for-non-dev Deno notifications
@>>"%SHIM_EXEC%" echo @(goto) 2^>NUL ^|^| @for %%%%G in ("%COMSPEC%") do @title %%%%~nG ^& @%SHIM_RUNNER% "%SHIM_TARGET%" %SHIM_ARGS%
@(endLocal
@(goto) 2>NUL
@for %%G in ("%COMSPEC%") do @title %%~nG
@set "SHIM_ARG0=%SHIM_ARG0%"
@set "SHIM_ARGS=%SHIM_ARGS%"
@set "SHIM_EXEC=%SHIM_EXEC%"
@set "SHIM_TARGET=%SHIM_TARGET%"
@call "%SHIM_EXEC%"
@call set SHIM_ERRORLEVEL=%%ERRORLEVEL%%
@if DEFINED SHIM_DEBUG echo SHIM_EXEC="%SHIM_EXEC%" 1>&2
@if DEFINED SHIM_DEBUG echo SHIM_TARGET="%SHIM_TARGET%" 1>&2
@if EXIST "%SHIM_EXEC%" if NOT DEFINED SHIM_DEBUG del /q "%SHIM_EXEC%" 2>NUL
@if EXIST "%SHIM_TARGET%" if NOT DEFINED SHIM_DEBUG del /q "%SHIM_TARGET%" 2>NUL
@set "SHIM_ARG0="
@set "SHIM_ARGS="
@set "SHIM_EXEC="
@set "SHIM_TARGET="
@call %COMSPEC% /d/c "exit %%SHIM_ERRORLEVEL%%" || set "SHIM_ERRORLEVEL="
)
@
*/ 0;

// spell-checker:ignore () LogLevel
// spell-checker:ignore () nightside

// console.warn("Hello (via Deno)!");
// console.warn({ args: Deno.args, main: Deno.mainModule, meta: import.meta });
// console.warn({ SHIM: Object.entries(Deno.env.toObject()).filter((v) => v[0].startsWith('SHIM_')) });
// throw 'error';
// Deno.exit(1010);

import { $path } from '../src/lib/$deps.ts';
import { $me } from '../src/lib/$locals.ts';
import { abortIfMissingPermits, env, isWinOS } from '../src/lib/$shared.ts';

import { $logger, logger as log } from '../src/lib/$shared.ts';

//===

await abortIfMissingPermits(([] as Deno.PermissionName[]).concat(
	['env'], // required shim/process argument expansion and environmental controls (eg, using DEBUG, LOG_LEVEL, NO_COLOR, NO_UNICODE, NULLGLOB, ...)
	['read'], // required for shim targeting of argument expansion and 'yargs'
	['run'], // (optional) required for consoleSize fallback when stdin and stderr are both redirected
));

//===

log.mergeMetadata({ authority: /* $me.name */ 'condense' });

log.debug(`logging to *STDERR*`);

$me.warnIfImpaired((s) => log.warn(s));
log.trace({ $me });

const logLevel = $logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined);
await log.debug(
	`log level of '${logLevel}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);
log.mergeMetadata({ Filter: { level: logLevel } });
await log.debug(`log level set to '${logLevel}'`);

await log.resume();

//====

import { existsSync as existsSync_ } from 'https://deno.land/std@0.161.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.161.0/encoding/yaml.ts';
import { readLines } from 'https://deno.land/std@0.161.0/io/mod.ts';

function existsSync(filePath: string | URL) {
	// * suppress further deprecation complaints
	return existsSync_(filePath);
}

function pathJoin(...paths: (string | undefined)[]) {
	const p = paths.filter(Boolean) as string[];
	try {
		return $path.join(...p);
	} catch (_) {
		return undefined;
	}
}

interface IVividTheme {
	colors: { [name: string]: string };
}

/** * priority list of possible configuration directories */
const maybeConfigDirs = [
	Deno.env.get('XDG_CONFIG_HOME') ?? '',
	...((Deno.env.get('XDG_CONFIG_DIRS')?.split(';')) ?? []),
	// * `vivid`-specific configuration locations
	Deno.env.get('HOME') ? pathJoin(Deno.env.get('HOME') + '.config') : '',
	isWinOS ? Deno.env.get('APPDATA') : '',
	'/usr/share',
];
const vividConfigDirPath = maybeConfigDirs.map((v) => pathJoin(v, 'vivid'))
	.filter((v) => v && existsSync(v))
	.shift();
const vividThemePath = pathJoin(vividConfigDirPath, 'themes');
log.debug({ maybeConfigDirs, vividConfigDirPath, vividThemePath });

const themeName = $me.args()[0] ?? 'humanity-nightside';
const themePath = [
	pathJoin(vividThemePath, themeName + '.yaml'),
	pathJoin(vividThemePath, themeName + '.yml'),
].filter((v) => v && existsSync(v)).shift();
log.debug({ themeName, themePath });

const text = Deno.readTextFileSync(themePath ?? '');
const theme = parse(text) as IVividTheme;
log.trace({ text, theme });

function colorToAnsiRGB(hexRGB: string) {
	return hexRGB.match(/.{2}/g)?.map((v) => parseInt(v, 16)) ?? [];
}

const proxy = new Proxy(theme.colors, {
	get: function (obj, prop) {
		return (typeof prop !== 'symbol') ? obj[prop.toLowerCase()] : undefined;
	},
	set: function (obj, prop, value) {
		if (typeof prop !== 'symbol') {
			obj[prop.toLowerCase()] = value;
			return true;
		}
		return false;
	},
});

const ansiColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']; // three-bit colorspace; in standard RGB order
const ansiColorBase = 30;
const ansiColorBackgroundDelta = (40 - ansiColorBase);
const ansiColorBrightDelta = (90 - ansiColorBase);
const ansiColorCodeBG = 4;

const colorReplacements = {} as Record<string, number>;
// * eg, colorReplacements['R;G;B'] = 30; // black
// normal or "dark"
ansiColors.forEach((name, idx) => {
	const maybeNames = [name, 'dark' + name, 'dark_' + name];
	const value = maybeNames.map((v) => proxy[v]).filter(Boolean).shift();
	if (value != null) {
		const key = colorToAnsiRGB(value).join(';');
		colorReplacements[key] = ansiColorBase + idx;
	}
});
// "bright" or "alt"
ansiColors.forEach((name, idx) => {
	const maybeNames = ['bright' + name, 'bright_' + name, 'alt' + name, 'alt_' + name];
	const value = maybeNames.map((v) => proxy[v]).filter(Boolean).shift();
	if (value != null) {
		const key = colorToAnsiRGB(value).join(';');
		colorReplacements[key] = ansiColorBase + idx + ansiColorBrightDelta;
	}
});
// console.warn({ theme, colorReplacements });

const input = [];
for await (const line of readLines(Deno.stdin)) input.push(line);

const s = input
	.join()
	.replaceAll('=0;', '=')
	.replaceAll(
		/(?<=[=;])([34])8;2;([0-9]+;[0-9]+;[0-9]+)(?=[^0-9])/g,
		(match, encodedBgOrFg, key /* ANSI RGB  */) => {
			// console.warn({match, encodedBgOrFg, key, base_replacement: colorReplacements[key]});
			if (colorReplacements[key] == null) {
				return match;
			} else {
				const delta = (Number(encodedBgOrFg) === ansiColorCodeBG) ? ansiColorBackgroundDelta : 0;
				return (colorReplacements[key] + delta).toString();
			}
		},
	)
	.split(':')
	.sort()
	.join(':');

console.log(s);
