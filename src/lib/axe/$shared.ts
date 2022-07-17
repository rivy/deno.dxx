export const DEFAULT_INSPECT_OPTIONS: Deno.InspectOptions = {
	colors: true,
	compact: true,
	depth: Infinity,
	iterableLimit: Infinity,
};

// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder();
export const decode = (input?: Uint8Array,): string => decoder.decode(input,);
export const encoder = new TextEncoder();
export const encode = (input?: string,): Uint8Array => encoder.encode(input,);

export const inspect = Deno.inspect;
