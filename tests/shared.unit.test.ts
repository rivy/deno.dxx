// spell-checker:ignore (fns) chdir ; (names) Deno ; (options) nullglob ; (people) Roy Ivy III * rivy

import { assert, assertEquals, $path } from './$deps.ts';
import { test } from './$shared.ts';

import { callersFromStackTrace, pathIntoURL } from '../src/lib/$shared.ts';

// //===
// await panicIfMissingPermits(['env', 'read']);
// //===

// review: [SO ~ (JS) determine current line number](https://stackoverflow.com/questions/2343343/how-can-i-determine-the-current-line-number-in-javascript) @@ <https://archive.is/vw4eN>

test('callersFromStack', () => {
	const [callers, calledFromLine] = [callersFromStackTrace(), 15];
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

// intoURL

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
	const base = new URL('file:///C:/Users/Morpheus/');
	const path = 'dir/file.ext';
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
	const expected_protocol = 'opaque:';
	const expected_pathname = 'path';
	const expected_href = `${expected_protocol}${expected_pathname}`;
	console.log({ path, expected_href });
	const result = pathIntoURL(path);
	console.log({ result });
	// assertEquals(result, undefined, 'Result should be undefined for invalid input');
	assert(result instanceof URL, 'Result should be a URL');
	assertEquals(result.href, expected_href, 'URL should resolve correctly');
	assertEquals(result.protocol, expected_protocol, '`protocol` should be match');
	assertEquals(result.pathname, expected_pathname, '`pathname` should match');
});

// // test('pathIntoURL: URL input', () => {
// // 	const input = new URL('https://example.com/resource');
// // 	const result = pathIntoURL(input);
// // 	assert(result instanceof URL, 'Result should be a URL');
// // 	assertEquals(result.href, input.href, 'URL should match the input');
// // });

// test('pathIntoURL: drive relative path', () => {
// 	const path = 'C:file.ext';
// 	console.log({ path });
// 	// const result_forPOSIX = pathIntoURL(path, { forPlatform: 'POSIX' });
// 	// const result_forWinOS = pathIntoURL(path, { forPlatform: 'WinOS' });
// 	const result = pathIntoURL(path);
// 	// console.log({ result_forPOSIX, result_forWinOS, result });
// 	assert(result instanceof URL, 'Result should be a URL');
// 	assertEquals(result.protocol, 'file:', 'Protocol should be file:');
// 	assert(
// 		result.pathname.startsWith('/C:/'),
// 		'Pathname should be absolute with initial drive letter',
// 	);
// 	assert(result.pathname.includes('/file.ext'), 'Pathname should include file portion');
// 	// assertEquals(result, result_forWinOS, 'Results should match for WinOS option');
// });

test('pathIntoURL: file system (absolute) path semantics with base file', () => {
	const base_path = 'file://domain/foo_path/foo_file_or_folder';
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	const path = '/bar_path/bar_file.ext';
	const expected_protocol = 'file:';
	const expected_hostname = 'domain';
	const expected_pathname = '/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
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
	const base_path = 'file://domain/foo_path/foo_file_or_folder';
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	const path = 'bar_path/bar_file.ext';
	const expected_protocol = 'file:';
	const expected_hostname = 'domain';
	const expected_pathname = '/foo_path/foo_file_or_folder/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
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
	const base_path = 'http://domain/foo_path/foo_file_or_folder';
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	const path = '/bar_path/bar_file.ext';
	const expected_protocol = 'http:';
	const expected_hostname = 'domain';
	const expected_pathname = '/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
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
	const base_path = 'http://domain/foo_path/foo_file_or_folder';
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	const path = 'bar_path/bar_file.ext';
	const expected_protocol = 'http:';
	const expected_hostname = 'domain';
	const expected_pathname = '/foo_path/foo_file_or_folder/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
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
	const base_path = 'foo-scheme://domain/foo_path/foo_file_or_folder';
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	const path = '/bar_path/bar_file.ext';
	const expected_protocol = 'foo-scheme:';
	const expected_hostname = 'domain';
	const expected_pathname = '/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
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
	const base_path = 'foo-scheme://domain/foo_path/foo_file_or_folder';
	const base_as_file = new URL(base_path);
	const base_as_folder = new URL(base_path + $path.posix.sep);
	const path = 'bar_path/bar_file.ext';
	const expected_protocol = 'foo-scheme:';
	const expected_hostname = 'domain';
	const expected_pathname = '/foo_path/foo_file_or_folder/bar_path/bar_file.ext';
	const expected_href = `${expected_protocol}//${expected_hostname}${expected_pathname}`;
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
