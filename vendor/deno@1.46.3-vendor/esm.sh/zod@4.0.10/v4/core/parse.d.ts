import * as core from "./core.d.ts";
import * as errors from "./errors.d.ts";
import type * as schemas from "./schemas.d.ts";
import * as util from "./util.d.ts";
export type $ZodErrorClass = {
  new (issues: errors.$ZodIssue[]): errors.$ZodError;
};
export type $Parse = <T extends schemas.$ZodType>(
  schema: T,
  value: unknown,
  _ctx?: schemas.ParseContext<errors.$ZodIssue>,
  _params?: {
    callee?: util.AnyFunc;
    Err?: $ZodErrorClass;
  },
) => core.output<T>;
export declare const _parse: (_Err: $ZodErrorClass) => $Parse;
export declare const parse: $Parse;
export type $ParseAsync = <T extends schemas.$ZodType>(
  schema: T,
  value: unknown,
  _ctx?: schemas.ParseContext<errors.$ZodIssue>,
  _params?: {
    callee?: util.AnyFunc;
    Err?: $ZodErrorClass;
  },
) => Promise<core.output<T>>;
export declare const _parseAsync: (_Err: $ZodErrorClass) => $ParseAsync;
export declare const parseAsync: $ParseAsync;
export type $SafeParse = <T extends schemas.$ZodType>(
  schema: T,
  value: unknown,
  _ctx?: schemas.ParseContext<errors.$ZodIssue>,
) => util.SafeParseResult<core.output<T>>;
export declare const _safeParse: (_Err: $ZodErrorClass) => $SafeParse;
export declare const safeParse: $SafeParse;
export type $SafeParseAsync = <T extends schemas.$ZodType>(
  schema: T,
  value: unknown,
  _ctx?: schemas.ParseContext<errors.$ZodIssue>,
) => Promise<util.SafeParseResult<core.output<T>>>;
export declare const _safeParseAsync: (_Err: $ZodErrorClass) => $SafeParseAsync;
export declare const safeParseAsync: $SafeParseAsync;
