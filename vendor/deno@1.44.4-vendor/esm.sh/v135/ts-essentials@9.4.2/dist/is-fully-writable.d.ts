import { IsEqualConsideringWritability } from "./is-equal-considering-writability.d.ts";
import { Writable } from "./writable/index.d.ts";
export declare type IsFullyWritable<Type extends object> = IsEqualConsideringWritability<
  {
    [Key in keyof Type]: Type[Key];
  },
  Writable<{
    [Key in keyof Type]: Type[Key];
  }>
>;
