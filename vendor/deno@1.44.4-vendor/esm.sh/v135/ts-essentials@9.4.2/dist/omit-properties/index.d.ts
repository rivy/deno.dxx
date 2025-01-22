import { PickKeysByValue } from "../pick-keys-by-value.d.ts";
export declare type OmitProperties<Type, Value> = Omit<Type, PickKeysByValue<Type, Value>>;
