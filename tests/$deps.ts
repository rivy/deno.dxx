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
	equal,
} from 'https://deno.land/std@0.106.0/testing/asserts.ts';

// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder();
export const encoder = new TextEncoder();
export const decode = (input?: Uint8Array): string => decoder.decode(input);
export const encode = (input?: string): Uint8Array => encoder.encode(input);
