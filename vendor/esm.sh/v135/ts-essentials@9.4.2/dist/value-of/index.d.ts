import { AnyArray } from "../any-array/index.d.ts";
import { AnyFunction } from "../any-function/index.d.ts";
import { Primitive } from "../primitive/index.d.ts";
export declare type ValueOf<Type> = Type extends Primitive ? Type : Type extends AnyArray ? Type[number] : Type extends AnyFunction ? ReturnType<Type> : Type[keyof Type];
