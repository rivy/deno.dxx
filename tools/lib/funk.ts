// spell-checker:ignore (names) Packt Rambda Ramda Rubico ; (people) Federico Kereki ; (utils) dprint ; (vars) en enumer it iter

// ToDO: add fluency?
// List<T> = Gen<T> with all functions (map, reduce, take, ...) attached producing more List<T>'s ; "lazy"
// ... and collectX() producing fully materialized built-in data types (string, Array, Map, Set, MapLikeObject/Record)

// ToDO: look at `rambda` for automatic handling of async (see <https://www.skypack.dev/view/rambda>)
// inspirations/refs
// * <https://exploringjs.com/es6/ch_iteration.html#sec_take_closing> , <https://2ality.com/2016/10/asynchronous-iteration.html>
// * <https://medium.com/@patarkf/synchronize-your-asynchronous-code-using-javascripts-async-await-5f3fa5b1366d>
// * <https://stackoverflow.com/questions/58668361/how-can-i-convert-an-async-iterator-to-an-array>
// * <https://javascript.info/async-iterators-generators>
// * <https://github.com/selfrefactor/rambda/search?q=async>
// * "Working with async functions"; [Mastering JavaScript Functional Programming, 2ndE [by Federico Kereki]{Packt, 2020-01(Jan)}], pp.137-44
// * <https://exploringjs.com/impatient-js/ch_async-iteration.html#example-converting-a-sync-iterable-to-an-async-iterable> @@ <https://archive.is/d0bqk>
// * [Generic Type Guard](https://dev.to/krumpet/generic-type-guard-in-typescript-258l) @@ <https://archive.is/9fu95>
// * [TypeScript FAQs](https://github.com/Microsoft/TypeScript/wiki/FAQ#faqs)

// ToDO: generalize and define more types
// see Foldable<T> iter 'rubico'
// * ref: <https://github.com/a-synchronous/rubico/issues/179>
// * ref: <https://github.com/a-synchronous/rubico/blob/master/_internal/iteratorFind.js>
// * ref: <https://github.com/a-synchronous/rubico/blob/master/_internal/asyncIteratorFind.js>
// * ref: <https://github.com/a-synchronous/rubico/blob/master/x/find.js>
// * `forEach()` ; implements iteration over synchronous or asynchronous values ... see <https://github.com/a-synchronous/rubico/blob/master/x/forEach.js>
//   ... how to type return value for TS? use `Either<L, R>`?
// * `asyncIteratorFind()` ; https://github.com/a-synchronous/rubico/blob/master/_internal/asyncIteratorFind.js
// * `iteratorFind()` ; <https://github.com/a-synchronous/rubico/blob/master/_internal/iteratorFind.js>
// * `SemiGroup = Array|String|Set|TypedArray|{ concat: function }|{ write: function }|Object` ; <https://github.com/a-synchronous/rubico/issues/179>
// * `Foldable = Iterable|AsyncIterable|{ reduce: function }|Object` ; <https://github.com/a-synchronous/rubico/issues/179>
// * `isObject(x)` at <https://github.com/a-synchronous/rubico/blob/master/_internal/isObject.js>

// const symbolAsyncIterator = Symbol.asyncIterator;
// const symbolIterator = Symbol.iterator;
// const isPromise = (value: unknown) => value != null && typeof value.then == 'function';
// const isObject = (value: unknown) => {
// 	if (typeof value === 'undefined' || value === null) {
// 		return false;
// 	}
// 	const typeofValue = typeof value;
// 	return typeofValue == 'object' || typeofValue == 'function';
// };

// note: Iterable<T>, by ECMA2020 default, includes Array<T>, ArrayLike<T>, Map<K,T>, Set<T>, and String
// Array<T> ; ref: <https://github.com/microsoft/TypeScript/blob/11097c622c/src/lib/es5.d.ts#L1200>
// ArrayLike<T> ; ref: <https://github.com/microsoft/TypeScript/blob/11097c622c/src/lib/es5.d.ts#L1443>
// Iterable<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2015.iterable.d.ts#L30>
// Iterator<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2015.iterable.d.ts#L23>
// IterableIterator<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2015.iterable.d.ts#L34>
// Generator<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2015.generator.d.ts#L3
// AsyncIterator<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2018.asynciterable.d.ts#L12>
// AsyncGenerator<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2018.asyncgenerator.d.ts#L3>
// Map<K,V> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2015.collection.d.ts#L1>
// Set<T> ; ref: <https://github.com/microsoft/TypeScript/blob/237b6f61f6/src/lib/es2015.collection.d.ts#L38>

export type ObjectKey = number | string | symbol;
export type MapLikeObject<K extends ObjectKey, T> = { [P in K]: T };
export type MapLike<K, V> = Map<K, V> | MapLikeObject<ObjectKey, V> | Record<ObjectKey, V> | {
	entries: () => [K, V][];
};

