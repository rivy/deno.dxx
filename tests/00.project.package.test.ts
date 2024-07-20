// spell-checker:ignore (names) Deno

import { assert } from './$deps.ts';

import { panicIfMissingPermits, projectLocations, test } from './$shared.ts';

//===

await panicIfMissingPermits(['read']);

//===

test('project contains non-empty CHANGELOG', () => {
	const fileSize = Deno.readTextFileSync(projectLocations.changelog).length;
	assert(fileSize > 0);
});

test('project contains non-empty LICENSE', () => {
	projectLocations.licenses.forEach((license) => {
		const fileSize = Deno.readTextFileSync(license).length;
		assert(fileSize > 0);
	});
});

test('project contains non-empty README', () => {
	const fileSize = Deno.readTextFileSync(projectLocations.readme).length;
	assert(fileSize > 0);
});
