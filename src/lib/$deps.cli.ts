//== * DEPendencies for CLI-type applications

// 'https://cdn.jsdelivr.net/gh/rivy-js/yargs@6d3786caa7' (aka 'v17.5.2-deno-rivy'); yargs-v17.5.2-deno with permission fixes

//==== modules

// DONE: [2023-11-22; rivy] ~ ToDO: [2023-11-19; rivy] fix...
// ```text
// $ deno check --reload "https://cdn.jsdelivr.net/gh/rivy-js/yargs@2607dfd9a47f9402/deno.ts"
// Warning Implicitly using latest version (0.207.0) for https://deno.land/std/testing/asserts.ts
// Warning Implicitly using latest version (0.207.0) for https://deno.land/std/path/mod.ts
// Warning Implicitly using latest version (0.207.0) for https://deno.land/std/fmt/printf.ts
// ```
export { default as $yargs } from 'https://cdn.jsdelivr.net/gh/rivy-js/yargs@6be59a7fda/deno.ts'; // v17.7.2-deno-rivy

//==== types

export type { Arguments as YargsArguments } from 'https://cdn.jsdelivr.net/gh/rivy-js/yargs@6be59a7fda/deno-types.ts'; // v17.7.2-deno-rivy
