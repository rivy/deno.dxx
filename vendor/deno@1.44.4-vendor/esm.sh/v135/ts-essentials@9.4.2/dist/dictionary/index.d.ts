import { KeyofBase } from "../key-of-base/index.d.ts";
export declare type Dictionary<Type, Keys extends KeyofBase = string> = {
    [key in Keys]: Type;
};
