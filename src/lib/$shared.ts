//== * SHARED exports

// FixME: [2025-08-04; rivy] review, revise, and document path functions (absolute, canonicalize [or realpath], join, normalize, resolve)
//    ... normalize (syntactic-only; may possibly access env [or file system] on WinOS to resolve drive relative paths)
//    ... resolve (? may follow file system symbolic links)
//    ... decide on exact nomenclature for conversion functions; from rust ideas for
//        - `as...` (cheap conversion, eg, via reference)
//        - `to...` (conversion via copy, maybe more expensive)
//  		  - `into...` (conversion via move, consuming the original, more efficient than `to...`)
//    ... should `pathIntoURL()` assume that the input path is `file:`-centric (eg, assume its a file path and maybe query and hash portions are disallowed)?
//    ... if so, do we need an `intoURL()` function which is more general-purpose and allows for any URL scheme?

// FixME: [2025-08-23; rivy] define and test various cases with URLs containing hash and search portions
// ! * `file:` paths should probably not have either, but as a special case, allowing construction of URLs with search and hash portions
// ! * per AI, only the origin and path from the base are considered for resolution; username, password, query, and hash are always dropped

// FixME: [2025-08-04; rivy] review, revise, and document all `tryFn*` functions to ensure consistent behavior and documentation

// spell-checker:ignore (fns) chdir
// spell-checker:ignore (env) WSL WSLENV
// spell-checker:ignore (jargon) CWDs distro falsey truthy
// spell-checker:ignore (js/ts) gmsu
// spell-checker:ignore (names) Alacritty Cmder ConEmu Deno EditorConfig JSdelivr
// spell-checker:ignore (modules) stringz
// spell-checker:ignore (shell/WinOS) CONIN CONOUT
// spell-checker:ignore (yargs) positionals

import { DenoVx, Deprecated } from './$deprecated.ts';
import { $colors, $fs, $path } from './$deps.ts';
import { atImportPermissions, atImportPermitCWD } from './$shared.TLA.ts';

//===

// Types

// * utility types
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null | undefined;
// * path type
export type PathLike = string | URL;

//===

/** Indicates whether host platform is a Windows OS. */
export const fnIsWinOS: () => boolean = () => {
	// deno-lint-ignore no-explicit-any
	const global: any = globalThis;
	return (
		/* Deno */ global.Deno?.build.os === 'windows' ||
		/* Bun */ global.Bun?.platform === 'win32' ||
		/* NodeJS */ global.process?.platform?.startsWith('win') ||
		/* browser (web/DOM) */ global.navigator?.platform?.startsWith('Win') ||
		false
	);
};
export const isWinOS = fnIsWinOS();

//===

// `type PermitOptions`
/** Permit/permission options
@param permitGuard • verify permission(s) prior to use (avoids Deno prompts/panics); defaults to `true`
*/
export type PermitOptions = {
	permitGuard?: boolean;
};
const PermitOptionsDefault: Required<PermitOptions> = {
	permitGuard: true,
};

//===

// ref: <https://en.wikipedia.org/wiki/Uniform_Resource_Identifier> , <https://stackoverflow.com/questions/48953298/whats-the-difference-between-a-scheme-and-a-protocol-in-a-url>
export type PathPlatform = 'POSIX' | 'WinOS';
export const pathPlatforms: PathPlatform[] = ['POSIX', 'WinOS'];

export type ForPathPlatform = 'host' | PathPlatform;

// `type PathAndUrlOptions`
/** Options for path and URL handling
@property mayPanic • allow panics from function (ie, throw for errors)
@property fileStemMayMatchDevice • allow file stem to match device name
	- `true` == inclusive, non-strict matching == will match if file prefix/stem matches any of `specialDeviceStemNames` (Win10-style [or earlier] compatible matching)
	- `false` == strict matching == only complete file name may match any of `specialDeviceStemNames` (Win11-style [or later] compatible matching)
@property forPlatform • assumed platform for platform/OS-specific path/URL handling
@property singleLetterSchemeAsDrive • interpret single letter URL schemes as drive letters (needed for Windows-style paths)
@see `PathAndUrlOptionsDefault` for default values
*/
export type PathAndUrlOptions = {
	mayPanic?: boolean; // enable panic returns (ie, throw from functions for errors)
	// * options.fileStemMayMatchDevice == true ~ inclusive, non-strict matching == will match if file prefix/stem matches any of `specialDeviceStemNames` (Win10-style [or earlier] compatible matching)
	// * options.fileStemMayMatchDevice == false ~ strict matching == only complete file name may match any of `specialDeviceStemNames` (Win11-style [or later] compatible matching)
	fileStemMayMatchDevice?: boolean; // allow file stem to match device name (eg, 'C:' or '\\\\server\\share')
	forPlatform?: ForPathPlatform; // assumed platform for platform/OS-specific path/URL handling
	singleLetterSchemeAsDrive?: boolean | 'WinOS-only'; // interpret single letter URL schemes as drive letters (needed for Windows-style paths)
};
// `const PathAndUrlOptionsDefault`
/** Default options for path and URL handling
@property mayPanic • allow panics from function (ie, throw for errors)
@property fileStemMayMatchDevice • allow file stem to match device name; defaults to `true` (Win10-style matching)
@property forPlatform • assumed platform for platform/OS-specific path/URL handling; defaults to 'host'
@property singleLetterSchemeAsDrive • interpret single letter URL schemes as drive letters (supports use of Windows-style paths); defaults to 'WinOS-only'
@see `PathAndUrlOptions` for further property details
*/
const PathAndUrlOptionsDefault: Required<PathAndUrlOptions> = {
	mayPanic: false,
	fileStemMayMatchDevice: true /* file prefix/stem may match `special devices` (Win10-style) */,
	forPlatform: 'host',
	singleLetterSchemeAsDrive: 'WinOS-only',
};

//===

export const projectName: string | undefined = 'dxx';
export const VERSION = '0.0.16';

// note: `projectURL` has some inherent instability for compiled scripts; this can be mitigated by using a CDN source for the compilation (eg, JSdelivr.net, Statically.io, GitHack.com)
export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath = pathFromURL(projectURL);
export const projectLocations = {
	benchmarks: new URL('bench', projectURL),
	changelog: new URL('CHANGELOG.mkd', projectURL),
	editorconfig: new URL('.editorconfig', projectURL),
	examples: new URL('eg', projectURL),
	licenses: [new URL('LICENSE', projectURL)],
	readme: new URL('README.md', projectURL),
	source: new URL('src', projectURL),
	tests: new URL('tests', projectURL),
	vendor: new URL('vendor', projectURL),
	version: new URL('VERSION', projectURL),
};

// // ToDO: investigate best practice for portability of PATH_SEP_PATTERN // note: WinOS => /[\\/]+/ ; *nix => /\/+/
// // * currently, treating paths as WinOS-compatible with both backslash and forward-slash as path separators (on both WinOS and *nix platforms)
// export const PATH_SEP_PATTERN = /[\\/]+/;

//===

// export const atImportPermissions = await permitsAsync();

// ref: <https://medium.com/deno-the-complete-reference/textencoder-and-textdecoder-in-deno-cfca83be1792> @@ <https://archive.is/tO0rE>
// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder(); // default == 'utf-8'
export const encoder = new TextEncoder(); // *always* 'utf-8'
export const decode = (input?: Uint8Array): string => decoder.decode(input);
export const encode = (input?: string): Uint8Array => encoder.encode(input);

//=== * stack inspection functions

function getFramesFromError(error: Error): Array<string> {
	let stack: Error['stack'] | null = null;
	let frames: string[];
	// // retrieve stack from `Error`
	// // ref: <https://github.com/winstonjs/winston/issues/401#issuecomment-61913086>
	// try {
	stack = error.stack;
	// } catch (e) {
	// 	try {
	// 		const previous = e?.__previous__ || e?.__previous;
	// 		stack = previous && previous.stack;
	// 	} catch (_) {
	// 		stack = null;
	// 	}
	// }

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
			return match[1];
		})
		.filter(Boolean);
	return callers;
}

//====

function zip<T extends string | number | symbol, U>(a: T[], b: U[]) {
	const c: Record<T, U> = {} as Record<T, U>;
	a.map((e: T, idx: number) => (c[e] = b[idx]));
	return c;
}

const DenoPermissionNames: Deno.PermissionName[] = DenoVx.PermissionNames();

// FixME: [2024-09-25; rivy] revise permits functions to allow for optional configuration parameters for each permission

export function permitsSync(names: Deno.PermissionName[] = DenoPermissionNames) {
	const permits: Record<Deno.PermissionName, Deno.PermissionStatus> = zip(
		names,
		names
			.map((name) => Deno.permissions?.querySync?.({ name }))
			.map(
				(e) =>
					e ??
					(Object.assign(new EventTarget(), {
						state: 'granted' as const,
					}) as Deno.PermissionStatus),
			),
	);
	return permits;
}

export async function havePermit(permitName: Deno.PermissionName) {
	const names = [permitName];
	const permits = (await Promise.all(names.map((name) => Deno.permissions?.query({ name })))).map(
		(e) =>
			e ??
			(Object.assign(new EventTarget(), {
				state: 'granted' as const,
			}) as Deno.PermissionStatus),
	);
	const allGranted = !permits.find((permit) => permit.state !== 'granted');
	return allGranted;
}

export async function haveAllPermits(permitNames: Deno.PermissionName[]) {
	const permits = (
		await Promise.all(permitNames.map((name) => Deno.permissions?.query({ name })))
	).map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !permits.find((permit) => permit.state !== 'granted');
	return allGranted;
}

export async function haveMissingPermits(permitNames: Deno.PermissionName[] = []) {
	return await haveUnGrantedPermits(permitNames);
}

export async function haveUnGrantedPermits(permitNames: Deno.PermissionName[] = []) {
	// ToDO: [2023-09-09; rivy] consider deduplication of `permitNames` contents
	const permits = (
		await Promise.all(permitNames.map((name) => Deno.permissions?.query({ name })))
	).map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !permits.find((permit) => permit.state !== 'granted');
	return !allGranted;
}

export async function unGrantedPermits(permitNames: Deno.PermissionName[] = []) {
	const permits = await Promise.all(
		permitNames.map(async (name) => {
			return { name, permitStatus: await Deno.permissions?.query({ name }) };
		}),
	);
	const missing = permits
		.filter((permit) => permit.permitStatus.state !== 'granted')
		.map((permit) => permit.name);
	return missing;
}

export function havePermitSync(permitName: Deno.PermissionName) {
	const names = [permitName];
	const permits = names
		.map((name) => Deno.permissions?.querySync?.({ name }))
		.map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !permits.find((permit) => permit.state !== 'granted');
	return allGranted;
}

export function haveAllPermitsSync(permitNames: Deno.PermissionName[]) {
	const permits = permitNames
		.map((name) => Deno.permissions?.querySync?.({ name }))
		.map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !permits.find((permit) => permit.state !== 'granted');
	return allGranted;
}

export function haveMissingPermitsSync(permitNames: Deno.PermissionName[] = []) {
	return haveUnGrantedPermitsSync(permitNames);
}

export function haveUnGrantedPermitsSync(permitNames: Deno.PermissionName[] = []) {
	// ToDO: [2023-09-09; rivy] consider deduplication of `permitNames` contents
	const permits = permitNames
		.map((name) => Deno.permissions?.querySync?.({ name }))
		.map((e) => e ?? { state: 'granted', onchange: null });
	const allGranted = !permits.find((permit) => permit.state !== 'granted');
	return !allGranted;
}

