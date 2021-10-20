// spell-checker:ignore (names) EditorConfig

import { Path } from './$deps.ts';

export const VERSION = '0.0.9';

export const projectName: string | undefined = 'dxx';
export const projectURL = new URL('../..', import.meta.url); // note: `new URL('.', ...)` => dirname(...); `new URL('..', ...) => dirname(dirname(...))
export const projectPath = (projectURL.protocol === 'file:')
	? Path.fromFileUrl(projectURL)
	: projectURL.pathname;
export const projectPaths = {
	// absolute or relative to `projectPath`
	editorconfig: Path.join(projectPath, '.editorconfig'),
	readme: Path.join(projectPath, 'README.md'),
	version: Path.join(projectPath, 'VERSION'),
};

// // ToDO: investigate best practice for portability of PATH_SEP_PATTERN // note: WinOS => /[\\/]+/ ; *nix => /\/+/
// // * currently, treating paths as WinOS-compatible with both backslash and forward-slash as path separators (on both WinOS and *nix platforms)
// export const PATH_SEP_PATTERN = /[\\/]+/;
