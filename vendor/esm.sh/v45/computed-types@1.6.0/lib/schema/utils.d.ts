import FunctionType from './FunctionType.d.ts';
import { RemoveAsync } from './io.d.ts';
declare type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
declare type EqualReformat<T> = T extends FunctionType ? [
    '$$FunctionType$$',
    EqualReformat<ReturnType<T>>,
    EqualReformat<Parameters<T>>
] : T extends object ? {
    [K in keyof T]: EqualReformat<T[K]>;
} : IfAny<T, never, T>;
declare type IfEqual<T, R, Y, N> = [R] extends [T] ? ([T] extends [R] ? Y : N) : N;
declare type IfDeepEqual<T, R, Y, N> = IfEqual<EqualReformat<T>, EqualReformat<R>, Y, N>;
export declare type ObjectProperty = string | number | symbol;
export declare type Primitive = string | number | symbol | boolean | null | undefined | void | bigint;
export declare type Typeof = {
    string: string;
    number: number;
    object: object;
    boolean: boolean;
    symbol: symbol;
    bigint: bigint;
    undefined: undefined;
};
export declare type Enum<E> = Record<keyof E, string | number> & {
    [k: number]: string;
};
export declare type ResolvedValue<T> = T extends PromiseLike<infer R> ? R : T;
export declare type IsAsync<S> = ResolvedValue<S> extends S ? unknown extends S ? unknown : false : RemoveAsync<S> extends never ? true : unknown;
export declare type MaybeAsync<T, V> = unknown extends IsAsync<T> ? PromiseLike<V> | V : true extends IsAsync<T> ? PromiseLike<V> : V;
export declare type RecursiveMerge<T> = [T] extends [Primitive] ? T : [T] extends [[unknown]] ? [RecursiveMerge<T[0]>] : [T] extends [[unknown?]] ? [RecursiveMerge<T[0]>?] : [T] extends [object] ? {
    [K in keyof T]: RecursiveMerge<T[K]>;
} : T;
export declare function typeCheck<T, R, Y = 'ok' extends T ? never : 'ok'>(ok: IfDeepEqual<T, R, IfAny<T, IfAny<R, Y, T>, IfAny<R, T, Y>>, T>): unknown;
export declare function isPromiseLike(value: unknown): value is PromiseLike<unknown>;
export declare function isPrimitive(value: unknown): value is Primitive;
export declare function deepConcat(): undefined;
export declare function deepConcat<A>(...values: [A]): A;
export declare function deepConcat<A, B>(...values: [A, B]): A & B;
export declare function deepConcat<A, B, C>(...values: [A, B, C]): A & B & C;
export declare function deepConcat<A, B, C, D>(...values: [A, B, C, D]): A & B & C & D;
export declare function deepConcat<A, B, C, D, E>(...values: [A, B, C, D, E]): A & B & C & D & E;
export declare function deepConcat<A, B, C, D, E, F>(...values: [A, B, C, D, E, F]): A & B & C & D & E & F;
export declare function deepConcat<A, B, C, D, E, F, G>(...values: [A, B, C, D, E, F, G]): A & B & C & D & E & F & G;
export declare function deepConcat<A, B, C, D, E, F, G, H>(...values: [A, B, C, D, E, F, G, H]): A & B & C & D & E & F & G & H;
export {};
