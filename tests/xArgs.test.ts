// spell-checker:ignore (names) Deno

import { assertEquals } from './$deps.ts';
import { createTestFn } from './$shared.ts';

const test = createTestFn(import.meta.url);

import * as Parse from '../src/lib/xArgs.ts';

// ToDO: convert to testing fixtures to avoid failures when source example files change

test('`shellExpand()` basics', async () => {
	const exampleFiles = await Parse.shellExpand('eg/**/*.ts');
	console.log({ exampleFiles });

	assertEquals((await Parse.shellExpand('eg/*.ts')).length, 4);
	assertEquals((await Parse.shellExpand('eg/**/*.ts')).length, 4);

	assertEquals(await Parse.shellExpand('eg/*.ts'), await Parse.shellExpand('eg\\*.ts'));

	assertEquals(await Parse.shellExpand('eg/**/*.ts'), await Parse.shellExpand('eg\\**\\*.ts'));
	assertEquals(await Parse.shellExpand('eg/**/*.ts'), await Parse.shellExpand('eg\\**/*.ts'));
	assertEquals(await Parse.shellExpand('eg/**/*.ts'), await Parse.shellExpand('eg/**\\*.ts'));
});

test('compare `shellExpand()` to `shellExpandSync()`', async () => {
	assertEquals(await Parse.shellExpand('eg/*'), Parse.shellExpandSync('eg/*'));
	assertEquals(await Parse.shellExpand('eg/*.ts'), Parse.shellExpandSync('eg/*.ts'));
	assertEquals(await Parse.shellExpand('eg/*/*.ts'), Parse.shellExpandSync('eg/*/*.ts'));
	assertEquals(await Parse.shellExpand('eg/**/*.ts'), Parse.shellExpandSync('eg/**/*.ts'));

	assertEquals(await Parse.shellExpand('eg\\*'), Parse.shellExpandSync('eg\\*'));
	assertEquals(await Parse.shellExpand('eg\\*.ts'), Parse.shellExpandSync('eg\\*.ts'));
	assertEquals(await Parse.shellExpand('eg\\*\\*.ts'), Parse.shellExpandSync('eg\\*\\*.ts'));
	assertEquals(await Parse.shellExpand('eg\\**\\*.ts'), Parse.shellExpandSync('eg\\**\\*.ts'));
});
