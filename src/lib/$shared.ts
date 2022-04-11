// spell-checker:ignore (env) WSL WSLENV
// spell-checker:ignore (jargon) distro falsey truthy
// spell-checker:ignore (js/ts) gmsu
// spell-checker:ignore (names) Alacritty Cmder ConEmu Deno EditorConfig JSdelivr
// spell-checker:ignore (modules) stringz
// spell-checker:ignore (yargs) positionals

import { $fs, $path } from './$deps.ts';

//===

export const projectName: string | undefined = 'dxx';
export const VERSION = '0.0.14';

// note: `projectURL` has some inherent instability for compiled scripts; this can be mitigated by using a CDN source for the compilation (eg, JSdelivr.net, Statically.io, GitHack.com)
export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath =
	((url: URL) => (url.protocol === 'file:') ? $path.fromFileUrl(url) : url.pathname)(projectURL);
export const projectLocations = {
	benchmarks: $path.join(projectPath, 'bench'),
	editorconfig: $path.join(projectPath, '.editorconfig'),
	examples: $path.join(projectPath, 'eg'),
	readme: $path.join(projectPath, 'README.md'),
	source: $path.join(projectPath, 'src'),
	tests: $path.join(projectPath, 'tests'),
	vendor: $path.join(projectPath, 'vendor'),
	version: $path.join(projectPath, 'VERSION'),
};

// // ToDO: investigate best practice for portability of PATH_SEP_PATTERN // note: WinOS => /[\\/]+/ ; *nix => /\/+/
// // * currently, treating paths as WinOS-compatible with both backslash and forward-slash as path separators (on both WinOS and *nix platforms)
// export const PATH_SEP_PATTERN = /[\\/]+/;

//===

/** Host platform is a Windows OS. */
export const isWinOS = Deno.build.os === 'windows';

// ref: <https://medium.com/deno-the-complete-reference/textencoder-and-textdecoder-in-deno-cfca83be1792> @@ <https://archive.is/tO0rE>
// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder(); // default == 'utf=8'
export const encoder = new TextEncoder(); // *always* 'utf-8'
export const decode = (input?: Uint8Array): string => decoder.decode(input);
export const encode = (input?: string): Uint8Array => encoder.encode(input);

//===

const DQ = '"';
const SQ = "'";

// const DQStringReS = `${DQ}[^${DQ}]*(?:${DQ}|$)`; // double-quoted string (unbalanced at end-of-line is allowed)
// const SQStringReS = `${SQ}[^${SQ}]*(?:${SQ}|$)`; // single-quoted string (unbalanced at end-of-line is allowed)
// const DQStringStrictReS = '"[^"]*"'; // double-quoted string (quote balance is required)
// const SQStringStrictReS = "'[^']*'"; // single-quoted string (quote balance is required)

const deDQStringReS = `${DQ}([^${DQ}]*)(?:${DQ}|$)`; // sub-match/extractor for contents of double-quoted string (unbalanced at end-of-line is allowed)
const deSQStringReS = `${SQ}([^${SQ}]*)(?:${SQ}|$)`; // sub-match/extractor for contents of single-quoted string (unbalanced at end-of-line is allowed)

const deQuoteRx = new RegExp(`([^${DQ}${SQ}]+)|${deDQStringReS}|${deSQStringReS}`, 'gmsu');

// `deQuote()`
/** Remove quotes from text string (`s`). */
export function deQuote(s?: string) {
	if (!s) return s;
	return s.replace(deQuoteRx, '$1$2$3');
}

//===

// `env()`
/** Return the value of the environment variable `varName`; `undefined` if non-existent or not-allowed access (ie, *non-throwing*) */
export function env(varName: string) {
	try {
		return Deno.env.get(varName);
	} catch (_) {
		return undefined;
	}
}

//===

// `isFileURL()`
/** Determine if `url` is a file-type URL (ie, uses the 'file:' protocol), naming a local file resource. */
export function isFileURL(url: URL) {
	return (url.protocol === 'file:');
}

// `isValidURL()`
/** Determine if the supplied text string (`s`) is a valid URL. */
export function isValidURL(s: string, base: URL = $path.toFileUrl(Deno.cwd() + $path.SEP)) {
	return !!validURL(s, base);
}

