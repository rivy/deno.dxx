import { ErrorLike } from './schema/errors.d.ts';
import { MergeSchemaParameters, SchemaParameters, SchemaResolveType, SchemaReturnType, SchemaValidatorFunction } from './schema/io.d.ts';
import Validator, { ValidatorProxy } from './Validator.d.ts';
import FunctionType, { FunctionParameters } from './schema/FunctionType.d.ts';
import { Enum } from './schema/utils.d.ts';
interface SchemaType {
    <S>(schema: S, opts?: ErrorLike<SchemaParameters<S>> | {
        error?: ErrorLike<SchemaParameters<S>>;
        strict?: boolean;
    }): ValidatorProxy<Validator<SchemaValidatorFunction<S>>>;
    either<A>(...candidates: [A]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A>, SchemaParameters<A>>>>;
    either<A, B>(...candidates: [A, B]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B>>>>>;
    either<A, B, C>(...candidates: [A, B, C]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B> | SchemaReturnType<C>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B> | SchemaParameters<C>>>>>;
    either<A, B, C, D>(...candidates: [A, B, C, D]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B> | SchemaReturnType<C> | SchemaReturnType<D>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B> | SchemaParameters<C> | SchemaParameters<D>>>>>;
    either<A, B, C, D, E>(...candidates: [A, B, C, D, E]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B> | SchemaReturnType<C> | SchemaReturnType<D> | SchemaReturnType<E>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B> | SchemaParameters<C> | SchemaParameters<D> | SchemaParameters<E>>>>>;
    either<A, B, C, D, E, F>(...candidates: [A, B, C, D, E, F]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B> | SchemaReturnType<C> | SchemaReturnType<D> | SchemaReturnType<E> | SchemaReturnType<F>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B> | SchemaParameters<C> | SchemaParameters<D> | SchemaParameters<E> | SchemaParameters<F>>>>>;
    either<A, B, C, D, E, F, G>(...candidates: [A, B, C, D, E, F, G]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B> | SchemaReturnType<C> | SchemaReturnType<D> | SchemaReturnType<E> | SchemaReturnType<F> | SchemaReturnType<G>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B> | SchemaParameters<C> | SchemaParameters<D> | SchemaParameters<E> | SchemaParameters<F> | SchemaParameters<G>>>>>;
    either<A, B, C, D, E, F, G, H>(...candidates: [A, B, C, D, E, F, G, H]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<B> | SchemaReturnType<C> | SchemaReturnType<D> | SchemaReturnType<E> | SchemaReturnType<F> | SchemaReturnType<G> | SchemaReturnType<H>, MergeSchemaParameters<SchemaParameters<A> | SchemaParameters<B> | SchemaParameters<C> | SchemaParameters<D> | SchemaParameters<E> | SchemaParameters<F> | SchemaParameters<G> | SchemaParameters<H>>>>>;
    either<A, S>(...candidates: [A, ...S[]]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A> | SchemaReturnType<S>, MergeSchemaParameters<SchemaParameters<A | S>>>>>;
    merge<A>(...args: [A]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A>, SchemaParameters<A>>>>;
    merge<A, B>(...args: [A, B]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A & B, SchemaResolveType<A> & SchemaResolveType<B>>, MergeSchemaParameters<SchemaParameters<A> & SchemaParameters<B>>>>>;
    merge<A, B, C>(...args: [A, B, C]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A & B & C, SchemaResolveType<A> & SchemaResolveType<B> & SchemaResolveType<C>>, MergeSchemaParameters<SchemaParameters<A> & SchemaParameters<B> & SchemaParameters<C>>>>>;
    merge<A, B, C, D>(...args: [A, B, C, D]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A & B & C & D, SchemaResolveType<A> & SchemaResolveType<B> & SchemaResolveType<C> & SchemaResolveType<D>>, MergeSchemaParameters<SchemaParameters<A> & SchemaParameters<B> & SchemaParameters<C> & SchemaParameters<D>>>>>;
    merge<A, B, C, D, E>(...args: [A, B, C, D, E]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A & B & C & D & E, SchemaResolveType<A> & SchemaResolveType<B> & SchemaResolveType<C> & SchemaResolveType<D> & SchemaResolveType<E>>, MergeSchemaParameters<SchemaParameters<A> & SchemaParameters<B> & SchemaParameters<C> & SchemaParameters<D> & SchemaParameters<E>>>>>;
    merge<A, B, C, D, E, F>(...args: [A, B, C, D, E, F]): ValidatorProxy<Validator<FunctionType<SchemaReturnType<A & B & C & D & E & F, SchemaResolveType<A> & SchemaResolveType<B> & SchemaResolveType<C> & SchemaResolveType<D> & SchemaResolveType<E> & SchemaResolveType<F>>, MergeSchemaParameters<SchemaParameters<A> & SchemaParameters<B> & SchemaParameters<C> & SchemaParameters<D> & SchemaParameters<E> & SchemaParameters<F>>>>>;
    merge(...args: [unknown, ...unknown[]]): ValidatorProxy<Validator<FunctionType>>;
    enum<E extends Enum<E>, P extends FunctionParameters = [E[keyof E]]>(value: E, error?: ErrorLike<P>): ValidatorProxy<Validator<FunctionType<E[keyof E], P>>>;
}
declare const Schema: SchemaType;
export default Schema;