export function unGrantedPermitsSync(permitNames: Deno.PermissionName[] = []) {
	const permits = permitNames.map((name) => {
		return { name, permitStatus: Deno.permissions?.querySync?.({ name }) };
	});
	const missing = permits
		.filter((permit) => permit.permitStatus.state !== 'granted')
		.map((permit) => permit.name);
	return missing;
}

function composeMissingPermitsMessage(permitNames: Deno.PermissionName[] = []) {
	/** Sorted, non-duplicated, permission names (used for flag generation) */
	const flagNames = permitNames.length > 0 ? [...new Set(permitNames.sort())] : ['all'];
	const plural = flagNames.length > 1;
	const msg = `Missing required permission${plural ? 's' : ''}; re-run with required permission${
		plural ? 's' : ''
	} (${flagNames.map((name) => $colors.green(`\`--allow-${name}\``)).join(', ')})`;
	return msg;
}

export async function abortIfMissingPermits(
	permitNames: Deno.PermissionName[] = [],
	options?: { exitCode?: number; label?: string; writer?: (...args: unknown[]) => void },
) {
	options = options != null ? options : {};
	options.exitCode ??= 1;
	// const callers = callersFromStackTrace();
	// const top = callers[callers.length - 1];
	// const url = top?.replace(/(:\d+:\d+)$/, ''); // remove trailing position info (LINE_N:CHAR_POSITION)
	// const name = $path.parse(url ?? '').name;
	if (options.writer == null) {
		options.writer = (args) =>
			console.error(
				$colors.bgRed($colors.bold(` ${options?.label ? `${options.label}:` : ''}ERR! `)),
				$colors.red('*'),
				args,
			);
	}
	// console.warn({ options });
	// console.warn({ callers, top, url, name });
	const missing = await unGrantedPermits(permitNames);
	if (missing.length > 0) {
		options.writer(composeMissingPermitsMessage(missing));
		Deno.exit(options.exitCode);
	}
}

export function abortIfMissingPermitsSync(
	permitNames: Deno.PermissionName[] = [],
	options?: { exitCode?: number; label?: string; writer?: (...args: unknown[]) => void },
) {
	options = options != null ? options : {};
	options.exitCode ??= 1;
	// const callers = callersFromStackTrace();
	// const top = callers[callers.length - 1];
	// const url = top?.replace(/(:\d+:\d+)$/, ''); // remove trailing position info (LINE_N:CHAR_POSITION)
	// const name = $path.parse(url ?? '').name;
	if (options.writer == null) {
		options.writer = (args) =>
			console.error(
				$colors.bgRed($colors.bold(` ${options?.label ? `${options.label}:` : ''}ERR! `)),
				$colors.red('*'),
				args,
			);
	}
	// console.warn({ options });
	// console.warn({ callers, top, url, name });
	const missing = unGrantedPermitsSync(permitNames);
	if (missing.length > 0) {
		options.writer(composeMissingPermitsMessage(missing));
		Deno.exit(options.exitCode);
	}
}

export async function panicIfMissingPermits(permitNames: Deno.PermissionName[] = []) {
	const missing = await unGrantedPermits(permitNames);
	if (missing.length > 0) {
		const err = new Error(composeMissingPermitsMessage(missing));
		err.stack = undefined;
		throw err;
	}
}

export function panicIfMissingPermitsSync(permitNames: Deno.PermissionName[] = []) {
	const missing = unGrantedPermitsSync(permitNames);
	if (missing.length > 0) {
		const err = new Error(composeMissingPermitsMessage(missing));
		err.stack = undefined;
		throw err;
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

export const atImportCWD = (() => {
	const permit =
		atImportPermitCWD ||
		Deno?.permissions?.querySync?.({ name: 'read', path: '.' })?.state === 'granted';
	// return tryFnSync(() => (permit ? Deno.cwd() : undefined));
	return tryFnSync(() => {
		let p = permit ? Deno.cwd() : undefined;
		// WinOS-only, `Deno.cwd()` will in some cases, return the CWD with a leading *lowercase* driver letter
		// * for consistency, convert the drive letter to uppercase
		if (isWinOS && p && p.length >= 2 && p[1] === ':') {
			p = p[0].toUpperCase() + p.substring(1);
		}
		return p;
	});
})();

// `cwd()`
/** Return the value of the current working directory (or `undefined` for errors or disallowed access).
* - will *not panic*
* - will *not prompt* for permission if `options.permitGuard` is `true`
@param options • `{ permitGuard }` • verify unrestricted CWD access permission prior to access attempt (avoids Deno prompts/panics); defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt` ; `allow-read=.`
*/
export function cwd(options?: PermitOptions) {
	const guard = options?.permitGuard ?? PermitOptionsDefault.permitGuard;
	const useDenoCWD =
		!guard ||
		atImportPermissions.read.state === 'granted' ||
		Deno?.permissions?.querySync?.({ name: 'read', path: '.' })?.state === 'granted';
	return tryFnSync(() => {
		let p = useDenoCWD ? Deno.cwd() : undefined;
		// WinOS-only, `Deno.cwd()` will in some cases, return the CWD with a leading *lowercase* driver letter
		// * for consistency, convert the drive letter to uppercase
		if (isWinOS && p && p.length >= 2 && p[1] === ':') {
			p = p[0].toUpperCase() + p.substring(1);
		}
		return p;
	});
}

// `cwdOfDrive()`
/** Return the value of the current working directory for `drive` (or `undefined` for errors or not allowed access).
* - will *not panic*
* - will *not prompt* for permission if `options.permitGuard` is `true`
@param drive • target drive letter (eg, `'C'`); defaults to current drive (returning result of `cwd()`) if null/undefined
@param options • `{ permitGuard }` • verify unrestricted CWD access permission prior to access attempt (avoids Deno prompts/panics); defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt` ; `allow-env` or `allow-read=.,DRIVE:`
*/
export function cwdOfDrive(drive?: string | null, options?: PermitOptions) {
	if (!isWinOS) return undefined; // WinOS-only; POSIX doesn't have "drives"
	// when possible, use (faster, but undocumented) environment variable `%=X:%` to peek at the current drive letter path instead of using `chdir('X:')`; using `Deno.env.toObject()['=X:']`
	// ... ref: <https://superuser.com/questions/1655266/a-complete-list-of-relative-paths-variables-in-windows-explorer-in-windows> @@ <https://archive.is/3hzVa>
	// ... ref: <https://stackoverflow.com/a/46019856/43774> @@ <https://archive.is/ghmY3>
	drive = drive?.slice(0, 1).toLocaleUpperCase(); // for consistency, always use uppercase drive letter
	if (drive == null || drive == '') return cwd(options);
	const guard = options?.permitGuard ?? PermitOptionsDefault.permitGuard;
	const useDenoEnv =
		!guard ||
		atImportPermissions.env.state === 'granted' ||
		Deno?.permissions?.querySync?.({ name: 'env', variable: `=${drive}:` })?.state === 'granted';
	// console.warn('cwdOfDrive()', { drive, useDenoEnv });
	if (useDenoEnv) {
		const env = tryFnSync(() => Deno.env.toObject());
		if (env != null) {
			const containsDriveCWDs = Object.keys(env)?.find((v) => v.match(/^[=]?[A-Z]:$/)) != null;
			const path = containsDriveCWDs ? env[`=${drive}:`] ?? `${drive}:\\` : undefined;
			if (path != null) {
				return path;
			}
		}
	}
	// * verify CWD is accessible
	const CWD = cwd(options);
	if (CWD == null) return undefined;
	// console.warn('cwdOfDrive()', { drive, guard, useDenoEnv, CWD });
	return tryFnSync(() => {
		// console.warn('cwdOfDrive()', { drive, CWD });
		// * verify chdir(CWD) works
		if (!chdir(CWD, options)) return undefined;
		const targetCWD = tryFnSync(() => {
			if (!chdir(`${drive}:`, options)) return undefined;
			const result = cwd(options);
			const _ = chdir(CWD, options);
			return result;
		});
		// console.warn('cwdOfDrive()', { drive, CWD, targetCWD });
		return targetCWD;
	});
}

// `chdir()`
/** Return `true` after successful `Deno.chdir()` or `false` for missing directories, access denied, or other errors.
* - will *not panic*
* - will *not prompt* for permission if `options.permitGuard` is `true`
@param options • `{ permitGuard }` • verify unrestricted CWD access permission prior to access attempt (avoids Deno prompts/panics); defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt` ; `allow-read=TARGET_DIRECTORY`
*/
export function chdir(directory?: string | URL, options?: PermitOptions) {
	if (directory == null || directory === '') return false;
	const guard = options?.permitGuard ?? PermitOptionsDefault.permitGuard;
	const permit =
		!guard ||
		atImportPermissions.read.state === 'granted' ||
		Deno?.permissions?.querySync?.({ name: 'read', path: directory })?.state === 'granted';
	// console.warn('chdir()', { directory, guard, permit });
	return tryFnOrSync(() => {
		if (!permit) return false;
		Deno.chdir(directory);
		return true;
	}, false);
}

//===

let envObject: Record<string, string> | undefined = undefined;

// `env()`
/** Return the value of the environment variable `varName` (or `undefined` if non-existent or not allowed access).
* - will *not panic*
* - will *not prompt* for permission if `options.permitGuard` is `true`
@param options • `{ permitGuard }` • verify unrestricted environment access permission prior to access attempt (avoids Deno prompts/panics); defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt`
@tags `allow-env[=...]`
*/
export function env(varName: string, options?: PermitOptions) {
	const guard = options?.permitGuard ?? PermitOptionsDefault.permitGuard;
	const permit =
		!guard ||
		atImportPermissions.env.state === 'granted' ||
		Deno.permissions?.querySync?.({ name: 'env', variable: varName })?.state === 'granted';
	const permitEnvAll =
		!guard ||
		atImportPermissions.env.state === 'granted' ||
		Deno.permissions?.querySync?.({ name: 'env' })?.state === 'granted';
	if (permit) {
		return tryFnOrSync(
			() => Deno.env.get(varName),
			permitEnvAll
				? tryFnSync(() => {
						if (envObject == null) envObject = Deno.env.toObject();
						return envObject[varName];
					})
				: undefined,
		);
	}
	return undefined;
}

// `envAsync()`
/** Return the current value of the environment variable `varName` (or `undefined` if non-existent or not allowed access).
* - will *not panic*
* - will *not prompt* for permission if `options.permitGuard` is `true`
@param options • `{ permitGuard }` • verify current and name-specific environment access permission prior to access attempt (avoids Deno prompts/panics); defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt`
@tags `allow-env[=...]`
*/
export async function envAsync(varName: string, options?: PermitOptions) {
	const guard = options?.permitGuard ?? PermitOptionsDefault.permitGuard;
	const permit =
		!guard ||
		atImportPermissions.env.state === 'granted' ||
		(await Deno.permissions?.query?.({ name: 'env', variable: varName }))?.state === 'granted';
	const permitEnvAll =
		!guard ||
		atImportPermissions.env.state === 'granted' ||
		(await Deno.permissions?.query?.({ name: 'env' }))?.state === 'granted';
	if (permit) {
		return tryFnOrSync(
			() => Deno.env.get(varName),
			permitEnvAll
				? tryFnSync(() => {
						if (envObject == null) envObject = Deno.env.toObject();
						return envObject[varName];
					})
				: undefined,
		);
	}
	return undefined;
}

//===

