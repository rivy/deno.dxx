export declare type FunctionParameters = unknown[];
declare type FunctionType<R = any, P extends FunctionParameters = any[]> = (...args: P) => R;
export default FunctionType;
