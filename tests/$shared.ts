// tests ~ common code

import { Colors, Path } from './$deps.ts';

export function nameGen(filename: string) {
	return (testName: string) => Colors.dim(Path.parse(filename).base) + ' ' + Colors.bold(testName);
}

type TestName = string;
const testLog: [TestName, string][] = [];

function formatString(str: string) {
	return `${str.replace(/\\/, '\\\\').replace(/"/g, '\\"')}`;
}

function thingToString(thing: unknown, maxDepth?: number, depth = 1): string {
	let result = '';
	if (typeof thing === 'bigint') {
		return thing + 'n';
	}
	if (
		typeof thing === 'undefined' || typeof thing === 'number' ||
		typeof thing === 'boolean' || typeof thing === 'symbol' || thing === null
	) {
		return String(thing);
	}
	if (typeof thing === 'function') {
		return `[Function ${thing.name || '(anonymous)'}]`;
	}
	if (typeof thing === 'string') {
		return formatString(thing);
	}
	if (Array.isArray(thing)) {
		if (depth === maxDepth) {
			return '[Array]';
		}
		result += '[';
		const en = Object.entries(thing);
		for (let i = 0; i < en.length; i++) {
			const [key, value] = en[i];
			if (isNaN(Number(key))) {
				result += `${key}: `;
			}
			result += thingToString(value, maxDepth, depth + 1);
			if (i !== en.length - 1) {
				result += ', ';
			}
		}
		result += ']';
		return result;
	}
	if (depth === maxDepth) {
		return '[Object]';
	}
	const en = Object.entries(thing as Record<string, unknown>);
	result += '{ ';
	for (let i = 0; i < en.length; i++) {
		const [key, value] = en[i];
		result += `${key}: ${thingToString(value, maxDepth, depth + 1)}`;
		if (i !== en.length - 1) {
			result += ', ';
		}
	}
	result += ' }';
	return result;
}

export function testTemplate(filename: string) {
	const name = nameGen(filename);
	return (description: string, fn: () => void | Promise<void>, opts = {}) => {
		const testName: TestName = name(description);
		// * capture `console.log()` and `console.warn()` messages via intercepts; display only on failure (as part of the error message)
		// ref: <https://stackoverflow.com/questions/9216441/intercept-calls-to-console-log-in-chrome> , <https://www.bayanbennett.com/posts/how-does-mdn-intercept-console-log-devlog-003> @@ <https://archive.is/dfg7H>
		// ref: <https://www.npmjs.com/package/output-interceptor>
		console.log = (...args) => {
			args.forEach((arg) => testLog.push([testName, thingToString(arg)]));
		};
		console.warn = (...args) => {
			args.forEach((arg) => testLog.push([testName, thingToString(arg)]));
		};
		Deno.test({
			name: testName,
			fn: async () => {
				try {
					await fn();
				} catch (e) {
					const logText = testLog.flatMap(([n, v]) => n === testName ? [v] : []);
					if (logText.length > 0) {
						logText.unshift(Colors.dim(`## test log:begin>`));
						logText.push(Colors.dim(`## test log:end.`));
					}
					throw (new Error([''].concat(logText).concat([e.toString()]).join('\n')));
				}
			},
			...opts,
		});
	};
}
