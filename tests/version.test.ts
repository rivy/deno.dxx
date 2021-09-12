import { assertEquals } from './$deps.ts';
import { testTemplate } from './$shared.ts';

const test = testTemplate(import.meta.url);

import * as Version from '../src/lib/version.ts';

const newlines = /\r?\n|\n/g;

const readmePath = 'README.md';
const versionPath = 'VERSION';

test('version matches `git describe`', async () => {
	const expected = Version.v();

	const p = Deno.run({ cmd: ['git', 'describe', '--tags'], stdout: 'piped', stderr: 'piped' });
	const [_status, out, _err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]);
	p.close();

	const gitDescribeText = new TextDecoder().decode(out);
	// console.log({ gitDescribeText });

	const actual = (gitDescribeText.match(/^v?((?:\d+[.])*\d+)/) || [undefined, undefined])[1];

	assertEquals(actual, expected);
});

test('version matches VERSION file', () => {
	const expected = Version.v();
	const actual = Deno.readTextFileSync(versionPath).replace(newlines, '');
	assertEquals(actual, expected);
});

const readmeText = Deno.readTextFileSync(readmePath);
// const URLrx = /(?<=^|\s)(https://deno.land/x/dxx@)v?(?:(?:\d+[.])*\d+)(?=/)/i;
const URLre = new RegExp('https?://deno.land/x/dxx@v?((?:\\d+[.])*\\d+)(?=/)', 'gim');
const readmeURLs = Array.from(readmeText.matchAll(URLre));

test(`README ~ VERSION matches versioned URLs (${readmeURLs?.length || 'NONE'} found)`, () => {
	const expected = Version.v();
	console.log({ URLs: readmeURLs.flatMap((v) => [{ match: v[0], index: v.index }]) });
	readmeURLs?.forEach((v) => assertEquals(v[1], expected));
}, { ignore: (readmeURLs?.length || 0) < 1 });
