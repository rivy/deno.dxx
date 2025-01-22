import Validator, { ValidatorProxy } from './Validator.d.ts';
import { StringValidator } from './string.d.ts';
import { ErrorLike } from './schema/errors.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
export declare class NumberValidator<P extends FunctionParameters = [number]> extends Validator<FunctionType<number, P>> {
    float(error?: ErrorLike<[number]>): ValidatorProxy<this>;
    integer(error?: ErrorLike<[number]>): ValidatorProxy<this>;
    toExponential(...args: Parameters<number['toExponential']>): ValidatorProxy<StringValidator<P>>;
    toFixed(...args: Parameters<number['toFixed']>): ValidatorProxy<StringValidator<P>>;
    toLocaleString(...args: Parameters<number['toLocaleString']>): ValidatorProxy<StringValidator<P>>;
    toPrecision(...args: Parameters<number['toPrecision']>): ValidatorProxy<StringValidator<P>>;
    toString(...args: Parameters<number['toString']>): ValidatorProxy<StringValidator<P>>;
    min(min: number, error?: ErrorLike<[number]>): ValidatorProxy<this>;
    max(max: number, error?: ErrorLike<[number]>): ValidatorProxy<this>;
    gte: (min: number, error?: string | Error | ((args_0: number) => string | Error) | undefined) => ValidatorProxy<this>;
    lte: (max: number, error?: string | Error | ((args_0: number) => string | Error) | undefined) => ValidatorProxy<this>;
    gt(boundary: number, error?: ErrorLike<[number]>): ValidatorProxy<this>;
    lt(boundary: number, error?: ErrorLike<[number]>): ValidatorProxy<this>;
    between(min: number, max: number, error?: ErrorLike<[number]>): ValidatorProxy<this>;
}
declare const number: ValidatorProxy<NumberValidator<[number]>, FunctionType<number, [number]>>;
export default number;
