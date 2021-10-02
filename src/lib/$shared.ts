import { Path } from './$deps.ts';

export const VERSION = '0.0.9';

export const projectName: string | undefined = 'dxx';
export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath = Path.fromFileUrl(projectURL);
export const projectPaths = {
	// absolute or relative to `projectPath`
	editorconfig: Path.join(projectPath, '.editorconfig'),
	readme: Path.join(projectPath, 'README.md'),
	version: Path.join(projectPath, 'VERSION'),
};
