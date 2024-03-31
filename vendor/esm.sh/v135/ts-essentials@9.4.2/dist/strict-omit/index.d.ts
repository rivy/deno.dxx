import { AnyArray } from "../any-array/index.d.ts";
import { AnyRecord } from "../any-record.d.ts";
export declare type StrictOmit<Type extends AnyRecord, Keys extends keyof Type> = Type extends AnyArray ? never : Omit<Type, Keys>;
