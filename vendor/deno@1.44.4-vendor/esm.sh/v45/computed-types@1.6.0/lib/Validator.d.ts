import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
import { ErrorLike, ValidationError } from './schema/errors.d.ts';
import { MaybeAsync, ResolvedValue } from './schema/utils.d.ts';
import { MergeSchemaParameters } from './schema/io.d.ts';
export declare type ValidatorProxy<V extends {
    validator: FunctionType;
}, F extends FunctionType = V['validator']> = Omit<V, 'validator' | 'proxy'> & {
    validator: F;
} & F;
export interface ValidatorConstructor<V extends Validator<F>, F extends FunctionType = V['validator']> {
    new (validator: F): V;
}
export default class Validator<F extends FunctionType> {
    readonly validator: F;
    constructor(validator: F);
    proxy(): ValidatorProxy<this>;
    equals<T extends ResolvedValue<ReturnType<F>>>(value: T, error?: ErrorLike<[ResolvedValue<ReturnType<F>>]>): ValidatorProxy<this, FunctionType<T, Parameters<F>>>;
    test(tester: FunctionType<unknown, [ResolvedValue<ReturnType<F>>]>, error?: ErrorLike<[ResolvedValue<ReturnType<F>>]>): ValidatorProxy<this>;
    transform<T, V extends Validator<FunctionType<MaybeAsync<ReturnType<F>, T>, Parameters<F>>>>(fn: FunctionType<T, [ResolvedValue<ReturnType<F>>]>, constructor?: ValidatorConstructor<V>): ValidatorProxy<V>;
    construct<P0 extends FunctionParameters>(fn: FunctionType<Parameters<F>, P0>): ValidatorProxy<this, FunctionType<ReturnType<F>, P0>>;
    optional<R extends ResolvedValue<ReturnType<F>> | undefined = undefined>(defaultValue?: R): ValidatorProxy<this, FunctionType<ReturnType<F> | R, MergeSchemaParameters<Parameters<F> | [(undefined | null)?]>>>;
    strictOptional<R extends ResolvedValue<ReturnType<F>> | undefined = undefined>(defaultValue?: R): ValidatorProxy<this, FunctionType<ReturnType<F> | R, MergeSchemaParameters<Parameters<F> | [undefined?]>>>;
    destruct(error?: ErrorLike<Parameters<F>>): ValidatorProxy<this, FunctionType<MaybeAsync<ReturnType<F>, [
        ValidationError | null,
        ResolvedValue<ReturnType<F>>?
    ]>, Parameters<F>>>;
    error(err: ErrorLike<Parameters<F>>): ValidatorProxy<this>;
}
