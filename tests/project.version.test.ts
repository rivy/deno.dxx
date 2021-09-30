import { assertEquals, decode, equal, Path } from './$deps.ts';
import { createTestFn, createWarnFn, haveGit, projectPath } from './$shared.ts';

const test = createTestFn(import.meta.url);
const warn = createWarnFn(import.meta.url);

import * as Version from '../src/lib/version.ts';

const newlines = /\r?\n|\n/g;

const projectFilePath = {
	readme: Path.join(projectPath, 'README.md'),
	version: Path.join(projectPath, 'VERSION'),
};

const gitDescribe = (await haveGit())
	? () => {
		try {
			const p = Deno.run({ cmd: ['git', 'describe', '--tags'], stdout: 'piped', stderr: 'piped' });
			return Promise
				.all([p.status(), p.output(), p.stderrOutput()])
				.then(([_status, out, _err]) => {
					return decode(out);
				})
				.finally(() => p.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	}
	: () => Promise.resolve(undefined);

const gitDescribeVersion = async () =>
	((await gitDescribe())?.match(/^v?((?:\d+[.])*\d+)/) || [])[1];

if ((await haveGit()) && !equal(await gitDescribeVersion(), Version.v())) {
	warn(
		`\`git describe --tags\` reports the version as '${await gitDescribeVersion()}' instead of '${Version.v()}'.`,
	);
}

// for commits tagged as releases, test for equivalence between project version and `git describe`
// * check `GITHUB_REF` for a value such as 'refs/tags/<TAG_STRING>'
// * ref: <https://docs.github.com/en/actions/learn-github-actions/environment-variables>
{
	const githubRef = Deno.env.get('GITHUB_REF') || '';
	const isVersionTaggedCommit = githubRef.match(/v?(?:\d+[.])*\d+$/);
	if (isVersionTaggedCommit) {
		// const text = await gitDescribeVersion;
		// testing a version tagged commit
		test('version matches `git describe --tags`', async () => {
			const expected = Version.v();
			const actual = await gitDescribeVersion();
			assertEquals(actual, expected);
		});
	}
}

test(`version matches 'VERSION' file`, () => {
	const expected = Version.v();
	const actual = Deno.readTextFileSync(projectFilePath.version).replace(newlines, '');
	assertEquals(actual, expected);
});

const readmeText = Deno.readTextFileSync(projectFilePath.readme);
// const URLrx = /(?<=^|\s)(https://deno.land/x/dxx@)v?(?:(?:\d+[.])*\d+)(?=/)/i;
const URLre = new RegExp('https?://deno.land/x/dxx@v?((?:\\d+[.])*\\d+)(?=/)', 'gim');
const readmeURLs = Array.from(readmeText.matchAll(URLre));

test(
	`README ~ 'VERSION' file matches versioned URLs (${readmeURLs?.length || 'NONE'} found)`,
	() => {
		const expected = Version.v();
		console.log({ URLs: readmeURLs.flatMap((v) => [{ match: v[0], index: v.index }]) });
		readmeURLs?.forEach((v) => assertEquals(v[1], expected));
	},
	{ ignore: (readmeURLs?.length || 0) < 1 },
);