type AnyGenerator<T = unknown, TReturn = unknown, TNext = unknown> =
	| AsyncGenerator<T, TReturn, TNext>
	| Generator<T, TReturn, TNext>;

type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;

type AnyIterableIterator<T> = AsyncIterableIterator<T> | IterableIterator<T>;

type AnyIterator<T> = AsyncIterator<T> | Iterator<T>;

export type EnumerableSync<T, K = EnumerableKeyOfT<T>, V = EnumerableValueOfT<T>> =
	| MapLike<K, V>
	| Generator<V>
	| ArrayLike<V>
	| IterableIterator<V>
	| Iterable<V>
	| Iterator<V>
	| Set<V>;

export type Enumerable<T, K = EnumerableKeyOfT<T>, V = EnumerableValueOfT<T>> =
	| MapLike<K, V>
	| AnyGenerator<V>
	| ArrayLike<V>
	| AnyIterableIterator<V>
	| AnyIterable<V>
	| AnyIterator<V>;

type EnumerableKeyOfT<T> = T extends [infer K, unknown][] ? K
	: T extends ArrayLike<unknown> ? number
	: T extends Set<infer K> ? K
	: T extends MapLikeObject<infer K, unknown> | MapLike<infer K, unknown> ? K
	: T extends AnyGenerator<unknown, unknown, unknown> | AnyIterable<unknown> | AnyIterator<unknown>
		? number
	: T extends Enumerable<unknown, infer K, unknown> ? K
	: unknown;
// | AnySyncGenerator<[infer K, unknown], unknown, unknown> => K

type EnumerableValueOfT<T> = T extends [unknown, infer V][] ? V
	: T extends
		| ArrayLike<infer V>
		| MapLike<unknown, infer V>
		| AnyIterable<infer V>
		| AnyIterableIterator<infer V>
		| AnyIterator<infer V> ? V
	: T extends AnyGenerator<infer V, unknown, unknown> ? V
	: T extends Enumerable<unknown, unknown, infer V> ? V
	: unknown;
// | AnySyncGenerator<[unknown, infer V], unknown, unknown> => V

// ####

// const mN1 = new Map([['a', 'z']]);
// const set_1 = new Set([1, 10, 100]);
// type tsk = EnumerableKeyOfT<Set<string | number>>;
// const itN1 = mN1[Symbol.iterator]();
// const n = itN1.next();
// const [k, v] = !n.done ? n.value : [];

// const o = { 1: 1, 2: 2 };
// const e = enumerate(
// 	// new Map<string, number>([['a', 1]])
// 	new Map<string, [number]>([['a', [1]]]),
// 	// [1, 2]
// );
// const c = collect(e);
// const d = collect(iterate([1, 2]));
// const sy = Symbol('unique');
const ox = { 1: 'one', 2: 'two', sym: 10, truthy: true };
type oxk = EnumerableKeyOfT<typeof ox>;
type oxv = EnumerableValueOfT<typeof ox>;
// const eox = enumerate(ox);
// const cox = collect(eox);
// const oxe = collectEntries(eox);

type ty = MapLikeObject<string, bigint>;
type tu = EnumerableValueOfT<Map<string, bigint>>;
// type tz = EnumerableKeyTOf<AsyncGenerator<[bigint, number], void, unknown>>;
type tz = EnumerableKeyOfT<ty>;

type mytN1<V, K> = EnumerableSync<Map<K, V>, V, K>;
type mytN2 = EnumerableSync<boolean[]>;
type mytN3 = EnumerableSync<string>;
type mytN4 = EnumerableSync<Map<number, string>>;

// ####

// type ObjectKey = number | string; // [2021-03-27; rivy] ~ Deno/TS has poor symbol handling; see <https://github.com/microsoft/TypeScript/issues/1863>
// type EnumerableObject<K, V> = { [P in string]: V };
// type EnumerableSync<T> = AnySyncIterable<T> | EnumerableObject<T>;
// type Iterant<T> = AnySyncIterable<T>;
// type Enumerable<T, V, K = number> = T extends AsyncIterable<V>
// 	? EnumerableSync<T, number, V>
// 	: EnumerableSync<T, V, K>;
// type Enumerable<T extends AnySyncIterable<V> | ArrayLike<V> | MapLike<K, V>, V = void, K = void> = T;
// type EnumerableSync<T, K, V> = T extends Iterable<V> ? EnumerableSync<T, number, V> : MapLike<K, V>;
// type EnumerableSync<T extends (eArrayLike<V> | MapLike<K,V>), V = void, K = void> = T extends eArrayLike<
// 	V extends unknown ? V : never,
// 	K extends number ? number : never
// >
// type EnumerableSync<
// 	T extends MapLike<TK, TV> | ArrayLike<TV> | Iterable<TV>,
// 	TV = EnumerableValueOfT<T>,
// 	TK = EnumerableKeyTOf<T>
// > = T;
// | AsyncIterableIterator<T>
// | IterableIterator<T>;
export type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
type ValueOrKeyValuePair<K, T> = T | [K, T];
// ArrayLike; ref: <https://2ality.com/2013/05/quirk-array-like-objects.html> @@ <https://archive.is/9lfox>
// type ArrayLike<T> = Array<T> | Set<T> | { [n: number]: T; length: () => number };
// type MapLike<K, V> = Map<K, V> | { entries: () => [K, V][] };
type KeyValuePair<K, V> = [K, V];
type KV<K, V> = [K, V];

