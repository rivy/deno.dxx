// import { assertEquals } from './../src/lib/$deps';
import { assert, assertEquals } from './$deps.ts';
import { test as betterTest } from './$shared.ts';

// const test = Deno.test;

// const t = (() => Deno.test)();

// const t: typeof Deno.test = (() => {
// 	const _x = 10;
// 	return Deno.test;
// })() as typeof Deno.test;

// Deno.test = test;

const _oTest = Deno.test;

// Deno.test = function test(_opts: { name: string; fn: (any) => void | Promise<void> }) {
// 	console.debug(`test precursor for '%s'`, _opts.name);
// 	return oTest.apply(this, arguments);
// };
// for (var prop in oTest) {
// 	if (oTest.hasOwnProperty(prop)) {
// 		Deno.test[prop] = oTest[prop];
// 	}
// }

// Deno['test'] = betterTest as typeof Deno['test'];

Deno.test = function test(_opts: { name: string; fn: () => void | Promise<void> }) {
	// console.debug(`test precursor for '%s'`, _opts.name);
	betterTest(_opts.name, _opts.fn);
	// _oTest({ name: _opts.name, fn: _opts.fn });
} as typeof Deno.test;

Deno.test({
	name: 'always passes',
	fn: () => {
		console.log('debug: test');
		assert(false);
	},
});

Deno.test({
	name: 'adding works',
	fn: () => {
		assertEquals(1 + 1, 2);
	},
});
