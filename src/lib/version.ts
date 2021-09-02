// VERSION handler

import * as Path from 'https://deno.land/std@0.106.0/path/mod.ts';

const versionPath = Path.toFileUrl(Path.join(Path.fromFileUrl(Deno.mainModule), '../../VERSION'));

// console.warn({ versionPath });

const newline = /\r?\n|\n/;

// projectVersionText == first non-empty line (EOL trimmed) from VERSION
const projectVersionText = Deno.readTextFileSync(versionPath).split(newline).filter((s) => s)[0];

export function v() {
	return projectVersionText;
}