export async function* enumerate<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(enumerable: T): AsyncGenerator<[TKey, TValue], void, unknown> {
	const hasEntries = typeof (enumerable as MapLike<unknown, unknown>).entries === 'function';
	const isAsyncIterable =
		typeof (enumerable as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function';
	const isIterable = typeof (enumerable as Iterable<unknown>)[Symbol.iterator] === 'function';
	const isObject = enumerable instanceof Object;

	let idx = 0;
	if (hasEntries) {
		// [K, V] enumerates first
		const arr = ((enumerable as unknown) as Map<TKey, TValue>).entries();
		for (const e of arr) {
			yield e;
		}
	} else if (isAsyncIterable || isIterable) {
		// [V] enumerates
		for await (const e of (enumerable as unknown) as AsyncIterable<TValue>) {
			yield ([idx++, e] as unknown) as [TKey, TValue];
		}
	} else if (isObject) {
		const arr: ObjectKey[] = Reflect.ownKeys(enumerable);
		for (const k of arr) {
			yield ([k, Reflect.get(enumerable, k)] as unknown) as [TKey, TValue];
		}
	} else {
		yield ([idx, enumerable] as unknown) as [TKey, TValue];
	}
}
export function* enumerateSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(enumerable: T): Generator<[TKey, TValue], void, unknown> {
	const hasEntries = typeof (enumerable as Map<unknown, unknown>).entries === 'function';
	const isIterable = typeof (enumerable as Iterable<unknown>)[Symbol.iterator] === 'function';
	const isObject = enumerable instanceof Object;

	let idx = 0;
	if (hasEntries) {
		// [K, V] enumerates first
		const arr = ((enumerable as unknown) as Map<TKey, TValue>).entries();
		for (const e of arr) {
			yield e;
		}
	} else if (isIterable) {
		// [V] enumerates after [K,V]
		for (const e of (enumerable as unknown) as Iterable<TValue>) {
			yield ([idx++, e] as unknown) as [TKey, TValue];
		}
	} else if (isObject) {
		const arr: ObjectKey[] = Reflect.ownKeys(enumerable);
		for (const k in arr) {
			yield ([k, Reflect.get(enumerable, k)] as unknown) as [TKey, TValue];
		}
	} else {
		yield ([idx, enumerable] as unknown) as [TKey, TValue];
	}
}

export async function* iterate<T extends Enumerable<T>, TValue = EnumerableValueOfT<T>>(
	list: T,
): AsyncGenerator<TValue, void, unknown> {
	const it = enumerate(list);
	for await (const e of it) {
		yield e[1] as TValue;
	}
}
export function* iterateSync<T extends EnumerableSync<T>, TValue = EnumerableValueOfT<T>>(
	list: T,
): Generator<TValue, void, unknown> {
	const it = enumerateSync(list);
	for (const e of it) {
		yield e[1] as TValue;
	}
}

/**
 *  Collect all sequence values into a promised array (`Promise<T[]>`)
 *  * exhausts input enumerable
 */
export async function collect<
	T extends Enumerable<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): Promise<TValue[]> {
	// O(n); O(1) by specialization for arrays
	if (Array.isArray(list)) {
		return list;
	}
	const it = enumerate<T, TKey, TValue>(list);
	const arr: TValue[] = [];
	for await (const e of it) {
		arr.push(e[1]);
	}
	return arr;
}
export function collectSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): TValue[] {
	// O(n); O(1) by specialization for arrays
	if (Array.isArray(list)) {
		console.log('here');
		return list as TValue[];
	}
	const it = enumerateSync<T, TKey, TValue>(list);
	const arr: TValue[] = [];
	for (const e of it) {
		arr.push(e[1]);
	}
	return arr;
}

export function collectValues<
	T extends Enumerable<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): Promise<TValue[]> {
	return collect(list);
}
export function collectValuesSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): TValue[] {
	return collectSync(list);
}

export async function collectKeys<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = unknown,
>(list: T): Promise<TKey[]> {
	const en = enumerate<T, TKey, TValue>(list);
	const arr: TKey[] = [];
	for await (const e of en) {
		arr.push(e[0]);
	}
	return arr;
}
export function collectKeysSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = unknown,
>(list: T): TKey[] {
	const en = enumerateSync<T, TKey, TValue>(list);
	const arr: TKey[] = [];
	for (const e of en) {
		arr.push(e[0]);
	}
	return arr;
}

