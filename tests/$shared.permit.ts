// tests ~ common code requiring permissions

import { $colors, $path } from './$deps.ts';

import { env } from '../src/lib/$shared.TLA.ts';
import { format, traversal } from './$shared.ts';

//===

export const isCI = env('CI');
export const isGHA = env('GITHUB_ACTIONS'); // ref: <https://docs.github.com/en/actions/learn-github-actions/environment-variables>

//===

// `createWarnFn()`
/** Create a warning function which displays tailored output for "GitHub Actions" with fallback to the usual console output.
- requires `env` (`variable=['CI', 'GITHUB_ACTIONS']`) permission(s) for correct functionality

Example usage:
```typescript
// * `warn()` ~ display warning; transformed for GHA dashboard display iff CI/GHA platform
const warn = createWarnFn(import.meta.url);
//...
```
*/
export function createWarnFn(testFilePath?: URL | string) {
	const path = testFilePath ? traversal(testFilePath) : undefined;
	const base = path ? $path.parse(path).base : undefined;
	// console.warn({ projectPath, testFilePath, path, base });
	function warn(...args: unknown[]) {
		//# * for GHA CI, convert any warnings to GHA UI annotations; ref: <https://help.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-a-warning-message>
		const s = format(...args);
		if (isCI && isGHA) {
			console.log($colors.stripColor(`::warning ::${base ? (base + ': ') : ''}${s}`));
		} else console.warn($colors.dim(base || '*'), $colors.yellow('Warning:'), s);
	}
	return warn;
}

//===

// `setEnvFromArgs()`
/** Create/set `TEST_...` environment variables from any `args` option flags.
- requires `env` permission (o/w `Deno.env.set()` will panic)
*/
export function setEnvFromArgs(args: string[] = Deno.args) {
	args.forEach((arg) => {
		const match = arg.match(/^--(?:test[_-])?(.*)$/);
		if (match) {
			const name = 'TEST_' + (match[1].toLocaleUpperCase()).replace(/\W/g, '_');
			Deno.env.set(name, 'true');
		}
	});
}
