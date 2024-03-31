import Validator, { ValidatorProxy } from './Validator.d.ts';
import { StringValidator } from './string.d.ts';
import { ErrorLike } from './schema/errors.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
import { NumberValidator } from './number.d.ts';
export declare class DateValidator<P extends FunctionParameters = [Date]> extends Validator<FunctionType<Date, P>> {
    toISOString(...args: Parameters<Date['toISOString']>): ValidatorProxy<StringValidator<P>>;
    getTime(...args: Parameters<Date['getTime']>): ValidatorProxy<NumberValidator<P>>;
    min(min: Date, error?: ErrorLike<[Date]>): ValidatorProxy<this>;
    max(max: Date, error?: ErrorLike<[Date]>): ValidatorProxy<this>;
    gte: (min: Date, error?: string | Error | ((args_0: Date) => string | Error) | undefined) => ValidatorProxy<this>;
    lte: (max: Date, error?: string | Error | ((args_0: Date) => string | Error) | undefined) => ValidatorProxy<this>;
    gt(boundary: Date, error?: ErrorLike<[Date]>): ValidatorProxy<this>;
    lt(boundary: Date, error?: ErrorLike<[Date]>): ValidatorProxy<this>;
    between(min: Date, max: Date, error?: ErrorLike<[Date]>): ValidatorProxy<this>;
}
declare const DateType: ValidatorProxy<DateValidator<[input: Date]>, FunctionType<Date, [input: Date]>>;
export default DateType;
