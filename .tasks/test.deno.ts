// import * as $colors from 'https://deno.land/std@0.134.0/fmt/colors.ts';

const child = new Deno.Command(Deno.execPath(), {
	args: ['test', '-A', ...Deno.args],
	cwd: new URL('..', import.meta.url),
	stdout: 'piped',
	stderr: 'inherit',
}).spawn();

await child.stdout
	.pipeThrough(new TextDecoderStream())
	.pipeThrough(
		// reverse any ANSI color escapes (from Deno-v2.9.4+)
		// ## why: Deno-v2.9.4 sanitizes test names, replacing all control characters (and ANSI escapes) with escaped versions
		// * additionally TAP output has escaped ANSI sequences starting with `\\x1b` instead of just `\x1b`
		new TransformStream<string, string>({
			transform(s, controller) {
				controller.enqueue(s.replace(/\\?\\x1b(\[[0-9;]*m)/g, '\x1b$1'));
			},
		}),
	)
	// .pipeThrough(
	// 	// add ANSI color to descriptions (for pure ASCII test descriptions/names)
	// 	new TransformStream<string, string>({
	// 		transform(s, controller) {
	// 			controller.enqueue(
	// 				s.replace(
	// 					/^(\S+?:\d+)\s(::)\s(.*)$/g,
	// 					(_match, location, _separator, /* description, */ result) =>
	// 						`${$colors.dim(location)} ${result}`,
	// 				),
	// 			);
	// 		},
	// 	}),
	// )
	.pipeThrough(new TextEncoderStream())
	.pipeTo(Deno.stdout.writable, { preventClose: true });

Deno.exit((await child.status).code);