export async function collectEntries<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(list: T): Promise<[TKey, TValue][]> {
	const en = enumerate<T, TKey, TValue>(list);
	const arr: [TKey, TValue][] = [];
	for await (const e of en) {
		arr.push(e);
	}
	return arr;
}
export function collectEntriesSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(list: T): [TKey, TValue][] {
	const en = enumerateSync<T, TKey, TValue>(list);
	const arr: [TKey, TValue][] = [];
	for (const e of en) {
		arr.push(e);
	}
	return arr;
}

export async function collectToMap<Key, Value>(
	list: AsyncIterable<[Key, Value]>,
): Promise<Map<Key, Value>> {
	let arr: [Key, Value][] = [];
	if (Array.isArray(list)) {
		arr = list;
	} else {
		const it = iterate(list);
		for await (const e of it) {
			arr.push(e);
		}
	}
	return new Map(arr);
}
export function collectToMapSync<Key, Value>(list: Iterable<[Key, Value]>): Map<Key, Value> {
	let arr: [Key, Value][] = [];
	if (Array.isArray(list)) {
		arr = list;
	} else {
		const it = iterateSync(list);
		for (const e of it) {
			arr.push(e);
		}
	}
	return new Map(arr);
}

export async function collectToObject<TKey extends ObjectKey, TValue>(
	list: AsyncIterable<[TKey, TValue]>,
): Promise<MapLikeObject<TKey, TValue>> {
	const obj: MapLikeObject<TKey, TValue> = {} as MapLikeObject<TKey, TValue>;
	for await (const e of list) {
		obj[e[0]] = e[1];
	}
	return obj;
}
export function collectToObjectSync<TKey extends ObjectKey, TValue>(
	list: Iterable<[TKey, TValue]>,
): MapLikeObject<TKey, TValue> {
	const obj: MapLikeObject<TKey, TValue> = {} as MapLikeObject<TKey, TValue>;
	for (const e of list) {
		obj[e[0]] = e[1];
	}
	return obj;
}

export async function collectToString<T extends string>(list: AsyncIterable<T>): Promise<string> {
	let str = '';
	for await (const e of list) {
		str += e;
	}
	return str;
}
export function collectToStringSync<T extends string>(list: Iterable<T>): string {
	let str = '';
	for (const e of list) {
		str += e;
	}
	return str;
}

export function collectToArray<
	T extends Enumerable<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): Promise<TValue[]> {
	return collect(list);
}
export function collectToArraySync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): TValue[] {
	return collectSync(list);
}
export function collectToList<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): Promise<TValue[]> {
	return collectToArray(list);
}
export function collectToListSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): TValue[] {
	return collectToArraySync(list);
}

// ####

export async function* flatten<T>(
	iterable: AnyIterable<ValueOrArray<T>>,
): AsyncGenerator<T, void, unknown> {
	for await (const e of iterable) {
		if (Array.isArray(e)) {
			const it = flatten(e);
			for await (const x of it) {
				yield x;
			}
		} else yield e;
	}
}
export function* flattenSync<T>(iterable: Iterable<ValueOrArray<T>>): Generator<T, void, unknown> {
	for (const e of iterable) {
		if (Array.isArray(e)) {
			const it = flattenSync(e);
			for (const x of it) {
				yield x;
			}
		} else yield e;
	}
}

export async function* flatN<T>(
	n: number,
	iterable: AnyIterable<ValueOrArray<T>>,
): AsyncGenerator<ValueOrArray<T>, void, unknown> {
	for await (const e of iterable) {
		if (Array.isArray(e) && n > 0) {
			const it = flatN(n - 1, e);
			for await (const f of it) {
				yield f;
			}
		} else {
			yield e;
		}
	}
}
export function* flatNSync<T>(
	n: number,
	iterable: Iterable<ValueOrArray<T>>,
): Generator<ValueOrArray<T>, void, unknown> {
	for (const e of iterable) {
		if (Array.isArray(e) && n > 0) {
			const it = flatNSync(n - 1, e);
			for (const f of it) {
				yield f;
			}
		} else {
			yield e;
		}
	}
}

// spell-checker:ignore unnest
export async function* unnest<T>(
	n: number,
	iterable: AnyIterable<ValueOrArray<T>>,
): AsyncGenerator<ValueOrArray<T>, void, unknown> {
	yield* flatN(n, iterable);
}
export function* unnestSync<T>(
	n: number,
	iterable: Iterable<ValueOrArray<T>>,
): Generator<ValueOrArray<T>, void, unknown> {
	yield* flatNSync(n, iterable);
}

export async function* range(
	start: number,
	end: number,
	step = 1,
): AsyncGenerator<number, void, unknown> {
	let idx = start;
	const positiveIncrement = step > 0;
	while (positiveIncrement ? idx < end : idx > end) {
		yield idx;
		idx = idx + step;
	}
}
export function* rangeSync(start: number, end: number, step = 1): Generator<number, void, unknown> {
	let idx = start;
	const positiveIncrement = step > 0;
	while (positiveIncrement ? idx < end : idx > end) {
		yield idx;
		idx = idx + step;
	}
}

