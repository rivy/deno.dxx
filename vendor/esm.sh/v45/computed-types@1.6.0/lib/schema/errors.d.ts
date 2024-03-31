import { FunctionParameters } from './FunctionType.d.ts';
import { ObjectProperty } from './utils.d.ts';
export declare type ErrorLike<P extends FunctionParameters = never> = string | Error | ((...args: P) => string | Error);
export declare type ObjectPath = ObjectProperty[];
export interface PathError {
    path: ObjectPath;
    error: Error;
}
export declare class ValidationError extends TypeError {
    errors?: PathError[];
    constructor(message: string, errors?: PathError[]);
    toJSON?(): Record<string, unknown>;
}
export declare function toError<P extends FunctionParameters>(error: ErrorLike<P>, ...args: P): ValidationError;
export declare function createValidationError<P extends FunctionParameters>(errors: PathError[], error: ErrorLike<P> | null | undefined, ...args: P): ValidationError;
