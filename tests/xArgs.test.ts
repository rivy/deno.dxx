// spell-checker:ignore (names) Deno

import { assert, assertEquals, FS as $fs, Path as $path } from './$deps.ts';
import { deepEqual, pathToOsStyle, projectPath, test } from './$shared.ts';

import * as Parse from '../src/lib/xArgs.ts';

// ToDO: convert to testing fixtures to avoid failures when source example files change
const fixturePath = 'tests/fixtures';

let shellExpandDuelWarnings = 0;
async function shellExpandDuel(args: string | string[], options?: Parse.ArgsOptions) {
	const sync = Parse.shellExpandSync(args, options);
	const async = await Parse.shellExpand(args, options);
	if (deepEqual(async, sync)) return async;
	else {
		shellExpandDuelWarnings += 1;
		console.warn('WARNING/shellExpandDuel: shellExpand() async != sync', { async, sync });
		return undefined;
	}
}

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
	assertEquals(await Parse.shellExpand('{.}*'), ['{.}*']);
	assertEquals(await Parse.shellExpand('{a}*'), ['{a}*']);
});

const mayBeRootPath = 'c:/windows';
if ($fs.existsSync(mayBeRootPath)) {
	test('globs at root level', async () => {
		const results = await shellExpandDuel(mayBeRootPath + '*');
		console.log({ results, mayBeRootPath });
		assert(
			results?.find((s) =>
				s.toLocaleLowerCase() === pathToOsStyle(mayBeRootPath).toLocaleLowerCase()
			) != undefined,
		);
	});
}

test('no `shellExpandDuel()` warnings', () => {
	console.log({ shellExpandDuelWarnings });
	assert(shellExpandDuelWarnings === 0);
});