// ToDO: decide about Enumerable vs Iterable for other functions below
// ## which functions should operate on value vs [key, value]?
// ## terminology? list vs iterate vs enumerate ...
// ## re-evaluate above function types at some point as well
// ## * check via Intellisense determination about variable types after using above functions
// ## TKey, TValue better in function declaration line `(... TKey = EnumerableKeyOfT<T>...)` or as internal `type...` lines

/**
 *  Map function (`(element, key) => result`) over sequence values
 */
export async function* map<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(fn: (element: TValue, key?: TKey) => U, en: T): AsyncGenerator<U, void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		yield fn(e[1], e[0]);
	}
}
export function* mapSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(fn: (element: TValue, key?: TKey) => U, en: T): Generator<U, void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		yield fn(e[1], e[0]);
	}
}

export async function* mapKV<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(fn: (element: TValue, key?: TKey) => U, en: T): AsyncGenerator<[TKey, U], void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		yield [e[0], fn(e[1], e[0])];
	}
}
export function* mapKVSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(fn: (element: TValue, key?: TKey) => U, en: T): Generator<[TKey, U], void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		yield [e[0], fn(e[1], e[0])];
	}
}

export async function* filter<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): AsyncGenerator<TValue, void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		if (predicate(e[1], e[0])) {
			yield e[1];
		}
	}
}
export function* filterSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(predicate: (element: TValue, key?: TKey) => boolean, en: T): Generator<TValue, void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		if (predicate(e[1], e[0])) {
			yield e[1];
		}
	}
}

export async function* filterKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): AsyncGenerator<[TKey, TValue], void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		if (predicate(e[1], e[0])) {
			yield e;
		}
	}
}
export function* filterKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): Generator<[TKey, TValue], void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		if (predicate(e[1], e[0])) {
			yield e;
		}
	}
}

export async function* filterMap<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (element: TValue, key?: TKey) => U,
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): AsyncGenerator<U, void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		if (predicate(e[1], e[0])) {
			yield fn(e[1], e[0]);
		}
	}
}
export function* filterMapSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (element: TValue, key?: TKey) => U,
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): Generator<U, void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		if (predicate(e[1], e[0])) {
			yield fn(e[1], e[0]);
		}
	}
}

export async function* filterMapKV<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (element: TValue, key?: TKey) => U,
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): AsyncGenerator<[TKey, U], void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		if (predicate(e[1], e[0])) {
			yield [e[0], fn(e[1], e[0])];
		}
	}
}
export function* filterMapKVSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (element: TValue, key?: TKey) => U,
	predicate: (element: TValue, key?: TKey) => boolean,
	en: T,
): Generator<[TKey, U], void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		if (predicate(e[1], e[0])) {
			yield [e[0], fn(e[1], e[0])];
		}
	}
}

export async function reduce<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(fn: (accumulator: U, element: TValue, key?: TKey) => U, initialValue: U, en: T): Promise<U> {
	let acc = initialValue;
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		acc = fn(acc, e[1], e[0]);
	}
	return acc;
}
export function reduceSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(fn: (accumulator: U, element: TValue, key?: TKey) => U, initialValue: U, en: T): U {
	let acc = initialValue;
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		acc = fn(acc, e[1], e[0]);
	}
	return acc;
}

export async function* scan<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (accumulator: U, element: TValue, key?: TKey) => U,
	initialValue: U,
	en: T,
): AsyncGenerator<U, void, unknown> {
	let acc = initialValue;
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		acc = fn(acc, e[1], e[0]);
		yield acc;
	}
}
export function* scanSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (accumulator: U, element: TValue, key?: TKey) => U,
	initialValue: U,
	en: T,
): Generator<U, void, unknown> {
	let acc = initialValue;
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		acc = fn(acc, e[1], e[0]);
		yield acc;
	}
}

export async function* scanKV<
	U,
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (accumulator: U, element: TValue, key?: TKey) => U,
	initialValue: U,
	en: T,
): AsyncGenerator<[TKey, U], void, unknown> {
	let acc = initialValue;
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		acc = fn(acc, e[1], e[0]);
		yield [e[0], acc];
	}
}
export function* scanKVSync<
	U,
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(
	fn: (accumulator: U, element: TValue, key?: TKey) => U,
	initialValue: U,
	en: T,
): Generator<[TKey, U], void, unknown> {
	let acc = initialValue;
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		acc = fn(acc, e[1], e[0]);
		yield [e[0], acc];
	}
}

/**
 * Converts a (potentially infinite) sequence into a sequence of length `n`
 * * _does not_ exhaust input enumerable
 */
