// import { assert } from 'https://deno.land/std@0.93.0/testing/asserts.ts';
import { writeAllSync } from 'https://deno.land/std@0.93.0/io/mod.ts';

// import Schema, { array, number, string, unknown } from 'http://esm.sh/computed-types@1.6.0';
import { string, unknown } from 'http://esm.sh/computed-types@1.6.0';
// import type { SchemaValidatorFunction, SchemaReturnType } from 'http://esm.sh/computed-types@1.6.0';

import { testTemplate } from './common.ts';

const test = testTemplate(import.meta.url);

type ValidatorType = unknown;
const isOfType = (s: ValidatorType, value: unknown) => {
	// deno-lint-ignore no-explicit-any
	return ((s as unknown) as any).destruct()(value);
};
const assertType = (s: ValidatorType, value: unknown) => {
	const result = isOfType(s, value) as [Error, unknown];
	if (result[0]) {
		throw result[0];
	}
};

import * as Parse from '../src/lib/xArgs.ts';

const e = new TextEncoder();

test('parse', () => {
	writeAllSync(Deno.stdout, e.encode('['));

	// let result;

	writeAllSync(Deno.stdout, e.encode('.'));
	// result = isOfType(unknown.array().of(string).max(0), Parse.splitByBareWS(''));
	// console.warn({ result });
	assertType(unknown.array().of(string).max(0), Parse.wordSplitCLText(''));

	writeAllSync(Deno.stdout, e.encode('.'));
	// result = isOfType(unknown.array().of(string), Parse.splitByBareWS('test this'));
	// console.warn({ result });
	assertType(unknown.array().of(string), Parse.wordSplitCLText('test this'));

	writeAllSync(Deno.stdout, e.encode('] '));
});
