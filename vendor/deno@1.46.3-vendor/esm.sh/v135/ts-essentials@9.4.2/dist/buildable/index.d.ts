import { DeepPartial } from "../deep-partial/index.d.ts";
import { DeepWritable } from "../deep-writable/index.d.ts";
export declare type Buildable<Type> = DeepPartial<DeepWritable<Type>>;