export async function* take<
	T extends Enumerable<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(n: number, enumer: T): AsyncGenerator<TValue, void, unknown> {
	const it = iterate(enumer);
	// * exhausts input enumer
	// for await (const e of it) {
	// 	if (n <= 0) {
	// 		break; // closes iterable
	// 	}
	// 	n--;
	// 	yield e;
	// }
	for (; n > 0; n--) {
		const next = await it.next();
		if (!next.done) {
			yield next.value;
		}
	}
}
export function* takeSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(n: number, enumer: T): Generator<TValue, void, unknown> {
	const it = iterateSync(enumer);
	for (; n > 0; n--) {
		const next = it.next();
		if (!next.done) {
			yield next.value;
		}
	}
}

export async function* takeKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, enumer: T): AsyncGenerator<[TKey, TValue], void, unknown> {
	const it = enumerate<T, TKey, TValue>(enumer);
	for (; n > 0; n--) {
		const next = await it.next();
		if (!next.done) {
			yield next.value;
		}
	}
}
export function* takeKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, enumer: T): Generator<[TKey, TValue], void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(enumer);
	for (; n > 0; n--) {
		const next = it.next();
		if (!next.done) {
			yield next.value;
		}
	}
}

/**
 * Drop (iterate past) firstSync `n` elements of sequence
 */
export async function* drop<
	T extends Enumerable<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(n: number, en: T): AsyncGenerator<TValue, void, unknown> {
	const it = iterate(en);
	for await (const e of it) {
		if (n <= 0) {
			yield e;
		}
		n--;
	}
}
export function* dropSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(n: number, en: T): Generator<TValue, void, unknown> {
	const it = iterateSync(en);
	for (const e of it) {
		if (n <= 0) {
			yield e;
		}
		n--;
	}
}

export async function* dropKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, en: T): AsyncGenerator<[TKey, TValue], void, unknown> {
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		if (n <= 0) {
			yield e;
		}
		n--;
	}
}
export function* dropKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, en: T): Generator<[TKey, TValue], void, unknown> {
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		if (n <= 0) {
			yield e;
		}
		n--;
	}
}

export async function* slice<
	T extends Enumerable<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(start: number, end: number, en: T): AsyncGenerator<TValue, void, unknown> {
	let idx = 0;
	const it = iterate(en);
	for await (const e of it) {
		if (idx < start) {
			idx++;
		} else if (idx < end) {
			yield e;
		}
	}
}
export function* sliceSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(start: number, end: number, en: T): Generator<TValue, void, unknown> {
	let idx = 0;
	const it = iterateSync(en);
	for (const e of it) {
		if (idx < start) {
			idx++;
		} else if (idx < end) {
			yield e;
		}
	}
}

export async function* sliceKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(start: number, end: number, en: T): AsyncGenerator<[TKey, TValue], void, unknown> {
	let idx = 0;
	const it = enumerate<T, TKey, TValue>(en);
	for await (const e of it) {
		if (idx < start) {
			idx++;
		} else if (idx < end) {
			yield e;
		}
	}
}
export function* sliceKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(start: number, end: number, en: T): Generator<[TKey, TValue], void, unknown> {
	let idx = 0;
	const it = enumerateSync<T, TKey, TValue>(en);
	for (const e of it) {
		if (idx < start) {
			idx++;
		} else if (idx < end) {
			yield e;
		}
	}
}

export async function* zip<
	T1 extends Enumerable<T1>,
	T2 extends Enumerable<T2>,
	T1Value = EnumerableValueOfT<T1>,
	T2Value = EnumerableValueOfT<T2>,
>(iterableT1: T1, iterableT2: T2): AsyncGenerator<[T1Value, T2Value]> {
	const itT1 = iterate(iterableT1);
	const itT2 = iterate(iterableT2);
	let nextT1 = await itT1.next();
	let nextT2 = await itT2.next();
	while (!(nextT1.done || nextT2.done)) {
		yield [nextT1.value, nextT2.value] as [T1Value, T2Value];
		nextT1 = await itT1.next();
		nextT2 = await itT2.next();
	}
}
export function* zipSync<
	T1 extends EnumerableSync<T1>,
	T2 extends EnumerableSync<T2>,
	T1Value = EnumerableValueOfT<T1>,
	T2Value = EnumerableValueOfT<T2>,
>(iterableT1: T1, iterableT2: T2): Generator<[T1Value, T2Value]> {
	const itT1 = iterateSync(iterableT1);
	const itT2 = iterateSync(iterableT2);
	let nextT1 = itT1.next();
	let nextT2 = itT2.next();
	while (!(nextT1.done || nextT2.done)) {
		yield [nextT1.value, nextT2.value] as [T1Value, T2Value];
		nextT1 = itT1.next();
		nextT2 = itT2.next();
	}
}

export async function* zipKV<
	T1 extends Enumerable<T1>,
	T2 extends Enumerable<T2>,
	T1Key = EnumerableKeyOfT<T1>,
	T2Key = EnumerableKeyOfT<T2>,
	T1Value = EnumerableValueOfT<T1>,
	T2Value = EnumerableValueOfT<T2>,
