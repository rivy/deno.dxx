// spell-checker:ignore (fns) chdir ; (names) Deno ; (options) nullglob ; (people) Roy Ivy III * rivy

import { assert, assertEquals, $path } from './$deps.ts';
import { test } from './$shared.ts';

// //===
// await panicIfMissingPermits(['env', 'read']);
// //===

//===
// review: [SO ~ (JS) determine current line number](https://stackoverflow.com/questions/2343343/how-can-i-determine-the-current-line-number-in-javascript) @@ <https://archive.is/vw4eN>

function currentLineNumber(): number {
	const stack = new Error('stack trace from `currentLineNumber()`').stack;
	// console.debug('currentLineNumber():', { stack });
	const line = stack?.split('\n')[2]; // skip `Error: ...` line and `currentLineNumber()` call frame
	const match = line?.match(/^.*:(\d+):\d+[)]?$/m);
	return match ? parseInt(match[1]) : 0;
}

import { currentCallStack } from './$shared.ts';

test('currentCallStack', () => {
	const callers = currentCallStack();
	const calledFromLine = currentLineNumber() - 1; // line number of call to `currentCallStack()`
	const calledFromURL = import.meta.url;
	console.log({ calledFromLine, calledFromURL, callers });
	// pop off Deno implementation detail callers
	while (callers.length > 0 && callers[callers.length - 1]?.startsWith('ext:')) {
		const _ = callers.pop();
	}
	console.log("removed 'ext:*'", { callers });
	const _ = callers.pop(); // pop off `Deno.test()` caller
	assert(callers[callers.length - 1]?.startsWith(`${calledFromURL}:${calledFromLine}`));
});

//===

// Truthy
// ToDO: explore options for true unit testing within the module so that we can hide internal data structures which aren't in the public API
import { falseyValues } from './$shared.ts';

test('falseyValues: all values are ANSI and lowercase', () => {
	falseyValues.forEach((value, index) => {
		const isANSI = [...value].every((char) => {
			const code = char.charCodeAt(0);
			return code >= 0 && code <= 126;
		});
		assert(isANSI, `falseyValues[${index}] "${value}" contains non-ANSI characters`);

		// Test lowercase
		const isLowercase = value === value.toLowerCase();
		assert(isLowercase, `falseyValues[${index}] "${value}" is not lowercase`);

		// // Additional safety check - ensure toLowerCase() comparison is safe
		// assertEquals(
		// 	value,
		// 	value.toLowerCase(),
		// 	`falseyValues[${index}] "${value}" toLowerCase() comparison unsafe`,
		// );
	});
});

//===

// pathIntoURL()
import { pathIntoURL } from './$shared.ts';

test('pathIntoURL: valid file path', () => {
	const path = 'C:\\Users\\Morpheus\\file.ext';
	const expected = 'file:///C:/Users/Morpheus/file.ext';
	console.log({ path, expected });
	const result = pathIntoURL(path);
	console.log({ result });
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.href, expected, 'URL should resolve correctly');
	assertEquals(result.protocol, 'file:', 'Protocol should be file:');
	assertEquals(result.pathname, '/C:/Users/Morpheus/file.ext', 'Pathname should match');
});

test('pathIntoURL: relative path with base', () => {
	const path = 'dir/file.ext';
	const base = new URL('file:///C:/Users/Morpheus/');
	const expected = 'file:///C:/Users/Morpheus/dir/file.ext';
	console.log({ base, path, expected });
	const result = pathIntoURL(path, { base });
	console.log({ result });
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.href, expected, 'URL should resolve correctly');
});

test('pathIntoURL: absolute POSIX path', () => {
	const path = '/home/user/file.ext';
	const expected_protocol = 'file:';
	const expected_hostname = '';
	const expected_pathname = '/home/user/file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	console.log({ path, expected_href });
	const result = pathIntoURL(path);
	console.log({ result });
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
});

