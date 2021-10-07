// tests ~ common code

// spell-checker:ignore (names) Axel Rauschmayer

export * from '../src/lib/$shared.ts';

//====

import { Colors, decode, Path } from './$deps.ts';

import { projectPath } from '../src/lib/$shared.ts';

//====

// ToDO: [2021-09-16; rivy] * improved equivalency to NodeJS format/inspect string quoting requires changing the preference expressed [here](https://github.com/denoland/deno/blob/5d814a4c244d489b4ae51002a0cf1d3c2fe16058/ext/console/02_console.js#L648-L669)

// ref: <https://nodejs.org/api/util.html#util_util_format_format_args>
function toSpecFormat(specifier: string, value: unknown): string {
	if (specifier === '%s') {
		if (typeof value === 'string' || value instanceof String) {
			return value as string;
		} else return Deno.inspect(value, { depth: 2 });
	}
	if (specifier === '%d') {
		if (typeof value === 'bigint') {
			return value + 'n';
		}
		return Number(value).toString();
	}
	if (specifier === '%i') {
		if (typeof value === 'bigint') {
			return value + 'n';
		}
		return parseInt(value as string).toString();
	}
	if (specifier === '%f') {
		return parseFloat(value as string).toString();
	}
	if (specifier === '%j') {
		try {
			return JSON.stringify(value);
		} catch (e) {
			// nodeJS => 'cyclic object value' , deno => 'Converting circular structure to JSON ...'
			// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify>
			if (e instanceof TypeError && e.message.match(/cyclic|circular/)) {
				return '[Circular]';
			} else throw e;
		}
	}
	if (specifier === '%o') {
		return Deno.inspect(value, { showHidden: true, showProxy: true });
	}
	if (specifier === '%O') {
		return Deno.inspect(value);
	}
	if (specifier === '%c') {
		return '';
	}
	return '';
}

// ref: <https://nodejs.org/docs/latest-v16.x/api/console.html#console_console_log_data_args>
// ref: <https://nodejs.org/docs/latest-v16.x/api/util.html#util_util_format_format_args>
// modified from <https://deno.land/std@0.105.0/node/util.ts#L247-L266>
function format(...args: unknown[]) {
	const replacement: [number, string][] = [];
	const formatSpecifierRx = /%(s|d|i|f|j|o|O|c|%)/g;
	const hasFormatTemplate = args.length > 0 &&
		(typeof args[0] === 'string' || args[0] instanceof String);
	const formatTemplate = hasFormatTemplate ? (args[0] as string) : '';
	let i = hasFormatTemplate ? 1 : 0;
	let arr: RegExpExecArray | null = null;
	let done = false;
	while ((arr = formatSpecifierRx.exec(formatTemplate)) !== null && !done) {
		if (arr[0] === '%%') {
			replacement.push([arr['index'], '%']);
		} else if (i < args.length) {
			replacement.push([arr['index'], toSpecFormat(arr[0], args[i])]);
			i++;
		} else done = true;
	}
	const lastArgUsed = i;
	let result = '';
	let last = 0;
	for (let i = 0; i < replacement.length; i++) {
		const item = replacement[i];
		result += formatTemplate.slice(last, item[0]);
		result += item[1];
		last = item[0] + 2;
	}
	result += formatTemplate.slice(last);
	for (let i = lastArgUsed; i < args.length; i++) {
		if (i > 0) result += ' ';
		if (typeof args[i] === 'string') {
			result += args[i];
		} else result += Deno.inspect(args[i], { colors: true });
	}
	return result;
}

//====

type TestName = string;
const testLog: [TestName, (() => string) | string][] = [];

function composeTestName(testFilePath: string, description: string) {
	return Colors.dim(Path.parse(testFilePath).base) + ' ' + Colors.bold(description);
}

export function createTestFn(testFilePath: URL | string) {
	const path = (testFilePath instanceof URL) ? testFilePath.pathname : testFilePath;
	function test(description: string, fn: () => void | Promise<void>, opts = {}) {
		const testName: TestName = composeTestName(path, description);
		Deno.test({
			name: testName,
			fn: async () => {
				// * capture `console.log()` and `console.warn()` messages via intercepts; display only on failure (as part of the error message)
				// ref: <https://stackoverflow.com/questions/9216441/intercept-calls-to-console-log-in-chrome> , <https://www.bayanbennett.com/posts/how-does-mdn-intercept-console-log-devlog-003> @@ <https://archive.is/dfg7H>
				// ref: <https://www.npmjs.com/package/output-interceptor>
				// * "lazy" formatting for `args`
				console.log = (...args) => {
					testLog.push([testName, () => format(...args)]);
				};
				console.warn = (...args) => {
					testLog.push([testName, () => format(...args)]);
				};
				try {
					await fn();
				} catch (e) {
					const logText = testLog.flatMap(([n, v]) =>
						n === testName ? [typeof v === 'function' ? (v as () => string)() : v] : []
					);
					if (logText.length > 0) {
						logText.unshift(Colors.dim(`## test log:begin>`));
						logText.push(Colors.dim(`## test log:end.`));
					}
					throw (new Error([''].concat(logText).concat([e.toString()]).join('\n')));
				}
			},
			...opts,
		});
	}
	return test;
}

//===

