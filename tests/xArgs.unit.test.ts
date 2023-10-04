// spell-checker:ignore (fns) chdir ; (names) Deno ; (options) nullglob ; (people) Roy Ivy III * rivy

import { $fs, $path, assert, assertEquals } from './$deps.ts';
import {
	deepEqual,
	env,
	panicIfMissingPermits,
	pathToOsStyle,
	projectPath,
	test,
} from './$shared.ts';

import * as Parse from '../src/lib/xArgs.ts';

// FixME: by default, all tests should test that both Async and Sync versions of a function pass the test (and, therefore, match each other)

// ToDO: add tests
// * network tests
// [2023-09-10; rivy] => [2023-09-10] fixed with modification of xArgs argument parsing of quoted arguments
// - `\\HOSTNAME\path\*` works
// - `"\\HOSTNAME\path"\*` works
// - `"\\HOSTNAME\path\"*` FAILS
// - `"\\HOSTNAME\path\"\*` works
// - `"\\HOSTNAME\path"\""*` works
// [2023-09-10; rivy] negative character sets FAIL => [2023-09-10; rivy] *solved* by better shim batch (avoiding loss of '!' in SHIM_ARGS)
// - `PARENT_PATH\{.[!.],}PATH` FAILS
// - `[!x]*` => `[x]*` (no expansion, with incorrect inner character set)))
// - `.\{.[!.]}*` => `.\{.[.]}*` (no expansion, with incorrect inner character set)))

//===

await panicIfMissingPermits(['env', 'read']);

//===