test('pathIntoURL: opaque URL', () => {
	const path = 'opaque:path';
	const expected_origin = 'null';
	const expected_protocol = 'opaque:';
	const expected_host = '';
	const expected_hostname = '';
	const expected_pathname = 'path';
	const expected_href = `${expected_protocol}${expected_pathname}`;
	console.log({ path, expected_href });
	const result = pathIntoURL(path);
	console.log({ result });
	// assertEquals(result, undefined, 'Result should be undefined for invalid input');
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
	assertEquals(result.origin, expected_origin, '`origin` should be match');
	assertEquals(result.protocol, expected_protocol, '`protocol` should be match');
	assertEquals(result.host, expected_host, '`host` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
});

test('pathIntoURL: string URL (HTTPS) input', () => {
	const input = new URL('https://example.com/resource');
	const result = pathIntoURL(input.href);
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.href, input.href, 'URL should match the input');
});

test('pathIntoURL: drive relative path', () => {
	const path = 'C:path/file.ext';
	console.log({ path });
	const result_forPOSIX = pathIntoURL(path, { forPlatform: 'POSIX' });
	const result_forWinOS = pathIntoURL(path, { forPlatform: 'WinOS' });
	const result = pathIntoURL(path);
	console.log({ result_forPOSIX, result_forWinOS, result });
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, 'file:', '`protocol` should be "file:"');
	assert(
		result.pathname.startsWith('/C:/'),
		'`pathname` should be absolute with initial drive letter',
	);
	assert(
		result.pathname.endsWith('/path/file.ext'),
		'`pathname` should end with path/file portion',
	);
	// assertEquals(result, result_forWinOS, 'Results should match for WinOS option');
});

// pathIntoURL()
// * verify file system path semantics are always used

test('pathIntoURL: file system (absolute) path semantics with base file', () => {
	const path = '/bar_path/bar_file.ext';
	const base_path = 'file://domain/foo_path/foo_file_or_folder';
	const expected_protocol = 'file:';
	const expected_hostname = 'domain';
	const expected_pathname = '/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	//
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	console.log({ base_as_file, base_as_folder, path, expected_href });
	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
	console.log({ result_from_base_file, result_from_base_folder });
	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
	const result = result_from_base_file;
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
});

test('pathIntoURL: file system (relative) path semantics with base file', () => {
	const path = 'bar_path/bar_file.ext';
	const base_path = 'file://domain/foo_path/foo_file_or_folder';
	const expected_protocol = 'file:';
	const expected_hostname = 'domain';
	const expected_pathname = '/foo_path/foo_file_or_folder/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	//
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	console.log({ base_as_file, base_as_folder, path, expected_href });
	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
	console.log({ result_from_base_file, result_from_base_folder });
	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
	const result = result_from_base_file;
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
});

test('pathIntoURL: file system (absolute) path semantics with base http', () => {
	const path = '/bar_path/bar_file.ext';
	const base_path = 'http://domain/foo_path/foo_file_or_folder';
	const expected_protocol = 'http:';
	const expected_hostname = 'domain';
	const expected_pathname = '/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	//
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	console.log({ base_as_file, base_as_folder, path, expected_href });
	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
	console.log({ result_from_base_file, result_from_base_folder });
	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
	const result = result_from_base_file;
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
});

test('pathIntoURL: file system (relative) path semantics with base http', () => {
	const path = 'bar_path/bar_file.ext';
	const base_path = 'http://domain/foo_path/foo_file_or_folder';
	const expected_protocol = 'http:';
	const expected_hostname = 'domain';
	const expected_pathname = '/foo_path/foo_file_or_folder/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	//
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	console.log({ base_as_file, base_as_folder, path, expected_href });
	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
	console.log({ result_from_base_file, result_from_base_folder });
	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
	const result = result_from_base_file;
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
});

test('pathIntoURL: file system (absolute) path semantics with base foo-scheme', () => {
	const path = '/bar_path/bar_file.ext';
	const base_path = 'foo-scheme://domain/foo_path/foo_file_or_folder';
	const expected_protocol = 'foo-scheme:';
	const expected_hostname = 'domain';
	const expected_pathname = '/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	//
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	console.log({ base_as_file, base_as_folder, path, expected_href });
	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
	console.log({ result_from_base_file, result_from_base_folder });
	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
	const result = result_from_base_file;
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
});

