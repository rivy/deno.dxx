// deno-lint-ignore-file ban-unused-ignore no-deprecated-deno-api

import * as M from '../../src/lib/shim.windows.ts';

const args = Deno.args;

if (args.length === 0) {
	if (Deno.isatty(Deno.stdin.rid)) {
		console.error('Usage: deno run -A tests/helpers/shim.display-results.ts [<filename>..]');
		Deno.exit(1);
	}
	args.push('-');
}

const decoder = new TextDecoder('utf-8');

for (let i = 0; i < Deno.args.length; i++) {
	const filename = Deno.args[i];
	const file = await (async () => {
		if (filename === '-') {
			return Deno.stdin;
		} else return await Deno.open(filename);
	})();
	const data = decoder.decode(await Deno.readAll(file));
	Deno.close(file.rid);

	const result = M.shimInfo(data);

	console.log({ filename, result });
}