const fixturePath = 'tests/fixtures';
Deno.chdir($path.join(projectPath, fixturePath)); // * `chdir` causes a global/non-scoped change

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
		.then(async () => {
			const exampleFiles = await Parse.shellExpand('./**/*.ext');
			console.log({ exampleFiles });

			const globPatterns = ['./**/*.ext', '.\\**/*.ext', '.\\**\\*.ext', '**/*.ext', '**\\*.ext'];

			assertEquals(await Parse.shellExpand(globPatterns[0]), exampleFiles);
			console.log('#1: passed');

			// * equivalent globs, with alternate path separators, should produce results differing only by path separator
			assertEquals(
				(await Parse.shellExpand(globPatterns[0].replace($path.SEP_PATTERN, '/'))).map(
					pathToOsStyle,
				),
				(await Parse.shellExpand(globPatterns[0].replace($path.SEP_PATTERN, '\\'))).map(
					pathToOsStyle,
				),
			);
			console.log('#2: passed');

			// * globs with same prefix, differing glob path separators
			assertEquals(
				(await Parse.shellExpand(globPatterns[0])).map(pathToOsStyle),
				(await Parse.shellExpand(globPatterns[1])).map(pathToOsStyle),
			);
			console.log('#3: passed');
			assertEquals(
				(await Parse.shellExpand(globPatterns[0])).map(pathToOsStyle),
				(await Parse.shellExpand(globPatterns[2])).map(pathToOsStyle),
			);
			console.log('#4: passed');
			assertEquals(
				await Parse.shellExpand(globPatterns[3]),
				await Parse.shellExpand(globPatterns[4]),
			);
			console.log('#5: passed');

			// * globs with differing, but equivalent, prefixes should produce equivalent results
			assertEquals(
				(await Parse.shellExpand(globPatterns[0])).map((p) => $path.resolve(pathToOsStyle(p))),
				(await Parse.shellExpand(globPatterns[3])).map((p) => $path.resolve(pathToOsStyle(p))),
			);
			assertEquals(
				(await Parse.shellExpand(globPatterns[0])).map((p) => $path.resolve(pathToOsStyle(p))),
				(await Parse.shellExpand(globPatterns[4])).map((p) => $path.resolve(pathToOsStyle(p))),
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

test(`simple expansions (eg, \`shellExpand('""')\`)`, async () => {
	assertEquals(await Parse.shellExpand('~'), [env('HOME')]);
	assertEquals(await Parse.shellExpand('""'), ['""']);
	assertEquals(await Parse.shellExpand('"'), ['""']); // ?
	assertEquals(await Parse.shellExpand("''"), ["''"]);
	assertEquals(await Parse.shellExpand("'"), ["''"]); // ?
	assertEquals(await Parse.shellExpand("'a b'"), ["'a b'"]);
	assertEquals(
		await Parse.shellExpand(
			'^ [ ] { } ; : , . ? ! @ # $ % " ^ & | < > " ( ) "!x" %this% %%o/w-that%% "%%%the other"',
		),
		['^ [ ] { } ; : , . ? ! @ # $ % " ^ & | < > " ( ) "!x" %this% %%o/w-that%% "%%%the other"'],
	);
	assertEquals(await Parse.shellExpand('``'), ['``']); // fails
});

test(`brace expansion (eg, \`shellExpand('{a}*')\`)`, async () => {
	assertEquals(await Parse.shellExpand('{}*'), ['{}*']);
	assertEquals(await Parse.shellExpand('{.}*'), ['{.}*']);
	assertEquals(await Parse.shellExpand('{a}*'), ['{a}*']);
	assertEquals(await Parse.shellExpand('{a,b}'), ['a', 'b']);
});

test(`bracket expansion (eg, \`shellExpand('[a]*')\`)`, async () => {
	let glob = 'tests/fixtures/dir/[a]*';
	// ToDO: [2022-01-25; rivy] investigate returning files in a deterministic order (vs user sort after return?)
	// note: order of returned values is not guaranteed
	const expected = [
		'tests/fixtures/dir/a',
		'tests/fixtures/dir/ab.ext',
		'tests/fixtures/dir/another filename with internal spaces.ext',
	]
		.map(pathToOsStyle)
		.sort();
	let actual = (await Parse.shellExpand(glob)).sort();
	console.log({ glob, actual });
	assertEquals(actual.map(pathToOsStyle), expected.map(pathToOsStyle));

	glob = 'tests/fixtures/dir/[aA]*';
	actual = (await Parse.shellExpand(glob)).sort();
	console.log({ glob, actual });
	assertEquals(actual.map(pathToOsStyle), expected.map(pathToOsStyle));

	glob = 'tests/fixtures/dir/[a-b]*';
	actual = (await Parse.shellExpand(glob)).sort();
	console.log({ glob, actual });
	assertEquals(
		actual.map(pathToOsStyle),
		expected.concat(pathToOsStyle('tests/fixtures/dir/b.ext')).map(pathToOsStyle).sort(),
	);

	glob = 'tests/fixtures/dir/[a-bA-B]*';
	actual = (await Parse.shellExpand(glob)).sort();
	console.log({ glob, actual });
	assertEquals(
		actual.map(pathToOsStyle),
		expected.concat(pathToOsStyle('tests/fixtures/dir/b.ext')).map(pathToOsStyle).sort(),
	);
});

test('brace/bracket combined expansions', async () => {
	// spell-checker:disable-next-line
	let glob = '.vscode/{,.}c[sS]pell{.json,.config{.js,.cjs,.json,.yaml,.yml},.yaml,.yml}';
	let results = await shellExpandDuel(glob, { nullglob: true });
	console.log({ glob, results });
	assertEquals(results?.map(pathToOsStyle), ['.vscode/cspell.json'].map(pathToOsStyle));

	// spell-checker:disable-next-line
	glob = '{.vscode,.}/{,.}c[sS]pell{.json,.config{.js,.cjs,.json,.yaml,.yml},.yaml,.yml}';
	results = await shellExpandDuel(glob, { nullglob: true });
	console.log({ glob, results });
	assertEquals(results?.map(pathToOsStyle), ['.vscode/cspell.json'].map(pathToOsStyle));
});

const mayBeRootPath = 'c:/windows';
if ($fs.existsSync(mayBeRootPath)) {
	test('globs at root level', async () => {
		const results = await shellExpandDuel(mayBeRootPath + '*');
		console.log({ results, mayBeRootPath });
		assert(
			results?.find((s) =>
				pathToOsStyle(s).toLocaleLowerCase() === pathToOsStyle(mayBeRootPath).toLocaleLowerCase()
			) != undefined,
		);
	});
}

test('no `shellExpandDuel()` warnings', () => {
	console.log({ shellExpandDuelWarnings });
	assert(shellExpandDuelWarnings === 0);
});
