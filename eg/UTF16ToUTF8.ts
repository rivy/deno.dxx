const decoder = new TextDecoder('utf-16');
const encoder = new TextEncoder();
for await (const chunk of Deno.stdin.readable) {
	const text = decoder.decode(chunk);
	Deno.stdout.writeSync(encoder.encode(text));
}
