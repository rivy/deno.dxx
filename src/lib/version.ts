// VERSION handler

// `fetch()` implementation (requires read or network permissions)
// import { VERSION_PATH } from './$shared.ts';
// import { fetch } from './$deps.ts'; // 'file://'-compatible `fetch()`
// const newline = /\r?\n|\n/;
// const versionURL = new URL(VERSION_PATH, import.meta.url);
// // projectVersionText == first non-empty line (EOL trimmed) from VERSION
// const projectVersionText =
// 	(await (await fetch(versionURL)).text()).split(newline).filter((s) => s)[0];

// `import ...` implementation (requires project-level synchronization tooling)
import { VERSION } from './$shared.ts';
const projectVersionText = VERSION;

export function v() {
	return projectVersionText;
}