// `denoOpenSyncNT()`
/** Open a file specified by `path`, using `options`.
*
* `path` is normalized prior to use.
*
* - will *not panic*
* - will *not prompt* for permission if `options.permitGuard` is `true` (which is the default)
*
* * _`no-throw`_ function (returns `undefined` upon any error)
*
* * _NOTE_: for WinOS, the _`--allow-all`_ permission is required for access to network/UNC and device paths; [2024-10-05; rivy] refs: <https://github.com/denoland/deno/pull/25132> , <https://github.com/denoland/deno/issues/24703>.
*
@param options • `{ permitGuard }` • verify read/write permissions prior to access attempt (avoids Deno prompts/panics); defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt` ; `allow-env`
*/
export function denoOpenSyncNT(path?: string | URL, options?: Deno.OpenOptions & PermitOptions) {
	// no-throw `Deno.openSync(..)`
	path = intoPath(path);
	options = options ?? { read: true };
	const guard = options.permitGuard ?? PermitOptionsDefault.permitGuard;
	if (path == null || path === '') return undefined;
	if (
		!guard &&
		options.read &&
		(atImportPermissions.read.state === 'granted' ||
			Deno.permissions?.querySync?.({ name: 'read', path })?.state !== 'granted')
	)
		return undefined;
	if (
		!guard &&
		(options.write || options.append) &&
		(atImportPermissions.write.state === 'granted' ||
			Deno.permissions?.querySync?.({ name: 'write', path })?.state !== 'granted')
	)
		return undefined;
	// console.warn({ path, options, guard });
	try {
		return Deno.openSync(path, options);
	} catch {
		// avoid panics
		// * includes catching 'NotCapable' panics (eg, for network/UNC or device paths on WinOS without `--allow-all`); ref: <https://github.com/denoland/deno/issues/26045>
		return undefined;
	}
}

//===

export function ifThenElse<T>(condition: boolean, ifTrue: T | (() => T), ifFalse: T | (() => T)) {
	if (condition) {
		return typeof ifTrue === 'function' ? (ifTrue as () => T)() : ifTrue;
	}
	return typeof ifFalse === 'function' ? (ifFalse as () => T)() : ifFalse;
}

export function ifThen<T>(condition: boolean, ifTrue: T | (() => T)) {
	return ifThenElse(condition, ifTrue, undefined);
}

export function tryFnOr<T>(fn: () => Promise<T>, fallback: T, mayPanic?: boolean) {
	return tryFnOrAsync(fn, fallback, mayPanic);
}

export async function tryFnOrAsync<T>(fn: () => Promise<T>, fallback: T, mayPanic?: boolean) {
	try {
		return await fn();
	} catch (e) {
		if (!mayPanic) return fallback;
		throw e;
	}
}

export function tryFnOrSync<T>(fn: () => T, fallback: T, mayPanic?: boolean) {
	try {
		return fn();
	} catch (e) {
		if (!mayPanic) return fallback;
		throw e;
	}
}

export function tryFn<T>(fn: () => Promise<T>, mayPanic?: boolean) {
	return tryFnAsync(fn, mayPanic);
}

export function tryFnAsync<T>(fn: () => Promise<T>, mayPanic?: boolean) {
	return tryFnOrAsync(fn, undefined, mayPanic);
}

export function tryFnSync<T>(fn: () => T, mayPanic?: boolean) {
	return tryFnOrSync(fn, undefined, mayPanic);
}

//===

import { toText as readableStreamToText } from 'https://deno.land/std@0.224.0/streams/mod.ts';
export async function fetchText(url: URL): Promise<string> {
	// ToDO: add support for non-['file:','http:','https:'] protocols to `fetch` by using `curl`
	const href = url.href;
	const response = await fetch(url).catch((e) => {
		throw new Error(e.message);
	});
	// note: response status codes >= 200 < 300 should be ok
	if (!response.ok) {
		const msg = [response.statusText, `[status: ${response.status}]`].filter(Boolean).join(' ');
		if (response.status === 404) {
			throw new Deno.errors.NotFound(`'${href}' not found; ${msg}`);
		}
		throw new Error(`'${href}' fetch failed; ${msg}`);
	}
	if (response.body == null) {
		throw new Deno.errors.NotFound(`'${href}' content not found`);
	}
	const readableStream = response.body;
	return readableStreamToText(readableStream);
}

//===

// NOTES
// * review KB and references for Unicode notes and MSDN documentation of file naming and namespaces
//   - kb-Unicode-UNC-&-portable-paths.mkd
//   - kb-path-length-&-unicode.mkd
//   - [MS/learn ~ Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file) @@ <https://archive.is/TtpI2>
//   - [MSDN ~ Paths and Namespaces](http://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx) @@ <https://archive.today/DgH7i>
//   - [MSDN - Windows: Naming Files, Paths, and Namespaces](http://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx) @@ <https://archive.today/DgH7i>
// * valid URLs
// - only need a scheme
//   - `/^[A-Za-z][A-Za-z0-9+-.]*(?=:)/` // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>`
//   - `scheme` is the text before the first colon `:`; protocol includes the text and the ':'
// - URLs with a scheme but no authority (host) are valid; called 'opaque' URLs
// - URLs with a scheme and authority (host) are 'hierarchical' URLs (also referred to as "Authority URLs", "Host-based URLs", or "Origin URLs")
// - URNs (e.g., 'urn:isbn:0451450523') identify resources by name within a namespace, but don't specify location
// - 'file:' scheme is also special, as it is hierarchical but may be missing a 'host' if the path is on the localhost
//   - as a string, it should be `file:///` (with three slashes) to be a valid file URL o/w interpret it as a path (b/c it's a legal path on POSIX systems)
//   - note: for `new URL(...)`, `deno` and `node` interpret `file:` (and `file:/` and `file://`) as 'file:///' and `file:foo` (and `file:/foo` and `file://foo`) as 'file:///foo'

// const urlSchemeRx = /^[A-Za-z][A-Za-z0-9+-.]*(?=:)/ms; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
const urlProtocolRx = /^[A-Za-z][A-Za-z0-9+-.]*:/ms; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
const urlRejectsRx = /^(?:ftp|https?|wss?):(?:$|\/+$)/i; // quick rule-outs regex for invalid forms of the most common schemes

// `isValidURL()`
/** Determine if the supplied text string (`s`) is a valid URL, relative to an optional `base` URL.
@tags `no-panic`, `no-throw`; `no-prompt`
*/
export function isValidURL(s?: string, options?: { base?: URL } & PathAndUrlOptions) {
	// FixME: likely remove this in favor of just using `validURL() != null` so that URL construction work is preserved for user's use, when desired
	// options = { ...PathAndUrlOptionsDefault, ...options };

	// // * use efficient initial rule-outs
	// if (s == null || s.length === 0) {
	// 	// return ifThenElse(base != null, true, false);
	// 	return ifThen(base != null, base) ?? false;
	// }
	// if (base == null) {
	// 	if (!s.includes(':')) return false;
	// 	if (s.startsWith('file:')) return true;
	// 	// * avoid single character schemes unless explicitly allowed (ie, avoid mis-classifying 'C:...' for WinOS)
	// 	const scheme = urlSchemeRx.exec(s)?.[0];
	//  // - FixME: this doesn't handle the case of singleLetterSchemeAsDrive == "WinOS-only"
	// 	const validScheme =
	// 		scheme != null && scheme.length > (options.singleLetterSchemeAsDrive ? 1 : 0);
	// 	if (!validScheme) return false;
	// }
	// if (urlRejectsRx.test(s)) return false;

	// // // * only use try/catch URL() when the string looks like it might be a URL
	// // return tryFnOrSync(() => {
	// // 	new URL(s, base);
	// // 	return true;
	// // }, false);
	// return intoURL(s, base, options) ?? false;
	// return !!validURL(s ?? '', base, options);
	return !!validURL(s, options);
}

// `validURL()`
/** Convert the supplied text string (`s`) into a valid URL, relative to an optional `base` URL
* ; `undefined` if `s` [relative to `base`] isn't a valid URL
* * `no-throw` ~ function returns `undefined` upon any error
@tags `no-panic`, `no-throw`; `no-prompt`
*/
export function validURL(s?: string, options?: { base?: URL } & PathAndUrlOptions) {
	// `validURL()`
	/** Convert the supplied text string (`s`) into a valid URL, relative to an optional `base` URL
* ; `undefined` if `s` [relative to `base`] isn't a valid URL
* * `no-throw` ~ function returns `undefined` upon any error
@tags `no-panic`, `no-throw`; `no-prompt`
*/
	const base = options?.base;

	// ToDO: benchmark/research - this might be premature optimization
	// * use efficient initial rule-outs
	if (s == null || s.length === 0) {
		return ifThen(base != null, base);
	}
	if (base == null) {
		if (!s.includes(':')) return undefined;
	}
	if (urlRejectsRx.test(s)) return undefined;

	// * only use `intoURL()` when the string looks like it might be a valid URL
	return intoURL(s, options);
}

//===

// `isFileURL()`
/** Determine if `url` is a file-type URL (ie, uses the 'file:' protocol), identifying a file resource (local or network). */
export function isFileURL(url: URL) {
	return url.protocol === 'file:'; // ie, URL scheme == 'file' (uses the file system to access the resource)
}

//===

// Unicode character codes
// * can be used for micro-optimization of comparisons during path functions
export const CHAR_FORWARD_SLASH = 47; /* / */
export const CHAR_UPPERCASE_A = 65; /* A */
export const CHAR_UPPERCASE_Z = 90; /* Z */
export const CHAR_BACKWARD_SLASH = 92; /* \ */
export const CHAR_LOWERCASE_A = 97; /* a */
export const CHAR_LOWERCASE_Z = 122; /* z */

// `pathIsAbsolute()`
/** Determine whether the provided path (of filesystem/hierarchical type) is in an absolute form.
* Notably, "opaque"-type URLs (eg, `mailto:`, `data:`, `urn:`) will generally *not* have absolute paths,
in the hierarchical sense, even if fully and *absolutely* specified (eg, `mailto:santa@northpole.com`).
@param path • path to examine
@param options ~ defaults to `{singleLetterSchemeAsDrive: 'WinOS-only'}`
 */
export function pathIsAbsolute(
	path: string | URL | undefined,
	options?: { base?: URL | null | undefined } & PathAndUrlOptions,
) {
	if (path instanceof URL) path = path.pathname;
	if (path == null || path.length === 0) return false;
	if (path.startsWith($path.posix.sep)) return true; // absolute path for POSIX or WinOS in all variations

	// options = { ...PathAndUrlOptionsDefault, ...options };
	// const forWinOS = options.forPlatform === 'WinOS' || (options.forPlatform === 'host' && isWinOS);
	// // FixME: ToDO: investigate trying `new URL(path)` to detect URLs which are always absolute
	// // * use `path.includes(':')` as an efficient pre-check to avoid unnecessary calls to `URL()`
	// if (path.includes(':') && tryFnSync(() => path != null && new URL(path)) != null) return true; // URLs are always absolute
	// if (path.includes(':') && tryFnSync(() => path != null && new URL(path)) != null) return true; // URLs are always absolute
	// // FixME: DRIVE: paths on WinOS will all be seen as absolute no matter the path unless the above new URL() check is narrowed to only multi-letter schemes
	// const $platformPath = forWinOS ? $path.win32 : $path.posix;
	// if (forWinOS) path = path.replace(/^[/\\][/\\][.?][/\\]/, ''); // remove device prefix for WinOS paths
	// return $platformPath.isAbsolute(path);

	const url = pathIntoURL(path, options);
	return url?.pathname.startsWith($path.posix.sep) ?? false; // URL.pathname is in POSIX form
}
export function pathIsAbsoluteWithDrive(path: string | undefined, options?: PathAndUrlOptions) {
	return path?.match(/^[A-Za-z]:/) && pathIsAbsolute(path, options);
}
export function pathIsRelativeWithDrive(path: string | undefined, options?: PathAndUrlOptions) {
	return path?.match(/^[A-Za-z]:/) && !pathIsAbsolute(path, options);
}

