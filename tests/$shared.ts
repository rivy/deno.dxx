// tests ~ common code

// spell-checker:ignore (names) Deno
// spell-checker:ignore (people) Axel Rauschmayer , Roy Ivy III * rivy
// spell-checker:ignore (utils) dprint git

export * from '../src/lib/$shared.ts';

//====

import { Deprecated } from '../src/lib/$deprecated.ts';

import { $colors, $path } from './$deps.ts';

import {
	callersFromStackTrace,
	decode,
	intoPath,
	isWinOS,
	projectPath,
	traversal,
} from '../src/lib/$shared.ts';

//====

const inspect = Deno.inspect;

//====

// ToDO: [2021-09-16; rivy] * improved equivalency to NodeJS format/inspect string quoting requires changing the preference expressed [here](https://github.com/denoland/deno/blob/5d814a4c244d489b4ae51002a0cf1d3c2fe16058/ext/console/02_console.js#L648-L669)

// ref: <https://nodejs.org/api/util.html#util_util_format_format_args>
function toSpecFormat(specifier: string, value: unknown): string {
	if (specifier === '%s') {
		if (typeof value === 'string' || value instanceof String) {
			return value as string;
		} else return inspect(value, { depth: 2 });
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
		return inspect(value, { showHidden: true, showProxy: true });
	}
	if (specifier === '%O') {
		return inspect(value);
	}
	if (specifier === '%c') {
		return '';
	}
	return '';
}

// ref: <https://nodejs.org/docs/latest-v16.x/api/console.html#console_console_log_data_args>
// ref: <https://nodejs.org/docs/latest-v16.x/api/util.html#util_util_format_format_args>
// modified from <https://deno.land/std@0.105.0/node/util.ts#L247-L266>
export function format(...args: unknown[]) {
	const replacement: [number, string][] = [];
	const formatSpecifierRx = /%(s|d|i|f|j|o|O|c|%)/g;
	const hasFormatTemplate =
		args.length > 0 && (typeof args[0] === 'string' || args[0] instanceof String);
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
		} else result += inspect(args[i], { colors: true });
	}
	return result;
}

//====

type TestName = string;
const testLog: [TestName, (() => string) | string][] = [];
const testFilePathLineCounts: Map<string, number> = new Map();

function lineCount(filePath: string) {
	if (!testFilePathLineCounts.has(filePath)) {
		try {
			testFilePathLineCounts.set(
				filePath,
				Deno.readTextFileSync(traversal(filePath) ?? '')
					.replace(/\r?\n$/ms, '')
					.split(/\n/).length,
			);
		} catch (_) {
			// console.error('`lineCount()`: error happened');
			// cache negative count as an error signal
			testFilePathLineCounts.set(filePath, -1);
		}
	}
	const count = testFilePathLineCounts.get(filePath);
	// console.error('`lineCount()`', { filePath, count });
	return count != undefined && count >= 0 ? count : undefined;
}

function composeTestName(
	tag: string,
	description: string,
	options: { align: boolean; ignore: boolean } = { align: false, ignore: false },
) {
	const align = options.align;
	const padding = (() => {
		if (!align) return 0;
		const tagLineText = tag.match(/:(\d+)$/)?.[1];
		const tagLine = isNaN(Number(tagLineText)) ? -1 : Number(tagLineText);
		const maxLines = (tagLine >= 0 ? lineCount(tag.replace(/(:\d+)*$/, '')) : undefined) ?? -1;
		return tagLine >= 0 && maxLines >= 0 && maxLines > tagLine
			? [...maxLines.toString()].length - [...tagLine.toString()].length
			: 0;
	})();
	const filePathText = tag
		? $colors.dim($path.parse(tag).base.replace(/\d+\s*$/, (s) => '0'.repeat(padding) + s)) + ' '
		: '';
	return filePathText + (options.ignore ? $colors.yellow(description) : $colors.bold(description));
}

export type TestOptions = Omit<Deno.TestDefinition, 'fn' | 'name'>;

