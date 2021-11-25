// spell-checker:ignore (names) Deno
// spell-checker:ignore (shell) stty tput
// spell-checker:ignore (shell/CMD) CONOUT

import { decode, isWinOS } from './$shared.ts';

export type ConsoleSize = { columns: number; rows: number };

export function consoleSize(
	rid: number = Deno.stdout.rid,
	options: { fallbackRIDs: number[]; conoutFallback: boolean } = {
		fallbackRIDs: [Deno.stderr.rid],
		conoutFallback: true,
	},
): Promise<ConsoleSize | undefined> {
	const retVal = Promise
		.any([
			new Promise<ConsoleSize | undefined>((resolve, reject) => {
				consoleSizeViaDeno(rid, options).then((size) =>
					(size != undefined) ? resolve(size) : reject(undefined)
				);
			}),
			new Promise<ConsoleSize | undefined>((resolve, reject) => {
				consoleSizeViaPowerShell().then((size) =>
					(size != undefined) ? resolve(size) : reject(undefined)
				);
			}),
			new Promise<ConsoleSize | undefined>((resolve, reject) => {
				consoleSizeViaSTTY().then((size) =>
					(size != undefined) ? resolve(size) : reject(undefined)
				);
			}),
			new Promise<ConsoleSize | undefined>((resolve, reject) => {
				consoleSizeViaTPUT().then((size) =>
					(size != undefined) ? resolve(size) : reject(undefined)
				);
			}),
		])
		.catch((_) => undefined);

	return retVal;
}

//===

export async function consoleSizeViaDeno(
	rid: number = Deno.stdout.rid,
	options: { fallbackRIDs: number[]; conoutFallback: boolean } = {
		fallbackRIDs: [Deno.stderr.rid],
		conoutFallback: true,
	},
): Promise<ConsoleSize | undefined> {
	// `Deno.consoleSize()` is unstable API (as of v1.12+) => deno-lint-ignore no-explicit-any
	// deno-lint-ignore no-explicit-any
	const denoConsoleSize = (Deno as any)?.consoleSize as (
		rid: number,
	) => { columns: number; rows: number } | undefined;
	if (denoConsoleSize == undefined) return undefined;

	let size: { columns: number; rows: number } | undefined;
	try {
		// * `denoConsoleSize()` throws if rid is redirected
		size = denoConsoleSize?.(rid);
	} catch {
		size = undefined;
	}
	let fallbackRID;
	while (size == undefined && (fallbackRID = options.fallbackRIDs.shift()) != undefined) {
		// console.warn('fallback to ...', fallbackRID)
		try {
			// * `denoConsoleSize()` throws if rid is redirected
			size = denoConsoleSize?.(fallbackRID);
		} catch {
			size = undefined;
		}
	}

	if ((size == undefined) && isWinOS && options.conoutFallback) {
		try {
			const conOut = await Deno.open('CONOUT$');
			// * `denoConsoleSize()` throws if rid is redirected
			size = conOut && denoConsoleSize?.(conOut.rid);
			conOut.close();
		} catch {
			size = undefined;
		}
	}

	return size;
}

export async function consoleSizeViaPowerShell(): Promise<ConsoleSize | undefined> {
	const output = await (() => {
		try {
			const process = Deno.run({
				cmd: [
					'powershell',
					'-nonInteractive',
					'-noProfile',
					'-executionPolicy',
					'unrestricted',
					'-command',
					'$Host.UI.RawUI.WindowSize.Width;$Host.UI.RawUI.WindowSize.Height',
				],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})() ?? '';
	const values = output.split(/\s+/).filter((s) => s.length > 0);
	return values.length > 0
		? { columns: Number(values.shift()), rows: Number(values.shift()) }
		: undefined;
}

export async function consoleSizeViaSTTY(): Promise<ConsoleSize | undefined> {
	// * note: `stty size` depends on a TTY connected to STDIN; ie, `stty size </dev/null` will fail
	// * note: On Windows, `stty size` causes odd end of line word wrap abnormalities for lines containing ANSI escapes => avoid
	if (isWinOS) return undefined;
	const output = await (() => {
		try {
			const process = Deno.run({
				cmd: ['stty', 'size', 'sane'],
				stdin: 'inherit',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})() ?? '';
	const values = output.split(/\s+/).filter((s) => s.length > 0).reverse();
	return values.length > 0
		? { columns: Number(values.shift()), rows: Number(values.shift()) }
		: undefined;
}

async function consoleSizeViaTPUT(): Promise<ConsoleSize | undefined> {
	// * note: `tput` is resilient to STDIN, STDOUT, and STDERR redirects, but requires two shell system calls
	const cols = await (() => {
		try {
			const process = Deno.run({
				cmd: ['tput', 'cols'],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})() ?? '';
	const lines = await (() => {
		try {
			const process = Deno.run({
				cmd: ['tput', 'lines'],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})() ?? '';
	return (cols.length > 0 && lines.length > 0)
		? { columns: Number(cols), rows: Number(lines) }
		: undefined;
}

// const consoleSizes = {
// 	consoleSizeViaDeno: await consoleSizeViaDeno(),
// 	consoleSizeViaPowerShell: await consoleSizeViaPowerShell(),
// 	consoleSizeViaSTTY: await consoleSizeViaSTTY(),
// 	consoleSizeViaTPUT: await consoleSizeViaTPUT(),
// };
