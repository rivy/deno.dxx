import { PickProperties } from "../pick-properties/index.d.ts";
export declare type PickKeys<Type, Value> = Exclude<keyof PickProperties<Type, Value>, undefined>;
