import { PickKeysByValue } from "../pick-keys-by-value.d.ts";
export declare type PickProperties<Type, Value> = Pick<Type, PickKeysByValue<Type, Value>>;
