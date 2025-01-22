import Validator, { ValidatorProxy } from './Validator.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
import { ErrorLike } from './schema/errors.d.ts';
import { SchemaParameters, SchemaResolveType, SchemaReturnType } from './schema/io.d.ts';
import { ResolvedValue } from './schema/utils.d.ts';
export declare class ArrayValidator<R extends unknown[] | PromiseLike<unknown[]> = unknown[], P extends FunctionParameters = [R]> extends Validator<FunctionType<R, P>> {
    of<S>(schema: S, error?: ErrorLike<SchemaParameters<S>>): ValidatorProxy<ArrayValidator<SchemaReturnType<S, SchemaResolveType<S>[]>, P>>;
    min(length: number, error?: ErrorLike<[ResolvedValue<R>]>): ValidatorProxy<this>;
    max(length: number, error?: ErrorLike<[ResolvedValue<R>]>): ValidatorProxy<this>;
    between(minLength: number, maxLength: number, error?: ErrorLike<[ResolvedValue<R>]>): ValidatorProxy<this>;
}
declare const array: {
    of<S>(schema: S, error?: string | Error | ((...args: SchemaParameters<S>) => string | Error) | undefined): ValidatorProxy<ArrayValidator<SchemaReturnType<S, SchemaResolveType<S>[]>, [SchemaParameters<S>[0][]]>, FunctionType<SchemaReturnType<S, SchemaResolveType<S>[]>, [SchemaParameters<S>[0][]]>>;
} & Pick<ArrayValidator<unknown[], [unknown[]]>, "max" | "optional" | "error" | "min" | "test" | "equals" | "transform" | "construct" | "strictOptional" | "destruct" | "between" | "of"> & {
    validator: FunctionType<unknown[], [unknown[]]>;
} & FunctionType<unknown[], [unknown[]]>;
export default array;
