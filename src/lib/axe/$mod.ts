// spell-checker:ignore (jargon) chainable chainer
// spell-checker:ignore (names) Deno
// spell-checker:ignore (people) Roy Ivy III * rivy
// spell-checker:ignore (vars) LOGLEVEL

// FixME: [2021-11-01; rivy] explore how to remove the uses of `any`
// !note: changing `any` to `unknown`, especially for types, narrows the type from a general "Any" target and causes TS errors about "argument of type 'unknown' is not assignable to type ..."
// deno-lint-ignore-file no-explicit-any

//===

import { PQueue } from './$deps.ts';
import { DEFAULT_INSPECT_OPTIONS, encode, inspect } from './$shared.ts';

const COMPOSED_ID_SEP = '/'; // ToDO: implement composition/decomposition of IDs (within Metadata?)

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

//===

export const atImportPermissions = {
	env: (await Deno.permissions?.query({ name: 'env' })) ?? { state: 'granted', onchange: null },
	// ffi: (await (Deno.permissions?.query({ name: 'ffi' }))).state ?? 'granted',
	// hrtime: (await (Deno.permissions?.query({ name: 'hrtime' }))).state ?? 'granted',
	// net: (await (Deno.permissions?.query({ name: 'net' }))).state ?? 'granted',
	// read: (await (Deno.permissions?.query({ name: 'read' }))).state ?? 'granted',
	// run: (await (Deno.permissions?.query({ name: 'run' }))).state ?? 'granted',
	// write: (await (Deno.permissions?.query({ name: 'write' }))).state ?? 'granted',
};

// `env()`
/** Return the value of the environment variable `varName` (or `undefined` if non-existent or not-allowed access).
 * - will *not panic*
 * - will *not prompt* for permission if `options.guard` is `true`
@param `options``.guard` • verify unrestricted environment access permission *at time of module import* prior to access attempt (avoids Deno prompts/panics); defaults to `true`
 */
export function env(varName: string, options?: { guard: boolean }) {
	const guard = options != null ? options.guard : true;
	const useDenoGet = !guard || atImportPermissions.env.state === 'granted';
	try {
		return useDenoGet ? Deno.env.get(varName) : undefined;
	} catch (_) {
		return undefined;
	}
}

//===

import type { Writer as DenoWriter } from 'jsr:@std/io@0.224.3/types';

async function writeAll(writer: DenoWriter, data: Uint8Array): Promise<number> {
	let bytesWritten = 0;
	while (bytesWritten < data.byteLength) {
		bytesWritten += await writer.write(data.subarray(bytesWritten));
	}
	return bytesWritten;
}

//===

export interface Writer<T = unknown> {
	write(chunk: T): Promise<number>;
}

export interface WriterDetail {
	writer: Writer;
	options: WriterOptions;
}
export interface WriterOptions {
	eol?: string;
}

export interface Transformer<I, O> {
	transform(i: I, ..._: I[]): O | Promise<O | undefined> | undefined;
}

// TransformFn<I, O>
/** Transform function type; describes a simple generic function to perform data transformation.
 */
export interface TransformFn<I, O> {
	(..._: I[]): O | Promise<O | undefined> | undefined;
}

// TransformInContextFn<I, O>
/** Transform function type; describes a simple generic function to perform data transformation.
The function takes a `context` object and an array of input type (`I`) as rest parameters and which returns an output type (`O`),
`undefined`, or a promise of either.
*/
export interface TransformInContextFn<I, O> {
	(context: unknown | null, ..._: I[]): O | Promise<O | undefined> | undefined;
}

export interface TransformWriterOptions<I, O = I> {
	// fn?: TransformInContextFn<TransformWriter<I, O>, I, O>;
	/** Optional instance identifier */
	id?: string;
	/** List of writers which receive pre-transformed (ie, raw) input. */
	previewers?: Writer[];
	/** List of writers which receive transformed input. */
	writers?: WriterDetail[];
	writeQueue?: PQueue;
}

export class TransformWriter<I = unknown, O = I> implements Writer<I>, Transformer<I, O> {
	/** Optional instance ID; may not be unique */
	readonly id: string;
	readonly _transform: TransformInContextFn<I, O> | null | undefined;
	readonly _writeQueue: PQueue;
	readonly _previewers: Writer[];
	readonly _writers: WriterDetail[];

	static TransformWriterTransformFn<sI, _sO>(_context: unknown | null, _i: sI, ..._inputs: sI[]) {
		return undefined;
	}

	constructor(fn?: TransformInContextFn<I, O>, options?: TransformWriterOptions<I, O>) {
		this.id = options?.id || this.constructor.name;
		this._transform = fn ?? TransformWriter.TransformWriterTransformFn;
		this._writeQueue = options?.writeQueue ?? new PQueue();

		this._previewers = options?.previewers ?? [];
		this._writers = options?.writers ?? [];
	}

	// context(): TransformWriterContext | null {
	// 	return new TransformWriterContext({ instanceID: this.id });
	// }

	// * require at least one input when using `transform()`
	// ... honors the contract of producing one output (or undefined) for a given input
	// ... allows better static type checking
	// ... allows `undefined` as a specific input, discriminating between an input of `undefined` vs an empty list of inputs
	transform(i: I, ...inputs: I[]) {
		return this._transform?.(this, i, ...inputs);
	}

