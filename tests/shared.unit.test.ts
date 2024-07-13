// spell-checker:ignore (fns) chdir ; (names) Deno ; (options) nullglob ; (people) Roy Ivy III * rivy

import { assert } from './$deps.ts';
import { test } from './$shared.ts';

import { callersFromStackTrace } from '../src/lib/$shared.ts';

// //===
// await panicIfMissingPermits(['env', 'read']);
// //===

// review: [SO ~ (JS) determine current line number](https://stackoverflow.com/questions/2343343/how-can-i-determine-the-current-line-number-in-javascript) @@ <https://archive.is/vw4eN>

test('callersFromStack', () => {
	const [callers, calledFromLine] = [callersFromStackTrace(), 15];
	const calledFromURL = import.meta.url;
	console.log({ calledFromLine, calledFromURL, callers });
	// pop off Deno implementation detail callers
	while (callers.length > 0 && callers[callers.length - 1]?.startsWith('ext:')) {
		const _ = callers.pop();
	}
	console.log("removed 'ext:*'", { callers });
	const _ = callers.pop(); // pop off `Deno.test()` caller
	assert(callers[callers.length - 1]?.startsWith(`${calledFromURL}:${calledFromLine}`));
});
