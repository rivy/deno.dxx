// spell-checker:ignore (names) Deno

import { Deprecated } from '../src/lib/$deprecated.ts';

import { assertEquals, equal } from './$deps.ts';

import {
	decode,
	env,
	haveGit,
	panicIfMissingPermits,
	projectLocations,
	projectName,
	test,
	VERSION,
} from './$shared.ts';

import { /* requires 'env' */ createWarnFn } from './$shared.permit.ts';

//===

await panicIfMissingPermits([
	/* 'env' required by `createWarnFn()` from './$shared.permits.ts' */ 'env',
	'env',
	'read',
]);

//===

const warn = createWarnFn(import.meta.url);

const newlines = /\r|\r?\n/g;

const semverMmrReS = '(0|[1-9]\\d*)[.](0|[1-9]\\d*)[.](0|[1-9]\\d*)';
const semverPatchReS = '(?:-(?:[0-9a-zA-Z-]*(?:[.][0-9a-zA-Z-]*)*))';
const versionRx = new RegExp(`^[vV]?(${semverMmrReS}${semverPatchReS}?)$`, 'gms');

const gitDescribeCommand = ['git', 'describe', '--tags', '--exclude', '[!vV0-9]*'];

const gitDescribe = (await haveGit())
	? async () => {
			try {
				const p = Deprecated.Deno.run({
					cmd: [...gitDescribeCommand],
					stdout: 'piped',
					stderr: 'piped',
				});
				return await Promise.all([p.status(), p.output(), p.stderrOutput()])
					.then(([_status, out, _err]) => {
						return decode(out);
					})
					.finally(() => p.close());
			} catch (_) {
				return undefined;
			}
		}
	: () => Promise.resolve(undefined);

const gitDescribeVersion = async () =>
	((await gitDescribe())?.match(/^v?((?:\d+[.])*\d+)/) || [])[1];

if ((await haveGit()) && !equal(await gitDescribeVersion(), VERSION)) {
	warn(
		[
			'`',
			...gitDescribeCommand,
			'`',
			`reports the version as '${await gitDescribeVersion()}' instead of '${VERSION}'`,
		].join(' '),
	);
}

// for commits tagged as releases (ie, /v?(?\d+[.])*\d+/), test for equivalence between project version and `git describe`
// * check `GITHUB_REF` for a value such as 'refs/tags/<TAG_STRING>'
// * ref: <https://docs.github.com/en/actions/learn-github-actions/environment-variables>
{
	const githubRef = env('GITHUB_REF') || '';
	const isVersionTaggedCommit = githubRef.match(versionRx);
	if (isVersionTaggedCommit) {
		// const text = await gitDescribeVersion;
		// testing a version tagged commit
		test(`version matches \`${gitDescribeCommand.join(' ')}\``, async () => {
			const expected = VERSION;
			const actual = await gitDescribeVersion();
			assertEquals(actual, expected);
		});
	}
}

test(`project version matches 'VERSION' file`, () => {
	const expected = VERSION;
	const actual = Deno.readTextFileSync(projectLocations.version).replace(newlines, '');
	assertEquals(actual, expected);
});

if (projectName && projectName.length > 0) {
	const readmeText = Deno.readTextFileSync(projectLocations.readme);
	const URLrx = new RegExp(`https?://deno.land/x/${projectName}@v?((?:\\d+[.])*\\d+)(?=/)`, 'gim');
	const readmeURLs = readmeText ? Array.from(readmeText.matchAll(URLrx)) : [];

	test(
		`README ~ project version matches versioned URLs (${readmeURLs?.length || 'NONE'} found)`,
		() => {
			const expected = VERSION;
			console.log({ URLs: readmeURLs.flatMap((v) => [{ match: v[0], index: v.index }]) });
			readmeURLs?.forEach((v) => assertEquals(v[1], expected));
		},
		{ ignore: (readmeURLs?.length || 0) < 1 },
	);
}
