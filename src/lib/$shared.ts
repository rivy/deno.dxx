//== * SHARED exports

// spell-checker:ignore (fns) chdir
// spell-checker:ignore (env) WSL WSLENV
// spell-checker:ignore (jargon) distro falsey truthy
// spell-checker:ignore (js/ts) gmsu
// spell-checker:ignore (names) Alacritty Cmder ConEmu Deno EditorConfig JSdelivr
// spell-checker:ignore (modules) stringz
// spell-checker:ignore (yargs) positionals

import { $colors, $fs, $path } from './$deps.ts';
import { atImportPermissions } from './$shared.TLA.ts';

//===

export const projectName: string | undefined = 'dxx';
export const VERSION = '0.0.15';

// note: `projectURL` has some inherent instability for compiled scripts; this can be mitigated by using a CDN source for the compilation (eg, JSdelivr.net, Statically.io, GitHack.com)
export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath = pathFromURL(projectURL);
export const projectLocations = {
	benchmarks: (new URL('bench', projectURL)),
	editorconfig: (new URL('.editorconfig', projectURL)),
	examples: (new URL('eg', projectURL)),
	readme: (new URL('README.md', projectURL)),
	source: (new URL('src', projectURL)),
	tests: (new URL('tests', projectURL)),
	vendor: (new URL('vendor', projectURL)),
	version: (new URL('VERSION', projectURL)),
};

// // ToDO: investigate best practice for portability of PATH_SEP_PATTERN // note: WinOS => /[\\/]+/ ; *nix => /\/+/
// // * currently, treating paths as WinOS-compatible with both backslash and forward-slash as path separators (on both WinOS and *nix platforms)
// export const PATH_SEP_PATTERN = /[\\/]+/;

//===

// export const atImportPermissions = await permitsAsync();

/** Host platform is a Windows OS. */
export const isWinOS = Deno.build.os === 'windows';

// ref: <https://medium.com/deno-the-complete-reference/textencoder-and-textdecoder-in-deno-cfca83be1792> @@ <https://archive.is/tO0rE>
// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder(); // default == 'utf-8'
export const encoder = new TextEncoder(); // *always* 'utf-8'
export const decode = (input?: Uint8Array): string => decoder.decode(input);
export const encode = (input?: string): Uint8Array => encoder.encode(input);

//=== * stack inspection functions

function getFramesFromError(error: Error): Array<string> {
	let stack: Error['stack'] | null, frames: string[];
	// retrieve stack from `Error`
	// ref: <https://github.com/winstonjs/winston/issues/401#issuecomment-61913086>
	try {
		stack = error.stack;
	} catch (e) {
		try {
			const previous = e.__previous__ || e.__previous;
			stack = previous && previous.stack;
		} catch (_) {
			stack = null;
		}
	}

	// handle different stack formats
	if (stack) {
		if (Array.isArray(stack)) {
			frames = Array(stack);
		} else {
			frames = stack.toString().split('\n');
		}
	} else {
		frames = [];
	}

	// console.debug({ stack, frames });
	return frames;
}

function stackTrace() {
	// ref: <https://stackoverflow.com/questions/591857/how-can-i-get-a-javascript-stack-trace-when-i-throw-an-exception>
	// ref: [`get-current-line`](https://github.com/bevry/get-current-line/blob/9364df5392c89e9540314787493dbe142e8ce99d/source/index.ts)
	return getFramesFromError(new Error('stack trace'));
}

export function callersFromStackTrace() {
	const callers = stackTrace()
		.slice(1)
		.map((s) => {
			const match = s.match(/^.*\s[(]?(.*?)[)]?$/m);
			if (!match) return undefined;
			else return match[1];
		})
		.filter(Boolean);
	return callers;
}

//====

export async function havePermit(permitName: Deno.PermissionName) {
	const names = [permitName];
	const permits = (await Promise.all(names.map((name) => Deno.permissions?.query({ name })))).map((
		e,
	) => e ?? { state: 'granted', onchange: null });
	const allGranted = !(permits.find((permit) => permit.state !== 'granted'));
	return allGranted;
}

