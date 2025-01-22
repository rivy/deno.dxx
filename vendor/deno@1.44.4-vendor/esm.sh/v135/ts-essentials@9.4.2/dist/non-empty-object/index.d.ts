import { AnyRecord } from "../any-record.d.ts";
export declare type NonEmptyObject<Object extends AnyRecord> = keyof Object extends never ? never : Object;