>(
	iterableT1: T1,
	iterableT2: T2,
): AsyncGenerator<[[T1Key, T1Value], [T2Key, T2Value]], void, unknown> {
	const itT1 = enumerate<T1, T1Key, T1Value>(iterableT1);
	const itT2 = enumerate<T2, T2Key, T2Value>(iterableT2);
	let nextT1 = await itT1.next();
	let nextT2 = await itT2.next();
	while (!(nextT1.done || nextT2.done)) {
		yield [nextT1.value, nextT2.value] as [[T1Key, T1Value], [T2Key, T2Value]];
		nextT1 = await itT1.next();
		nextT2 = await itT2.next();
	}
}
export function* zipKVSync<
	T1 extends EnumerableSync<T1>,
	T2 extends EnumerableSync<T2>,
	T1Key = EnumerableKeyOfT<T1>,
	T2Key = EnumerableKeyOfT<T2>,
	T1Value = EnumerableValueOfT<T1>,
	T2Value = EnumerableValueOfT<T2>,
>(iterableT1: T1, iterableT2: T2): Generator<[[T1Key, T1Value], [T2Key, T2Value]], void, unknown> {
	const itT1 = enumerateSync<T1, T1Key, T1Value>(iterableT1);
	const itT2 = enumerateSync<T2, T2Key, T2Value>(iterableT2);
	let nextT1 = itT1.next();
	let nextT2 = itT2.next();
	while (!(nextT1.done || nextT2.done)) {
		yield [nextT1.value, nextT2.value] as [[T1Key, T1Value], [T2Key, T2Value]];
		nextT1 = itT1.next();
		nextT2 = itT2.next();
	}
}

export async function head<T extends Enumerable<T>, TKey = unknown, TValue = EnumerableValueOfT<T>>(
	en: T,
): Promise<TValue | undefined> {
	const it = iterate(en);
	const next = await it.next();
	return next.done ? undefined : next.value;
}
export function headSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(en: T): TValue | undefined {
	const it = iterateSync(en);
	const next = it.next();
	return next.done ? undefined : next.value;
}

export async function headKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(en: T): Promise<[TKey, TValue] | undefined> {
	const it = enumerate<T, TKey, TValue>(en);
	const next = await it.next();
	return next.done ? undefined : next.value;
}
export function headKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(en: T): [TKey, TValue] | undefined {
	const it = enumerateSync<T, TKey, TValue>(en);
	const next = it.next();
	return next.done ? undefined : next.value;
}

export async function* tail<T extends Enumerable<T>>(en: T) {
	yield* drop(1, en);
}
export function* tailSync<T extends EnumerableSync<T>>(en: T) {
	yield* dropSync(1, en);
}

export async function* tailKV<T extends Enumerable<T>>(en: T) {
	yield* dropKV(1, en);
}
export function* tailKVSync<T extends EnumerableSync<T>>(en: T) {
	yield* dropKVSync(1, en);
}

export function first<T extends Enumerable<T>>(en: T) {
	return head(en);
}
export function firstSync<T extends EnumerableSync<T>>(en: T) {
	return headSync(en);
}

export function firstKV<T extends Enumerable<T>>(en: T) {
	return headKV(en);
}
export function firstKVSync<T extends EnumerableSync<T>>(en: T) {
	return headKVSync(en);
}

export async function last<T extends Enumerable<T>, TKey = unknown, TValue = EnumerableValueOfT<T>>(
	list: T,
): Promise<TValue | undefined> {
	// O(n) for iterators, but O(1) by specialization for arrays
	if (Array.isArray(list)) {
		return list.length > 0 ? (list[list.length - 1] as EnumerableValueOfT<T>) : undefined;
	}
	const arr = await collect(list);
	return arr.length > 0 ? arr[arr.length - 1] : undefined;
}
export function lastSync<
	T extends EnumerableSync<T>,
	TKey = unknown,
	TValue = EnumerableValueOfT<T>,
