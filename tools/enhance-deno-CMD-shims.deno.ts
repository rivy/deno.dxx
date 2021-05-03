// files: in Deno install root 'bin' directory
// pattern: `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
// regex: /^@deno[.]exe\s+\x22run\x22\s+(\x22.*\x22)\s+(\x22[^\x22]*\x22)\s+%*.*$/m

// `deno run --allow-... PROG`

// spell-checker:ignore (abbrev/names) Cygwin MSYS SkyPack
// spell-checker:ignore (jargon) globstar templating
// spell-checker:ignore (libraries) rambda
// spell-checker:ignore (names/people) Frederico Kereki , Packt
// spell-checker:ignore (shell/cmd) COMSPEC ERRORLEVEL PATHEXT
// spell-checker:ignore (words) occurences

import * as Path from 'https://deno.land/std@0.83.0/path/mod.ts';
import OsPaths from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';

// import * as fs from 'https://deno.land/std@0.83.0/fs/mod.ts'; // avoid; uses unstable API
import { exists, existsSync } from 'https://deno.land/std@0.83.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.83.0/fs/expand_glob.ts';
import { walk, walkSync } from 'https://deno.land/std@0.83.0/fs/walk.ts';
const fs = { exists, existsSync, expandGlob, expandGlobSync, walk, walkSync };

import { collect, filter, map } from './lib/funk.ts';

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
import * as _ from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';

const decoder = new TextDecoder(); // default == 'utf-8'
const encoder = new TextEncoder(); // default == 'utf-8'

const cmdShimBase = `% \`<%=shimBinName%>\` (*enhanced* Deno CMD shim; by \`dxi\`) %
@rem:: spell-checker:ignore (shell/CMD) COMSPEC ERRORLEVEL ; (deno) Deno hrtime ; (bin) <%=shimBinName%> <%=denoRunTarget%>
@set "ERRORLEVEL="
@set "DENO_SHIM_ERRORLEVEL="
@setLocal
@set "DENO_SHIM_PIPE="
@set "DENO_SHIM_ARGS="
@set "DENO_SHIM_ARGx="
@set "DENO_SHIM_URL="
@:...prep...
@:launch
@rem:: DENO_SHIM_EXEC convolution is to avoid \`%*\` within the final parse group [o/w args with parentheses cause parsing misbehavior]
@>>"%DENO_SHIM_EXEC%" echo @set DENO_SHIM_ARGS=%*
@>>"%DENO_SHIM_EXEC%" echo @goto _undef_ 2^>NUL ^|^| @for %%%%G in ("%COMSPEC%") do @title %%%%~nG ^& @deno.exe "run" <%= denoRunOptions ? (denoRunOptions + ' ') : '' %>-- <%=denoRunTarget%> %%DENO_SHIM_ARGS%%
@(
@goto _undef_ 2>NUL
@for %%G in ("%COMSPEC%") do @title %%~nG
@set "DENO_SHIM_EXEC=%DENO_SHIM_EXEC%"
@set "DENO_SHIM_PIPE=%DENO_SHIM_PIPE%"
@set DENO_SHIM_ARG0=%~0
@set DENO_SHIM_URL=<%=denoRunTarget%>
@call "%DENO_SHIM_EXEC%"
@call set DENO_SHIM_ERRORLEVEL=%%ERRORLEVEL%%
@if EXIST "%DENO_SHIM_PIPE%" call "%DENO_SHIM_PIPE%" >NUL 2>NUL
@if EXIST "%DENO_SHIM_EXEC%" if NOT DEFINED DENO_SHIM_DEBUG del /q "%DENO_SHIM_EXEC%" 2>NUL
@if EXIST "%DENO_SHIM_PIPE%" if NOT DEFINED DENO_SHIM_DEBUG del /q "%DENO_SHIM_PIPE%" 2>NUL
@set "DENO_SHIM_EXEC="
@set "DENO_SHIM_PIPE="
@set "DENO_SHIM_ARG0="
@set "DENO_SHIM_ARGS="
@set "DENO_SHIM_ARGx="
@set "DENO_SHIM_URL="
@call %COMSPEC% /d/c "exit %%DENO_SHIM_ERRORLEVEL%%"
)
`;
const cmdShimPrepPipe = `@:pipeEnabled
@:prep
@set "RANDOM=" &:: remove any cloak from dynamic variable RANDOM
@if NOT DEFINED TEMP @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @goto :launch
@set DENO_SHIM_TID=%RANDOM%.%RANDOM%.%RANDOM%
@set DENO_SHIM_EXEC=%TEMP%\\<%=shimBinName%>.shim.exec.%DENO_SHIM_TID%.cmd
@set DENO_SHIM_PIPE=%TEMP%\\<%=shimBinName%>.shim.pipe.%DENO_SHIM_TID%.cmd
@if EXIST "%DENO_SHIM_EXEC%" @goto :prep
@if EXIST "%DENO_SHIM_PIPE%" @goto :prep
@if DEFINED DENO_SHIM_EXEC echo @rem \`<%=shimBinName%>\` shell exec > "%DENO_SHIM_EXEC%"
@if DEFINED DENO_SHIM_PIPE echo @rem \`<%=shimBinName%>\` shell pipe > "%DENO_SHIM_PIPE%"`;
const cmdShimPrepNoPipe = `@:pipeDisabled
@:prep
@set "RANDOM=" &:: remove any cloak from dynamic variable RANDOM
@if NOT DEFINED TEMP @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @goto :launch
@set DENO_SHIM_TID=%RANDOM%.%RANDOM%.%RANDOM%
@set DENO_SHIM_EXEC=%TEMP%\\<%=shimBinName%>.shim.exec.%DENO_SHIM_TID%.cmd
@if EXIST "%DENO_SHIM_EXEC%" @goto :prep
@if DEFINED DENO_SHIM_EXEC echo @rem \`<%=shimBinName%>\` shell exec > "%DENO_SHIM_EXEC%"`;

