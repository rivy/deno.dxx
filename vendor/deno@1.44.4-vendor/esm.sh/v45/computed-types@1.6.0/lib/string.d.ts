import { ErrorLike } from './schema/errors.d.ts';
import Validator, { ValidatorProxy } from './Validator.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
export declare class StringValidator<P extends FunctionParameters = [string]> extends Validator<FunctionType<string, P>> {
    toLowerCase(): ValidatorProxy<this>;
    toUpperCase(): ValidatorProxy<this>;
    toLocaleLowerCase(...input: Parameters<string['toLocaleLowerCase']>): ValidatorProxy<this>;
    toLocaleUpperCase(...input: Parameters<string['toLocaleUpperCase']>): ValidatorProxy<this>;
    normalize(...input: Parameters<string['normalize']>): ValidatorProxy<this>;
    trim(): ValidatorProxy<this>;
    min(length: number, error?: ErrorLike<[string]>): ValidatorProxy<this>;
    max(length: number, error?: ErrorLike<[string]>): ValidatorProxy<this>;
    between(minLength: number, maxLength: number, error?: ErrorLike<[string]>): ValidatorProxy<this>;
    regexp(exp: RegExp | string, error?: ErrorLike<[string]>): ValidatorProxy<this>;
}
declare const string: ValidatorProxy<StringValidator<[string]>, FunctionType<string, [string]>>;
export default string;