test('pathIntoURL: file system (relative) path semantics with base foo-scheme', () => {
	const path = 'bar_path/bar_file.ext';
	const base_path = 'foo-scheme://domain/foo_path/foo_file_or_folder';
	const expected_protocol = 'foo-scheme:';
	const expected_hostname = 'domain';
	const expected_pathname = '/foo_path/foo_file_or_folder/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
	//
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	console.log({ base_as_file, base_as_folder, path, expected_href });
	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
	console.log({ result_from_base_file, result_from_base_folder });
	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
	const result = result_from_base_file;
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
});

// FixME: [2025-08-23; rivy] define and test various cases with URLs containing hash and search portions
// ! * `file:` paths should probably not have either, but as a special case, allowing construction of URLs with search and hash portions
// ! * per AI, only the origin and path from the base are considered for resolution; username, password, query, and hash are always dropped

// FixME: [2025-08-23; rivy] define and test various cases with Opaque base URLs
// * per AI...
// new URL('x', new URL('mailto:foo@bar.com')).href;        // "mailto:x"
// new URL('y/z', new URL('mailto:foo@bar.com')).href;      // "mailto:y/z"
// new URL('./rel', new URL('mailto:foo@bar.com')).href;    // "mailto:rel"
// new URL('/abs', new URL('mailto:foo@bar.com')).href;     // probably should be undefined (or an error), not "mailto:/abs", as the alternative of forcing 'mailto:foo@bar.com' into a hierarchical form with authority would seem to violate the spec and expectation

// test('pathIntoURL: file system ("absolute") path semantics with base opaque scheme', () => {
// 	const path = '/bar_path@bar_file.ext';
// 	const base_path = 'mailto:foo@bar.domain';
// 	const expected_origin = 'null';
// 	const expected_protocol = 'mailto:';
// 	const expected_hostname = '';
// 	const expected_pathname = '/bar_path@bar_file.ext';
// 	const expected_href = `${expected_protocol}${expected_pathname}`;
// 	//
// 	const base_as_file = new URL(base_path);
// 	const base_as_folder = new URL(base_path + $path.posix.sep);
// 	console.log({ base_as_file, base_as_folder, path, expected_href });
// 	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
// 	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
// 	console.log({ result_from_base_file, result_from_base_folder });
// 	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
// 	const result = result_from_base_file;
// 	assert(result instanceof URL, 'Result should be a URL');
// 	assertEquals(result.origin, expected_origin, '`origin` should match');
// 	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
// 	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
// 	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
// 	assertEquals(result.href, expected_href, 'URL should resolve correctly');
// });

// test('pathIntoURL: file system (relative) path semantics with base opaque scheme', () => {
// 	const path = 'bar_path/bar_file.ext';
// 	const base_path = 'mailto:foo@bar.domain';
// 	const expected_origin = 'null';
// 	const expected_protocol = 'mailto:';
// 	const expected_hostname = '';
// 	const expected_pathname = 'bar_path/bar_file.ext';
// 	const expected_href = `${expected_protocol}${expected_pathname}`;
// 	//
// 	const base_as_file = new URL(base_path);
// 	const base_as_folder = new URL(base_path + $path.posix.sep);
// 	console.log({ base_as_file, base_as_folder, path, expected_href });
// 	const result_from_base_file = pathIntoURL(path, { base: base_as_file });
// 	const result_from_base_folder = pathIntoURL(path, { base: base_as_folder });
// 	console.log({ result_from_base_file, result_from_base_folder });
// 	assertEquals(result_from_base_file, result_from_base_file, 'Variation results should be equal');
// 	const result = result_from_base_file;
// 	assert(result instanceof URL, 'Result should be a URL');
// 	assertEquals(result.origin, expected_origin, '`origin` should match');
// 	assertEquals(result.protocol, expected_protocol, '`protocol` should match');
// 	assertEquals(result.hostname, expected_hostname, '`hostname` should match');
// 	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
// 	assertEquals(result.href, expected_href, 'URL should resolve correctly');
// });
