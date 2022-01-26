// spell-checker:ignore (fn) dlopen ; (names) Deno ; (types) isize usize wchar

// from <...>

/** All possible types for interfacing with foreign functions */
type NativeType =
	| 'void'
	| 'u8'
	| 'i8'
	| 'u16'
	| 'i16'
	| 'u32'
	| 'i32'
	| 'u64'
	| 'i64'
	| 'usize'
	| 'isize'
	| 'f32'
	| 'f64'
	| 'pointer';

/** A foreign function as defined by its parameter and result types */
interface DenoForeignFunction {
	parameters: NativeType[];
	result: NativeType;
	/** When true, function calls will run on a dedicated blocking thread and will return a Promise resolving to the `result`. */
	nonblocking?: boolean;
}

type TypedArray =
	| Int8Array
	| Uint8Array
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Uint8ClampedArray
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array;

/** **UNSTABLE**: Unsafe and new API, beware!
 *
 * An unsafe pointer to a memory location for passing and returning pointers to and from the ffi
 */
interface /* export class */ DenoUnsafePointer {
	// constructor(value: bigint);

	value: bigint;

	/**
	 * Return the direct memory pointer to the typed array in memory
	 */
	/* static */ of(typedArray: TypedArray): DenoUnsafePointer;

	/**
	 * Returns the value of the pointer which is useful in certain scenarios.
	 */
	valueOf(): bigint;
}
// // deno-lint-ignore no-var
// declare var UnsafePointer: { new (value: bigint): UnsafePointer };

/** **UNSTABLE**: Unsafe and new API, beware!
 *
 * An unsafe pointer view to a memory location as specified by the `pointer`
 * value. The `UnsafePointerView` API mimics the standard built in interface
 * `DataView` for accessing the underlying types at an memory location
 * (numbers, strings and raw bytes).
 */
interface /* export class */ DenoUnsafePointerView {
	// constructor(pointer: UnsafePointer);

	pointer: DenoUnsafePointer;

	/** Gets an unsigned 8-bit integer at the specified byte offset from the pointer. */
	getUint8(offset?: number): number;
	/** Gets a signed 8-bit integer at the specified byte offset from the pointer. */
	getInt8(offset?: number): number;
	/** Gets an unsigned 16-bit integer at the specified byte offset from the pointer. */
	getUint16(offset?: number): number;
	/** Gets a signed 16-bit integer at the specified byte offset from the pointer. */
	getInt16(offset?: number): number;
	/** Gets an unsigned 32-bit integer at the specified byte offset from the pointer. */
	getUint32(offset?: number): number;
	/** Gets a signed 32-bit integer at the specified byte offset from the pointer. */
	getInt32(offset?: number): number;
	/** Gets an unsigned 64-bit integer at the specified byte offset from the pointer. */
	getBigUint64(offset?: number): bigint;
	/** Gets a signed 64-bit integer at the specified byte offset from the pointer. */
	getBigInt64(offset?: number): bigint;
	/** Gets a signed 32-bit float at the specified byte offset from the pointer. */
	getFloat32(offset?: number): number;
	/** Gets a signed 64-bit float at the specified byte offset from the pointer. */
	getFloat64(offset?: number): number;
	/** Gets a C string (null terminated string) at the specified byte offset from the pointer. */
	getCString(offset?: number): string;
	/** Gets an ArrayBuffer of length `byteLength` at the specified byte offset from the pointer. */
	getArrayBuffer(byteLength: number, offset?: number): ArrayBuffer;
	/** Copies the memory of the pointer into a typed array. Length is determined from the typed array's `byteLength`. Also takes optional offset from the pointer. */
	copyInto(destination: TypedArray, offset?: number): void;
}
interface DenoUnsafePointerViewCtor {
	new (pointer: DenoUnsafePointer): DenoUnsafePointerView;
}
const denoUnsafePointerViewCtor = (pointer: DenoUnsafePointer) => {
	// deno-lint-ignore no-explicit-any
	const ctor = (Deno as any).UnsafePointerView;
	if (ctor == null) return undefined;
	return new ctor(pointer) as DenoUnsafePointerView | undefined;
};

/** A dynamic library resource */
interface DenoDynamicLibrary<S extends Record<string, DenoForeignFunction>> {
	/** All of the registered symbols along with functions for calling them */
	symbols: { [K in keyof S]: (...args: unknown[]) => unknown };

	close(): void;
}

// /** **UNSTABLE**: Unsafe and new API, beware!
//  *
//  * Opens a dynamic library and registers symbols
//  */
// export function dlopen<S extends Record<string, ForeignFunction>>(
// 	filename: string | URL,
// 	symbols: S,
// ): DynamicLibrary<S>;

type DenoDlOpenFn = <S extends Record<string, DenoForeignFunction>>(
	filename: string | URL,
	symbols: S,
) => DenoDynamicLibrary<S>;

// `Deno.dlopen()` is unstable API (as of v1.12+) => deno-lint-ignore no-explicit-any
// deno-lint-ignore no-explicit-any
const denoDlOpen = (Deno as any).dlopen as DenoDlOpenFn | undefined;

const fns: Record<string, DenoForeignFunction> = {
	'GetCommandLineA': { parameters: [], result: 'pointer' },
	'GetCommandLineW': { parameters: [], result: 'pointer' },
};
const dll = denoDlOpen?.('kernel32.dll', fns);

function wcharArrayToString(arr?: Uint16Array) {
	if (arr == null) return undefined;
	let s = '';
	for (const value of arr.values()) {
		s = s + String.fromCharCode(value);
	}
	return s;
}

//===

export function GetCommandLineA() {
	const ptr = dll?.symbols.GetCommandLineA() as DenoUnsafePointer;
	const ptrView = ptr && denoUnsafePointerViewCtor(ptr);
	return ptrView?.getCString();
}

function GetCommandLineWCharArray() {
	const ptr = dll?.symbols.GetCommandLineW() as DenoUnsafePointer;
	const ptrView = ptr && denoUnsafePointerViewCtor?.(ptr);
	if (ptrView == null) return undefined;
	const Uint16Size = 2;
	let offset = 0;
	let value = ptrView.getUint16(offset);
	while (value != null && value !== 0) {
		// console.warn({ idx, value, c: String.fromCharCode(value) });
		offset = offset + Uint16Size;
		value = ptrView.getUint16(offset);
	}
	const s = new Uint16Array(offset / Uint16Size);
	ptrView.copyInto(s);
	return s;
}

export function GetCommandLineW() {
	return wcharArrayToString(GetCommandLineWCharArray());
}

export function GetCommandLine() {
	return GetCommandLineW();
}

// console.log('Deno', { args: Deno.args, main: Deno.mainModule, exec: Deno.execPath() });
// console.log('GetCommandLine() =>', GetCommandLine());
// console.log('GetCommandLineA() =>', GetCommandLineA());
// console.log('GetCommandLineW() =>', GetCommandLineW());
