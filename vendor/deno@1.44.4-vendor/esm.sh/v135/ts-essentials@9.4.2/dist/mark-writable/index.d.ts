import { Writable } from "../writable/index.d.ts";
export declare type MarkWritable<Type, Keys extends keyof Type> = Type extends Type ? Omit<Type, Keys> & Writable<Pick<Type, Keys>> : never;