const enablePipe = true;
const forceUpdate = true;

const cmdShimTemplate = cmdShimBase.replace(
	'@:...prep...',
	enablePipe ? cmdShimPrepPipe : cmdShimPrepNoPipe,
);

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
	return Path.join(...(paths as string[])); // noSonar // false positive ("assertion not necessary"); ref: <https://github.com/SonarSource/SonarJS/issues/1961>
}

import { eol } from './lib/EOL.ts';

const denoInstallRoot = joinFullyDefinedPaths(
	Deno.env.get('DENO_INSTALL_ROOT') ?? joinFullyDefinedPaths(OsPaths.home(), '.deno'),
	'bin',
);

if (denoInstallRoot && fs.existsSync(denoInstallRoot)) {
	Deno.stdout.writeSync(
		encoder.encode('`deno` binaries folder found at "' + denoInstallRoot + '"\n'),
	);
} else {
	Deno.stderr.writeSync(encoder.encode('ERR!: `deno` binaries folder not found\n'));
	Deno.exit(1);
}

// ref: [deno issue ~ add `caseSensitive` option to `expandGlob`](https://github.com/denoland/deno/issues/9208)
// ref: [deno/std ~ `expandGlob` discussion](https://github.com/denoland/deno/issues/1856)

function disableWinGlobEscape(s: string) {
	// * disable '`' escape character (by escaping all occurences)
	const winGlobEscapeChar = '`';
	return s.replace(winGlobEscapeChar, winGlobEscapeChar + winGlobEscapeChar);
}

const cmdGlob = '*.cmd';
// configure regex (`[\\/]` as path separators, no escape characters (use character sets (`[..]`)instead) )
const re = new RegExp(
	// Path.globToRegExp(cmdGlob, { extended: true, globstar: true, os: 'windows' }),
	Path
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
	fs.walkSync(denoInstallRoot + '/.', {
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

const updates = await collect(map(async function (fileEntry) {
	const shimPath = fileEntry.path;
	const contentsOriginal = eol.LF(decoder.decode(await Deno.readFile(shimPath)));

	// heuristic match for enhanced shim
	// spell-checker:ignore () ined
	const isEnhanced = contentsOriginal.match(/goto\s+[\W_]*undef(?:ined)?[\W_]*\s+2\s*>\s*NUL/i) ||
		contentsOriginal.match(/shim\s*;\s*by\s*`?dxi`?/i);

	const reMatchArray = contentsOriginal.match(
		// eg, `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
		/^(.*?)@\x22?deno(?:[.]exe)?\x22?\s+\x22?run\x22?\s+(.*\s+)?(\x22[^\x22]*\x22)\s+%*.*$/m,
	) || [];
	const [_match, _denoCommandPrefix, denoRunOptionsRaw, denoRunTarget] = reMatchArray;

	const denoRunOptions = (denoRunOptionsRaw || '')
		.replace(/((^|\s+)\x22?--\x22?)+(\s|$)/g, ' ') // remove any "--" (quoted or not); avoids collision with "--" added by template
		.replace(/^\s+/m, '') // remove leading whitespace
		.replace(/\s+$/m, ''); // remove trailing whitespace
	const shimBinName = Path.parse(shimPath).name;
	const contentsUpdated = eol.CRLF(
		_.template(cmdShimTemplate)({ denoRunOptions, denoRunTarget, shimBinName }),
	);
	return { shimPath, isEnhanced, contentsUpdated, denoRunOptions, contentsOriginal };
}, fileEntries));

for await (const update of updates) {
	// if (options.debug) {
	console.log({ update });
	// console.log(update.contentsUpdated);
	// }
	if (!update.isEnhanced || forceUpdate) {
		Deno.stdout.writeSync(encoder.encode(Path.basename(update.shimPath) + '...'));
		Deno.writeFileSync(update.shimPath, encoder.encode(update.contentsUpdated));
		Deno.stdout.writeSync(encoder.encode('updated' + '\n'));
	}
}
