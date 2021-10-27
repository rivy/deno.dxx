// VERSION handler

// `fetch()` implementation (requires read [for local runs] or network permissions)
import { intoURL, projectPaths, projectURL } from '../../tests/$shared.ts';
import { fetch } from './$deps.ts'; // 'file://'-compatible `fetch()`
const newline = /\r?\n|\n/;
const versionURL = intoURL(projectPaths.version, projectURL);
console.log({ projectURL, projectPaths, versionURL });
// projectVersionText == first non-empty line (EOL trimmed) from VERSION
export const projectVersionText = versionURL &&
	(await (await fetch(versionURL)).text()).split(newline).filter((s) => s)[0];

// `import ...` implementation (requires project-level synchronization tooling)
import { VERSION } from './$shared.ts';
export const projectVersionTextViaImport = VERSION;

export function v() {
	return projectVersionText;
}
