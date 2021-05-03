// spell-checker:ignore (js/ts) gmsu

// ref: [bash shell expansion](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_04.html) @@ <https://archive.is/GFMJ1>
// ref: [GNU ~ bash shell expansions](https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html) @@ <https://archive.is/lHgK6>

// ESM conversion refs
// ref: <https://esbuild.github.io/plugins>
// ref: <https://github.com/postui/esm.sh/blob/master/server/build.go>
// ref: <https://github.com/postui/esm.sh>
// ref: <https://esbuild.github.io/plugins/#resolve-results>
// ref: <https://dev.to/ije/introducing-esm-cdn-for-npm-deno-1mpo> // `esm` client?
// ref: <https://github.com/remorses/esbuild-plugins>
// ref: <https://github.com/snowpackjs/rollup-plugin-polyfill-node>
// ref: <https://esbuild.github.io/plugins/#resolve-callbacks>
// ref: <https://www.google.com/search?q=using+esbuild+polyfill&oq=using+esbuild+polyfill&aqs=chrome..69i57.7740j0j1&sourceid=chrome&ie=UTF-8>
// ref: <https://github.com/evanw/esbuild/issues/298>
// ref: <https://github.com/evanw/esbuild/blob/03a33e6e007467d99989ecf82fad61bd928a71aa/CHANGELOG.md#0717>
// ref: <https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5>
// ref: <https://www.npmjs.com/package/path-browserify>
// ref: <https://github.com/evanw/esbuild/issues/85>
// ref: <https://stackoverflow.com/questions/61821038/how-to-use-npm-module-in-deno>
// ref: <https://jspm.org/docs/cdn>

// esm.sh
// import Braces from 'https://cdn.esm.sh/braces@3.0.2';
// esm.sh (un-minimized, readable source)
// import Braces from 'https://cdn.esm.sh/braces@3.0.2?dev';

// jspm.dev
import * as BracesT from 'https://cdn.jsdelivr.net/gh/DefinitelyTyped/DefinitelyTyped@7121cbff79/types/braces/index.d.ts';
import BracesM from 'https://jspm.dev/npm:braces@3.0.2';
const Braces = BracesM as typeof BracesT;

const DQ = '"';
const SQ = "'";
const DQStringReS = `${DQ}[^${DQ}]*(?:${DQ}|$)`; // double-quoted string (unbalanced at end-anchor is allowed)
const SQStringReS = `${SQ}[^${SQ}]*(?:${SQ}|$)`; // single-quoted string (unbalanced at end-anchor is allowed)
const QReS = `[${DQ}${SQ}]`; // double or single quote character class

const cNonQReS = `(?:(?!${QReS}).)`; // non-(double or single)-quote character

const tokenRe = new RegExp(`^((?:${DQStringReS}|${SQStringReS}|${cNonQReS}+))(.*?$)`, 'msu'); // == (tokenFragment)(restOfString)

// `braceExpand`
/** brace expand a string

* - Bash-like brace expansion (compatible with the Bash v4.3 specification).
* - Quotes (single or double) are used to protect braces from expansion;
    unbalanced quotes are allowed (and parsed as if completed by the end of the string).
    No character escape sequences are recognized.
* - Supports lists/sets, ranges/sequences, and range increments.

Uses the ['braces'](https://github.com/micromatch/braces) JS module.

@returns Array of expansions (possibly empty)
@example
```js
const text = '{a,b} text string {1..10..2}';
const expansion = braceExpand('{a,b} text string');
```
*/
export function expand(s: string) {
	// brace expand a string
	const arr = [];
	s = s.replace(/^\s+/msu, ''); // trim leading whitespace
	// console.warn('xBraces.braceExpand()', { s });
	let text = '';
	while (s) {
		const m = s.match(tokenRe);
		if (m) {
			let matchStr = m[1];
			if (matchStr.length > 0) {
				const bracesEscChar = '\\'; // `braces` escape character == backslash
				if (matchStr[0] === DQ || matchStr[0] === SQ) {
					// "..." or '...' => escape contents
					const qChar = matchStr[0];
					const spl = matchStr.split(qChar);
					matchStr = spl[1];
					// escape contents
					// * 1st, escape the braces escape character
					matchStr = matchStr.replace(bracesEscChar, `${bracesEscChar}${bracesEscChar}`);
					// * escape string contents
					matchStr = matchStr.replace(/(.)/gmsu, `${bracesEscChar}$1`);
					// add surrounding escaped quotes
					matchStr = `${bracesEscChar}${qChar}` + matchStr + `${bracesEscChar}${qChar}`;
				} else {
					// unquoted text => escape special characters
					// * 1st, escape the braces escape character
					matchStr = matchStr.replace(bracesEscChar, `${bracesEscChar}${bracesEscChar}`);
					// * escape any 'special' (braces escape or glob) characters
					matchStr = matchStr.replace(
						new RegExp(`([\\${bracesEscChar}?*\\[\\]])`, 'gmsu'),
						`${bracesEscChar}$1`,
					);
				}
			}
			text += matchStr;
			s = m[2];
			if (!s) {
				arr.push(text);
				text = '';
			}
		} else {
			arr.push(text);
			text = s = '';
		}
	}
	// console.warn('xBraces.braceExpand()', { arr });
	// return arr.flatMap((v) => Braces.expand(v));
	return arr.flatMap((v) => Braces.expand(v)).map((v) => v.replace(/\\(\\)/gmsu, '$1'));
}
