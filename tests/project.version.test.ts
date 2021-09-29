import { assertEquals, Colors, equal, Path } from './$deps.ts';
import { createTestFn, projectPath } from './$shared.ts';

const test = createTestFn(import.meta.url);

import * as Version from '../src/lib/version.ts';

const newlines = /\r?\n|\n/g;

const projectFilePath = {
	readme: Path.join(projectPath, 'README.md'),
	version: Path.join(projectPath, 'VERSION'),
};

const gitDescribeVersion = await (async () => {
	const p = Deno.run({ cmd: ['git', 'describe', '--tags'], stdout: 'piped', stderr: 'piped' });
	const [_status, out, _err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]);
	p.close();
	const gitDescribeText = new TextDecoder().decode(out);
	return (gitDescribeText.match(/^v?((?:\d+[.])*\d+)/) || [undefined, undefined])[1];
})();

if (!equal(gitDescribeVersion, Version.v())) {
	console.warn(
		`${
			Colors.magenta('WARN:')
		} \`git describe --tags\` reports the version as '${gitDescribeVersion}' instead of '${Version.v()}'.`,
	);
}

// ToDO: [2021-09-28; rivy] re-activate as a test for release commits (== commits with an associated tag?)
// test('version matches `git describe`', () => {
// 	const expected = Version.v();
// 	const actual = gitDescribeVersion;
// 	assertEquals(actual, expected);
// });

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
