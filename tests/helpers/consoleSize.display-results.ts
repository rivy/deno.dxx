import * as M from '../../src/lib/consoleSize.ts';

const results = await Promise.all(
	Object.entries(M).map(async ([fn, v]) => await { fn, v: await v() }),
);

const output = JSON.stringify(results, null, 0).replace(/\[\{/g, '[\n {').replace(/,\{/g, ',\n {')
	.replace(/\}\]/g, '}\n]');
console.log(output);
