import FunctionType, { FunctionParameters } from './FunctionType.d.ts';
import { IsAsync, Primitive, ResolvedValue } from './utils.d.ts';
declare type SchemaOptionalKeys<S> = Exclude<{
    [K in keyof S]: [S[K]] extends [FunctionType] ? [] extends Parameters<S[K]> ? K : never : [undefined] extends [S[K]] ? K : never;
}[keyof S], undefined>;
declare type SchemaRequiredKeys<S> = Exclude<keyof S, SchemaOptionalKeys<S>>;
declare type SchemaKeysObject<S> = {
    [K in keyof S & SchemaRequiredKeys<S>]: K;
} & {
    [K in keyof S & SchemaOptionalKeys<S>]?: K;
};
export declare type SchemaParameters<S> = [S] extends [FunctionType] ? Parameters<S> : [S] extends [Primitive] ? [S] : [S] extends [RegExp] ? [string] : [S] extends [Array<any>] ? [
    {
        [K in keyof S]: SchemaParameters<S[K]>[0];
    }
] : [S] extends [object] ? [{
    [K in keyof SchemaKeysObject<S>]: SchemaParameters<S[K]>[0];
}] : [unknown] extends [S] ? [unknown] : never;
export declare type SchemaInput<S> = SchemaParameters<S>[0];
export declare type SchemaResolveType<S> = S extends FunctionType ? ResolvedValue<ReturnType<S>> : S extends Primitive ? S : S extends RegExp ? string : S extends object ? {
    [K in keyof S]: SchemaResolveType<S[K]>;
} : unknown extends S ? unknown : never;
export declare type RemoveAsync<T> = T extends PromiseLike<any> ? never : T;
declare type IsSchemaAsync<S> = S extends FunctionType ? IsAsync<ReturnType<S>> : S extends object ? S extends RegExp ? false : {
    [K in keyof S]: IsSchemaAsync<S[K]>;
}[keyof S] : IsAsync<S>;
export declare type SchemaReturnType<S, R = SchemaResolveType<S>> = unknown extends IsSchemaAsync<S> ? PromiseLike<R> | R : true extends IsSchemaAsync<S> ? PromiseLike<R> : R;
export declare type SchemaValidatorFunction<S> = FunctionType<SchemaReturnType<S>, SchemaParameters<S>>;
export declare type MergeSchemaParameters<P extends FunctionParameters> = [P] extends [
    never
] ? [never] : [P] extends [[]] ? [] : [P] extends [[unknown]] ? [P[0]] : [P] extends [[unknown?]] ? [P[0]?] : P;
export {};
