import { OptionalKeys } from "../optional-keys/index.d.ts";
export declare type RequiredKeys<Type> = Type extends unknown ? Exclude<keyof Type, OptionalKeys<Type>> : never;
