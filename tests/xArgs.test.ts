// spell-checker:ignore (names) Deno

import { $fs, $path, assert, assertEquals } from './$deps.ts';
import { deepEqual, pathToOsStyle, projectPath, test } from './$shared.ts';

import * as Parse from '../src/lib/xArgs.ts';

// FixME: by default, all tests should test that both Async and Sync versions of a function pass the test (and, therefore, match each other)

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

test("bracket expansion (eg, `shellExpand('[a]*')`)", async () => {
	let glob = 'eg/[a]*';
	let actual = await Parse.shellExpand(glob);
	console.log({ glob, actual });
	assertEquals(actual, ['eg/args.ts', 'eg/argsIt.ts'].map(pathToOsStyle));

	glob = 'eg/[aA]*';
	actual = await Parse.shellExpand(glob);
	console.log({ glob, actual });
	assertEquals(actual, ['eg/args.ts', 'eg/argsIt.ts'].map(pathToOsStyle));

	glob = 'eg/[a-b]*';
	actual = await Parse.shellExpand(glob);
	console.log({ glob, actual });
	assertEquals(actual, ['eg/args.ts', 'eg/argsIt.ts'].map(pathToOsStyle));

	glob = 'eg/[a-bA-B]*';
	actual = await Parse.shellExpand(glob);
	console.log({ glob, actual });
	assertEquals(actual, ['eg/args.ts', 'eg/argsIt.ts'].map(pathToOsStyle));
});

test('brace/bracket combined expansions', async () => {
	let glob = '.vscode/{,.}c[sS]pell{.json,.config{.js,.cjs,.json,.yaml,.yml},.yaml,.yml}';
	let results = await shellExpandDuel(glob, { nullglob: true });
	console.log({ glob, results });
	assertEquals(results, ['.vscode/cspell.json'].map(pathToOsStyle));

	glob = '{.vscode,.}/{,.}c[sS]pell{.json,.config{.js,.cjs,.json,.yaml,.yml},.yaml,.yml}';
	results = await shellExpandDuel(glob, { nullglob: true });
	console.log({ glob, results });
	assertEquals(results, ['.vscode/cspell.json'].map(pathToOsStyle));
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
