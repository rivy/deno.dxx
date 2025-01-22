import { Merge } from "../merge/index.d.ts";
declare type _MergeN<Tuple extends readonly any[], Result> = Tuple extends readonly [infer Head, ...infer Tail] ? _MergeN<Tail, Merge<Result, Head>> : Result;
export declare type MergeN<Tuple extends readonly any[]> = _MergeN<Tuple, {}>;
export {};