	chain<T>(t: TransformWriter<O, T>) {
		// deno-lint-ignore no-this-alias
		const f = this;
		const g = t;
		const composedTransformWriterTransformFn: TransformInContextFn<I, T> = async function (
			context: unknown | null,
			...inputs: I[]
		) {
			// `undefined` is used as a signal value; halting the transformation chain and returned as an "empty" transformation
			// * allows filtering (by returning `undefined`) without complicating simple transforms with optional inputs and intra-function checks for undefined
			const x = await f._transform?.(context, ...inputs);
			// console.warn(`${this.id}/${t.id}:composedTransformWriterTransformFn()`, { x });
			if (typeof x === 'undefined') return undefined;
			return g.transform(x);
		};
		return new TransformWriter<I, T>(composedTransformWriterTransformFn, {
			id: [this.id, t.id].join(COMPOSED_ID_SEP),
			previewers: this._previewers.concat(t._previewers),
			writers: this._writers.concat(t._writers),
			writeQueue: this._writeQueue, // note: drops/ignores _writeQueue from chained TransformWriter
		});
	}

	into(writer: Writer, options = { eol: '\n' }) {
		this._writers.push({ writer, options });
		return this;
	}

	previewInto(writer: Writer) {
		this._previewers.push(writer);
		return this;
	}

	/** Returns a promise which is fulfilled when all pending promised writes have settled.
	This function can assist in imposing a temporal partial ordering between writes with other code (async or sync).

	```ts
	// ... async or sync writes ...
	x.write(...)
	await x.write(...)
	// ...
	await x.onIdle(); // when settled, all enqueued/pending writes have been completed
	// ...
	```
	*/
	onIdle() {
		return this._writeQueue.onIdle();
	}

	/* async */ write(chunk: I) {
		// console.warn(`${this.id}.write()#1`, { chunk });
		// async write(chunk?: I) {
		// const data = chunk && await this._transform(chunk);
		// const context = this;
		let isTransformed = false;
		let data: O | undefined;
		let s: string;
		const promises: Promise<number>[] = [];
		for (const writer of this._previewers) {
			promises.push(this._writeQueue.add(() => writer.write(chunk)));
		}
		// console.warn(`${this.id}.write()#2`, { chunk });
		for (const { writer, options } of this._writers) {
			const promise = this._writeQueue.add(async () => {
				// convert data to string format for stream output; bare-bones `inspect()` is used for non-`string` data for machine-readability
				if (!isTransformed) {
					data = await this._transform?.(this, chunk);
					if (typeof data !== 'undefined') {
						s =
							typeof data === 'string'
								? data
								: inspect(data, DEFAULT_INSPECT_OPTIONS).replaceAll(/\n\s*/gim, ' ');
					}
					isTransformed = true;
				}
				// console.warn(`${this.id}.write():writers/async`, {
				// 	writer,
				// 	context,
				// 	chunk,
				// 	isTransformed,
				// 	data,
				// 	s,
				// });
				return typeof data !== 'undefined'
					? (async () => {
							const buf = encode(options.eol ? s + options.eol : s);
							return await writeAll(writer as Writer<typeof buf>, buf);
						})()
					: Promise.resolve(0);
			});
			promises.push(promise);
		}
		return Promise.all(promises).then((results) =>
			results.reduce((allBytesWritten, bytesWritten) => allBytesWritten + bytesWritten, 0),
		);
	}
}

//===

import {
	$colors,
	$levels,
	$symbols,
	deepMerge,
	format,
	getCurrentLine,
	rfcGetLogLevel,
} from './$deps.ts';

import type { Location, Offset } from './$deps.ts';
import type { LevelInfo, LevelMap } from './$deps.ts';
import type { DeepReadonly } from './$deps.ts';

//===

export type AnArray<T = any> = Array<T> | ReadonlyArray<T>;
export type AnObject<T = any> = { [key: PropertyKey]: T };
export type AnyFn<TArgs = any, TResult = any> = (...args: TArgs[]) => TResult;
export type AnyDataObject = AnArray | AnObject;

// ref: <https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432>
// ref: <https://stackoverflow.com/questions/60881882/typescript-type-that-requires-at-least-one-property>
// type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T];
type AtLeastOne<T> = { [K in keyof Required<T>]: Pick<Required<T>, K> }[keyof Required<T>];

/** A *type* defining a function which takes an input string and outputs the string
with formatting (eg, bold, red, italics, etc) applied to it.
*/
export type FormatFn = (s: string) => string;

const IdentityFn = <T>(v: T): T => {
	return v;
};

/** Default log levels; adds 'trace' to the traditional RFC3164 list.
- ref: <http://www.faqs.org/rfcs/rfc3164.html>@@<https://archive.is/Pu3Eu>
*/
export const defLogLevels: LevelMap = {
	...$levels.rfcLogLevels,
	trace: $levels.rfcLogLevels.debug + 1,
};

//===

export function deepClone<T>(source: T): T {
	if (source == null || typeof source === 'function' || typeof source !== 'object') {
		return source;
	}
	return deepMerge.all([{}, source]) as T;
}

//===

const GLOBAL_SCOPE_REF_KEY = Symbol('global-scope');
const DEFAULT_SCOPES_KEY = Symbol('scope-chain');
/** Semi-structured data accessible to consumers of `LogEntry` via `getData()`, `getProp...()`, etc.

- data is free-form
- as a convention, property "scopes" (which are named sub-objects) can be used to direct data to specific consumers
  - a usual scope priority would be [ instanceID, classID, GLOBAL ]

*/
export class Metadata {
	// ToDO: rename to `#data` (a JS-enforced private field) to hide internals
	_data: AnObject;