export async function haveAllPermits(permitNames: Deno.PermissionName[]) {
	const permits = (await Promise.all(permitNames.map((name) => Deno.permissions?.query({ name }))))
		.map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !(permits.find((permit) => permit.state !== 'granted'));
	return allGranted;
}

export async function haveMissingPermits(permitNames: Deno.PermissionName[] = []) {
	// ToDO: [2023-09-09; rivy] consider deduplication of `permitNames` contents
	const permits = (await Promise.all(permitNames.map((name) => Deno.permissions?.query({ name }))))
		.map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !(permits.find((permit) => permit.state !== 'granted'));
	return !allGranted;
}

function composeMissingPermitsMessage(permitNames: Deno.PermissionName[] = []) {
	/** Sorted, non-duplicated, permission names (used for flag generation) */
	const flagNames = (permitNames.length > 0) ? [...new Set(permitNames.sort())] : ['all'];
	const msg =
		`Missing required permissions; re-run with required permissions (${(flagNames
			.map((name) => $colors.green('`--allow-' + name + '`'))
			.join(', '))})`;
	return msg;
}

export async function abortIfMissingPermits(
	permitNames: Deno.PermissionName[] = [],
	options?: { exitCode?: number; label?: string; writer?: (...args: unknown[]) => void },
) {
	options = (options != null) ? options : {};
	options.exitCode ??= 1;
	// const callers = callersFromStackTrace();
	// const top = callers[callers.length - 1];
	// const url = top?.replace(/(:\d+:\d+)$/, ''); // remove trailing position info (LINE_N:CHAR_POSITION)
	// const name = $path.parse(url ?? '').name;
	if (options.writer == null) {
		options.writer = (args) =>
			console.warn(
				$colors.bgRed($colors.bold(` ${options?.label ? (options.label + ':') : ''}ERR! `)),
				$colors.red('*'),
				args,
			);
	}
	// console.warn({ options });
	// console.warn({ callers, top, url, name });
	if (await haveMissingPermits(permitNames)) {
		options.writer(composeMissingPermitsMessage(permitNames));
		Deno.exit(options.exitCode);
	}
}

export async function panicIfMissingPermits(permitNames: Deno.PermissionName[] = []) {
	if (await haveMissingPermits(permitNames)) {
		const err = new Error(composeMissingPermitsMessage(permitNames));
		err.stack = undefined;
		throw (err);
	}
}

//===

const DQ = '"';
const SQ = `'`;

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
/** Return the value of the environment variable `varName` (or `undefined` if non-existent or not-allowed access).
 * - will *not panic*
 * - will *not prompt* for permission if `options.guard` is `true`
@param `options``.guard` • verify unrestricted environment access permission *at time of module import* prior to access attempt (avoids Deno prompts/panics); defaults to `true`
 */
export function env(varName: string, options?: { guard: boolean }) {
	const guard = (options != null) ? options.guard : true;
	const useDenoGet = !guard || (atImportPermissions.env.state === 'granted');
	try {
		return useDenoGet ? Deno.env.get(varName) : undefined;
	} catch (_) {
		return undefined;
	}
}

