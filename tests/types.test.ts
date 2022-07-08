// spell-checker:ignore (names) Deno

// !note: deno v1.23.0 has a regression which causes TS2306 errors for chai/sinon imports
//    ... ref: [🐛TS2306 "not a module" errors](https://github.com/denoland/deno/issues/14937)
//    ... fixed in v1.23.1+

// import { assert } from 'https://deno.land/std@0.93.0/testing/asserts.ts';
// import { writeAllSync } from 'https://deno.land/std@0.93.0/io/mod.ts';

// import Schema, { array, number, string, unknown } from 'cdn.esm.sh/v45/computed-types@1.6.0';
import { string, unknown } from 'https://cdn.esm.sh/v45/computed-types@1.6.0';
// import type { SchemaValidatorFunction, SchemaReturnType } from 'cdn.esm.sh/v45/computed-types@1.6.0';
// import type { ValidatorProxy as _ } from 'https://cdn.esm.sh/v45/computed-types@1.6.0/lib/Validator.d.ts';

// ToDO: evaluate [`zod`](https://github.com/colinhacks/zod) as a possible replacement for `computed-types`
// ToDO: evaluate `chai` and `sinon`; egs, <https://deno.land/std@0.111.0/testing/chai_example.ts> and <https://deno.land/std@0.111.0/testing/sinon_example.ts>

import chai from 'https://cdn.skypack.dev/chai@4.3.4?dts';
// import sinon from 'https://cdn.skypack.dev/sinon@11.1.2?dts';
// import mocha from 'https://unpkg.com/mocha@7.2.0/mocha.js';
import { z } from 'https://cdn.skypack.dev/zod@3.9.8?dts';

import { test } from './$shared.ts';

type ValidatorType = {
	validator: (_: unknown) => unknown[];
	destruct: () => (_: unknown) => unknown;
}; // ref: https://github.com/neuledge/computed-types/issues/106
const isOfType = (v: ValidatorType, value: unknown) => {
	// deno-lint-ignore no-explicit-any
	return ((v as unknown) as any).destruct()(value);
};
const assertType = (v: ValidatorType, value: unknown) => {
	const result = isOfType(v, value) as [Error, unknown];
	if (result[0]) {
		throw result[0];
	}
};

import * as Parse from '../src/lib/xArgs.ts';

// const e = new TextEncoder();

test('parse', () => {
	// writeAllSync(Deno.stdout, e.encode('['));

	// let actual;

	// writeAllSync(Deno.stdout, e.encode('.'));
	// actual = Parse.wordSplitCLText('');
	// assertType(unknown.array().of(string).max(0), actual);
	// assertEquals([], actual);
	assertType(unknown.array().of(string).max(0), Parse.wordSplitCLText(''));

	// writeAllSync(Deno.stdout, e.encode('.'));
	// actual = Parse.wordSplitCLText('test this');
	// assertType(unknown.array().of(string), Parse.wordSplitCLText('test this'));
	// assertEquals(['test', 'this'], actual);
	assertType(unknown.array().of(string), Parse.wordSplitCLText('test this'));

	// writeAllSync(Deno.stdout, e.encode('] '));
});

// ref: <https://stackoverflow.com/questions/44595658/chai-test-array-of-objects-to-contain-something-like-an-object-submatch>
// ref: <https://stackoverflow.com/questions/42113776/chai-check-if-array-of-strings-has-one-with-a-subset-string>

test('parse (using chai)', () => {
	chai.expect(Parse.wordSplitCLText('')).to.be.an('array').lengthOf(0);
	// assertType(chai.assert. ... unknown.array().of(string).max(0), Parse.wordSplitCLText(''));
	// assertType(chai.assert. ... unknown.array().of(string), Parse.wordSplitCLText('test this'));
});

test('parse (using zod)', () => {
	z.array(z.string()).length(0).parse(Parse.wordSplitCLText(''));
	z.array(z.string()).parse(Parse.wordSplitCLText('test this'));
});
