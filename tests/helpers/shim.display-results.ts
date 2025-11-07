// deno-lint-ignore-file ban-unused-ignore no-deprecated-deno-api

import * as M from '../../src/lib/shim.windows.ts';

import { $lodash, $path } from '../$deps.ts';

import { DenoVx, type Deprecated } from '../../src/lib/$deprecated.ts';

import { eol } from '../../src/lib/eol.ts';
import { cmdShimTemplate, PosixShimTemplate } from '../../src/lib/shim.windows.ts';

const args = Deno.args;

if (args.length === 0) {
	if (DenoVx.isatty(Deno.stdin)) {
		console.error('Usage: `deno run -A tests/helpers/shim.display-results.ts <SHIM_PATH>..`');
		Deno.exit(1);
	}
	args.push('-');
}

const isWinOS = Deno.build.os === 'windows';

const decoder = new TextDecoder('utf-8');

type TypedArray = ArrayLike<number | bigint> & {
	set(t: ArrayLike<number | bigint>, offset?: number): void;
};
type TypedArrayConstructor = {
	new (length: number): TypedArray;
	// new (typedArray: TypedArray): TypedArray;
	// new (object: Iterable<number>): TypedArray;
	// new (buffer: ArrayBuffer, byteOffset?: number, length?: number): TypedArray;
};
function concatTypedArrays<T extends TypedArray>(a: T, b: T): T {
	const constructor = a.constructor as TypedArrayConstructor;
	const result = new constructor(a.length + b.length) as typeof a;
	result.set(a);
	result.set(b, a.length);
	return result;
}

async function readAllIfShebangFile(
	stream: Deprecated.Deno.Reader,
): Promise<Uint8Array | undefined> {
	const headerBuf = new Uint8Array(2);
	const bytesRead = await stream.read(headerBuf);
	if (bytesRead === null) return undefined;
	if (!(headerBuf[0] === 0x23 && headerBuf[1] === 0x21)) {
		/* headerBuf !== '#!' */
		return undefined;
	}
	return concatTypedArrays(headerBuf, await DenoVx.readAll(stream));
}

for (let i = 0; i < Deno.args.length; i++) {
	const filename = Deno.args[i];
	// if (isWinOS && !['.bat', '.cmd'].includes($path.extname(filename))) continue;
	const stream = await (async () => {
		if (filename === '-') {
			return Deno.stdin;
		}
		return await Deno.open(filename, { read: true });
	})();
	const data = decoder.decode(
		isWinOS ? await DenoVx.readAll(stream) : await readAllIfShebangFile(stream),
	);
	DenoVx.close(stream);

	// const result = (data != '') ? M.shimInfo(data) : undefined;
	const result = M.shimInfo(data);

	const addQuietOption = false;
	const enablePipe = false;

	const shimName = $path.basename(
		result.denoRunTarget ?? '',
		$path.extname(result.denoRunTarget ?? ''),
	);
	const appNameVersion = 'shim-helper 1.0';

	const contentsUpdated = ((contents) => {
		if (contents === undefined) return undefined;
		if (contents.slice(0, 2) === '#!') {
			// matches POSIX-style shebang shim
			return eol.LF(
				$lodash.template(PosixShimTemplate)({
					denoCommandPrefix: result.denoCommandPrefix,
					denoCommand: result.denoCommand,
					denoRunOptions: result.denoRunOptions?.concat(addQuietOption ? ' "--quiet"' : '').trim(),
					denoRunTarget: result.denoRunTarget,
					// remove leading '--' (only the first, quoted or not) from target args for compatibility with `deno install` functionality
					denoRunTargetArgs: result.denoRunTargetArgs?.replace(
						/^\s*(?:--|[\x22]--[\x22]|[\x27]--[\x27])\s*(.*)$/,
						'$1',
					),
					shimName,
					appNameVersion,
				}),
			);
		}
		// default/fallback to Windows-style shim
		return eol.CRLF(
			$lodash.template(cmdShimTemplate(enablePipe))({
				denoCommandPrefix: result.denoCommandPrefix,
				denoCommand: result.denoCommand,
				denoRunOptions: result.denoRunOptions?.concat(addQuietOption ? ' "--quiet"' : '').trim(),
				denoRunTarget: result.denoRunTarget,
				// remove leading '--' (only the first, quoted or not) from target args for compatibility with `deno install` functionality
				denoRunTargetArgs: result.denoRunTargetArgs?.replace(
					/^\s*(?:--|[\x22]--[\x22]|[\x27]--[\x27])\s*(.*)$/,
					'$1',
				),
				shimName,
				appNameVersion,
			}),
		);
	})(data);

	console.log({ filename, result, contentsUpdated });
}
