// files: in `which npm.cmd` directory
// pattern: "%_prog%"  "%dp0%\node_modules\rollup\dist\bin\rollup" %*
// regex: "^\s*\x22%_prog%\x22\s+(\x22%dp0%[\\/]node_modules[\\/][^\x22]+\x22)"

// `deno run --allow-... PROG`

// spell-checker:ignore (abbrev/names) Cygwin Deno MSYS SkyPack
// spell-checker:ignore (env) LOGLEVEL
// spell-checker:ignore (jargon) templating
// spell-checker:ignore (libraries) rambda
// spell-checker:ignore (names/people) Frederico Kereki , Packt

// console.warn({ args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

import { $colors, $fs, $lodash as _, $path } from './lib/$deps.ts';
import { decoder, encoder, logger as log } from './lib/$shared.ts';

import { eol as $eol } from '../src/lib/eol.ts';
import { collect, first, map } from './lib/funk.ts';

//===

const logLevelFromEnv = Deno.env.get('LOG_LEVEL') ??
	Deno.env.get('LOGLEVEL') ??
	(Deno.env.get('DEBUG') ? 'debug' : undefined) ??
	undefined;
await log.debug(
	`log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL, LOGLEVEL, and DEBUG)`,
);

const mayBeLogLevelName = logLevelFromEnv &&
	log.getLogLevel(logLevelFromEnv.toLocaleLowerCase())?.levelName;
const logLevel = mayBeLogLevelName || 'note';

log.mergeMetadata({ Filter: { level: logLevel } });
await log.debug(`log level set to '${logLevel}'`);

log.mergeMetadata({
	// Humane: { showLabel: true, showSymbol: false },
	// Humane: { showLabel: false, showSymbol: 'ascii' },
	// Humane: { showLabel: false, showSymbol: 'unicodeDoubleWidth' },
	// Humane: { showLabel: true, showSymbol: 'unicodeDoubleWidth' },
});

await log.resume();

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
@rem:: ref: "https://www.dostips.com/forum/viewtopic.php?f=3&t=5057"
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
