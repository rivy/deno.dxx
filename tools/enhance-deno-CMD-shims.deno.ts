// files: in Deno install root 'bin' directory
// pattern: `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
// regex: /^@deno[.]exe\s+\x22run\x22\s+(\x22.*\x22)\s+(\x22[^\x22]*\x22)\s+%*.*$/m

// `deno run --allow-... PROG`

// spell-checker:ignore (abbrev/names) Deno Packt SkyPack
// spell-checker:ignore (env) LOGLEVEL
// spell-checker:ignore (jargon) globstar templating
// spell-checker:ignore (libraries) rambda
// spell-checker:ignore (people) Frederico Kereki
// spell-checker:ignore (shell/cmd) COMSPEC ERRORLEVEL PATHEXT

import OSPaths from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';

import { $colors, $fs, $lodash as _, $path, $xWalk } from './lib/$deps.ts';
import { decoder, encoder, logger } from './lib/$shared.ts';

import { eol as $eol } from '../src/lib/eol.ts';
import { collect, filter, map } from './lib/funk.ts';

const enablePipe = true;
const forceUpdate = true;

//===

// log.debug({ args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

const logLevelFromEnv = Deno.env.get('LOG_LEVEL') ??
	Deno.env.get('LOGLEVEL') ??
	(Deno.env.get('DEBUG') ? 'debug' : undefined) ??
	undefined;
await logger.debug(
	`log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL, LOGLEVEL, and DEBUG)`,
);

const mayBeLogLevelName = logLevelFromEnv &&
	logger.logLevelDetail(logLevelFromEnv.toLocaleLowerCase())?.levelName;
const logLevel = mayBeLogLevelName || 'note';

logger.mergeMetadata({ Filter: { level: logLevel } });
await logger.debug(`log level set to '${logLevel}'`);

logger.mergeMetadata({
	// Humane: { showLabel: true, showSymbol: false },
	// Humane: { showLabel: false, showSymbol: 'ascii' },
	// Humane: { showLabel: false, showSymbol: 'unicodeDoubleWidth' },
	// Humane: { showLabel: true, showSymbol: 'unicodeDoubleWidth' },
});

await logger.resume();

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
	await logger.info(`\`deno\` binaries folder found at ${denoInstallRoot}\n`);
} else {
	await logger.error('`deno` binaries folder not found\n');
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
	await logger.debug({ update });
	const name = $path.basename(update.shimPath);
	if (!update.isEnhanced || forceUpdate) {
		Deno.stdout.writeSync(encoder.encode(`'${name}'...`));
		Deno.writeFile(update.shimPath, encoder.encode(update.contentsUpdated));
		Deno.stdout.writeSync(encoder.encode($colors.green('updated') + '\n'));
	} else if (update.isEnhanced) {
		Deno.stdout.writeSync(encoder.encode(`'${name}'...${$colors.blue('up-to-date')}\n`));
	}
}
