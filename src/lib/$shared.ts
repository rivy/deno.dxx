// spell-checker:ignore (jargon) falsey truthy
// spell-checker:ignore (names) Deno EditorConfig
// spell-checker:ignore (modules) stringz

import { $path } from './$deps.ts';

//===

export const projectName: string | undefined = 'dxx';
export const VERSION = '0.0.9';

export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath =
	((url: URL) => (url.protocol === 'file:') ? $path.fromFileUrl(url) : url.pathname)(projectURL);
export const projectPaths = {
	// absolute or relative to `projectPath`
	editorconfig: $path.join(projectPath, '.editorconfig'),
	readme: $path.join(projectPath, 'README.md'),
	version: $path.join(projectPath, 'VERSION'),
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

export function isValidURL(s: string, base: URL = $path.toFileUrl(Deno.cwd() + $path.SEP)) {
	return !!validURL(s, base);
}

export function validURL(s: string, base: URL = $path.toFileUrl(Deno.cwd() + $path.SEP)) {
	return intoURL(s, base);
}

//===

// `intoPath()`
/** Extract a path string from a path string (identity function) or URL. */
export function intoPath(path: string | URL) {
	if (!(path instanceof URL)) return path;
	return (path.protocol === 'file:') ? $path.fromFileUrl(path) : path.pathname;
}

// ref: <https://en.wikipedia.org/wiki/Uniform_Resource_Identifier> , <https://stackoverflow.com/questions/48953298/whats-the-difference-between-a-scheme-and-a-protocol-in-a-url>
export type IntoUrlOptions = {
	driveLetterSchemes?: boolean; // interpret single letter URL schemes as drive letters for Windows-style paths
};
const IntoUrlOptionsDefault: Required<IntoUrlOptions> = { driveLetterSchemes: true };

// `intoURL()`
/** Convert a `path` string into an URL, relative to a `base` URL.

@param [path]
@param [base] • baseline URL ~ defaults to `$path.toFileUrl(Deno.cwd()+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@param [options] ~ defaults to `{driveLetterSchemes: true}`
*/
export function intoURL(path: string, base?: URL, options?: IntoUrlOptions): URL | undefined;
export function intoURL(path: string, options: IntoUrlOptions): URL | undefined;
export function intoURL(path: string, ...args: unknown[]) {
	const base = (args?.length > 0 && (args[0] instanceof URL))
		? args.shift() as URL
		: $path.toFileUrl(Deno.cwd() + $path.SEP);
	const options = {
		...IntoUrlOptionsDefault,
		...(args?.length > 0) ? args.shift() as IntoUrlOptions : {},
	};
	const scheme = (path.match(/^[A-Za-z][A-Za-z0-9+-.]*(?=:)/) || [])[0]; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1)
	if (options.driveLetterSchemes && scheme?.length == 1) {
		path = 'file://' + $path.normalize(path);
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
@param [base] • starting path ~ defaults to `$path.toFileUrl(Deno.cwd()+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
*/
export function traversal(
	goal: string | URL,
	base: string | URL = $path.toFileUrl(Deno.cwd() + $path.SEP),
) {
	const url = (goal instanceof URL) ? goal : intoURL(goal);
	const baseURL = (base instanceof URL) ? base : intoURL(base);
	const commonOrigin = url && baseURL &&
		(url.origin.localeCompare(baseURL.origin, undefined, { sensitivity: 'accent' }) == 0);
	// console.warn({ goal, source, url, baseURL, commonOrigin });
	if (url && baseURL && commonOrigin) {
		return $path.relative(baseURL.pathname, url.pathname);
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
	if ((s == '') || (s == 'f') || (s == 'false') || (s == 'no') || (s == 'off')) {
		return false;
	}
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

//===

// ToDO: investigate [`stringz`](https://github.com/sallar/stringz)

// ref: <https://coolaj86.com/articles/how-to-count-unicode-characters-in-javascript> @@ <https://archive.is/5nzNP>
// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#unicode> @@ <https://archive.is/DdIu6>
// ToDO: benchmark `getCharacterLength()` vs `s.length()`
export function getCharacterLength(s: string) {
	// The string iterator that is used here iterates over characters, not mere UTF-16 code units
	return [...s].length;
}

//===

// note: defined here to avoid circular dependency

// VERSION handler

// `fetch()` implementation (requires read [for local runs] or network permissions)
import { fetch } from './$deps.ts'; // 'file://'-compatible `fetch()`

// import { intoURL, projectPaths, projectURL } from '../../tests/$shared.ts';
// import { logger } from '../../tests/$shared.ts';

const newline = /\r?\n|\n/;
const versionURL = intoURL(projectPaths.version, projectURL);

// logger.trace({ projectURL, projectPaths, versionURL });

// projectVersionText == first non-empty line (EOL trimmed) from VERSION
const projectVersionText = versionURL &&
	(await (await fetch(versionURL)).text()).split(newline).filter((s) => s)[0];

// `import ...` implementation (requires project-level synchronization tooling)
// import { VERSION } from './$shared.ts';
const projectVersionTextViaImport = VERSION;

function v() {
	return projectVersionText;
}

export const $version = { projectVersionText, projectVersionTextViaImport, v };

//=== * LOCAL function/module exports

// * note: local functions/modules are exported from '$shared' to help avoid circular dependencies

export * as $logger from './axe/$mod.ts';
export * as $me from './xProcess.ts';

export * as $consoleSize from './consoleSize.ts';

//===

import * as $logger from './axe/$mod.ts';

$logger.logger.suspend(); // initialize common/global logger to 'suspended' state to allow for local module use without unwanted outputs
export const logger = $logger.logger; // export logger (note: in the *suspended state*)