export function createTestFn(testFilePath?: string | URL) {
	const pathOfTestFile = testFilePath && intoPath(testFilePath);
	function test(description: string, fn: () => void | Promise<void>, options = {} as TestOptions) {
		const callers = callersFromStackTrace();
		// console.debug({ callers });
		// ToDO: [2023-10-10; rivy] to avoid quiet failures, add testing to confirm that `callersFromStackTrace()` contains the expected data
		// Deno 1.33.0+ adds at least one extra caller level (ie, `ext:core/01_core.js:166:11`) to the stack trace; remove it/them
		while (callers.length > 0 && callers[callers.length - 1]?.startsWith('ext:')) {
			const _ = callers.pop();
		}

		const tag =
			(pathOfTestFile
				? pathOfTestFile
				: callers
						.pop()
						?.replace(
							/:\d+$/,
							'',
						)) /* remove trailing character position data from stack frame data (formatted as `URL:LINE:CHAR_POS`) */ ??
			'';
		const testName: TestName = composeTestName(tag, description, {
			align: !pathOfTestFile,
			ignore: !!options.ignore,
		});
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
						n === testName ? [typeof v === 'function' ? (v as () => string)() : v] : [],
					);
					if (logText.length > 0) {
						logText.unshift($colors.dim('# ---- test log:begin > ----'));
						logText.push($colors.dim(`# ---- test log:end . ------`));
						// logText.unshift($colors.dim('# ---- test log:begin > ----') + ` ${testName}`);
						// logText.push($colors.dim(`# ---- test log:end . ------`) + ` ${testName}`);
					}
					const err = new Error([''].concat(logText).concat([e.toString()]).join('\n'));
					// deno-lint-ignore no-explicit-any
					(err as any).original = e;
					err.stack = e.stack;
					throw err;
				}
			},
			...options,
		});
	}
	test.skip = (
		description: string,
		fn: () => void | Promise<void> = () => undefined,
		options = {} as TestOptions,
	) => test(description, fn, { ...options, ignore: true });
	return test;
}

export const test = createTestFn();

//===

// [`bmp`](https://deno.land/x/bmp@v0.0.7); install (for Deno-v1.11+/std@0.98.0) <br> `dxi --allow-read=. --allow-write=. --allow-run=git -qf https://deno.land/x/bmp@v0.0.7/cli.ts`

export const haveBmpVersion = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'bmp', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return Promise.all([process.status(), process.output()])
			.then(([status, out]) => {
				// console.debug({ status: status, out: decode(out) });
				return status.success
					? (decode(out)?.match(/(?:^|@)(\d+(?:[.]\d+)+)/) || [])[1]
					: undefined;
			})
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
};

export const haveBmp = () => {
	return haveBmpVersion().then((version) => version != null);
};

// [`commitlint`](https://commitlint.js.org); install (for NodeJS v12+): `npm -g install @commitlint/cli@16 @commitlint/config-conventional@16`

export const haveCommitLintVersion = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'commitlint', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return Promise.all([process.status(), process.output()])
			.then(([status, out]) => {
				// console.debug({ status: status, out: decode(out) });
				return status.success
					? (decode(out)?.match(/(?:^|@)(\d+(?:[.]\d+)+)/) || [])[1]
					: undefined;
			})
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
};

export const haveCommitLint = () => {
	return haveCommitLintVersion().then((version) => version != null);
};

// [`cspell`](http://cspell.org); install: (NodeJS v10+) `npm -g install cspell@4`; (NodeJS v12+) `npm -g install cspell@5`

export const haveCSpellVersion = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'cspell', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return Promise.all([process.status(), process.output()])
			.then(([_status, out]) => {
				// console.debug({ status: _status, out: decode(out) });
				// for some early versions, `cspell --version` returns status == 1 and version line followed by usage
				// o/w for later v4 and >= v5, `cspell --version` returns status == 0 and version line only
				return (decode(out)?.match(/^\d+([.]\d+)+/) || [])[0];
			})
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
};

export const haveCSpell = () => {
	return haveCSpellVersion().then((version) => version != null);
};

// [`deno`](https://deno.land); install: [MacOS/Linux] `curl -fsSL https://deno.land/x/install/install.sh | sh` , [WinOS] `scoop install deno`

export const haveDenoVersion = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'deno', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return Promise.all([process.status(), process.output()])
			.then(([status, out]) => {
				// console.debug({ status: status, out: decode(out) });
				return status.success
					? (decode(out)?.match(/(?:^deno\s+)(\d+(?:[.]\d+)+)/) || [])[1]
					: undefined;
			})
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
};

export const haveDeno = () => {
	return haveDenoVersion().then((version) => version != null);
};

// [`dprint`](https://dprint.dev); install: `cargo +stable-x86_64 install -i dprint`

export const haveDPrint = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: ['dprint', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'null',
		});
		return process
			.status()
			.then((status) => status.success)
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(false);
	}
};

// [`git`](https://git-scm.com); install: (POSIX) `apt install git`, (WinOS) `scoop install git`

export const haveGit = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: ['git', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'null',
		});
		return process
			.status()
			.then((status) => status.success)
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(false);
	}
};

// [`madge`](https://github.com/pahen/madge); install (for NodeJS v12+): `npm -g install madge@5`

