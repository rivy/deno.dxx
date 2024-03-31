import { IssueData, ZodErrorMap, ZodIssue } from "../ZodError.d.ts";
export declare const ZodParsedType: {
    function: "function";
    number: "number";
    string: "string";
    nan: "nan";
    integer: "integer";
    float: "float";
    boolean: "boolean";
    date: "date";
    bigint: "bigint";
    symbol: "symbol";
    undefined: "undefined";
    null: "null";
    array: "array";
    object: "object";
    unknown: "unknown";
    promise: "promise";
    void: "void";
    never: "never";
    map: "map";
    set: "set";
};
export declare type ZodParsedType = keyof typeof ZodParsedType;
export declare const getParsedType: (data: any) => ZodParsedType;
export declare const makeIssue: (params: {
    data: any;
    path: (string | number)[];
    errorMaps: (ZodErrorMap | undefined)[];
    issueData: IssueData;
}) => ZodIssue;
export declare type ParseParams = {
    path: (string | number)[];
    errorMap: ZodErrorMap;
    async: boolean;
};
export declare type ParseParamsNoData = Omit<ParseParams, "data">;
export declare type ParsePathComponent = string | number;
export declare type ParsePath = null | {
    readonly component: ParsePathComponent;
    readonly parent: ParsePath;
    readonly count: number;
};
export declare const EMPTY_PATH: ParsePath;
export declare const pathToArray: (path: ParsePath) => ParsePathComponent[];
export declare const pathFromArray: (arr: ParsePathComponent[]) => ParsePath;
export declare type ParseContextParameters = {
    errorMap: ZodErrorMap;
    async: boolean;
};
interface ParseContextDef {
    readonly path: ParsePath;
    readonly issues: ZodIssue[];
    readonly errorMap?: ZodErrorMap;
    readonly async: boolean;
}
export declare class ParseContext {
    readonly def: ParseContextDef;
    constructor(def: ParseContextDef);
    get path(): ParsePath;
    get issues(): ZodIssue[];
    get errorMap(): ((issue: import("../ZodError.d.ts").ZodIssueOptionalMessage, _ctx: {
        defaultError: string;
        data: any;
    }) => {
        message: string;
    }) | undefined;
    get async(): boolean;
    stepInto(component: ParsePathComponent): ParseContext;
    _addIssue(data: any, issueData: IssueData, params?: {
        schemaErrorMap?: ZodErrorMap;
    }): void;
}
export declare type INVALID = {
    valid: false;
};
export declare const INVALID: INVALID;
export declare type OK<T> = {
    valid: true;
    value: T;
};
export declare const OK: <T>(value: T) => OK<T>;
export declare type SyncParseReturnType<T> = OK<T> | INVALID;
export declare type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;
export declare type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;
export declare const isInvalid: (x: ParseReturnType<any>) => x is INVALID;
export declare const isOk: <T>(x: ParseReturnType<T>) => x is OK<T>;
export declare const isAsync: <T>(x: ParseReturnType<T>) => x is AsyncParseReturnType<T>;
export {};
//# sourceMappingURL=parseUtil.d.ts.map