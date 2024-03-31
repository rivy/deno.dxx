import { Exact } from "../../exact/index.d.ts";
export declare const isExact: <Expected>() => <Actual>(actual: Exact<Actual, Expected>) => Expected;
