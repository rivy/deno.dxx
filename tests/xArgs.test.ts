// spell-checker:ignore (names) Deno

import { assertEquals, Path as $path } from './$deps.ts';
import { createTestFn, projectPath } from './$shared.ts';

const test = createTestFn(import.meta.url);

import * as Parse from '../src/lib/xArgs.ts';

// ToDO: convert to testing fixtures to avoid failures when source example files change
const fixturePath = 'tests/fixtures';

test('`shellExpand()` basics', () => {
	return Promise
		.resolve()
		.then(() => Deno.chdir($path.join(projectPath, fixturePath)))
		.then(async () => {
			const exampleFiles = await Parse.shellExpand('./**/*.ext');
			console.log({ exampleFiles });

			const globPatterns = ['./**/*.ext', '.\\**/*.ext', '.\\**\\*.ext', '**/*.ext', '**\\*.ext'];
			assertEquals((await Parse.shellExpand(globPatterns[0])).length, 4);

			assertEquals(
				await Parse.shellExpand(globPatterns[0].replace($path.SEP_PATTERN, '/')),
				await Parse.shellExpand(globPatterns[0].replace($path.SEP_PATTERN, '\\')),
			);

			assertEquals(
				await Parse.shellExpand(globPatterns[0]),
				await Parse.shellExpand(globPatterns[1]),
			);

			assertEquals(
				await Parse.shellExpand(globPatterns[0]),
				await Parse.shellExpand(globPatterns[2]),
			);
			assertEquals(
				await Parse.shellExpand(globPatterns[0]),
				await Parse.shellExpand(globPatterns[3]),
			);
			assertEquals(
				await Parse.shellExpand(globPatterns[0]),
				await Parse.shellExpand(globPatterns[4]),
			);
		})
		.finally(() => Deno.chdir(projectPath));
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

test("brace expansion (eg, `shellExpand('{a}*')`)", async () => {
	assertEquals(await Parse.shellExpand('{}*'), ['{}*']);
	assertEquals(await Parse.shellExpand('{a}*'), ['{a}*']);
});