	constructor(
		o: DeepReadonly<AnObject> = {},
		options: { globalScope?: string; defScopeChain?: string[] } = {},
	) {
		this._data = deepClone(o);
		if (options.globalScope) {
			this._data[GLOBAL_SCOPE_REF_KEY] = options.globalScope;
		}
		if (options.defScopeChain) {
			this._data[DEFAULT_SCOPES_KEY] = options.defScopeChain;
		}
		// deepFreeze(this.metadata); // enforce run-time immutability
	}

	getData() {
		return deepClone(this._data);
		// return this._data;
	}
	mergeData(data: DeepReadonly<AnObject>) {
		this._data =
			data instanceof Metadata
				? new Metadata(deepMerge.all([{}, this._data, data.getData()]))
				: new Metadata(deepMerge.all([{}, this._data, data]));
	}
	resetData(data: DeepReadonly<AnObject> = {}) {
		this._data = data instanceof Metadata ? data.getData() : deepClone(data);
	}

	// setData(o: AnObject) {
	// 	this.#data = deepClone(o);
	// }

	getScopedData(scope: string): AnObject | undefined {
		// console.warn('getScopedData', { scope, data: this._data, type: typeof this._data[scope] });
		return scope && typeof this._data[scope] === 'object'
			? (this._data[scope] as AnObject)
			: undefined;
	}
	getGlobalData(): AnObject | undefined {
		return this._data[GLOBAL_SCOPE_REF_KEY] && typeof this._data[GLOBAL_SCOPE_REF_KEY] === 'string'
			? this.getScopedData(this._data[GLOBAL_SCOPE_REF_KEY] as string)
			: undefined;
	}

	getProp(name: string, scopes: string | string[] = []) {
		if (!Array.isArray(scopes)) scopes = [scopes];
		scopes = scopes.length > 0 ? scopes : (this._data[DEFAULT_SCOPES_KEY] as string[]);
		if (this._data[GLOBAL_SCOPE_REF_KEY] && typeof this._data[GLOBAL_SCOPE_REF_KEY] === 'string') {
			scopes.push(this._data[GLOBAL_SCOPE_REF_KEY] as string);
		}
		for (const scope of scopes) {
			const vars = this.getScopedData(scope);
			if (vars?.[name] != undefined) return vars?.[name]; // return first matching property (by scope-priority)
		}
		return undefined; // property not found
	}
	getProps(names: string | string[], scopes: string | string[] = []) {
		if (!Array.isArray(names)) names = [names];
		if (!Array.isArray(scopes)) scopes = [scopes];
		scopes = scopes.length > 0 ? scopes : (this._data[DEFAULT_SCOPES_KEY] as string[]);
		if (this._data[GLOBAL_SCOPE_REF_KEY] && typeof this._data[GLOBAL_SCOPE_REF_KEY] === 'string') {
			scopes.push(this._data[GLOBAL_SCOPE_REF_KEY] as string);
		}
		const o: Record<string, unknown> = {};
		for (const scope of scopes) {
			const vars = this.getScopedData(scope);
			for (const name of names) {
				if (o[name] == null && vars?.[name] != null) {
					o[name] = vars?.[name]; // first matching
				}
			}
		}
		return o;
	}
	getAllProps(scopes: string | string[] = []) {
		if (!Array.isArray(scopes)) scopes = [scopes];
		scopes = scopes.length > 0 ? scopes : (this._data[DEFAULT_SCOPES_KEY] as string[]);
		if (this._data[GLOBAL_SCOPE_REF_KEY] && typeof this._data[GLOBAL_SCOPE_REF_KEY] === 'string') {
			scopes.push(this._data[GLOBAL_SCOPE_REF_KEY] as string);
		}
		// console.warn('getAllProps()', { scopes, data: this._data });
		const o: Record<string, unknown> = {};
		for (const scope of scopes) {
			const vars = this.getScopedData(scope) || {};
			for (const key of Object.keys(vars)) {
				if (o[key] == null && vars[key] != null) {
					o[key] = vars[key]; // first matching
				}
			}
			// console.warn(`getAllProps():(loop):${scope} =>`, { vars, o });
		}
		// console.warn('getAllProps()', { data: this.getData(), scopes, props: o });
		return o;
	}
}

/** The log entry that Logger creates and forwards to its chained transforms and writers. */
export interface LogEntry extends LevelInfo, Location {
	// ToDO: change into a class, hiding LevelDetail, CallerLocation info within `#context` with get (and set?) routines
	//    ## no longer extends LevelInfo, Location; use getLevel(), getLevels(), ...
	/** All the log entry arguments (after optional Metadata and log level) */
	args: unknown[];
	/** Date (as a string in ISO format) of when the log entry was submitted */
	date: string;
	// level: {name: string, rank: number};
	// #context: { LevelDetail, CallerLocation, LevelsDetail:{ Map: { NAME: RANK, ...}, RankOrderFn } };
	/** Additional freeform/semi-structured properties (transported via `LogEntry`) that are passed to this and later chained transforms. */
	metadata?: Readonly<Metadata>;
	/** Level map */
	levels: LevelMap;
}

