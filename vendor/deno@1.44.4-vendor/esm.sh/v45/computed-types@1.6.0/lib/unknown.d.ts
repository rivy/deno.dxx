import Validator, { ValidatorProxy } from './Validator.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
import { ErrorLike } from './schema/errors.d.ts';
import { ObjectValidator } from './object.d.ts';
import { StringValidator } from './string.d.ts';
import { NumberValidator } from './number.d.ts';
import { BooleanValidator } from './boolean.d.ts';
import { SchemaResolveType } from './schema/io.d.ts';
import { ArrayValidator } from './array.d.ts';
import { Enum } from './schema/utils.d.ts';
import { DateValidator } from './DateType.d.ts';
export declare class UnknownValidator<P extends FunctionParameters = [unknown]> extends Validator<FunctionType<unknown, P>> {
    schema<S>(schema: S, error?: ErrorLike<[unknown]>): ValidatorProxy<Validator<FunctionType<SchemaResolveType<S>, P>>>;
    object(error?: ErrorLike<[unknown]>): ValidatorProxy<ObjectValidator<P>>;
    array(error?: ErrorLike<[unknown]>): ValidatorProxy<ArrayValidator<unknown[], P>>;
    string(error?: ErrorLike<[unknown]>): ValidatorProxy<StringValidator<P>>;
    number(error?: ErrorLike<[unknown]>): ValidatorProxy<NumberValidator<P>>;
    boolean(error?: ErrorLike<[unknown]>): ValidatorProxy<BooleanValidator<P>>;
    date(error?: ErrorLike<[unknown]>): ValidatorProxy<DateValidator<P>>;
    enum<E extends Enum<E>>(value: E, error?: ErrorLike<[unknown]>): ValidatorProxy<Validator<FunctionType<E[keyof E], P>>>;
}
declare const unknown: ValidatorProxy<UnknownValidator<[input: unknown]>, FunctionType<unknown, [input: unknown]>>;
export default unknown;
