import { AsyncOrSync } from "../async-or-sync/index.d.ts";
export declare type AsyncOrSyncType<AsyncOrSyncType> = AsyncOrSyncType extends AsyncOrSync<infer Type> ? Type : never;
