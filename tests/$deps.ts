// tests ~ dependencies

export * as Colors from 'https://deno.land/std@0.106.0/fmt/colors.ts';
export { existsSync } from 'https://deno.land/std@0.106.0/fs/exists.ts';
export * as Path from 'https://deno.land/std@0.106.0/path/mod.ts';
export {
	assert,
	assertEquals,
	assertNotEquals,
	assertStringIncludes,
	assertThrows,
	assertThrowsAsync,
} from 'https://deno.land/std@0.106.0/testing/asserts.ts';
