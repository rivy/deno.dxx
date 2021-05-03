// tests ~ dependencies

export { existsSync } from 'https://deno.land/std@0.92.0/fs/exists.ts';
export * as Path from 'https://deno.land/std@0.92.0/path/mod.ts';
export {
	assert,
	assertEquals,
	assertNotEquals,
	assertStringIncludes,
	assertThrows,
	assertThrowsAsync,
} from 'https://deno.land/std@0.92.0/testing/asserts.ts';