// `absolutePath()`
/** Join all path segments, returning an absolute, syntactically normalized path.
* * Normalization is done syntactically, *without* considering/resolving file system symlinks.
* * `no-throw` ~ will *not panic* (function returns `undefined` upon any error)
@param pathSegments • path segment (string or string[])
@param options • { `permitGuard` } • passed to `cwd()`
@tags `no-panic`, `no-throw`
*/
export function absolutePath(pathSegments: string | string[], options?: PermitOptions) {
	pathSegments = Array.isArray(pathSegments) ? pathSegments : [pathSegments];
	if (pathSegments.length === 0) return undefined;
	let currentPath: string | undefined = undefined;
	let currentDrive: string | undefined = undefined;

	for (const segment of pathSegments) {
		if (segment == null || segment === '') continue;
		const [_match, _prefix, drive, path] =
			segment?.match(/^([/\\][/\\][.?][/\\])?(?:([A-Za-z]):)?(.*)$/) ?? [];
		// console.warn('absolutePath', { segment, abs: $path.isAbsolute(segment), prefix, drive, path });
		if ($path.isAbsolute(segment)) {
			currentPath = segment;
			currentDrive = drive;
		} else {
			const currentChanging = currentPath == null || (drive && currentDrive !== drive);
			if (currentChanging) {
				currentPath = cwdOfDrive(drive ?? currentDrive, options);
				if (currentPath == null) return undefined;
				currentDrive = currentPath?.match(/^([/\\][/\\][.?][/\\])?(?:([A-Za-z]):)?(.*)$/)?.[2];
			}
			// console.warn('absolutePath', { currentPath, currentDrive, segment, prefix, drive, path });
			currentPath = $path.join(currentPath ?? '', path ?? '');
		}
		// console.warn('absolutePath', { currentPath, currentDrive });
	}

	// return $path.resolve(...pathSegments);
	return currentPath;
}

// `intoPath()`
/** Extract the "path", in normalized (Deno and OS/Platform API compatible) string form, from a path string or URL.
* * `no-throw` ~ function returns `undefined` upon any error
@param path • path/URL-string (may already be in URL format [ie, 'file://...']) or URL
@tags `no-panic`, `no-throw`
*/
export function intoPath(path?: string | URL, options?: PathAndUrlOptions) {
	if (path == null) return undefined;
	return pathFromURL(path instanceof URL ? path : intoURL(path, options), options);
}

const pathDriveRx = /^[A-Za-z]:/;
const _pathDriveRelativeRx = /^[A-Za-z]:[^/\\]?/;
// per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
const pathHostPathnameRx = /^(?:[/\\][/\\]([^/\\]+)?(?=[/\\](?:[^/\\]|$)))?(.*)/;
// const pathSchemeHostPathnameRx =
// 	/^(?:([A-Za-z][A-Za-z0-9+-.]*):)?(?:[/\\][/\\]([^/\\]+)?(?=[/\\](?:[^/\\]|$)))?(.*)/;
const pathProtocolHostPathnameRx =
	/^([A-Za-z][A-Za-z0-9+-.]*:)?(?:[/\\][/\\]([^/\\]+)?(?=[/\\](?:[^/\\]|$)))?(.*)/;

// import { pathToFileURL } from 'node:url';

// `pathIntoURL()`
/** Convert a `path` string into a standard `URL` object, relative to an optional `base` reference URL.
* * `no-throw` ~ function returns `undefined` upon any error
@param path • path/URL-string (may already be in URL href/string format [ie, 'scheme://...'])
@param options.base • baseline URL reference point ~ defaults to `$path.toFileUrl(atImportCWD + $path.SEP)`; _note_: always uses *file path semantics* (not URL path semantics) for paths relative to `base` (ie, any trailing separators for `base` are irrelevant)
@param options ~ defaults to `{singleLetterSchemeAsDrive: 'WinOS-only'}`
@tags `no-panic`, `no-throw` ; `no-prompt`
*/
// FixME: ? add resolveWinOSDriveRelative (default to `true`; note: will only occur on WinOS hosts [b/c unresolvable on POSIX hosts])
// FixME: [2025-08-03; rivy] Opaque URLs (ie, 'foo:bar') have read-only properties, except `href` which can be changed, so direct manipulation of 'host' and 'pathname', as currently used here, won't work.
// FixME: [2025-08-23; rivy] define semantics for paths relative to an Opaque base URL (AI says path portion should always replace the opaque path, keeping origin/host/hostname the same with URL remaining Opaque, never converted to Hierarchical)
// FixME: add options to parse and copy hash and query strings from `path` to the resulting URL; defaults to false == 'ignore' hash and query text
// * as paths may contain both/either '#' and/or '?' as path elements, we will default to ignoring both of them
// * so, pre-parse `path` to remove any hash and query strings, if needed, prior to presenting to xIntoURL for URL construction
export function pathIntoURL(
	path: string | undefined,
	options?: { base?: URL | null | undefined } & PathAndUrlOptions,
): URL | undefined {
	options = { ...PathAndUrlOptionsDefault, ...options };
	const base =
		options?.base === null
			? null
			: options?.base ??
				tryFnSync(
					() => ifThen(atImportCWD != null, $path.toFileUrl(atImportCWD + $path.SEP)),
					options.mayPanic,
				);
	const consoleWARN_on = false;
	const consoleWARN = consoleWARN_on ? console.warn : () => {};
	consoleWARN('pathIntoURL():', { path, base, options });

	if (path == null || path.length === 0) {
		return base ?? undefined;
	}

	const forWinOS = options.forPlatform === 'WinOS' || (options.forPlatform === 'host' && isWinOS);
	consoleWARN('pathIntoURL():', { forWinOS, forPlatform: options.forPlatform });

	const baseProtocol = base?.protocol ?? '';
	const baseHost = base?.host ?? '';
	const basePathname = base?.pathname ?? '';
	consoleWARN('pathIntoURL():', { baseProtocol, baseHost, basePathname });

	const [, maybeProtocol, _host, _pathname] = path.match(pathProtocolHostPathnameRx) ?? [];
	const pathProtocol =
		maybeProtocol != null && maybeProtocol.length > (options.singleLetterSchemeAsDrive ? 2 : 0)
			? maybeProtocol
			: '';
	const [, maybeHost, pathPathname] =
		path.slice(pathProtocol.length).match(pathHostPathnameRx) ?? [];
	const pathHost = maybeHost ?? '';
	consoleWARN('pathIntoURL():', {
		maybeProtocol,
		pathProtocol,
		path,
		pathAfterSlice: path.slice(pathProtocol.length),
		maybeHost,
		pathHost,
		pathPathname,
	});

	const protocol = [pathProtocol, baseProtocol].find((v) => v.length > 0) ?? 'file:'; // default to 'file:' protocol if no protocol is specified
	const hostname = ifThenElse(protocol === baseProtocol, baseHost, pathHost);

	let result: URL | undefined = undefined;
	let p: string | undefined = undefined;

	// FixME: WinOS (and file scheme only) will require special handling of drive letters b/c Deno join will not handle relative paths with drive letters correctly
	// FixME: * which will require a working isAbsolutePath() function
	p = tryFnSync(() => pathToPOSIX(pathPathname), options.mayPanic); // URLs all use POSIX paths
	consoleWARN('pathIntoURL():', { p });
	// if (protocol === 'file:') {
	// 	consoleWARN('pathIntoURL():', { forWinOS });
	// 	if (forWinOS) {
	// 		consoleWARN('pathIntoURL():', { p });
	// 		const pathDrive = p?.match(pathDriveRx)?.[0];
	// 		consoleWARN('pathIntoURL():', { pathDrive });
	// 		if (pathDrive != null) p = $path.win32.resolve(cwdOfDrive(pathDrive) ?? '', p ?? '');
	// 		consoleWARN('pathIntoURL():', { p });
	// 		p = tryFnSync(() => pathToPOSIX(pathPathname), options.mayPanic); // URLs all use POSIX paths
	// 	}
	// }
	// consoleWARN('pathIntoURL():', { p });

	if (
		result == null &&
		protocol === baseProtocol &&
		hostname === baseHost &&
		p != null &&
		base != null
	) {
		// FixME: 'opaque' URLs (eg, non-hierarchical [with a "null" 'origin', empty 'host' and 'hostname') have read-only properties, except `href` which can be changed, so direct manipulation of 'host' and 'pathname', as used here, won't work
		// path and base have equivalent protocol/scheme and host
		// * use base as the origin and simply join the path pathname to base pathname
		consoleWARN('pathIntoURL():', '1-[path/base equivalent proto and host]\n', {
			pathProtocol,
			pathHost,
		});
		consoleWARN('pathIntoURL():', { protocol, hostname });
		result = base;
		/* protocol and hostname have been copied from base */
		result.hostname = hostname;
		consoleWARN('pathIntoURL():', { basePathname, p });
		const maybePath = pathToPOSIX(absolutePath([basePathname, p])); // URLs all use POSIX paths
		if (maybePath == null) return undefined;
		result.pathname = maybePath;
	}

	if (
		result == null &&
		(pathProtocol === '' || pathProtocol === baseProtocol) &&
		pathHost !== baseHost &&
		base != null
	) {
		// FixME: 'opaque' URLs (eg, without a 'host') have read-only properties, except `href` which can be changed, so direct manipulation of 'host' and 'pathname', as used here, won't work
		consoleWARN('pathIntoURL():', '2-[path/base equivalent proto]\n', {
			pathProtocol,
			pathHost,
			baseHost,
		});
		consoleWARN('pathIntoURL():', { protocol });
		result = base;
		/* protocol has been copied from base */
		result.hostname = hostname;
		if (p == null) return undefined;
		result.pathname = p;
	}

	if (result == null) {
		consoleWARN('3-[path/base no common equivalent proto]\n', {
			pathProtocol,
			pathHost,
			baseHost,
		});
		result = tryFnSync(() => new URL(path, base ?? undefined), options?.mayPanic);
	}

	if (result != null) {
		result.hash = '';
		result.search = '';
	}

	consoleWARN('pathIntoURL():', { result });
	return result;
}
// `deno eval "import * as $ from 'file://C:/Users/Roy/AARK/Projects/deno/dxx/repo.GH/src/lib/$shared.ts'; let x = $.posixIntoURL('file:x/y'); x = new URL('file:x/y'); console.log({x});"`
// `deno eval "import * as $ from 'file://C:/Users/Roy/AARK/Projects/deno/dxx/repo.GH/src/lib/$shared.ts'; let x = $.posixIntoURL('f:///////x/y'); const y = new URL('file://///f://///a/x/y'); console.log({x, y});"`
// `deno eval "import * as $ from './src/lib/$shared.ts'; const U = new URL('scheme:foo#bar'); const result = $.xIntoURL('y', { base: U }); console.log({result});"`
// * test cases:
// xIntoURL('y', { base: new URL('http://host/path/file') }); => 'http://host/path/file/y'
// xIntoURL('y', { base: new URL('http://host/path/') }); => 'http://host/path/y'
// xIntoURL('y', { base: new URL('http://host/path') }); => 'http://host/path/y'

