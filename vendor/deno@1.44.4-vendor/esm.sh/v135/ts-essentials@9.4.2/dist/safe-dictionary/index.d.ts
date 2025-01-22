import { KeyofBase } from "../key-of-base/index.d.ts";
export declare type SafeDictionary<Type, Keys extends KeyofBase = string> = {
    [key in Keys]?: Type;
};