export interface CallerLocation_ {
	file: string;
	method: string;
	line: number;
	char: number;
}

export interface LevelDetail_ {
	name: string;
	rank: number;
}

export interface LevelMap_ {
	[k: string]: number;
}

export interface LevelsDetail_ {
	map: LevelMap;
	rankCompareFn: <T extends string | number>(_a: T, _b: T) => number;
}

export class LogEntry_ {
	/** All the log entry arguments (after optional Metadata and log level) */
	args: unknown[] = [];
	/** Date (as a string in ISO format) of when the log entry was submitted */
	date = '';
	level: LevelDetail_ | undefined = undefined;
	#context = undefined; // { LevelDetail, CallerLocation, LevelsDetail:{ Map: { NAME: RANK, ...}, RankOrderFn } };
	/** Additional freeform/semi-structured properties (transported via `LogEntry`) that are passed to this and later chained transforms. */
	metadata?: Readonly<Metadata>;
}

//===

/** Configuration for the Logger */
export interface LoggerOptions<I = unknown, O = LoggerInT> extends TransformWriterOptions<I, O> {
	/** Use to override the default value of {@link Logger.lineOffset} */
	lineOffset?: Offset;

	/** Use to override the default value of {@link Logger.levels} */
	levels?: LevelMap;

	/** Use to override the default value of {@link Logger.defaultLevelInfo} */
	defaultLevel?: number | string;

	/** Use to override the default value of {@link Logger.lineLevel} */
	lineLevel?: number;

	/** Use to override the default {@link Logger.metadata} */
	metadata?: Readonly<Metadata>;
}

// type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
// type LoggerInT = ValueOrArray<unknown>;
type LoggerInT = unknown;
// type LoggerInT = unknown;
type LoggerInArrayT = Array<LoggerInT>;

class LoggerContext {
	metadata: Readonly<Metadata>;

	/** The configuration to use for the line offset.
	This defaults to any file path that includes `logger`, and any method that includes the word `log`.
	*/
	public lineOffset: Offset = { file: /logger/i, method: /log/i };

	/** The mapping of log level names to log level numbers.
	Defaults to the RFC Log Level configuration.
	*/
	public levels: LevelMap = defLogLevels;

	/** The log level information to use when the log level was unable to be determined.
	Defaults to the info log level.
	*/
	public defaultLevelInfo: LevelInfo;

	/* Only fetch file/line information for entries that have a log level equal to, or below, this number.
	You should only specify this if you need it, as fetching line information for thousands of log entries, which is typical in large applications, will slow your application down dramatically.
	If not specified, defaults to `-Infinity` which effect is to ignore gathering line information for all log levels.
	*/
	//  public lineLevel: number = -Infinity;
	public lineLevel: number;

	// instanceID: string;
	// instanceClass: string;

	constructor(options?: LoggerOptions & { instanceClass?: string; instanceID?: string }) {
		this.metadata =
			(options?.metadata instanceof Metadata
				? options.metadata
				: new Metadata(options?.metadata)) ?? new Metadata();

		// options
		this.lineOffset =
			options?.lineOffset != null ? options.lineOffset : { file: /logger/i, method: /log/i };
		this.levels = options?.levels != null ? deepClone(options.levels) : defLogLevels;
		this.lineLevel = options?.lineLevel != null ? options.lineLevel : -Infinity;

		// options: default level
		const defaultLevel = options?.defaultLevel ?? 'notice';
		const levelInfo = rfcGetLogLevel(options?.defaultLevel ?? 'notice', this.levels);
		if (levelInfo == null) {
			throw new Error(
				`Logger: '${defaultLevel}' as the default log level was not found in the configured levels`,
			);
		}
		this.defaultLevelInfo = levelInfo;
	}
}

/**
 * Logger.
 * This is what we write to.
 * @example Creation
 * ``` javascript
 * // Via class
 * import { Logger } from 'caterpillar'
 * const logger = new Logger()
 * ```
 */
export class Logger<O = LogEntry> extends TransformWriter<LoggerInT, O> {
	// ToDO?: evaluate alternate implementation as a TransformWriter **container**
	// /** Internal transformer */
	// #transformer: TransformWriter<unknown[], unknown>;

	#context: LoggerContext;

	// /** Default logger metadata */
	// #metadata: Readonly<Metadata>;

