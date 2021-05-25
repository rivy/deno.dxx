// files: in `which npm.cmd` directory
// pattern: "%_prog%"  "%dp0%\node_modules\rollup\dist\bin\rollup" %*
// regex: "^\s*\x22%_prog%\x22\s+(\x22%dp0%[\\/]node_modules[\\/][^\x22]+\x22)"

// `deno run --allow-... PROG`

// spell-checker:ignore (abbrev/names) Cygwin MSYS SkyPack
// spell-checker:ignore (jargon) templating
// spell-checker:ignore (libraries) rambda
// spell-checker:ignore (names/people) Frederico Kereki , Packt
// spell-checker:ignore (shell/cmd) COMSPEC PATHEXT

console.log({ args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

import * as path from 'https://deno.land/std@0.83.0/path/mod.ts';

// import * as fs from 'https://deno.land/std@0.83.0/fs/mod.ts';
import { exists, existsSync } from 'https://deno.land/std@0.83.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.83.0/fs/expand_glob.ts';
const fs = { exists, existsSync, expandGlob, expandGlobSync };

import { collect, first, map } from './lib/funk.ts';

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

import { eol } from '../src/lib/eol.ts';

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
	for (const path_ of paths) {
		for (const extension of extensions) {
			const p = path.join(path_, name) + extension;
			if ((await fs.exists(p)) && (isWinOS || ((await Deno.lstat(p)).mode || 0) & 0o111)) {
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
const npmBinPath = npmPath ? path.dirname(npmPath) : void 0;

if (npmBinPath) {
	Deno.stdout.writeSync(
		encoder.encode('`npm` binaries folder found at "' + npmBinPath + '"' + '\n'),
	);
} else {
	Deno.stderr.writeSync(encoder.encode('`npm` binaries folder not found\n'));
	Deno.exit(1);
}

// ref: [deno issue ~ add `caseSensitive` option to `expandGlob`](https://github.com/denoland/deno/issues/9208)
// ref: [deno/std ~ `expandGlob` discussion](https://github.com/denoland/deno/issues/1856)
// const files = await collect(fs.expandGlob(path.join(npmBinPath, '*.cmd')));
const files = fs.expandGlob(path.join(npmBinPath, '*.cmd'));

const updates = await collect(map(async function (file) {
	const name = file.path;
	const contentsOriginal = eol.LF(decoder.decode(await Deno.readFile(name)));
	const targetBinPath = (contentsOriginal
		.match(/^[^\S\n]*\x22%_prog%\x22\s+\x22([^\x22]*)\x22.*$/m) || [])[1] || undefined;
	const targetBinName = targetBinPath
		? path.parse(targetBinPath).name
		: undefined;
	const contentsUpdated = eol.CRLF(_.template(cmdShimTemplate)({ targetBinName, targetBinPath }));
	return { name, targetBinPath, contentsOriginal, contentsUpdated };
}, files));

for await (const update of updates) {
	// if (options.debug) {
	// 	console.log({ update });
	// }
	if (update.targetBinPath) {
		Deno.stdout.writeSync(encoder.encode(path.basename(update.name) + '...'));
		Deno.writeFileSync(update.name, encoder.encode(update.contentsUpdated));
		Deno.stdout.writeSync(encoder.encode('updated' + '\n'));
	}
}
