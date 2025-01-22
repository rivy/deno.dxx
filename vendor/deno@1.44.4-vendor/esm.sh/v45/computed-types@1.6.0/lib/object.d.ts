import Validator from './Validator.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
export declare class ObjectValidator<P extends FunctionParameters = [object]> extends Validator<FunctionType<object, P>> {
}
declare const object: import("./Validator.d.ts").ValidatorProxy<ObjectValidator<[object]>, FunctionType<object, [object]>>;
export default object;