// `intoURL()`
/** Convert a `path` string into a standard `URL` object, relative to an optional `base` reference URL.
* * `no-throw` ~ function returns `undefined` upon any error
@param path • path/URL-string (may already be in URL href/string format [ie, 'scheme://...'])
@param options.base • baseline URL reference point ~ defaults to `$path.toFileUrl(atImportCWD + $path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@param options ~ defaults to `{platform: 'host', singleLetterSchemeAsDrive: true}`
@tags `no-panic`, `no-throw` ; `no-prompt`
*/
// FixME: ? add urlStringEncoding option; true/'all', 'fileScheme-only', 'fileOrNoScheme-only' (default), 'noScheme-only', false/'none'
// export function intoURL(path?: string, base?: URL, options?: PathAndUrlOptions): URL | undefined;
// export function intoURL(path?: string, ...args: unknown[]) {
export function intoURL(
	path: string | null | undefined,
	options?: { base?: URL } & PathAndUrlOptions,
): URL | undefined {
	options = { ...PathAndUrlOptionsDefault, ...options };
	const base =
		options?.base ?? ifThen(atImportCWD != null, () => $path.toFileUrl(atImportCWD + $path.SEP));
	// const urlStringEncodeSchemes: 'all' | string[] = ['', 'file'];
	// console.warn('intoURL():', { path, base, options });
	try {
		// const base =
		// 	args?.length > 0 && args[0] instanceof URL
		// 		? (args.shift() as URL)
		// 		: atImportPermitCWD && atImportCWD != null
		// 			? (() => {
		// 					try {
		// 						return $path.toFileUrl(atImportCWD + $path.SEP);
		// 					} catch {
		// 						return undefined;
		// 					}
		// 				})()
		// 			: undefined;
		// // FixME: this type coercion can be wrong; instead, rewrite options as `{base?:URL} & PathAndUrlOptions` or use a duck-type type guard
		// const options = {
		// 	...PathAndUrlOptionsDefault,
		// 	...ifThen(args?.length > 0, () => args.shift() as PathAndUrlOptions),
		// };

		// * use efficient initial return(s)
		if (path == null || path.length === 0) {
			return ifThen(base != null, base);
		}
		const forWinOS = options.forPlatform === 'WinOS' || (options.forPlatform === 'host' && isWinOS);
		const $platformPath = forWinOS ? $path.win32 : $path.posix;
		const singleLetterSchemeAsDrive =
			(options.singleLetterSchemeAsDrive === 'WinOS-only' && forWinOS) ||
			!!options.singleLetterSchemeAsDrive;

		const maybeProtocol = urlProtocolRx.exec(path)?.[0].toLocaleLowerCase();
		const _pathProtocol: string =
			maybeProtocol != null && maybeProtocol.length > (singleLetterSchemeAsDrive ? 1 : 0)
				? maybeProtocol
				: '';
		// const pathHasSchemeAsDrive =
		// 	maybeScheme != null && singleLetterSchemeAsDrive && maybeScheme.length == 1;
		// const hasUrlScheme = scheme != null && scheme.length > (singleLetterSchemeAsDrive ? 1 : 0);
		// const pathHasUrlScheme = maybeScheme != null && !pathHasSchemeAsDrive;
		// const pathIsFileURL = scheme === 'file';
		// console.warn({ path, base, options, scheme, hasDrive, hasUrlScheme, forWinOS });

		let url: URL | undefined = undefined;
		// if (!forWinOS && pathScheme != '') url = new URL(path, base);

		if (forWinOS) {
			// const pathDrive = path.match(/^[A-Za-z]:/)?.[0];
			// const pathHost = path.match(/^[/\\][/\\]([^/\\]+)/)?.[1];
			// const pathHost = pathHostRx.exec(path)?.[1];

			const pathDrive = pathDriveRx.exec(path)?.[0];
			const [_pathHost, _pathPathname] = pathHostPathnameRx.exec(path)?.slice(2) ?? [];
			// const pathWithoutDrive = ifThen(pathDrive != null, () => path.replace(pathDriveRx, 'ZZZ'));
			const pathWithoutDrive = ifThenElse(
				pathDrive != null,
				() => path.slice(pathDrive?.length),
				path,
			);
			const pathIsAbsolute =
				(pathWithoutDrive?.startsWith('/') || pathWithoutDrive?.startsWith('\\')) ?? false;

			// console.warn({
			// 	path,
			// 	pathProtocol,
			// 	pathDrive,
			// 	pathHost,
			// 	pathPathname,
			// 	pathWithoutDrive,
			// 	pathIsAbsolute,
			// });

			const pathResolved = (() => {
				if (pathDrive == null || pathIsAbsolute) {
					return path;
				}
				if (pathWithoutDrive == null) return undefined;
				const pathDriveCWD = cwdOfDrive(pathDrive);
				if (pathDriveCWD == null) return undefined;
				// console.warn({ pathDriveCWD, pathWithoutDrive });
				return $platformPath.join(pathDriveCWD, pathWithoutDrive);
			})();
			// console.warn({ pathResolved });
			if (pathResolved == null) return undefined;

			// // // console.warn({ path, pathDrive, pathHost });
			// // if (forWinOS && pathDrive == null && pathHost == null) url = new URL(path, base);

			// let pathname = (() => {
			// 	// const pathIsAbsolute = $platformPath.isAbsolute(path);
			// 	// if (pathIsAbsolute && pathDrive == null && pathHost == null) {
			// 	// 	// * path is absolute and has no leading drive letter or host name
			// 	// 	return path;
			// 	// }
			// 	// console.warn({ base });
			// 	if (base == null) return undefined;
			// 	const basePath = base.protocol === 'file:' ? $platformPath.fromFileUrl(base) : base.pathname;
			// 	const baseDrive = pathDriveRx.exec(basePath)?.[0];
			// 	// console.warn({ basePath, baseDrive });
			// 	// * work-around for `Deno.std::path.resolve()` not handling drive letters correctly
			// 	const finalDrive = pathDrive ?? baseDrive /*  ?? cwd()?.match(/^[A-Za-z]:/)?.[0] */;
			// 	// const CWD = ifThen(finalDrive != null, cwd());
			// 	// const CWDDrive = CWD?.match(/^[A-Za-z]:/)?.[0];
			// 	// console.warn({ base, basePath, baseDrive, pathDrive, finalDrive /* CWD, CWDDrive */ });
			// 	// const finalDriveCWDNeeded =
			// 	// 	CWD != null &&
			// 	// 	finalDrive != null &&
			// 	// 	CWDDrive?.toLocaleUpperCase() != finalDrive?.toLocaleUpperCase();
			// 	// const finalDriveCWD = (finalDriveCWDNeeded ? cwdOfDrive(finalDrive) : undefined) ?? '';
			// 	const finalDriveCWD = cwdOfDrive(finalDrive) ?? '';
			// 	const resolved = /* pathIsAbsolute
			// 		? $platformPath.resolve(path)
			// 		:  */ $platformPath.resolve(basePath, finalDriveCWD, path);
			// 	return resolved;
			// })();
			// console.warn({ pathname });
			// if (pathname == null) return undefined;

			// // NOTE: UNC paths of the form `\\localhost\...` will fail conversion to a file-URL with a TypeError (invalid hostname) => convert to `\\.\UNC\localhost\...`
			// pathResolved = pathResolved.replace(/^([/\\][/\\]localhost[/\\])/, '\\\\.\\UNC$1');
			// * `ls '\\localhost\c$'` == `ls '\\.\UNC\localhost\c$'`; network shares
			// * `ls '\\.\c:\'` == `ls '//./C:/'` == `ls '\\?\c:\'` == `ls '//?/C:/'`; windows devices

			// // encode any path starting with '\\?\...' into an alternate path ('\\.\?\...')
			// // * [why] ~ WinOS device paths may be in the form of `\\?\...`, but '?' is an invalid URL host name
			// // *   ... so, encode any path starting with '\\?\...' into an alternate "pseudo-device" path ('\\.\?\...' [which is otherwise invalid/unused by WinOS])
			// // *   ... platform restriction is not needed as valid POSIX-like paths should never have this prefix
			// // *   ... this does require decoding when the path is retrieved from the URL (ie, using `pathFromURL()`)
			// pathResolved = pathResolved.replace(/^([/\\][/\\])[?]([/\\])/, '$1.$2?$2');
			// const pathPlatform = intoPlatformPath(pathResolved);
			// if (pathPlatform == null) return undefined;

			// FixME: clean this up; deal with URL encoding for paths not piped through `toFileUrl()`
			// - probably default to encode anything that's assumed to be a 'file:' URL as they don't use hashes or other accessory URL parts
			// - so, file: schemes, drive letter schemes, or no scheme => encode
			// - ? add an option controlling URL encoding?

			const pathForPlatform = intoPlatformPath(pathResolved, options);
			// console.warn({ pathForPlatform });
			if (pathForPlatform == null) return undefined;
			const finalScheme = urlProtocolRx.exec(pathForPlatform)?.[0];
			const finalHasSchemeAsDrive =
				finalScheme != null && singleLetterSchemeAsDrive && finalScheme.length == 1;
			const finalHasUrlScheme = finalScheme != null && !finalHasSchemeAsDrive;
			// console.warn({ finalScheme, finalHasSchemeAsDrive, finalHasUrlScheme });
			const pathWithScheme = finalHasUrlScheme
				? pathForPlatform
				: // : `file://${pathToPOSIX(pathForPlatform)}`;
					// `file://${pathForPlatform}`;
					pathIsAbsolute
					? $path.toFileUrl(pathForPlatform)
					: // : `file://${$platformPath.resolve(base?.pathname ?? '', pathForPlatform)}`;
						'file:' + pathForPlatform;
			// console.warn({ pathWithScheme });
			// url = new URL($platformPath.toFileUrl(pathPlatform), base);
			url = new URL(pathWithScheme, base);
			// console.warn({ url });

			// console.warn({ pathIsURL, path, pathname, url });
		}
		return url;
	} catch (_error) {
		console.warn('caught panic', { _error });
		return undefined;
		// throw _error;
	}
}

// `pathFromURL()`
/** Extract the "path" (absolute file path for 'file://' URLs, otherwise the href URL-string) from the `url`.
* * `no-throw` ~ function returns `undefined` upon any error
@param url • URL for path extraction
@tags `no-panic`, `no-throw`
*/
export function pathFromURL(url?: URL, options?: PathAndUrlOptions) {
	if (url == null) return undefined;
	try {
		options = { ...PathAndUrlOptionsDefault, ...options };
		// console.warn('pathFromURL:', { url, options });

		// const isWinOS = Deno.build.os === 'windows';
		const forWinOS = options.forPlatform === 'WinOS' || (options.forPlatform === 'host' && isWinOS);
		const $platformPath = forWinOS ? $path.win32 : $path.posix;
		let path = url.href;
		// console.warn('pathFromURL:', { url, href: path });
		if (url.protocol === 'file:') {
			path = $platformPath.fromFileUrl(path);
		}
		// console.warn('pathFromURL:', { path, intoPlatformPath: intoPlatformPath(path) });
		return intoPlatformPath(path, options);
	} catch (_error) {
		if (options?.mayPanic) {
			throw _error;
		}
		return undefined;
	}
}