>(list: T): TValue | undefined {
	// O(n) for iterators, but O(1) by specialization for arrays
	if (Array.isArray(list)) {
		return list.length > 0 ? (list[list.length - 1] as EnumerableValueOfT<T>) : undefined;
	}
	const arr = collectSync(list);
	return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

export async function lastKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(list: T): Promise<[TKey, TValue] | undefined> {
	// O(n) for iterators, but O(1) by specialization for arrays
	if (Array.isArray(list)) {
		return list.length > 0 ? (list[list.length - 1] as EnumerableValueOfT<T>) : undefined;
	}
	const arr = await collectEntries<T, TKey, TValue>(list);
	return arr.length > 0 ? arr[arr.length - 1] : undefined;
}
export function lastKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(list: T): [TKey, TValue] | undefined {
	// O(n) for iterators, but O(1) by specialization for arrays
	if (Array.isArray(list)) {
		return list.length > 0 ? (list[list.length - 1] as EnumerableValueOfT<T>) : undefined;
	}
	const arr = collectEntriesSync<T, TKey, TValue>(list);
	return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

export async function* firstN<T extends Enumerable<T>>(n: number, en: T) {
	yield* take(n, en);
}
export function* firstNSync<T extends EnumerableSync<T>>(n: number, en: T) {
	yield* takeSync(n, en);
}

export async function* firstNKV<T extends Enumerable<T>>(n: number, en: T) {
	yield* takeKV(n, en);
}
export function* firstNKVSync<T extends EnumerableSync<T>>(n: number, en: T) {
	yield* takeKVSync(n, en);
}

export async function* lastN<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, list: T): AsyncGenerator<TValue, void, unknown> {
	// O(n) for iterators, but O(1) by specialization for arrays
	let arr: TValue[] = [];
	if (Array.isArray(list)) {
		arr = list;
	}
	arr = await collect(list);
	arr = arr.slice(-n);
	for (const e of arr) {
		yield e;
	}
}
export function* lastNSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, list: T): Generator<TValue, void, unknown> {
	// O(n) for iterators, but O(1) by specialization for arrays
	let arr: TValue[] = [];
	if (Array.isArray(list)) {
		arr = list;
	}
	arr = collectSync(list);
	arr = arr.slice(-n);
	for (const e of arr) {
		yield e;
	}
}

export async function* lastNKV<
	T extends Enumerable<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, list: T): AsyncGenerator<[TKey, TValue], void, unknown> {
	// O(n) for iterators, but O(1) by specialization for arrays
	let arr: [TKey, TValue][] = [];
	if (Array.isArray(list)) {
		arr = list;
	}
	arr = await collectEntries(list);
	arr = arr.slice(-n);
	for (const e of arr) {
		yield e;
	}
}
export function* lastNKVSync<
	T extends EnumerableSync<T>,
	TKey = EnumerableKeyOfT<T>,
	TValue = EnumerableValueOfT<T>,
>(n: number, list: T): Generator<[TKey, TValue], void, unknown> {
	// O(n) for iterators, but O(1) by specialization for arrays
	let arr: [TKey, TValue][] = [];
	if (Array.isArray(list)) {
		arr = list;
	}
	arr = collectEntriesSync(list);
	arr = arr.slice(-n);
	for (const e of arr) {
		yield e;
	}
}

// ####

// function curry(func) {
// 	return function curried(...args) {
// 		if (args.length >= func.length) {
// 			return func.apply(this, args);
// 		} else {
// 			return function (...args2) {
// 				return curried.apply(this, args.concat(args2));
// 			};
// 		}
// 	};
// }

// ref: <https://stackoverflow.com/questions/51859461/generic-curry-function-with-typescript-3>

// type CurryFirst<T> = T extends (x: infer U, ...rest: any) => any ? U : never;
// type CurryRest<T> = T extends (x: infer U) => infer V
// 	? U
// 	: T extends (x: infer U, ...rest: infer V) => infer W
// 	? Curried<(...args: V) => W>
// 	: never;

// type Curried<T extends (...args: any) => any> = (x: CurryFirst<T>) => CurryRest<T>;

// export const curry = <T extends (...args: any) => any>(fn: T): Curried<T> => {
// 	if (!fn.length) {
// 		return fn();
// 	}
// 	return (arg: CurryFirst<T>): CurryRest<T> => {
// 		return curry(fn.bind(null, arg) as any) as any;
// 	};
// };

// type TupleSplit<T extends any[], L extends number, F = (...a: T) => void> = [
// 	{ init: []; rest: T },
// 	F extends (a: infer A, ...z: infer Z) => void ? { init: [A]; rest: Z } : never,
// 	F extends (a: infer A, b: infer B, ...z: infer Z) => void ? { init: [A, B]; rest: Z } : never,
// 	F extends (a: infer A, b: infer B, c: infer C, ...z: infer Z) => void
// 		? { init: [A, B, C]; rest: Z }
// 		: never,
// 	// etc etc for tuples of length 4 and greater
// 	...{ init: T; rest: [] }[]
// ][L];

// type Curried<A extends any[], R> = <L extends TupleSplit<A, number>['init']>(
// 	...args: L
// ) => 0 extends L['length']
// 	? never
// 	: 0 extends TupleSplit<A, L['length']>['rest']['length']
// 	? R
// 	: Curried<TupleSplit<A, L['length']>['rest'], R>;

// declare function curry<A extends any[], R>(f: (...args: A) => R): Curried<A, R>;

// function add(x: number, y: number) {
// 	return x + y;
// }
// const curriedAdd = curry(add);

// const addTwo = curriedAdd(2); // Curried<[number], number>
// const three = addTwo(1); // number
// const four = curriedAdd(2, 2); // number
// const willBeAnError = curriedAdd(); // never

// const isPositive = (n: number) => n > 0;
// const curriedFilter = curry(filter);
// const cFilter = curriedFilter(isPositive);