	getMetadata() {
		return this.#context.metadata.getData();
	}
	mergeMetadata(data: AnObject) {
		this.#context.metadata =
			data instanceof Metadata
				? new Metadata(
						deepMerge.all([{}, this.#context.metadata.getData(), (data as Metadata).getData()]),
					)
				: new Metadata(deepMerge.all([{}, this.#context.metadata.getData(), data]));
	}
	resetMetadata(data: AnObject) {
		this.#context.metadata = data instanceof Metadata ? data : new Metadata(data);
	}

	#suspended: boolean;
	#suspensionQueue: PQueue;

	// /**
	//  * The configuration to use for the line offset.
	//  * This defaults to any file path that includes `logger`, and any method that includes the word `log`.
	//  */
	// public lineOffset: Offset = { file: /logger/i, method: /log/i };

	// /**
	//  * The mapping of log level names to log level numbers.
	//  * Defaults to the RFC Log Level configuration.
	//  */
	// public levels: LevelMap = defLogLevels;

	// /**
	//  * The log level information to use when the log level was unable to be determined.
	//  * Defaults to the info log level.
	//  */
	// public defaultLevelInfo: LevelInfo;

	// /**
	//  * Only fetch file/line information for entries that have a log level equal to, or below, this number.
	//  * You should only specify this if you need it, as fetching line information for thousands of log entries, which is typical in large applications, will slow your application down dramatically.
	//  * If not specified, defaults to `-Infinity` which effect is to ignore gathering line information for all log levels.
	//  */
	// //  public lineLevel: number = -Infinity;
	// public lineLevel: number;

	// const isFn = (fn: any): fn is TransformFn<unknown,LogEntry> => true;

	/** Create our instance and apply our configuration options. */
	constructor(fn?: TransformInContextFn<LoggerInT, O>, options?: LoggerOptions) {
		super(undefined, options);
		// FixME: [2021-10-29; rivy] this forced type revision is a hack to supply the default transform function for `Logger<unknown,LogEntry>`; it definitely can break for other class uses.
		// *** maybe make `LogEntry` a class and somehow check for instanceof ...
		(this as Mutable<this>)._transform = fn ?? (Logger.LoggerTransformFn as any);
		this.#context = new LoggerContext({
			...options,
			instanceID: this.id,
			instanceClass: this.constructor.name,
		});

		// console.warn('Logger/ctor', { metadata: this.#metadata });
		this.#suspended = false;
		this.#suspensionQueue = new PQueue();
	}

	// /** @override */ context() {
	// 	return this.#context;
	// }

	logLevels() {
		return this.#context.levels;
	}

	/** Alias for {@link logLevelDetail} using the configured logger levels. */
	logLevelDetail(value?: number | string) {
		return value != undefined
			? rfcGetLogLevel(value, this.#context.levels) ??
					(typeof value === 'string'
						? rfcGetLogLevel(value.toLocaleLowerCase(), this.#context.levels)
						: undefined) ??
					undefined
			: undefined;
	}

	public isSuspended() {
		return this.#suspended;
	}
	public suspend() {
		this.#suspensionQueue.pause();
		this.#suspended = true;
	}
	public async resume() {
		this.#suspended = false;
		this.#suspensionQueue.start();
		await this.#suspensionQueue.onIdle();
	}

	/** @override */ override chain<T>(t: TransformWriter<O, T>): Logger<T> {
		// deno-lint-ignore no-this-alias
		const f = this;
		const g = t;
		const composedLoggerTransformFn = async function (
			context: unknown | null,
			...inputs: LoggerInT[]
		) {
			// `undefined` is used as a signal value; halting the transformation chain and returned as an "empty" transformation
			// * allows filtering (by returning `undefined`) without complicating simple transforms with optional inputs and intra-function checks for undefined
			const x = await f._transform?.(context, ...inputs);
			if (typeof x === 'undefined') return undefined;
			return g.transform(x);
		};
		return new Logger<T>(composedLoggerTransformFn, {
			id: [this.id, t.id].join(COMPOSED_ID_SEP),
			previewers: this._previewers.concat(t._previewers),
			writers: this._writers.concat(t._writers),
			writeQueue: this._writeQueue, // note: drops/ignores _writeQueue from chained TransformWriter
			metadata: new Metadata(
				deepMerge.all([
					this.#context.metadata.getData(),
					{
						chain_id: {
							from: this.id,
							chain: t.id,
						},
					},
				]),
			), // ToDO?: merge metadata from t.context(), if it exists?
		});
	}

	/** Takes an arguments array and transforms it into a log entry. */
	static LoggerTransformFn(
		context_: unknown | null,
		args_: unknown | unknown[],
	): LogEntry | undefined {
		// console.warn('LoggerTransformFn()', { context_ });
		const context = context_ && context_ instanceof Logger ? context_ : new Logger();
		const args: unknown[] = Array.isArray(args_) ? [...args_] : [args_];
		// console.warn('LoggerTransformFn()', { context_, context, args });

		// ToDO: rework this levelInfo determination...
		const mayBeLogLevel = args.shift();
		let levelInfo =
			mayBeLogLevel === 'default'
				? context.#context.defaultLevelInfo
				: typeof mayBeLogLevel === 'string'
					? rfcGetLogLevel(mayBeLogLevel, context.#context.levels)
					: undefined;
		if (levelInfo == null) {
			// fallback to the default log level
			levelInfo = context.#context.defaultLevelInfo;
			// as the level (first param) was not actually a level, put it back
			args.unshift(mayBeLogLevel);
		}
		// const mayBeLogLevel = ((args.length > 0) && (typeof args[0] === 'string') && (args[0].length > 0))
		// 	? args[0]
		// 	: '';

		// const SWITCH_DEFAULT = Symbol('default');
		// function switchFn<T extends AnyFn<PropertyKey>>(
		// 	arg: PropertyKey,
		// 	o: AnObject<T>,
		// ): ReturnType<T> | undefined {
		// 	const fn = o[arg] ? o[arg] : (o[SWITCH_DEFAULT] ? o[SWITCH_DEFAULT] : undefined);
		// 	return fn ? fn(arg) : undefined;
		// }
		// switchFn.DEFAULT = SWITCH_DEFAULT;

		// const s = {
		// 	'': () => context.defaultLevelInfo,
		// 	'default': () => {
		// 		args.shift();
		// 		return context.defaultLevelInfo;
		// 	},
		// 	[switchFn.DEFAULT]: (v: PropertyKey) => {
		// 		const mayBeLevelInfo = rfcGetLogLevel(v.toString(), context.levels);
		// 		if (mayBeLevelInfo != null) {
		// 			args.shift();
		// 			return mayBeLevelInfo;
		// 		} else return context.defaultLevelInfo;
		// 	},
		// };
		// const levelInfo = switchFn(mayBeLogLevel, s) ?? context.defaultLevelInfo;

		// fetch the date
		const date = new Date().toISOString();

		// fetch the line information
		const lineInfo =
			levelInfo.levelNumber <= context.#context.lineLevel
				? getCurrentLine(context.#context.lineOffset)
				: { line: -1, char: -1, method: '', file: '' };

		let additionalMetadata = new Metadata({});
		if (args && Array.isArray(args)) {
			const arg = args.shift();
			if (!(arg instanceof Metadata)) {
				args.unshift(arg);
			} else additionalMetadata = arg;
		}
		const configuredMetadata = context?.getMetadata();
		const metadata = new Metadata(
			deepMerge.all([
				configuredMetadata,
				{
					[`${context?.id}`]: deepMerge.all([
						configuredMetadata,
						{
							levels: context.#context.levels,
							levelInfo,
							lineInfo,
						},
					]),
				},
				additionalMetadata.getData(),
			]),
			{ globalScope: `${context?.id}` },
		);
		// const scopes = [...new Set([context.instanceClass, context.instanceID].filter(Boolean))];
		// const props = metadata?.getAllProps(scopes) || {};
		// console.warn('LoggerTransformFn()', {
		// 	// configuredMetadata,
		// 	// additionalMetadata,
		// 	metadata,
		// 	scopes,
		// 	props,
		// });

		// put it all together
		return Object.assign(
			{ date, args, levels: context.#context.levels, metadata },
			{ level: { name: levelInfo.levelName, rank: levelInfo.levelNumber } },
			levelInfo,
			lineInfo,
		);
	}

	/** Log the arguments into the logger transform stream. */
	log(...args: unknown[]) {
		// console.warn('log()', { args });
		if (this.#suspended) {
			this.#suspensionQueue.add(() => {
				return super.write(args);
			});
		} else {
			return super.write(args);
		}
	}

	/** Alias for `log()` which prefixes the 'error' log level. */
	error(...args: unknown[]) {
		return this.log('error', ...args);
	}

	/** Alias for `log()` which prefixes the warn log level. */
	warn(...args: unknown[]) {
		// console.warn('Logger/warn()');
		return this.log('warn', ...args);
	}

	/** (Another common) alias for `log()` which prefixes the warn log level. */
	warning(...args: unknown[]) {
		// console.warn('Logger/warn()');
		return this.log('warn', ...args);
	}

	/** Alias for `log()` which prefixes the info log level. */
	note(...args: unknown[]) {
		return this.log('note', ...args);
	}

	/** Alias for `log()` which prefixes the info log level. */
	info(...args: unknown[]) {
		return this.log('info', ...args);
	}

	/** Alias for `log()` which prefixes the debug log level. */
	debug(...args: unknown[]) {
		return this.log('debug', ...args);
	}

	/** Alias for `log()` which prefixes the trace log level. */
	trace(...args: unknown[]) {
		return this.log('trace', ...args);
	}
}

//===

// ref: [Javascript Predicates](https://codepen.io/Universalist/post/predicates-in-javascript) @@ <https://archive.is/aBvjN>

export interface FilterOptions extends TransformWriterOptions<LogEntry> {
	/** Use to override the default value of {@link Filter.level} */
	level?: number | string;
}

function FilterTransformFn(context_: unknown | null, entry: LogEntry): LogEntry | undefined {
	// console.warn('FilterTransform()', { context_, entry });
	const context = context_ && context_ instanceof Filter ? context_ : new Filter();
	const thisID = context.id;
	const thisClass = context.constructor.name;
	const metadata = entry.metadata;
	const scopes = [...new Set([thisID || thisClass, thisClass])];
	const props = metadata?.getAllProps(scopes) || {};

	const mayProceed = entry && context.predicate?.(entry, props);

	// console.warn('FilterTransformFn()', {
	// 	context,
	// 	entry,
	// 	scopes,
	// 	props,
	// 	predicate: context.predicate,
	// 	mayProceed,
	// });

	return mayProceed ? entry : undefined;
}

// Filter
/** A filter transform which uses a `predicate(_:LogEntry)` function to process and selectively discard entries.

- the built-in/default predicate is a priority filter which defaults to simple pass-through of all LogEntry's
*/
export class Filter extends TransformWriter<LogEntry> {
	level: number | string;
	constructor(options?: FilterOptions) {
		super(undefined, options);
		(this as Mutable<this>)._transform = FilterTransformFn;
		this.level = options?.level || Infinity; // Infinity => filter defaults to a simple pass-through
	}
	// /** @override */ context() {
	// 	const context = new FilterContext({
	// 		predicate: this.predicate,
	// 		instanceID: this.id,
	// 		instanceClass: this.constructor.name,
	// 	});
	// 	// console.warn('Filter/context()', { context });
	// 	return context;
	// }
	protected _getLevelNumber(level: number | string, levels: LevelMap) {
		if (level == null) return undefined;
		return rfcGetLogLevel(level, levels)?.levelNumber ?? undefined;
	}
	predicate: (entry: LogEntry, props?: Record<string, unknown>) => boolean = (entry, props) => {
		const level = ((v = props?.level) => (v != null ? format('%s', v) : undefined))() ?? this.level;
		const filterLevelN = this._getLevelNumber(level, entry.levels) ?? Infinity;
		const mayProceed = entry.levelNumber <= filterLevelN;
		// console.warn('Filter/predicate()', { entry, props, level, filterLevelN });
		// console.warn('Filter/predicate()', {
		// 	entryLevelN: entry.levelNumber,
		// 	filterLevelN,
		// 	mayProceed,
		// 	blocked: !(entry.levelNumber <= filterLevelN),
		// });
		return mayProceed;
	};
}

//====

export type LogLevelStyle = { prefix?: FormatFn; message?: FormatFn };
export type LogLevelSymbol = {
	ascii?: string;
	emoji?: string;
	unicode?: string;
	unicodeDoubleWidth?: string;
};

export type LogLevelProperty = {
	label?: string;
	style?: AtLeastOne<LogLevelStyle> | LogLevelStyle;
	symbol?: AtLeastOne<LogLevelSymbol> | LogLevelSymbol;
};

export type LogLevelProps = { [logLevel: number]: LogLevelProperty };

/** Default log level properties for the built-in `Humane` transform. */
export const defLevelProps: { [logLevel: number]: Required<LogLevelProperty> } = {
	// ASCII (ie, ANSI high-bit reset) are the most portable and generally used as fallbacks
	// emoji glyph notes
	// * selected emoji are double-wide "emoji-style" characters (implemented using emoji-variation codes where needed)
	// ref: <https://www.unicode.org/reports/tr51/tr51-21.html#Emoji_Variation_Sequences> @@ <https://archive.md/BT41I>
	// ref: <https://unicode.org/emoji/charts/emoji-variants.html> @@ <https://archive.md/mI8co>
	// ref: <http://www.iemoji.com> (note double-width "emoji-style" versions [vs single width "text-style"])
	0: {
		// emergency
		label: 'emergency',
		style: { prefix: $colors.brightRed, message: $colors.brightRed },
		symbol: {
			ascii: $colors.brightRed($colors.stripColor($symbols.symbolStrings.ascii.die)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.die),
			unicode: $colors.brightRed($colors.stripColor($symbols.symbolStrings.unicode.die)),
			unicodeDoubleWidth: $colors.brightRed(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.die),
			),
		},
	},
	1: {
		// alert
		label: 'alert',
		style: { prefix: $colors.brightRed, message: $colors.brightRed },
		symbol: {
			ascii: $colors.brightRed($colors.stripColor($symbols.symbolStrings.ascii.die)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.die),
			unicode: $colors.brightRed($colors.stripColor($symbols.symbolStrings.unicode.die)),
			unicodeDoubleWidth: $colors.brightRed(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.die),
			),
		},
	},
	2: {
		// critical
		label: 'critical',
		style: { prefix: $colors.brightRed, message: $colors.brightRed },
		symbol: {
			ascii: $colors.brightRed($colors.stripColor($symbols.symbolStrings.ascii.die)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.die),
			unicode: $colors.brightRed($colors.stripColor($symbols.symbolStrings.unicode.die)),
			unicodeDoubleWidth: $colors.brightRed(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.die),
			),
		},
	},
	3: {
		// error
		label: 'ERROR',
		style: { prefix: $colors.red, message: $colors.red },
		symbol: {
			ascii: $colors.red($colors.stripColor($symbols.symbolStrings.ascii.error)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.error),
			unicode: $colors.red($colors.stripColor($symbols.symbolStrings.unicode.error)),
			unicodeDoubleWidth: $colors.red(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.error),
			),
		},
	},
	4: {
		// warning
		label: 'Warning',
		style: { prefix: $colors.magenta, message: $colors.magenta },
		symbol: {
			ascii: $colors.magenta($colors.stripColor($symbols.symbolStrings.ascii.warning)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.warning),
			unicode: $colors.magenta($colors.stripColor($symbols.symbolStrings.unicode.warning)),
			unicodeDoubleWidth: $colors.magenta(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.warning),
			),
		},
	},
	5: {
		// notice
		label: 'note',
		style: { prefix: $colors.cyan, message: $colors.cyan },
		symbol: {
			ascii: $colors.cyan($colors.stripColor($symbols.symbolStrings.ascii.note)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.note),
			unicode: $colors.cyan($colors.stripColor($symbols.symbolStrings.unicode.note)),
			unicodeDoubleWidth: $colors.cyan(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.note),
			),
		},
	},
	6: {
		// information
		label: 'info',
		style: { prefix: $colors.brightCyan, message: $colors.brightCyan },
		symbol: {
			ascii: $colors.brightCyan($colors.stripColor($symbols.symbolStrings.ascii.info)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.info),
			unicode: $colors.brightCyan($colors.stripColor($symbols.symbolStrings.unicode.info)),
			unicodeDoubleWidth: $colors.brightCyan(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.info),
			),
		},
	},
	7: {
		// debug
		label: 'debug',
		style: { prefix: $colors.yellow, message: $colors.yellow },
		symbol: {
			ascii: $colors.yellow($colors.stripColor($symbols.symbolStrings.ascii.debug)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.debug),
			unicode: $colors.yellow($colors.stripColor($symbols.symbolStrings.unicode.debug)),
			unicodeDoubleWidth: $colors.yellow(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.debug),
			),
		},
	},
	8: {
		// trace
		label: 'trace',
		style: { prefix: $colors.brightYellow, message: $colors.brightYellow },
		symbol: {
			ascii: $colors.brightYellow($colors.stripColor($symbols.symbolStrings.ascii.trace)),
			emoji: $colors.stripColor($symbols.symbolStrings.emoji.trace),
			unicode: $colors.brightYellow($colors.stripColor($symbols.symbolStrings.unicode.trace)),
			unicodeDoubleWidth: $colors.brightYellow(
				$colors.stripColor($symbols.symbolStrings.unicodeDoubleWidth.trace),
			),
		},
	},
};