export const isCI = Deno.env.get('CI');
export const isGHA = Deno.env.get('GITHUB_ACTIONS'); // ref: <https://docs.github.com/en/actions/learn-github-actions/environment-variables>
export const isWinOS = Deno.build.os === 'windows';

//===

function _validURL(s: string, base: URL = Path.toFileUrl(Deno.cwd() + Path.SEP)) {
	// return !!toURL(s, base);
	return toURL(s, base);
}

function _isValidURL(s: string, base: URL = Path.toFileUrl(Deno.cwd() + Path.SEP)) {
	return !!_validURL(s, base);
}

// ref: <https://en.wikipedia.org/wiki/Uniform_Resource_Identifier> , <https://stackoverflow.com/questions/48953298/whats-the-difference-between-a-scheme-and-a-protocol-in-a-url>
export type ToUrlOptions = {
	driveLetterSchemes?: boolean; // interpret single letter URL schemes as drive letters for Windows-style paths
};
const ToUrlOptionsDefault: Required<ToUrlOptions> = { driveLetterSchemes: true };

// `toURL()`
/** Convert a string `path` into an URL, relative to a `base` URL.

@param [path]
@param [base] • baseline URL ~ defaults to `Path.toFileUrl(Deno.cwd()+Path.SEP)`; _note_: per usual relative URL rules, if `base` does not have a trailing separator, determination of path is relative the _the parent of `base`_
@param [options] ~ defaults to `{driveLetterSchemes: true}`
*/
export function toURL(path: string, base?: URL, options?: ToUrlOptions): URL | undefined;
export function toURL(path: string, options: ToUrlOptions): URL | undefined;
export function toURL(path: string, ...args: unknown[]) {
	const base = (args?.length > 0 && (args[0] instanceof URL))
		? args.shift() as URL
		: Path.toFileUrl(Deno.cwd() + Path.SEP);
	const options = {
		...ToUrlOptionsDefault,
		...(args?.length > 0) ? args.shift() as ToUrlOptions : {},
	};
	const scheme = (path.match(/^[A-Za-z][A-Za-z0-9+-.]*(?=:)/) || [])[0]; // per [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1)
	if (options.driveLetterSchemes && scheme?.length == 1) path = 'file://' + Path.normalize(path);
	// console.warn({ path, base, options });
	try {
		return new URL(path, base);
	} catch (_error) {
		return undefined;
	}
}

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
	const url = (goal instanceof URL) ? goal : toURL(goal);
	const baseURL = (base instanceof URL) ? base : toURL(base);
	const commonOrigin = url && baseURL &&
		(url.origin.localeCompare(baseURL.origin, undefined, { sensitivity: 'accent' }) == 0);
	// console.warn({ goal, source, url, baseURL, commonOrigin });
	if (url && baseURL && commonOrigin) {
		return Path.relative(baseURL.pathname, url.pathname);
	} else {
		return url ? url.href : undefined;
	}
}

export function createWarnFn(testFilePath?: URL | string) {
	const path = testFilePath ? traversal(testFilePath) : undefined;
	const base = path ? Path.parse(path).base : undefined;
	// console.warn({ projectPath, testFilePath, path, base });
	function warn(...args: unknown[]) {
		//# * for GHA CI, convert any warnings to GHA UI annotations; ref: <https://help.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-a-warning-message>
		const s = format(...args);
		if (isCI && isGHA) {
			console.log(Colors.stripColor(`::warning ::${base ? (base + ': ') : ''}${s}`));
		} else console.warn(Colors.dim(base || '*'), Colors.yellow('Warning:'), s);
	}
	return warn;
}

export const warn = createWarnFn();

//===

export const haveDPrint = () => {
	try {
		const process = Deno.run({
			cmd: ['dprint', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'null',
		});
		return (process.status()).then((status) => status.success).finally(() => process.close());
	} catch (_) {
		return Promise.resolve(false);
	}
};

export const haveGit = () => {
	try {
		const process = Deno.run({
			cmd: ['git', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'null',
		});
		return (process.status()).then((status) => status.success).finally(() => process.close());
	} catch (_) {
		return Promise.resolve(false);
	}
};

export const isGitRepo = async (path = projectPath) => {
	const haveGit_ = await haveGit();
	if (haveGit_) {
		try {
			const process = Deno.run({
				cmd: ['git', 'status', '--short'],
				cwd: path,
				stdin: 'null',
				stderr: 'null',
				stdout: 'null',
			});
			return (process.status()).then((status) => status.success).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(false);
		}
	} else return Promise.resolve(undefined);
};

export const gitProjectFilesWithEolDetail = async (path = projectPath, _options = {}) => {
	const haveGit_ = await haveGit();
	if (haveGit_) {
		try {
			const process = Deno.run({
				cmd: ['git', 'ls-files', '--eol', '--full-name'],
				cwd: path,
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			const result = Promise.all([process.status(), process.output()]);
			return result
				.then(([status, output]) =>
					status.success ? decode(output).replace(/\r?\n$/, '').split(/\r?\n/) : undefined
				)
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	} else return Promise.resolve(undefined);
};

export const gitProjectFiles = async (path = projectPath, options = {}) => {
	const files = await gitProjectFilesWithEolDetail(path, options);
	return (files && files.length > 0)
		? files.map((file) => file.replace(/^[^\t]*\t/, ''))
		: undefined;
};
