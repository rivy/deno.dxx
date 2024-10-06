// deno-lint-ignore-file ban-unused-ignore no-deprecated-deno-api

import * as M from '../../src/lib/shim.windows.ts';

import { $path } from '../$deps.ts';

import { DenoVx, type Deprecated } from '../../src/lib/$deprecated.ts';

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
	if (isWinOS && !['.bat', '.cmd'].includes($path.extname(filename))) continue;
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

	console.log({ filename, result });
}
