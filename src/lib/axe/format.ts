//====

import { DEFAULT_INSPECT_OPTIONS, inspect, } from './$shared.ts';

//====

// ToDO: [2021-09-16; rivy] * improved equivalency to NodeJS format/inspect string quoting requires changing the preference expressed [here](https://github.com/denoland/deno/blob/5d814a4c244d489b4ae51002a0cf1d3c2fe16058/ext/console/02_console.js#L648-L669) if using `Deno.inspect`
// * ref: [🙏`Deno.inspect()` should conform to NodeJS quoting behavior (or allow customization)](https://github.com/denoland/deno/issues/14969)
// * `inspect` from deno::std::node::util may be of use or `format` as a complete replacement if/when <https://github.com/denoland/deno_std/issues/2388> is fixed

// ref: <https://nodejs.org/api/util.html#util_util_format_format_args>
function toSpecFormat(
	specifier: string,
	value: unknown,
	inspectOptions_: Deno.InspectOptions = {},
): string {
	const inspectOptions = { ...DEFAULT_INSPECT_OPTIONS, ...inspectOptions_, };
	if (specifier === '%s') {
		// string
		if (typeof value === 'string' || value instanceof String) {
			return value as string;
		} else return inspect(value, inspectOptions,);
	}
	if (specifier === '%d') {
		// number
		if (typeof value === 'bigint') {
			return value + 'n';
		}
		return inspect(Number(value,), inspectOptions,);
	}
	if (specifier === '%i') {
		// integer
		if (typeof value === 'bigint') {
			return value + 'n';
		}
		return inspect(parseInt(value as string,), inspectOptions,);
	}
	if (specifier === '%f') {
		// float
		return inspect(parseFloat(value as string,), inspectOptions,);
	}
	if (specifier === '%j') {
		// JSON
		try {
			return inspect(JSON.stringify(value,), inspectOptions,);
		} catch (e) {
			// nodeJS => 'cyclic object value' , deno => 'Converting circular structure to JSON ...'
			// ref: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify>
			if (e instanceof TypeError && e.message.match(/cyclic|circular/,)) {
				return '[Circular]';
			} else throw e;
		}
	}
	if (specifier === '%o') {
		// DOM element
		return inspect(value, { ...inspectOptions, showHidden: true, showProxy: true, },);
	}
	if (specifier === '%O') {
		// JavaScript object
		return inspect(value, inspectOptions,);
	}
	if (specifier === '%c') {
		// apply CSS
		return '';
	}
	return '';
}

// ref: <https://nodejs.org/docs/latest-v16.x/api/console.html#console_console_log_data_args>
// ref: <https://nodejs.org/docs/latest-v16.x/api/util.html#util_util_format_format_args>
// modified from <https://deno.land/std@0.105.0/node/util.ts#L247-L266>
export function format(...args: unknown[]) {
	return formatWithOptions({}, ...args,);
}

export function formatWithOptions(inspectOptions_: Deno.InspectOptions, ...args: unknown[]) {
	const inspectOptions = { ...DEFAULT_INSPECT_OPTIONS, ...inspectOptions_, };
	const replacement: [number, string,][] = [];
	const formatSpecifierRx = /%(s|d|i|f|j|o|O|c|%)/g;
	const hasFormatTemplate = args.length > 0 &&
		(typeof args[0] === 'string' || args[0] instanceof String);
	const formatTemplate = hasFormatTemplate ? (args[0] as string) : '';
	let i = hasFormatTemplate ? 1 : 0;
	let arr: RegExpExecArray | null = null;
	let done = false;
	while ((arr = formatSpecifierRx.exec(formatTemplate,)) !== null && !done) {
		if (arr[0] === '%%') {
			replacement.push([arr['index'], '%',],);
		} else if (i < args.length) {
			replacement.push([arr['index'], toSpecFormat(arr[0], args[i],),],);
			i++;
		} else done = true;
	}
	const lastArgUsed = i;
	let result = '';
	let last = 0;
	for (let i = 0; i < replacement.length; i++) {
		const item = replacement[i];
		result += formatTemplate.slice(last, item[0],);
		result += item[1];
		last = item[0] + 2;
	}
	result += formatTemplate.slice(last,);
	for (let i = lastArgUsed; i < args.length; i++) {
		if (i > 0) result += ' ';
		if (typeof args[i] === 'string') {
			result += args[i];
		} else result += inspect(args[i], inspectOptions,);
	}
	return result;
}

//====