// `validURL()`
/** Convert the supplied text string (`s`) into a valid URL (or `undefined` if `s` [relative to `base`] isn't a valid URL). */
export function validURL(s: string, base: URL = $path.toFileUrl(Deno.cwd() + $path.SEP)) {
	return intoURL(s, base);
}

//===

// `intoPath()`
/** Extract a path string from a path string (as an identity function) or URL. */
export function intoPath(path?: string | URL) {
	if (!(path instanceof URL)) return path;
	return (path.protocol === 'file:') ? $path.fromFileUrl(path) : path.pathname;
}

// ref: <https://en.wikipedia.org/wiki/Uniform_Resource_Identifier> , <https://stackoverflow.com/questions/48953298/whats-the-difference-between-a-scheme-and-a-protocol-in-a-url>
export type IntoUrlOptions = {
	driveLetterSchemes?: boolean; // interpret single letter URL schemes as drive letters for Windows-style paths
};
const IntoUrlOptionsDefault: Required<IntoUrlOptions> = { driveLetterSchemes: true };

// `intoURL()`
/** Convert a `path` string into an URL, relative to a `base` reference URL.
@param [path]
@param [base] • baseline URL reference point ~ defaults to `$path.toFileUrl(Deno.cwd()+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@param [options] ~ defaults to `{driveLetterSchemes: true}`
*/
export function intoURL(path?: string, base?: URL, options?: IntoUrlOptions): URL | undefined;
export function intoURL(path: string, options: IntoUrlOptions): URL | undefined;
export function intoURL(path?: string, ...args: unknown[]) {
	if (path == undefined) return undefined;
	const base = (args?.length > 0 && (args[0] instanceof URL))
		? args.shift() as URL
		: $path.toFileUrl(Deno.cwd() + $path.SEP);
	const options = {
		...IntoUrlOptionsDefault,
		...(args?.length > 0) ? args.shift() as IntoUrlOptions : {},
	};
	let scheme = (path.match(/^[A-Za-z][A-Za-z0-9+-.]*(?=:)/) || [])[0]; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
	if (options.driveLetterSchemes && scheme?.length == 1) {
		scheme = 'file';
		path = scheme + '://' + path;
	}
	scheme = scheme || 'file';
	// normalize slashes ~ back-slashes to forward & replace all double-slashes with singles except for leading (for WinOS network paths) and those following schemes
	path = path.replaceAll('\\', '/').replaceAll(/(?<!^|[A-Za-z][A-Za-z0-9+-.]*:\/?)\/\/+/gmsu, '/');
	// ref: [File path formats on Windows Systems](https://docs.microsoft.com/en-us/dotnet/standard/io/file-path-formats) @@ <https://archive.is/AOS2n>
	// note: '\\?\...' is equivalent to '\\.\...' for windows paths; '.' is a valid host/hostname, but '?' *is not*
	// # replacing leading DOS device prefix ('//?/') with '//./?/' (reversed upon later extraction with `pathFromURL()`)
	path = path.replace(/^\/\/\?\//, '//./?/');
	if (scheme === 'file') {
		// '%'-encode '?' and '#' characters to avoid URI interpretation as query and/or fragment strings
		path = path.replaceAll(/[%?#]/gmsu, (c) => '%' + c.charCodeAt(0).toString(16));
	}
	// console.warn({ path, base, options });
	try {
		return new URL(path, base);
	} catch (_error) {
		return undefined;
	}
}

export function pathFromURL(url: URL) {
	let path = url.href;
	if (url.protocol === 'file:') {
		// regenerate path from any '%'-encoded characters
		path = path.replaceAll(
			/%([a-fA-F0-9][a-fA-F0-9])/gmsu,
			(_, v) => String.fromCharCode(parseInt(v, 16)),
		);
	}
	// regenerate correct paths for 'file:' protocol
	path = path.replace(/^file:\/\/[.]\/?\//, '\/\/?\/').replace(/^file:\/\/\//, '');
	return path;
}

//===

// `traversal()`
/** Determine the traversal path to `goal` from `base`.
- _Returned path will be relative to `base` iff `goal` shares a common origin/prefix with `base`, o/w it will be an absolute path_
- _Relative `goal` or `base` paths are evaluated as relative to the `Deno.cwd()` directory_
@param [goal] • target path
@param [base] • starting path ~ defaults to `$path.toFileUrl(Deno.cwd()+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
*/
export function traversal(
	goal: string | URL,
	base: string | URL = $path.toFileUrl(Deno.cwd() + $path.SEP),
) {
	const url = (goal instanceof URL) ? goal : intoURL(goal);
	const baseURL = (base instanceof URL) ? base : intoURL(base);
	const commonOrigin = url && baseURL &&
		(url.origin.localeCompare(baseURL.origin, undefined, { sensitivity: 'accent' }) == 0) &&
		(url.protocol.localeCompare(baseURL.protocol, undefined, { sensitivity: 'accent' }) == 0);
	// console.warn({ goal, url, base, baseURL, commonOrigin });
	if (url && baseURL && commonOrigin) {
		const basePath = pathFromURL(baseURL);
		const goalPath = pathFromURL(url);
		const commonPathPrefix = longestCommonPrefix(
			// ToDO: add option to turn on/off file comparison case-sensitivity
			mightUseFileSystemCase() ? basePath : toCommonCase(basePath),
			mightUseFileSystemCase() ? goalPath : toCommonCase(goalPath),
		)
			.replace(/[^\/]*$/, '');
		// console.warn({ basePath, goalPath, commonPathPrefix });
		// console.warn({
		// 	basePathSlice: basePath.slice(commonPathPrefix.length),
		// 	goalPathSlice: goalPath.slice(commonPathPrefix.length),
		// });
		return $path.relative(
			basePath.slice(commonPathPrefix.length),
			goalPath.slice(commonPathPrefix.length),
		);
	} else {
		return url ? url.href : undefined;
	}
}

//===

export function isEmpty(x: unknown) {
	if (x == null) return true;
	if (typeof x === 'function') return true;
	if (typeof x === 'object') {
		if (x.constructor === Object && Object.keys(x).length === 0) {
			return true;
		}
	}
	if ((x as { length: number }).length === 0) return true;
	return false;
}

//===

const falseyValues: string[] = ['', '0', 'f', 'false', 'n', 'no', 'off'];
// const falseyValues: string[] = ['', '0', 'f', 'false', 'n', 'never', 'no', 'none', 'off'];

export type Truthy = false | string;
// `isFalsey()`
export function isFalsey(s: string): boolean {
	return toTruthy(s) == false;
}
// `isTruthy()`
export function isTruthy(s?: string): boolean {
	return toTruthy(s) != false;
}
// `toTruthy()`
export function toTruthy(s?: string): Truthy {
	if (!s || falseyValues.includes(s)) {
		return false;
	}
	return s;
}

//===

// ToDO: investigate [`stringz`](https://github.com/sallar/stringz)

// ref: <https://coolaj86.com/articles/how-to-count-unicode-characters-in-javascript> @@ <https://archive.is/5nzNP>
// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#unicode> @@ <https://archive.is/DdIu6>
// ToDO: benchmark `getCharacterLength()` vs `s.length()`
export function getCharacterLength(s: string) {
	// The string iterator that is used here iterates over characters, not mere UTF-16 code units
	return [...s].length;
}

export function longestCommonPrefix(...arr: string[]) {
	let prefix = '';
	if (arr.length === 0) return prefix;
	if (arr.length === 1) return arr[0];
	for (let i = 0; i < arr[0].length; i++) {
		const char = arr[0][i];
		for (let j = 1; j < arr.length; j++) {
			if (arr[j][i] !== char) return prefix;
		}
		prefix += char;
	}
	return prefix;
}

export function toCommonCase(s: string) {
	return s.toLocaleLowerCase();
}

//===

export function stableSort<T = unknown>(arr: T[], compare: (a: T, b: T) => number) {
	return arr
		.map((item, index) => ({ item, index }))
		.sort((a, b) => compare(a.item, b.item) || a.index - b.index)
		.map(({ item }) => item);
}

//===

function existsSync(path: string) {
	try {
		return $fs.existsSync(path);
	} catch {
		return false;
	}
}

export function firstPathContaining(goal: string, paths: string[]) {
	for (const path of paths) {
		const p = $path.join(path, goal);
		if (existsSync(p)) return path;
	}
}

// function _firstExisting(base: string, paths: string[]) {
// 	for (const path of paths) {
// 		const p = $path.join(path, base);
// 		if (existsSync(p)) return p;
// 	}
// }

// function pathToPOSIX(path: string) {
// 	// normalize to POSIX-type separators (forward slashes)
// 	return path.replaceAll('\\', '/');
// }

// function pathNormalizeSlashes(path: string) {
// 	// normalize to POSIX-type separators (forward slashes)
// 	// * replace all doubled-slashes with singles except for leading (for WinOS network paths) and those following schemes
// 	// * note: 'scheme' is defined per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
// 	return path.replaceAll(/(?<!^|[A-Za-z][A-Za-z0-9+-.]*:\/?)([\\\/])[\\\/]+/gmsu, '$1');
// }

export function pathEquivalent(a?: string, b?: string) {
	// console.warn({ a, b });
	// console.warn({ aURL: intoURL(a), bURL: intoURL(b) });
	return (a === b) || (intoURL(a)?.href === intoURL(b)?.href);
}
//===

// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat>
export function formatDuration(
	durationInMS: number,
	options: Intl.NumberFormatOptions = { minimumFractionDigits: 3, maximumFractionDigits: 5 },
): string {
	const [unit, n] = (durationInMS > 1000) ? ['s', durationInMS / 1000] : ['ms', durationInMS];
	return (new Intl.NumberFormat(undefined, options).format(n)) + ' ' + unit;
}
export function formatN(
	n: number,
	options: Intl.NumberFormatOptions = { minimumFractionDigits: 3, maximumFractionDigits: 5 },
): string {
	return (new Intl.NumberFormat(undefined, options).format(n));
}

export function durationText(tag: string): string | undefined {
	try {
		const performanceEntries = (() => {
			let entries = performance.getEntriesByName(tag, 'mark');
			if (entries.length > 1) return entries;
			entries = entries.concat(performance.getEntriesByName(tag + ':begin'));
			entries = entries.concat(performance.getEntriesByName(tag + ':start'));
			entries = entries.concat(performance.getEntriesByName(tag + ':end'));
			entries = entries.concat(performance.getEntriesByName(tag + ':stop'));
			if (entries.length > 1) return entries;
			return undefined;
		})();
		if ((performanceEntries == undefined) || performanceEntries.length < 2) return undefined;
		const now = performance.now();
		const duration = (performanceEntries.pop()?.startTime ?? now) -
			(performanceEntries.shift()?.startTime ?? now);
		return `${tag} done (duration: ${formatDuration(duration, { maximumFractionDigits: 3 })})`;
	} catch (_) {
		return undefined;
	}
}

//===

// ref: <https://stackoverflow.com/questions/3104410/identify-cygwin-linux-windows-using-environment-variables> , <https://stackoverflow.com/questions/714100/os-detecting-makefile>
// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain>
// ref: [CLI and emojis](https://news.ycombinator.com/item?id=25311114) @@ <https://archive.is/xL2BL>

// `isWSL()`
/** Determine if OS platform is 'Windows Subsystem for Linux'. */
export function isWSL() {
	// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain> @@ <https://archive.is/KWV5a>
	// * POSIX-like and contains one of the WSL signal environment variables
	// FixME!: environment variables are *not* preserved across side-logins (ie, `sudo -i` causes them to disappear)
	// ** likely need to test uname, version, and/or files ... ref: <https://github.com/microsoft/WSL/issues/4555>
	// ** shortcut without touching the file system if the environment variable(s) are present
	// NOTE, in general, for better user usability... (ref: <https://superuser.com/questions/232231/how-do-i-make-sudo-preserve-my-environment-variables>)
	// * add `sudo echo 'Default:%sudo env_keep+="IS_WSL WSLENV WSL_*"' > /etc/sudoers.d/WSL-env_keep` for WSL
	// * add `sudo echo 'Default:%sudo env_keep+="WT_*"' > /etc/sudoers.d/WT-env_keep` for MS Windows Terminal variables
	// * (as an aside...) add `sudo echo 'Default:%sudo env_keep+="LANG LC_*"' > /etc/sudoers.d/SSH-env_keep` for SSH
	return (!isWinOS) &&
		(Boolean(Deno.env.get('IS_WSL')) || Boolean(Deno.env.get('WSL_DISTRO_NAME')));
}

// `canDisplayUnicode()`
/** Determine if unicode display is supported under the current platform and console constraint. */
export function canDisplayUnicode() {
	if (!isWinOS) {
		// POSIX-like
		// ref: <https://stackoverflow.com/questions/3104410/identify-cygwin-linux-windows-using-environment-variables> , <https://stackoverflow.com/questions/714100/os-detecting-makefile>
		// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain>
		const isOldTerminal = ['cygwin', 'linux'].includes(Deno.env.get('TERM') ?? '');
		const isWSL_ = isWSL();
		return !isOldTerminal && // fail for old terminals
		(( // * not isWSL
			!isWSL_ &&
			Boolean(
				Deno
					.env
					.get('LC_ALL')
					?.match(/[.]utf-?8$/i) || Deno.env.get('LANG')?.match(/[.]utf-?8$/i),
			) /* LC_ALL or LANG handles UTF-8? */
		) || ( // * isWSL
			isWSL_ && Boolean(Deno.env.get('WT_SESSION')) // only MS Windows Terminal is supported; 'alacritty' and 'ConEmu/cmder' hosts not detectable
		));
	}

	// WinOS
	// note: 'alacritty' will, by default, set TERM to 'xterm-256color'
	return (['alacritty', 'xterm-256color'].includes(Deno.env.get('TERM') ?? '')) || // [alacritty](https://github.com/alacritty/alacritty)
		Boolean(Deno.env.get('ConEmuPID')) || // [ConEmu](https://conemu.github.io) and [cmder](https://cmder.net)
		Boolean(Deno.env.get('WT_SESSION')); // MS Windows Terminal
}

export function mightUseColor() {
	// respects `NO_COLOR` env var override; use 'truthy' values?
	// ref: <https://no-color.org> @@ <https://archive.is/Z5N1d>
	return !(Deno.env.get('NO_COLOR'));
}

export function mightUseFileSystemCase() {
	// * respects `USE_FS_CASE` env var override (for WinOS); use 'truthy' values?
	// POSIX is case-sensitive
	// WinOS is *usually* (~99+%) case-insensitive/case-preserving, but *can* be case-sensitive (on a directory-by-directory basis)
	// ref: <https://stackoverflow.com/questions/7199039/file-paths-in-windows-environment-not-case-sensitive> @@ <https://archive.is/i0xzb>
	// ref: <https://nodejs.org/en/docs/guides/working-with-different-filesystems> @@ <https://archive.is/qSRjE>
	// ref: <https://en.wikipedia.org/wiki/Filename> @@ <https://archive.is/cqe6g>
	return !isWinOS /* assumed to be POSIX-like */ || !(Deno.env.get('USE_FS_CASE'));
}

export function mightUseUnicode() {
	// respects `NO_UNICODE` and `USE_UNICODE` env var overrides (in that order of priority); use 'truthy' values?
	if (Deno.env.get('NO_UNICODE')) return false;
	if (Deno.env.get('USE_UNICODE')) return true;
	return canDisplayUnicode();
}

//===

// note: defined here to avoid circular dependency

// VERSION handler

// `fetch()` implementation (requires read [for local runs] or network permissions)
import { fetch } from './xFetch.ts'; // 'file://'-compatible `fetch()`

// import { intoURL, projectLocations, projectURL } from '../../tests/$shared.ts';
// import { logger } from '../../tests/$shared.ts';

const newline = /\r?\n|\n/;
const versionURL = intoURL(projectLocations.version, projectURL);

// logger.trace({ projectURL, projectLocations, versionURL });

// projectVersionText == first non-empty line (EOL trimmed) from VERSION
const projectVersionTextViaFetch =
	await (versionURL
		? (fetch(versionURL).then((resp) => resp.ok ? resp.text() : undefined).then((text) =>
			text?.split(newline).filter((s) => s)[0]
		))
		: Promise.resolve(undefined));

// `import ...` implementation (note: requires project-level synchronization tooling)
const projectVersionTextViaImport = VERSION;

function v() {
	return projectVersionTextViaImport;
}

export const $version = { versionURL, projectVersionTextViaFetch, projectVersionTextViaImport, v };

//=== * logger

export * as $logger from './axe/$mod.ts';

//===

import * as $logger from './axe/$mod.ts';

$logger.logger.suspend(); // initialize common/global logger to 'suspended' state to allow for local module use without unwanted outputs
export const logger = $logger.logger; // export logger (note: in the *suspended state*)
