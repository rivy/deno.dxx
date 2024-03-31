import { IsAny } from "../is-any/index.d.ts";
export declare type IsUnknown<Type> = IsAny<Type> extends true ? false : unknown extends Type ? true : false;
