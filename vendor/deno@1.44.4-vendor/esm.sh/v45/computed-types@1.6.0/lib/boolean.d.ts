import Validator from './Validator.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
export declare class BooleanValidator<P extends FunctionParameters = [boolean]> extends Validator<FunctionType<boolean, P>> {
}
declare const boolean: import("./Validator.d.ts").ValidatorProxy<BooleanValidator<[boolean]>, FunctionType<boolean, [boolean]>>;
export default boolean;
