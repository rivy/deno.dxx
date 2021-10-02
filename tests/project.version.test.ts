import { assertEquals, decode, equal, FS } from './$deps.ts';
const { existsSync } = FS;
import {
	createTestFn,
	createWarnFn,
	haveGit,
	projectName,
	projectPaths,
	VERSION,
} from './$shared.ts';

const test = createTestFn(import.meta.url);
const warn = createWarnFn(import.meta.url);

const newlines = /\r?\n|\n/g;

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

if ((await haveGit()) && !equal(await gitDescribeVersion(), VERSION)) {
	warn(
		`\`git describe --tags\` reports the version as '${await gitDescribeVersion()}' instead of '${VERSION}'.`,
	);
}

// for commits tagged as releases (ie, /v?(?\d+[.])*\d+/), test for equivalence between project version and `git describe`
// * check `GITHUB_REF` for a value such as 'refs/tags/<TAG_STRING>'
// * ref: <https://docs.github.com/en/actions/learn-github-actions/environment-variables>
{
	const githubRef = Deno.env.get('GITHUB_REF') || '';
	const isVersionTaggedCommit = githubRef.match(/v?(?:\d+[.])*\d+$/);
	if (isVersionTaggedCommit) {
		// const text = await gitDescribeVersion;
		// testing a version tagged commit
		test('version matches `git describe --tags`', async () => {
			const expected = VERSION;
			const actual = await gitDescribeVersion();
			assertEquals(actual, expected);
		});
	}
}

test(`version matches 'VERSION' file`, () => {
	const expected = VERSION;
	const actual = Deno.readTextFileSync(projectPaths.version).replace(newlines, '');
	assertEquals(actual, expected);
});

if ((projectName && (projectName.length > 0)) && existsSync(projectPaths.readme)) {
	const readmeText = Deno.readTextFileSync(projectPaths.readme);
	const URLrx = new RegExp(`https?://deno.land/x/${projectName}@v?((?:\\d+[.])*\\d+)(?=/)`, 'gim');
	const readmeURLs = Array.from(readmeText.matchAll(URLrx));

	test(
		`README ~ 'VERSION' file matches versioned URLs (${readmeURLs?.length || 'NONE'} found)`,
		() => {
			const expected = VERSION;
			console.log({ URLs: readmeURLs.flatMap((v) => [{ match: v[0], index: v.index }]) });
			readmeURLs?.forEach((v) => assertEquals(v[1], expected));
		},
		{ ignore: (readmeURLs?.length || 0) < 1 },
	);
}