export const haveMadgeVersion = () => {
	try {
		const process = Deprecated.Deno.run({
			cmd: [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'madge', '--version'],
			stdin: 'null',
			stderr: 'null',
			stdout: 'piped',
		});
		return Promise.all([process.status(), process.output()])
			.then(([status, out]) => {
				// console.debug({ status: status, out: decode(out) });
				return status.success ? (decode(out)?.match(/^\d+([.]\d+)+/) || [])[0] : undefined;
			})
			.finally(() => process.close());
	} catch (_) {
		return Promise.resolve(undefined);
	}
};

export const haveMadge = () => {
	return haveMadgeVersion().then((version) => version != null);
};

export const isGitRepo = async (path = projectPath) => {
	const haveGit_ = await haveGit();
	if (haveGit_) {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['git', 'status', '--short'],
				cwd: path,
				stdin: 'null',
				stderr: 'null',
				stdout: 'null',
			});
			return process
				.status()
				.then((status) => status.success)
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(false);
		}
	} else return Promise.resolve(undefined);
};

export const gitProjectFilesWithEolDetail = async (path = projectPath, _options = {}) => {
	const haveGit_ = await haveGit();
	if (haveGit_) {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['git', 'ls-files', '--eol', '--full-name'],
				cwd: path,
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			const result = Promise.all([process.status(), process.output()]);
			return result
				.then(([status, output]) =>
					status.success
						? decode(output)
								.replace(/\r?\n$/, '')
								.split(/\r?\n/)
						: undefined,
				)
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	} else return Promise.resolve(undefined);
};

export const gitProjectFiles = async (path = projectPath, options = {}) => {
	const files = await gitProjectFilesWithEolDetail(path, options);
	return files && files.length > 0 ? files.map((file) => file.replace(/^[^\t]*\t/, '')) : undefined;
};

//===

// export type PathString = string & { _brand: 'PathString' };
export type PathString = string;

const pathSepRx = new RegExp(/[\\\/]/, 'gms');
export function pathToOsStyle(p: PathString): PathString {
	return p.replace(pathSepRx, $path.SEP) as PathString;
}
export function pathToPosixStyle(p: PathString): PathString {
	return p.replace(pathSepRx, '/') as PathString;
}
export function pathToWindowsStyle(p: PathString): PathString {
	return p.replace(pathSepRx, '\\') as PathString;
}

//===

export function deepEqual(x: unknown, y: unknown): boolean {
	type AnObject = { [k: PropertyKey]: unknown };
	const ok = Object.keys;
	return x && y && typeof x === 'object' && typeof y === 'object'
		? ok(x).length === ok(y).length &&
				ok(x).every((key) => deepEqual((x as AnObject)[key], (y as AnObject)[key]))
		: x === y;
}

//===

// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat>
export function formatDuration(
	durationInMS: number,
	options: Intl.NumberFormatOptions = { minimumFractionDigits: 3, maximumFractionDigits: 5 },
): string {
	const [unit, n] = durationInMS > 1000 ? ['s', durationInMS / 1000] : ['ms', durationInMS];
	const NumberFormat = new Intl.NumberFormat(undefined, options);
	return NumberFormat.format(n) + ' ' + unit;
}
export function formatN(
	n: number,
	options: Intl.NumberFormatOptions = { minimumFractionDigits: 3, maximumFractionDigits: 5 },
): string {
	const NumberFormat = new Intl.NumberFormat(undefined, options);
	return NumberFormat.format(n);
}

//===

export function mean(arr: number[]): number | undefined {
	if (arr.length <= 0) return undefined;
	if (arr.length === 1) return arr[0];
	return arr.reduce((acc, v) => acc + v, 0) / arr.length;
}
export function median(arr: number[]): number | undefined {
	if (arr.length <= 0) return undefined;
	if (arr.length === 1) return arr[0];
	const sorted = [...arr].sort();
	const size = sorted.length;
	const isEven = size % 2 === 0;
	const midpoint = Math.floor(sorted.length / 2);
	return isEven ? (sorted[midpoint - 1] + sorted[midpoint]) / 2 : sorted[midpoint];
}
export function stdDevPopulation(arr: number[], mean_?: number): number | undefined {
	if (arr.length <= 0) return undefined;
	if (arr.length === 1) return arr[0];
	const m = mean_ != null ? mean_ : mean(arr);
	if (m == null) return undefined;
	const stdDev = Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / arr.length);
	return stdDev;
}
export function stdDevSample(arr: number[], mean_?: number): number | undefined {
	if (arr.length <= 0) return undefined;
	if (arr.length === 1) return arr[0];
	const m = mean_ != null ? mean_ : mean(arr);
	if (m == null) return undefined;
	const stdDev = Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / (arr.length - 1));
	return stdDev;
}

//===

export function versionCompare(a?: string, b?: string) {
	a ??= '0.0.0';
	b ??= '0.0.0';
	return a.localeCompare(b, /* locales */ void 0, { numeric: true });
}