// `envAsync()`
/** Return the current value of the environment variable `varName` (or `undefined` if non-existent or not-allowed access).
 * - will *not panic*
 * - will *not prompt* for permission if `options.guard` is `true`
@param `options``.guard` • verify current and name-specific environment access permission prior to access attempt (avoids Deno prompts/panics); defaults to `true`
*/
export async function envAsync(varName: string, options?: { guard: boolean }) {
	const guard = (options != null) ? options.guard : true;
	const useDenoGet = !guard ||
		((await (Deno.permissions?.query({ name: 'env', variable: varName }))).state ?? 'granted') ===
			'granted';
	// console.warn({ varName, options, guard, useDenoGet });
	try {
		return useDenoGet ? Deno.env.get(varName) : undefined;
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
/** Convert the supplied text string (`s`) into a valid URL (or `undefined` if `s` [relative to `base`] isn't a valid URL).
* * `no-throw` ~ function returns `undefined` upon any error
@tags `no-throw`
*/
export function validURL(s: string, base: URL = $path.toFileUrl(Deno.cwd() + $path.SEP)) {
	return intoURL(s, base);
}

//===

// `intoPath()`
/** Extract the "path" from a path string (as an identity function) or URL.
* * `no-throw` ~ function returns `undefined` upon any error
@param [path] • path/URL-string (may already be in URL format [ie, 'file://...']) or URL
@tags `no-throw`
*/
export function intoPath(path?: string | URL) {
	if (path == null) return undefined;
	return pathFromURL((path instanceof URL) ? path : intoURL(path));
}

// ref: <https://en.wikipedia.org/wiki/Uniform_Resource_Identifier> , <https://stackoverflow.com/questions/48953298/whats-the-difference-between-a-scheme-and-a-protocol-in-a-url>
export type IntoUrlOptions = {
	driveLetterSchemes?: boolean; // interpret single letter URL schemes as drive letters for Windows-style paths
};
const IntoUrlOptionsDefault: Required<IntoUrlOptions> = { driveLetterSchemes: true };

// `intoURL()`
/** Convert a `path` string into a standard `URL` object, relative to an optional `base` reference URL.
* * `no-throw` ~ function returns `undefined` upon any error
@param [path] • path/URL-string (may already be in URL file format [ie, 'file://...'])
@param [base] • baseline URL reference point ~ defaults to `$path.toFileUrl(Deno.cwd()+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@param [options] ~ defaults to `{driveLetterSchemes: true}`
@tags `no-throw`
*/
export function intoURL(path?: string, base?: URL, options?: IntoUrlOptions): URL | undefined;
export function intoURL(path: string, options: IntoUrlOptions): URL | undefined;
export function intoURL(path?: string, ...args: unknown[]) {
	if (path == null) return undefined;
	const base = (args?.length > 0 && (args[0] instanceof URL))
		? args.shift() as URL
		: allowRead
		? (() => {
			try {
				return $path.toFileUrl(Deno.cwd() + $path.SEP);
			} catch {
				return undefined;
			}
		})()
		: undefined;
	const options = {
		...IntoUrlOptionsDefault,
		...(args?.length > 0) ? args.shift() as IntoUrlOptions : {},
	};
	const scheme = (path.match(/^[A-Za-z][A-Za-z0-9+-.]*(?=:)/) || [])[0]; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
	const pathIsURL = (scheme != null) && (scheme.length > (options.driveLetterSchemes ? 1 : 0));
	const pathIsFileURL = (scheme === 'file');
	// console.warn({ path, base, options, scheme, pathIsURL, pathIsFileURL });
	try {
		if (!pathIsURL) {
			const pathname = (() => {
				if ($path.isAbsolute(path)) return path;
				// * work-around for `Deno.std::path.resolve()` not handling drive letters correctly
				const leadingDrive = (path.match(/^[A-Za-z]:/))?.[0];
				if (leadingDrive != null) {
					const cwd = Deno.cwd();
					Deno.chdir(leadingDrive);
					const resolved = $path.resolve(path);
					Deno.chdir(cwd);
					return resolved;
				}
				if (base == null) return undefined;
				return $path.resolve($path.join($path.fromFileUrl(base), path));
			})();
			if (pathname == null) return undefined;
			const url = new URL('file:///');
			url.pathname = pathname;
			// console.warn({ pathIsURL, path, pathname, url });
			return url;
		}
		if (pathIsFileURL) {
			const pathname = $path.fromFileUrl(path);
			const url = new URL('file:///');
			url.pathname = pathname;
			// console.warn({ pathIsFileURL, path, pathname, url });
			return url;
		}
		return new URL(path, base);
	} catch (_error) {
		return undefined;
	}
}

// `pathFromURL()`
/** Extract the "path" (absolute file path for 'file://' URLs, otherwise the href URL-string) from the `url`.
* * `no-throw` ~ function returns `undefined` upon any error
@param [url] • URL for path extraction
@tags `no-throw`
*/
export function pathFromURL(url?: URL) {
	if (url == null) return undefined;
	let path = url.href;
	if (url.protocol === 'file:') {
		try {
			path = $path.fromFileUrl(url);
		} catch (_error) {
			return undefined;
		}
	}
	return path;
}

//===

// `ensureAsPath()`
/** Ensure "path" is a valid path/URL-string (by conversion if needed) or *panic*.
@param [path] • path/URL-string (may already be in URL file format [ie, 'file://...']) or URL
@tags `may-panic` • may throw `Deno.errors.InvalidData` if `path` is not valid
*/
export function ensureAsPath(path?: string | URL) {
	const p = intoPath(path);
	if (p == null || p === '') throw new Deno.errors.InvalidData('Invalid path');
	return p;
}

// `ensureAsURL()`
/** Ensure "path" is a valid URL (by conversion if needed) or *panic*.
@param [path] • path/URL-string (may already be in URL file format [ie, 'file://...']) or URL
@tags `may-panic` • may throw `Deno.errors.InvalidData` if `path` is not a valid URL
*/
export function ensureAsURL(path: string | URL) {
	if (path instanceof URL) return path;
	const url = intoURL(path);
	if (url == null) throw new Deno.errors.InvalidData('Invalid URL');
	return url;
}

//===

/** 'read' permission state at time of module import
- *avoids* permission prompts
*/
// const allowRead = (await Deno.permissions?.query({ name: 'read' })).state === 'granted';
const allowRead = atImportPermissions.read.state === 'granted';

// `traversal()`
/** Determine the traversal path to `goal` from `base`.
- _Returned path will be relative to `base` iff `goal` shares a common origin/prefix with `base`, o/w it will be an absolute path_
- _Relative `goal` or `base` paths are evaluated as relative to the `Deno.cwd()` directory_
@param [goal] • target path
@param [base] • starting path ~ defaults to `$path.toFileUrl(Deno.cwd()+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
*/
export function traversal(
	goal: string | URL,
	base: string | URL = allowRead ? $path.toFileUrl(Deno.cwd() + $path.SEP) : '',
) {
	const url = (goal instanceof URL) ? goal : intoURL(goal);
	const baseURL = (base instanceof URL) ? base : intoURL(base);
	const commonOrigin = url && baseURL &&
		(url.origin.localeCompare(baseURL.origin, undefined, { sensitivity: 'accent' }) == 0) &&
		(url.protocol.localeCompare(baseURL.protocol, undefined, { sensitivity: 'accent' }) == 0);
	// console.warn({ goal, url, base, baseURL, commonOrigin });
	const basePath = pathFromURL(baseURL);
	const goalPath = pathFromURL(url);
	if (commonOrigin && basePath && goalPath) {
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
	}
	return url ? url.href : undefined;
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

/** * Convert string to a (locale sensitive) known case; useful for case-insensitive comparisons */
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

export function UrlEquivalent(a?: URL, b?: URL) {
	// console.warn({ a, b });
	return (a === b) || (a?.href === b?.href);
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
	return (!isWinOS) && (Boolean(env('IS_WSL')) || Boolean(env('WSL_DISTRO_NAME')));
}

// `canDisplayUnicode()`
/** Determine if unicode display is supported under the current platform and console constraint. */
export function canDisplayUnicode() {
	if (!isWinOS) {
		// POSIX-like
		// ref: <https://stackoverflow.com/questions/3104410/identify-cygwin-linux-windows-using-environment-variables> , <https://stackoverflow.com/questions/714100/os-detecting-makefile>
		// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain>
		const isOldTerminal = ['cygwin', 'linux'].includes(env('TERM') ?? '');
		const isWSL_ = isWSL();
		return !isOldTerminal && // fail for old terminals
		(( // * not isWSL
			!isWSL_ &&
			Boolean(
				env('LC_ALL')?.match(/[.]utf-?8$/i) || env('LANG')?.match(/[.]utf-?8$/i),
			) /* LC_ALL or LANG handles UTF-8? */
		) || ( // * isWSL
			isWSL_ && Boolean(env('WT_SESSION')) // only MS Windows Terminal is supported; 'alacritty' and 'ConEmu/cmder' hosts not detectable
		));
	}

	// WinOS
	// note: 'alacritty' will, by default, set TERM to 'xterm-256color'
	return (['alacritty', 'xterm-256color'].includes(env('TERM') ?? '')) || // [alacritty](https://github.com/alacritty/alacritty)
		Boolean(env('ConEmuPID')) || // [ConEmu](https://conemu.github.io) and [cmder](https://cmder.net)
		Boolean(env('WT_SESSION')); // MS Windows Terminal
}

export function mightUseColor() {
	// respects `NO_COLOR` env var override; use 'truthy' values?
	// ref: <https://no-color.org> @@ <https://archive.is/Z5N1d>
	return !(env('NO_COLOR'));
}

export function mightUseFileSystemCase() {
	// * respects `USE_FS_CASE` env var override (for WinOS); use 'truthy' values?
	// POSIX is case-sensitive
	// WinOS is *usually* (~99+%) case-insensitive/case-preserving, but *can* be case-sensitive (on a directory-by-directory basis)
	// ref: <https://stackoverflow.com/questions/7199039/file-paths-in-windows-environment-not-case-sensitive> @@ <https://archive.is/i0xzb>
	// ref: <https://nodejs.org/en/docs/guides/working-with-different-filesystems> @@ <https://archive.is/qSRjE>
	// ref: <https://en.wikipedia.org/wiki/Filename> @@ <https://archive.is/cqe6g>
	return !isWinOS /* assumed to be POSIX-like */ || !(env('USE_FS_CASE'));
}

export function mightUseUnicode() {
	// respects `NO_UNICODE` and `USE_UNICODE` env var overrides (in that order of priority); use 'truthy' values?
	if (env('NO_UNICODE')) return false;
	if (env('USE_UNICODE')) return true;
	return canDisplayUnicode();
}

//===

export const commandVOf = (name: string) => {
	try {
		// deno-lint-ignore no-deprecated-deno-api
		const process = Deno.run({
			cmd: [
				...(isWinOS
					? ['cmd', '/x/d/c']
					: (env('SHELL') != null)
					? [env('SHELL') ?? 'bash', '-c']
					: []),
				`command -v ${name}`,
			],
			stdin: 'null',
			stderr: 'piped',
			stdout: 'piped',
		});
		// console.warn('commandVOf(): process created');
		return Promise
			.all([process.status(), process.output() /* , process.stderrOutput() */])
			.then(([status, out /* , err */]) => {
				// console.warn('commandVOf', { status: status, out: decode(out) /* , err: decode(err) */ });
				return (status.success ? decode(out)?.replace(/(\r|\r\n|\n)+$/, '') : undefined);
			})
			.finally(() => process.close());
	} catch (_) {
		// console.warn('commandVOf(): catch()');
		return Promise.resolve(undefined);
	}
};

//===

// note: defined here to avoid circular dependency

// VERSION handler

// `fetch()` implementation (requires read [for local runs] or network permissions)
import { fetch } from './xFetch.ts'; // 'file://'-compatible `fetch()`

// import { intoURL, projectLocations, projectURL } from '../../tests/$shared.ts';
// import { logger } from '../../tests/$shared.ts';

const EOL = /\r?\n|\n/;
const versionURL = projectLocations.version;

// logger.trace({ projectURL, projectLocations, versionURL });
// console.warn({ projectURL, projectLocations, versionURL });

// projectVersionText == first non-empty line (EOL trimmed) from VERSION
const projectVersionTextViaFetch =
	await (versionURL &&
			((versionURL.protocol === 'file:')
				? ((await Deno.permissions.query({ name: 'read', path: versionURL })).state === 'granted')
				: ((await Deno.permissions.query({
					name: 'net',
					host: (versionURL.host.length > 0) ? versionURL.host : undefined,
				}))
					.state === 'granted'))
		? (fetch(versionURL).then((resp) => resp.ok ? resp.text() : undefined).then((text) =>
			text?.split(EOL).filter((s) => s)[0]
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