// `isWinOsDeviceName()`
export function isWinOsDeviceName(path: string, options?: PathAndUrlOptions) {
	// ref: [WinOS Paths (includes Win10-style vs Win11-style info)](https://chrisdenton.github.io/omnipath/print.html) @@ <https://archive.is/90Elx>
	// ref: [Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file) @@ <https://archive.is/TtpI2>
	if (path.length === 0) return false;
	// if (Deno.build.os !== 'windows') return false; // WinOS-only
	// if (path.match(/^[/\\][/\\][.?][/\\]/)) return false;

	// * options.fileStemMayMatch == true ~ inclusive, non-strict matching == will match if file prefix/stem matches any of `specialDeviceStemNames` (Win10-style [or earlier] compatible matching)
	// * options.fileStemMayMatch == false ~ strict matching == only complete file name may match any of `specialDeviceStemNames` (Win11-style [or later] compatible matching)
	options = { ...PathAndUrlOptionsDefault, ...options };
	// const isWinOS = Deno.build.os === 'windows';
	const forWinOS = options.forPlatform === 'WinOS' || (options.forPlatform === 'host' && isWinOS);
	if (!forWinOS) return false; // WinOS-only
	const $platformPath = forWinOS ? $path.win32 : $path.posix;

	const specialDeviceBaseNames = ['CONIN$', 'CONOUT$'];
	const specialDeviceStemNames = ([] as string[]).concat(
		['CON', 'PRN', 'AUX', 'NUL'], // legacy device names
		['COM0', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9'], // legacy COM device names
		['COM¹', 'COM²', 'COM³'], // legacy COM device names (with ISO/IEC 8859-1 superscript digits)
		['LPT0', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'], // legacy LPT device names
		['LPT¹', 'LPT²', 'LPT³'], // legacy LPT device names (with ISO/IEC 8859-1 superscript digits)
	);
	const fileBaseName = $platformPath.basename(path).toLocaleUpperCase(); // include any extension
	const fileStem = fileBaseName.replace(/[.].*$/, '').trimEnd();
	const match =
		specialDeviceBaseNames.includes(fileBaseName) ||
		specialDeviceStemNames.includes(fileBaseName) ||
		(options.fileStemMayMatchDevice && specialDeviceStemNames.includes(fileStem));
	// console.warn('isWinOsDeviceName:', { path, fileBaseName, filePrefix, match });
	return match;
}

// `intoPlatformPath()`
/** Rewrite `path` into a platform API compatible version (required to correctly handle certain types of WinOS paths).
*
* For WinOS, this reverses device encoding and converts paths into 'verbatim' file paths when required.
* * `no-throw` ~ function returns `undefined` upon any error
@param path • path/URL-string
@param options `{ fileStemMayMatch }` • if `true`, file prefix/stem may match any of the special device names (Win10-style [or earlier] compatible matching); if `false`, only complete file name may match any of the special device names (Win11-style [or later] compatible matching)
@tags `no-panic`, `no-throw`
*/
export function intoPlatformPath(path?: string, options?: PathAndUrlOptions) {
	// console.warn('intoPlatformPath:', { arg: path });
	if (path == null || path === '') return undefined;
	options = { ...PathAndUrlOptionsDefault, ...options };
	// console.warn('intoPlatformPath():', { path, options });

	// const isWinOS = Deno.build.os === 'windows';
	const forWinOS = options.forPlatform === 'WinOS' || (options.forPlatform === 'host' && isWinOS);
	if (!forWinOS) return path; // only WinOS paths require special handling/sanitization
	const $platformPath = forWinOS ? $path.win32 : $path.posix;

	// * WinOS-only ~ decode any device path of the form '\\.\?\...' (otherwise invalid/unused) back into the standard '\\?\...' path
	path = path.replace(/^([/\\][/\\])[.][/\\][?]([/\\])/, '$1?$2');
	// console.warn('intoPlatformPath:', { path });

	// WinOS ~ handle special device paths

	// ref: [File path formats](https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats) @@ <https://archive.is/0shPL>
	// ref: [Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file) @@ <https://archive.is/TtpI2>
	// ref: [WinOS Paths (includes Win10-style vs Win11-style)](https://chrisdenton.github.io/omnipath/print.html) @@ <https://archive.is/90Elx>

	// * no further processing for paths with device prefixes (eg, '\\.\', '\\?\' [and equivalent slash variants])
	if (!path.match(/^[/\\][/\\][.?][/\\]/)) {
		// * convert paths which contain device names into 'verbatim' file paths
		// * note: to generate the most compatible resultant paths, Win10-style prefix/stem matching is used
		//     ... this will result in some unneeded conversions to 'verbatim'-type paths for Win-11+ platforms, but they remain compatible
		if (isWinOsDeviceName(path, options)) {
			const resolvedPath = absolutePath(path); // 'verbatim' paths must be in absolute/resolved form
			path = `${$platformPath.sep}${$platformPath.sep}?${$platformPath.sep}${resolvedPath}`;
		}
	}

	// `\\?\...` is likely the more "correct" prefix as it skips further Windows normalization via `GetFullPathName()`; but Deno and the standard URL class do not support it
	// * instead use the usually equivalent `\\.\` prefix for better compatibility with Deno and the standard URL class
	path = path.replace(
		/^[/\\][/\\][?][/\\]/,
		`${$platformPath.sep}${$platformPath.sep}.${$platformPath.sep}`,
	);
	// * additionally, Deno does not support '//./' as a prefix, so always replace it with the equivalent '\\.\' instead
	path = path.replace(
		/^[/\\][/\\][.][/\\]/,
		`${$platformPath.sep}${$platformPath.sep}.${$platformPath.sep}`,
	);
	// // * combine into one regex replacement
	// path = path.replace(
	// 	/^[/\\][/\\][.?][/\\]/,
	// 	`${$platformPath.sep}${$platformPath.sep}.${$platformPath.sep}`,
	// );
	// console.warn('intoPlatformPath:', { ret: path });
	return path;
}

//===

// `ensureAsPath()`
/** Ensure "path" is a valid path/URL-string (by conversion if needed) or *panic*.
@param path • path/URL-string (may already be in URL file format [ie, 'file://...']) or URL
@tags `may-panic` • may throw `Deno.errors.InvalidData` if `path` is not valid
*/
export function ensureAsPath(path?: string | URL, options?: PathAndUrlOptions) {
	const p = intoPath(path, options);
	if (p == null || p === '') throw new Deno.errors.InvalidData('Invalid path');
	return p;
}

// `ensureAsURL()`
/** Ensure "path" is a valid URL (by conversion if needed) or *panic*.
@param path • path/URL-string (may already be in URL file format [ie, 'file://...']) or URL
@tags `may-panic` • may throw `Deno.errors.InvalidData` if `path` is not a valid URL
*/
export function ensureAsURL(path: string | URL, options?: PathAndUrlOptions) {
	if (path instanceof URL) return path;
	const url = intoURL(path, options);
	if (url == null) throw new Deno.errors.InvalidData('Invalid URL');
	return url;
}

//===

/** 'read' permission state at time of module import
- *avoids* permission prompts
*/
// const allowRead = (await Deno.permissions?.query({ name: 'read' })).state === 'granted';
const allowRead = atImportPermissions.read.state === 'granted';
const allowRun = atImportPermissions.run.state === 'granted';

// `traversal()`
/** Determine the traversal path to `goal` from `base`.
- _Returned path will be relative to `base` iff `goal` shares a common origin/prefix with `base`, o/w it will be an absolute path_
- _Relative `goal` or `base` paths are evaluated as relative to the `atImportCWD` directory_
@param goal • target path
@param base • starting path ~ defaults to `$path.toFileUrl((atImportCWD ?? '')+$path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@tags `no-panic`, `no-throw` ; `no-prompt`
*/
export function traversal(
	goal: PathLike,
	base: PathLike = allowRead ? $path.toFileUrl((atImportCWD ?? '') + $path.SEP) : '',
) {
	const url = goal instanceof URL ? goal : intoURL(goal);
	const baseURL = base instanceof URL ? base : intoURL(base);
	const commonOrigin =
		url &&
		baseURL &&
		url.origin.localeCompare(baseURL.origin, undefined, { sensitivity: 'accent' }) == 0 &&
		url.protocol.localeCompare(baseURL.protocol, undefined, { sensitivity: 'accent' }) == 0;
	// console.warn({ goal, url, base, baseURL, commonOrigin });
	const basePath = pathFromURL(baseURL);
	const goalPath = pathFromURL(url);
	if (commonOrigin && basePath && goalPath) {
		const commonPathPrefix = longestCommonPrefix(
			// ToDO: add option to turn on/off file comparison case-sensitivity
			mightUseFileSystemCase() ? basePath : toCommonCase(basePath),
			mightUseFileSystemCase() ? goalPath : toCommonCase(goalPath),
		).replace(/[^\/]*$/, '');
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

// FixME: [2025-08-23; rivy] revise semantics to either return the type of `from` or revise the docs to note that it always returns a string path
// !  ... will this then require `intoPath()` to be revised to return a URL or string path depending on argument type?
// !  ... should there be a string path type
// `normalizeToPath()`
/** Resolve paths, syntactically, generally without any file system access, from various sources; similar to `path:join()`.
@returns normalized path (in string form) constructed from `from` with applied `path`
@param from • initial path or URL to resolve from
@param path • path, path segments, or URL path(s) to apply
@tags `no-panic`, `no-throw`
*/
export function normalizeToPath(
	from: Optional<PathLike>,
	path: Optional<PathLike> | Optional<PathLike>[],
) {
	return intoPath(normalizePath(from, path));
}

// `normalizePath()`
/** Normalize paths, syntactically with no file system access, from various sources; similar to `path:join()`.
@returns path or URL of the same type as input (`from`), undefined if `from` is null or undefined
@param from • initial path or URL to resolve from
@param path • path, path segments, or URL path(s) to apply
@tags `no-panic`, `no-throw`
*/
// Function overloads to specify return types
export function normalizePath(
	from: Optional<PathLike>,
	path: Optional<PathLike> | Optional<PathLike>[],
): PathLike | undefined;
export function normalizePath(
	from: string,
	path: Optional<PathLike> | Optional<PathLike>[],
): string | undefined;
export function normalizePath(
	from: URL,
	path: Optional<PathLike> | Optional<PathLike>[],
): URL | undefined;
export function normalizePath(
	from: undefined,
	path: Optional<PathLike> | Optional<PathLike>[],
): undefined;
//
export function normalizePath(
	from: Optional<PathLike>,
	path: Optional<PathLike> | Optional<PathLike>[],
): string | URL | undefined {
	if (from == null) return undefined;

	// note: paths may be relative and therefore are not automatically converted to URLs (some URLs require absolute/fully-specified paths)

	const isFromURL = from instanceof URL;
	const paths = Array.isArray(path) ? path : [path];

	// const fromPath = isFromURL ? pathFromURL(from) : from;
	const fromPath = isFromURL ? from.href : from;

	let resultPath: string | undefined = fromPath;
	let resultURL: URL | undefined = undefined;
	console.warn('normalizePath():init:', {
		resultPath,
		isAbsolute: pathIsAbsolute(resultPath),
		resultURL,
	});
	if (resultPath == null) return undefined;
	for (const p of paths) {
		if (p == null) continue;
		const isURL = p instanceof URL;
		const path = isURL ? pathFromURL(p) : p;
		if (path == null || path.length === 0) continue;
		if (isURL || resultPath == null) {
			resultPath = path;
			if (isURL) resultURL = p;
		} else {
			// note: `pathIsAbsolute()` is needed b/c `$path.join()` fails when handling some special absolute paths (eg, WinOS device paths)
			[resultPath, resultURL] = pathIsAbsolute(path)
				? [path, intoURL(path)]
				: ((): [string | undefined, URL | undefined] => {
						if (pathIsAbsolute(resultPath)) {
							resultURL = intoURL(resultPath);
							if (resultURL == null) return [resultPath, resultURL];
							resultURL.pathname = $path.join(pathFromURL(resultURL) ?? '', path);
							return [pathFromURL(resultURL), resultURL];
						}
						return [$path.join(resultPath, path), resultURL];
					})();
		}
		console.warn('normalizePath():loop:', { p, path, resultPath });
	}
	// const result =

	return isFromURL ? intoURL(resultPath) : resultPath;
}

/**
 * Joins path segments together, handling both file paths and URLs.
 * @param base The base path or URL
 * @param segments Path segments to join
 * @returns Joined path or URL (same type as base)
 */
export function joinPath(base: PathLike, ...segments: Array<PathLike>): Optional<PathLike> {
	const isBaseURL = base instanceof URL;

	// Handle URL base
	if (isBaseURL) {
		const result = new URL(base.href);
		let currentPath = result.pathname;

		for (const segment of segments) {
			// * absolute paths replace currentPath; relative paths are `join()`ed
			if (segment instanceof URL) {
				// URL paths are always absolute/fully-specified
				result.href = segment.href;
				currentPath = result.pathname;
			} else if (isValidURL(segment)) {
				// URL paths are always absolute/fully-specified
				result.href = segment;
				currentPath = result.pathname;
			} else if (pathIsAbsolute(segment)) {
				currentPath = segment;
			} else {
				// join relative paths using posix style for URLs
				currentPath = $path.posix.join(currentPath, segment);
			}
		}

		result.pathname = currentPath;
		return result;
	}

	// Handle string base
	let result: string | undefined = base as string;

	for (const segment of segments) {
		if (segment instanceof URL) {
			// URL paths are always absolute/fully-specified
			result = pathFromURL(segment);
		} else if (isValidURL(segment)) {
			// URL paths are always absolute/fully-specified
			result = segment;
		} else if (pathIsAbsolute(segment)) {
			result = segment;
		} else {
			if (result == null) {
				result = segment;
			} else {
				if (isValidURL(result)) {
					const u = new URL(result);
					u.pathname = $path.posix.join(u.pathname, segment);
					result = u.href;
				} else result = $path.join(result, segment);
			}
		}
	}

	return result;
}

//===

export function isEmpty(x: unknown): boolean {
	if (x == null) return true;
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
export function isFalsey(x: boolean | number | string | null | undefined): boolean {
	return toTruthy(x) == false;
}
// `isTruthy()`
export function isTruthy(x: boolean | number | string | null | undefined): boolean {
	return toTruthy(x) != false;
}
// `toTruthy()`
export function toTruthy(x: unknown): Truthy {
	if (x == null) return false;
	if (typeof x === 'boolean') return x ? 'true' : false;
	if (typeof x === 'number') return x !== 0 ? 'true' : false;
	if (typeof x === 'string') {
		if (falseyValues.includes(x)) {
			return false;
		}
	}
	return 'true';
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

//===

export function pathNormalizeSlashes(path: string) {
	// * replace all doubled-slashes with singles except for leading (for WinOS network paths) and those following schemes
	// * note: 'scheme' is defined per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1) @@ <https://archive.md/qMjTD#26.25%>
	return path.replaceAll(/(?<!^|[A-Za-z][A-Za-z0-9+-.]*:\/?)([\\\/])[\\\/]+/gmsu, '$1');
}

export function pathToOS(p?: string) {
	return isWinOS ? pathToWinOS(p) : pathToPOSIX(p);
}
export function pathToPOSIX(p?: string) {
	// ToDO: convert to use of $path.SEP_PATTERN
	return p?.replace(/\\/g, $path.posix.sep);
}
export function pathToWinOS(p?: string) {
	return p?.replace(/\//g, $path.win32.sep);
}

export function pathEquivalent(a?: string, b?: string) {
	// console.warn({ a, b });
	// console.warn({ aURL: intoURL(a), bURL: intoURL(b) });
	return a === b || intoURL(a)?.href === intoURL(b)?.href;
}

export function UrlEquivalent(a?: URL, b?: URL) {
	// console.warn({ a, b });
	return a === b || a?.href === b?.href;
}

//===

import textElide from 'https://cdn.jsdelivr.net/gh/rivy-t/deno.vendor-storage@984a40c5f2/vendor/deno@1.46.3-vendor/esm.sh/cli-truncate@4.0.0.js';
import textWidth from 'https://cdn.jsdelivr.net/gh/rivy-t/deno.vendor-storage@984a40c5f2/vendor/deno@1.46.3-vendor/esm.sh/string-width@7.2.0.js';
import wrapText from 'https://cdn.jsdelivr.net/gh/rivy-t/deno.vendor-storage@984a40c5f2/vendor/deno@1.46.3-vendor/esm.sh/wrap-ansi@9.0.0.js';

export { textElide, textWidth };

//===

// `textWrap()`
/** Wrap text to the specified column width.
 *
 * Newline characters will be normalized to `\n` (LF).
 *
 * @param text • Text string (which may contain ANSI escape sequences) that will be wrapped
 * @param width • Maximum column width (aka line length) for text wrapping
 * @param options.minWrappedWidth • Minimum width of wrapped lines; enforced by rewrapping each specific violating line in hard mode without word wrap (note: < 1 is interpreted as a fraction of `width`)
 */
export function textWrap(
	text: string,
	width: number,
	options: {
		hard?: boolean;
		minWrappedWidth?: number;
		wordWrap?: boolean;
		trimEnd?: boolean;
	} = {},
): string {
	if (text.length < 1 || width < 1) return text;
	options.minWrappedWidth = options?.minWrappedWidth ?? 0;
	const minWrappedWidth = Math.round(
		options.minWrappedWidth < 0
			? 0
			: options.minWrappedWidth < 1
				? width * options.minWrappedWidth
				: options.minWrappedWidth,
	);
	const wordWrap = options?.wordWrap ?? true;
	text.split(/\r?\n|\r/).join('\n'); // normalize newlines (MacOS, POSIX, WinOS) to LF
	let wrappedLines = wrapText(text, width, {
		...options,
		trim: options?.trimEnd,
	}).split('\n');
	if (wordWrap && minWrappedWidth > 0) {
		let minIdx = 0; // force progression (helps prevent possible infinite loop for some logic errors)
		let rewrapFromIdx = 0;
		while (
			minIdx < wrappedLines.length /* force completion (if ever needed) */ &&
			(rewrapFromIdx =
				wrappedLines.length > 1
					? wrappedLines
							.slice(0, -1)
							.findIndex(
								(line, idx) =>
									idx >= minIdx && textWidth(line) > 0 && textWidth(line) <= minWrappedWidth,
							)
					: -1) >= 0
		) {
			// console.warn({ minIdx, rewrapFromIdx, wrappedLines });
			minIdx = minIdx + 1;
			wrappedLines = [
				...wrappedLines.slice(0, rewrapFromIdx),
				...wrapText(wrappedLines.slice(rewrapFromIdx).join(' '), width, {
					...options,
					trim: options?.trimEnd,
					hard: true,
					wordWrap: false,
				}).split('\n'),
			];
		}
	}
	return wrappedLines.join('\n');
}

//===

// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat>
export function formatDuration(
	durationInMS: number,
	options: Intl.NumberFormatOptions = { minimumFractionDigits: 3, maximumFractionDigits: 5 },
): string {
	const [unit, n] = durationInMS > 1000 ? ['s', durationInMS / 1000] : ['ms', durationInMS];
	const NumberFormat = new Intl.NumberFormat(undefined, options);
	return `${NumberFormat.format(n)} ${unit}`;
}
export function formatN(
	n: number,
	options: Intl.NumberFormatOptions = { minimumFractionDigits: 3, maximumFractionDigits: 5 },
): string {
	const NumberFormat = new Intl.NumberFormat(undefined, options);
	return NumberFormat.format(n);
}

export function performanceDuration(tag: string) {
	const now = performance.now();
	try {
		const performanceEntries = (() => {
			let entries = performance.getEntriesByName(tag, 'mark');
			if (entries.length > 0) return entries;
			entries = entries.concat(performance.getEntriesByName(`${tag}:begin`));
			entries = entries.concat(performance.getEntriesByName(`${tag}:start`));
			entries = entries.concat(performance.getEntriesByName(`${tag}:end`));
			entries = entries.concat(performance.getEntriesByName(`${tag}:stop`));
			if (entries.length > 0) return entries;
			return undefined;
		})();
		// if ((performanceEntries == null) || performanceEntries.length < 2) return undefined;
		if (performanceEntries == null) return undefined;
		const duration =
			(performanceEntries.pop()?.startTime ?? now) - (performanceEntries.shift()?.startTime ?? now);
		return duration;
	} catch (_) {
		return undefined;
	}
}

export function durationText(tag: string): string | undefined {
	const duration = performanceDuration(tag);
	if (duration != null) {
		return `${tag} done (duration: ${formatDuration(duration, { maximumFractionDigits: 3 })})`;
	}
	return undefined;
}

//===

// ref: <https://stackoverflow.com/questions/3104410/identify-cygwin-linux-windows-using-environment-variables> , <https://stackoverflow.com/questions/714100/os-detecting-makefile>
// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain>
// ref: [CLI and emojis](https://news.ycombinator.com/item?id=25311114) @@ <https://archive.is/xL2BL>

// `isWSL()`
/** Determine if OS platform is 'Windows Subsystem for Linux'.
@param options `{ allowFsFallback }` • allow fallback to file system read if needed; defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt`
@tags [`allow-read=/proc/sys/kernel/osrelease`]
*/
/* spell-checker:ignore (env) OSID (path) osrelease */
export function isWSL(options?: { allowFsFallback?: boolean }) {
	// * POSIX-like and contains one of the WSL signal environment variables or a known WSL version (via *osrelease*)
	options = options ?? { allowFsFallback: true };
	// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain> @@ <https://archive.is/KWV5a>
	// FixME!: environment variables are *not* preserved across side-logins (ie, `sudo -i` causes them to disappear)
	// ** likely need to test uname, version, and/or files ... ref: <https://github.com/microsoft/WSL/issues/4555>
	// ** shortcut without touching the file system if the environment variable(s) are present
	// NOTE, in general, for better user usability... (ref: <https://superuser.com/questions/232231/how-do-i-make-sudo-preserve-my-environment-variables>)
	// * add `sudo echo 'Default:%sudo env_keep+="IS_WSL WSLENV WSL_*"' > /etc/sudoers.d/WSL-env_keep` for WSL
	// * add `sudo echo 'Default:%sudo env_keep+="WT_*"' > /etc/sudoers.d/WT-env_keep` for MS Windows Terminal variables
	// * (as an aside...) add `sudo echo 'Default:%sudo env_keep+="LANG LC_*"' > /etc/sudoers.d/SSH-env_keep` for SSH
	if (isWinOS) return false;
	const hasWslEnvVar = ['IS_WSL', 'WSL_DISTRO_NAME'].some((envVar) => Boolean(env(envVar)));
	if (hasWslEnvVar) return true;
	const hasWslOsIdTag = `;${env('OSID_tags')};`.toLocaleLowerCase().includes(';wsl;');
	if (hasWslOsIdTag) return true;
	return wslVersion(options) != null ? true : undefined;
}

// `wslVersion()`
/** Determine the WSL version; undefined if not WSL or version not determinable.
@param options `{ allowFsFallback }` • allow fallback to file system read if needed for version determination; defaults to `true`
@tags `no-panic`, `no-throw` ; `no-prompt` ; `allow-read=/proc/sys/kernel/osrelease`
*/
/* spell-checker:ignore (path) osrelease */
export function wslVersion(options?: { allowFsFallback?: boolean }) {
	options = options ?? { allowFsFallback: true };
	const osIdTags = `;${env('OSID_tags')};`.toLocaleLowerCase();
	if (osIdTags.includes(';wsl1;')) return 1;
	if (osIdTags.includes(';wsl2;')) return 2;
	if (!options.allowFsFallback) return undefined;
	const osReleaseTextPath = '/proc/sys/kernel/osrelease';
	const osReleaseTextReadGranted =
		Deno.permissions?.querySync({
			name: 'read',
			path: osReleaseTextPath,
		})?.state === 'granted';
	const osReleaseText = osReleaseTextReadGranted
		? Deno.readTextFileSync(osReleaseTextPath).trim().toLocaleLowerCase()
		: undefined;
	if (osReleaseText?.endsWith('-wsl2')) return 2;
	if (osReleaseText?.match(/-microsoft(-|$)/)) return 1;
	return undefined;
}

// `canDisplayUnicode()`
/** Determine if unicode display is supported under the current platform and console constraint. */
export function canDisplayUnicode() {
	if (!isWinOS) {
		// POSIX-like
		// ref: <https://stackoverflow.com/questions/3104410/identify-cygwin-linux-windows-using-environment-variables> , <https://stackoverflow.com/questions/714100/os-detecting-makefile>
		// ref: <https://stackoverflow.com/questions/38086185/how-to-check-if-a-program-is-run-in-bash-on-ubuntu-on-windows-and-not-just-plain>
		const isOldTerminal = ['cygwin', 'linux'].includes(env('TERM') ?? '');
		const isWSL_ = isWSL() ?? false;
		return (
			!isOldTerminal && // fail for old terminals
			// * not isWSL
			((!isWSL_ &&
				Boolean(
					env('LC_ALL')?.match(/[.]utf-?8$/i) || env('LANG')?.match(/[.]utf-?8$/i),
				)) /* LC_ALL or LANG handles UTF-8? */ || // * isWSL
				(isWSL_ && Boolean(env('WT_SESSION')))) // only MS Windows Terminal is supported; 'alacritty' and 'ConEmu/cmder' hosts not detectable
		);
	}

	// WinOS
	// note: 'alacritty' will, by default, set TERM to 'xterm-256color'
	return (
		['alacritty', 'xterm-256color'].includes(env('TERM') ?? '') || // [alacritty](https://github.com/alacritty/alacritty)
		Boolean(env('ConEmuPID')) || // [ConEmu](https://conemu.github.io) and [cmder](https://cmder.net)
		Boolean(env('WT_SESSION'))
	); // MS Windows Terminal
}

export function mightUseColor() {
	// respects `NO_COLOR` env var override; use 'truthy' values?
	// ref: <https://no-color.org> @@ <https://archive.is/Z5N1d>
	return !env('NO_COLOR');
}

export function mightUseFileSystemCase() {
	// * respects `USE_FS_CASE` env var override (for WinOS); use 'truthy' values?
	// POSIX is case-sensitive
	// WinOS is *usually* (~99+%) case-insensitive/case-preserving, but *can* be case-sensitive (on a directory-by-directory basis)
	// ref: <https://stackoverflow.com/questions/7199039/file-paths-in-windows-environment-not-case-sensitive> @@ <https://archive.is/i0xzb>
	// ref: <https://nodejs.org/en/docs/guides/working-with-different-filesystems> @@ <https://archive.is/qSRjE>
	// ref: <https://en.wikipedia.org/wiki/Filename> @@ <https://archive.is/cqe6g>
	return !isWinOS /* assumed to be POSIX-like */ || !env('USE_FS_CASE');
}

export function mightUseUnicode() {
	// respects `NO_UNICODE` and `USE_UNICODE` env var overrides (in that order of priority); use 'truthy' values?
	if (env('NO_UNICODE')) return false;
	if (env('USE_UNICODE')) return true;
	return canDisplayUnicode();
}

//===

export const commandVOf = (name: string) => {
	if (!allowRun) return Promise.resolve(undefined);
	try {
		const process = Deprecated.Deno.run({
			cmd: [
				...(isWinOS
					? ['cmd', '/x/d/c']
					: env('SHELL') != null
						? [env('SHELL') ?? 'bash', '-c']
						: []),
				`command -v ${name}`,
			],
			stdin: 'null',
			stderr: 'piped',
			stdout: 'piped',
		});
		// console.warn('commandVOf(): process created');
		return Promise.all([process.status(), process.output() /* , process.stderrOutput() */])
			.then(([status, out /* , err */]) => {
				// console.warn('commandVOf', { status: status, out: decode(out) /* , err: decode(err) */ });
				return status.success ? decode(out)?.replace(/(\r|\r\n|\n)+$/, '') : undefined;
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

const EOL = /\n|\r\n?/;
const versionURL = projectLocations.version;

// logger.trace({ projectURL, projectLocations, versionURL });
// console.warn({ projectURL, projectLocations, versionURL });

// projectVersionText == first non-empty line (EOL trimmed) from VERSION
const projectVersionTextViaFetch = await (versionURL &&
(versionURL.protocol === 'file:'
	? (await Deno.permissions.query({ name: 'read', path: versionURL })).state === 'granted'
	: (
			await Deno.permissions.query({
				name: 'net',
				host: versionURL.host.length > 0 ? versionURL.host : undefined,
			})
		).state === 'granted')
	? fetch(versionURL)
			.then((resp) => (resp.ok ? resp.text() : undefined))
			.then((text) => text?.split(EOL).filter((s) => s)[0])
			.catch((_) => undefined)
	: Promise.resolve(undefined));

// `import ...` implementation (note: requires project-level synchronization tooling)
const projectVersionTextViaImport = VERSION;

const projectVersionTagFromURL = ((url) => {
	// version from `versionURL`
	// # CDNs (see "cdn/kb-CDN.mkd")
	// - Deno.Land • <https://deno.land/x/dxx@[TAG/VERSION]/src/dxi.ts> ## note: @TAG/VERSION is optional
	// - jsdelivr • <https://cdn.jsdelivr.net/gh/OWNER/REPO@[TAG|COMMITISH]/src/dxi.ts> ## note: avoid branch as the CDN caches it at least semi-permanently
	// - BitBucket (raw) • <https://bitbucket.org/OWNER/REPO/raw/[BRANCH|TAG|COMMITISH]/src/dxi.ts>
	// - GitHub (raw) • <https://github.com/OWNER/REPO/raw/[BRANCH|TAG|COMMITISH]/src/dxi.ts> , <https://raw.githubusercontent.com/OWNER/REPO/[BRANCH|TAG|COMMITISH]/src/dxi.ts>
	// - GitLab (raw) • <https://gitlab.com/OWNER/REPO/-/raw/[BRANCH|TAG|COMMITISH]/src/dxi.ts>
	// - GitHack • <https://rawcdn.githack.com/OWNER/REPO/[BRANCH|TAG|COMMITISH]/eg/args.ts> , <https://bbcdn.githack.com/OWNER/REPO/raw/[BRANCH|TAG|COMMITISH]/LICENSE> , <https://glcdn.githack.com/OWNER/REPO/-/raw/[BRANCH|TAG|COMMITISH]/LICENSE>
	// - (*broken*) statically • <https://cdn.statically.io/bb/:user/:repo/:tag/:file> , <https://cdn.statically.io/gh/:user/:repo/:tag/:file> , <https://cdn.statically.io/gl/:user/:repo/:tag/:file>
	//   * broken; "Couldn't complete your request." with "https://cdn.statically.io/gh/rivy/deno.dxx/v0.0.15/src/dxi.ts"
	if (url?.protocol === 'file:') return undefined;
	return url?.pathname?.match(/.*[@/](.*?)[/]VERSION$/)?.[1];
})(versionURL);

export type vOptions = {
	maxCommitHashDisplaySize?: number; // maximum length of commit hash to include in version string; < 1 == no limit
};
// set default maxCommitHashDisplaySize to 8 to avoid collisions
// - even on *extremely* large projects, # of commits between versions should be significantly less than 10,000
// ref: from "Hash Collision Probability by Input Size.xlsx"
// * 1% collision probability between 600 commits using 6 hex digits
// * 1% collision probability between 3,000 commits using 7 hex digits
// * 1% collision probability between 10,000 commits using 8 hex digits
// * 1% collision probability between 150,000 commits using 10 hex digits
// * 1% collision probability between 2,500,000 commits using 12 hex digits
const vOptionsDefault: Required<vOptions> = { maxCommitHashDisplaySize: 8 };
function v(options?: vOptions) {
	const options_ = options ?? vOptionsDefault;
	// uses 'relaxed' semantic versioning (allows for variable length version numbers [M, M.m, M.m.r, M.m.r.n, etc])
	// ref: [Semantic Versioning](https://semver.org) @@ <https://archive.is/Z02ta>
	// simple 'relaxed' semantic version tag = /[vV]?\d+([.]\d+)*/
	// extended 'relaxed' semantic version tag = /[vV]?\d+([.]\d+)*([-].*)?/
	const tagIsCommitHash = projectVersionTagFromURL?.match(/^[0-9a-fA-F]{5,}$/) != null; // heuristic: any string of solely 5+ hex digits is assumed to be a commit hash
	if (tagIsCommitHash) {
		return `${projectVersionTextViaImport}+${projectVersionTagFromURL.slice(
			0,
			options_.maxCommitHashDisplaySize,
		)}`;
	}
	const vFromTag = projectVersionTagFromURL?.match(/^[vV]?\d+([.]\d+)*([-].*)?$/)?.[0];
	if (vFromTag != null) return vFromTag;
	return `${projectVersionTextViaImport}+${
		projectVersionTagFromURL ? `(${projectVersionTagFromURL})` : ''
	}`;
}

export const $version = {
	versionURL,
	projectVersionTagFromURL,
	projectVersionTextViaFetch,
	projectVersionTextViaImport,
	v,
};

//=== * logger

export * as $logger from './axe/$mod.ts';

//===

import * as $logger from './axe/$mod.ts';
// import { isAbsolute } from 'node:path/win32';

$logger.logger.suspend(); // initialize common/global logger to 'suspended' state to allow for local module use without unwanted outputs
export const logger = $logger.logger; // export logger (note: in the *suspended state*)

// console.warn({ atImportPermitCWD, atImportCWD });
// console.warn({ url_cwd: intoURL('.') });
// console.warn({ url_abs: intoURL('file:///C:/Users/Roy/AARK/Projects/deno/dxx/repo.GH') }); // spell-checker:ignore AARK
// console.warn({ url_rel: intoURL('relative_dir/file.foo') });
// console.warn({ url_rel_drive: intoURL('c:relative_dir/file.foo') });
// console.warn({ url_rel_drive_alt: intoURL('d:relative_dir/file.foo') });
// Deno.openSync('//hoard/vault', { read: true, write: true });

// console.warn({
// 	cwd: cwd(),
// 	cwdOf: cwdOfDrive(),
// 	cwdOfC: cwdOfDrive('C'),
// 	cwdOfD: cwdOfDrive('d:/'),
// });

// console.error(intoPlatformPath(absolutePath('CON')));
