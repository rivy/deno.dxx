import { AnyArray } from "../any-array/index.d.ts";
export declare type Tail<Type extends AnyArray> = Type extends [any, ...infer Rest] ? Rest : never;