const HumaneSymbolTypes = ['ascii', 'emoji', 'unicode', 'unicodeDoubleWidth'] as const;
type HumaneSymbolOption = false | (typeof HumaneSymbolTypes)[number];
export interface HumaneOptions extends TransformWriterOptions<LogEntry, string> {
	id?: string;
	levelProps?: LogLevelProps;
	showLabel?: boolean;
	showStyle?: boolean;
	showSymbol?: HumaneSymbolOption;
}

// `Humane` transformer
/** Transform a `LogEntry` into a human-readable string (ie, for console display).
- input: LogEntry
- output: string
- options?: ... ToDO ...
*/
export class Humane extends TransformWriter<LogEntry, string> {
	readonly levelProps: LogLevelProps;
	readonly showLabel: boolean;
	readonly showStyle: boolean;
	readonly showSymbol: HumaneSymbolOption;
	constructor(options?: HumaneOptions) {
		super(undefined, options);
		(this as Mutable<this>)._transform = Humane.HumaneTransformFn;
		this.levelProps = options?.levelProps || defLevelProps;
		this.showLabel = options?.showLabel ?? true;
		this.showStyle = options?.showStyle ?? true;
		this.showSymbol = options?.showSymbol ?? false;
	}

	// FixME: translate this to a `static` function with appropriate context
	static HumaneTransformFn(context_: unknown | null, entry: LogEntry): string {
		// console.warn('Humane/transform()', { context_, entry });
		const context = context_ && context_ instanceof Humane ? context_ : new Humane();
		const thisID = context.id;
		const thisClass = context.constructor.name;
		const level = entry.levelNumber;
		const metadata = entry.metadata;

		const props = metadata?.getAllProps([...new Set([thisID || thisClass, thisClass])]) ?? {};
		const authority = ((v = props.authority) => (v != null ? format('%s', v) : undefined))();
		const label =
			((v = props.label) => (v != null ? format('%s', v) : undefined))() ??
			context.levelProps[level]?.label ??
			entry.levelName;
		const showLabel = Boolean(
			((v = props.showLabel) => (v != null ? v : undefined))() ?? context.showLabel,
		);
		const showStyle = Boolean(
			((v = props.showStyle) => (v != null ? v : undefined))() ?? context.showStyle,
		);
		const maybeShowSymbol = ((v = props.showSymbol) => (v != null ? format('%s', v) : undefined))();
		const allowedSymbolTypes = HumaneSymbolTypes as unknown as string[];
		const showSymbol =
			allowedSymbolTypes.indexOf(maybeShowSymbol ?? '') >= 0
				? (maybeShowSymbol as unknown as (typeof HumaneSymbolTypes)[number])
				: false;
		const symbol = showSymbol
			? (context.levelProps[level]?.symbol as LogLevelSymbol)?.[showSymbol]
			: '*';
		const prefixFormatFn =
			(props.prefixFormatFn as FormatFn) ??
			((s) =>
				(((showStyle && context.levelProps[level]?.style) as LogLevelStyle)?.prefix || IdentityFn)(
					s,
				));
		const messageFormatFn =
			(props.messageFormatFn as FormatFn) ??
			((s) =>
				(((showStyle && context.levelProps[level]?.style) as LogLevelStyle)?.message || IdentityFn)(
					s,
				));

		// console.warn('Humane/format()', { showLabel, showStyle, showSymbol, props });

		const prefix = prefixFormatFn(
			[
				showSymbol ? `${symbol}` : '',
				showLabel ? `${label}${authority ? `/[${authority}]` : ''}:` : '',
			]
				.filter(Boolean)
				.join(showSymbol !== 'unicodeDoubleWidth' ? ' ' : ''),
		);
		const text = messageFormatFn(format(...entry.args));
		return [prefix, text]
			.filter(Boolean)
			.join(showLabel || showSymbol !== 'unicodeDoubleWidth' ? ' ' : '');

		// form(data) receives {level: number, levelProps, authority?: string, messageStyleFn}
	}
}

export function logLevelFromEnv(options?: { vars: string[] }): string | undefined {
	const vars = options?.vars ?? ['LOG_LEVEL', 'LOGLEVEL'];
	const levelText = (() => {
		try {
			for (const v of vars) {
				const text = env(v);
				if (text) return text;
			}
		} catch (_) {
			// suppress any permission errors
		}
		return undefined;
	})();
	return levelText;
}

//====

export const logger = new Logger()
	.chain(new Filter({ level: 'note' }))
	.chain(new Humane())
	.into(Deno.stderr);

//===
