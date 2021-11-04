// spell-checker:ignore (names) Deno EditorConfig

import { $logger, Path } from './$deps.ts';

$logger.logger.suspend(); // suspend logger to allow for use within other local modules without unwanted outputs
export const logger = $logger.logger; // export (suspended) logger

//===

export const projectName: string | undefined = 'dxx';
export const VERSION = '0.0.9';

export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath =
	((url: URL) => (url.protocol === 'file:') ? Path.fromFileUrl(url) : url.pathname)(projectURL);
export const projectPaths = {
	// absolute or relative to `projectPath`
	editorconfig: Path.join(projectPath, '.editorconfig'),
	readme: Path.join(projectPath, 'README.md'),
	version: Path.join(projectPath, 'VERSION'),
};

// // ToDO: investigate best practice for portability of PATH_SEP_PATTERN // note: WinOS => /[\\/]+/ ; *nix => /\/+/
// // * currently, treating paths as WinOS-compatible with both backslash and forward-slash as path separators (on both WinOS and *nix platforms)
// export const PATH_SEP_PATTERN = /[\\/]+/;

//===

export const isWinOS = Deno.build.os === 'windows';

// ref: <https://medium.com/deno-the-complete-reference/textencoder-and-textdecoder-in-deno-cfca83be1792> @@ <https://archive.is/tO0rE>
// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder(); // default == 'utf=8'
export const encoder = new TextEncoder(); // *always* 'utf-8'
export const decode = (input?: Uint8Array): string => decoder.decode(input);
export const encode = (input?: string): Uint8Array => encoder.encode(input);

//===

// `isFileUrl()`
/** Determine if `url` is a file-type URL (ie, uses the 'file:' protocol), naming a local file resource. */
export function isFileURL(url: URL) {
	return (url.protocol === 'file:');
}

export function isValidURL(s: string, base: URL = Path.toFileUrl(Deno.cwd() + Path.SEP)) {
	return !!validURL(s, base);
}

export function validURL(s: string, base: URL = Path.toFileUrl(Deno.cwd() + Path.SEP)) {
	return intoURL(s, base);
}

//===

// `intoPath()`
/** Extract a path string from a path string (identity function) or URL. */
export function intoPath(path: string | URL) {
	if (!(path instanceof URL)) return path;
	return (path.protocol === 'file:') ? Path.fromFileUrl(path) : path.pathname;
}

// ref: <https://en.wikipedia.org/wiki/Uniform_Resource_Identifier> , <https://stackoverflow.com/questions/48953298/whats-the-difference-between-a-scheme-and-a-protocol-in-a-url>
export type IntoUrlOptions = {
	driveLetterSchemes?: boolean; // interpret single letter URL schemes as drive letters for Windows-style paths
};
const IntoUrlOptionsDefault: Required<IntoUrlOptions> = { driveLetterSchemes: true };

// `intoURL()`
/** Convert a `path` string into an URL, relative to a `base` URL.

@param [path]
@param [base] • baseline URL ~ defaults to `Path.toFileUrl(Deno.cwd()+Path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@param [options] ~ defaults to `{driveLetterSchemes: true}`
*/
export function intoURL(path: string, base?: URL, options?: IntoUrlOptions): URL | undefined;
export function intoURL(path: string, options: IntoUrlOptions): URL | undefined;
export function intoURL(path: string, ...args: unknown[]) {
	const base = (args?.length > 0 && (args[0] instanceof URL))
		? args.shift() as URL
		: Path.toFileUrl(Deno.cwd() + Path.SEP);
	const options = {
		...IntoUrlOptionsDefault,
		...(args?.length > 0) ? args.shift() as IntoUrlOptions : {},
	};
	const scheme = (path.match(/^[A-Za-z][A-Za-z0-9+-.]*(?=:)/) || [])[0]; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1)
	if (options.driveLetterSchemes && scheme?.length == 1) {
		path = 'file://' + Path.normalize(path);
	}
	// console.warn({ path, base, options });
	try {
		return new URL(path, base);
	} catch (_error) {
		return undefined;
	}
}

//===

// `traversal()`
/** Determine the traversal path to `goal` from `base`.
_Returned path will be relative if `goal` shares a common origin/prefix with `base`, o/w it will be an absolute path_.

- _relative `goal` or `base` paths are evaluated relative to the `Deno.cwd()` directory_

@param [goal] • target path
@param [base] • starting path ~ defaults to `Path.toFileUrl(Deno.cwd()+Path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
*/
export function traversal(
	goal: string | URL,
	base: string | URL = Path.toFileUrl(Deno.cwd() + Path.SEP),
) {
	const url = (goal instanceof URL) ? goal : intoURL(goal);
	const baseURL = (base instanceof URL) ? base : intoURL(base);
	const commonOrigin = url && baseURL &&
		(url.origin.localeCompare(baseURL.origin, undefined, { sensitivity: 'accent' }) == 0);
	// console.warn({ goal, source, url, baseURL, commonOrigin });
	if (url && baseURL && commonOrigin) {
		return Path.relative(baseURL.pathname, url.pathname);
	} else {
		return url ? url.href : undefined;
	}
}

//===

export type Truthy = false | string;
// isFalsey()
function _isFalsey(s: string): boolean {
	return !isTruthy(s);
}
// isTruthy()
export function isTruthy(s: string): boolean {
	if ((s == '') || (s == 'f') || (s == 'false') || (s == 'no') || (s == 'off')) return false;
	return true;
}
// toTruthy()
export function toTruthy(
	s?: string,
	falseyValues: string[] = ['', 'f', 'false', 'n', 'no', 'off'],
): Truthy {
	if (!s || falseyValues.includes(s)) {
		return false;
	}
	return s;
}
