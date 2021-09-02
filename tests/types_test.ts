// import { assert } from 'https://deno.land/std@0.93.0/testing/asserts.ts';
// import { writeAllSync } from 'https://deno.land/std@0.93.0/io/mod.ts';

// import Schema, { array, number, string, unknown } from 'cdn.esm.sh/v45/computed-types@1.6.0';
import { string, unknown } from 'https://cdn.esm.sh/v45/computed-types@1.6.0';
// import type { SchemaValidatorFunction, SchemaReturnType } from 'cdn.esm.sh/v45/computed-types@1.6.0';
// import type { ValidatorProxy as _ } from 'https://cdn.esm.sh/v45/computed-types@1.6.0/lib/Validator.d.ts';

// import { assertEquals } from './$.deps.ts';
import { testTemplate } from './common.ts';

const test = testTemplate(import.meta.url);

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
