import { $semver, /* $fs, $path, */ assert /* , assertEquals */ } from './$deps.ts';
import {
	decode,
	deepEqual,
	env,
	panicIfMissingPermits,
	// pathToOsStyle,
	// projectPath as maybeProjectPath,
	test,
} from './$shared.ts';

// import * as $consoleSize from './src/lib/console-size.ts';

//===

await panicIfMissingPermits([/* access to 'TERM' is required */ 'env']);

//===

const isWinOS = Deno.build.os == 'windows';

const shell = isWinOS ? 'cmd' : 'sh';
const shellOptions = isWinOS ? ['/d/c'] : ['-c'];

const denoOptionsFFI = $semver.satisfies(Deno.version.deno, '>= 1.38.0')
	? ['--allow-ffi', '--unstable-ffi']
	: ['--allow-ffi', '--unstable'];

const TERM = env('TERM') ?? 'xterm';

test('consoleSize ~ fully redirected, no permissions', () => {
	const cmd = 'deno';
	const args = ['run', './tests/helpers/consoleSize.display-results.ts'];
	const process = new Deno.Command(cmd, {
		args,
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
		env: !isWinOS ? { TERM } : {},
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});

test('consoleSize ~ fully redirected, run permission', () => {
	const cmd = 'deno';
	const args = ['run', '--allow-run', './tests/helpers/consoleSize.display-results.ts'];
	const process = new Deno.Command(cmd, {
		args,
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
		env: !isWinOS ? { TERM } : {},
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});

test('consoleSize ~ fully redirected, FFI permission', () => {
	const cmd = 'deno';
	const args = [
		'run',
		'--allow-all',
		...denoOptionsFFI,
		'./tests/helpers/consoleSize.display-results.ts',
	];
	const process = new Deno.Command(cmd, {
		args,
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
		env: !isWinOS ? { TERM } : {},
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});

test('consoleSize ~ fully redirected, full permissions', () => {
	const _vt = (() => {
		try {
			const process = new Deno.Command('powershell', {
				args: [
					'-nonInteractive',
					'-noProfile',
					'-executionPolicy',
					'unrestricted',
					'-command',
					'$Host.UI.SupportsVirtualTerminal',
				],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
				env: !isWinOS ? { TERM } : {},
			});
			const { code, stdout, stderr } = process.outputSync();
			console.debug({ code, stdout, stderr });
			return (code == 0) ? decode(stdout) : undefined;
		} catch (_) {
			return undefined;
		}
	})();
	console.debug({ '$Host.UI.SupportsVirtualTerminal': _vt });
	const cmd = 'deno';
	const args = ['run', '--allow-all', './tests/helpers/consoleSize.display-results.ts'];
	const process = new Deno.Command(cmd, { args, stdin: 'null', stdout: 'piped', stderr: 'piped' });
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});

test('consoleSize ~ fully redirected, full permissions, via shell', () => {
	const cmd = shell;
	const args = [
		...shellOptions,
		'deno run --allow-all ./tests/helpers/consoleSize.display-results.ts',
	];
	const process = new Deno.Command(cmd, {
		args,
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
		env: !isWinOS ? { TERM } : {},
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});

test('consoleSize ~ fully redirected, full permissions + FFI', () => {
	const cmd = 'deno';
	const args = [
		'run',
		'--allow-all',
		...denoOptionsFFI,
		'./tests/helpers/consoleSize.display-results.ts',
	];
	const process = new Deno.Command(cmd, {
		args,
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
		env: !isWinOS ? { TERM } : {},
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});

test('consoleSize ~ fully redirected, full permissions + FFI, via shell', () => {
	const cmd = shell;
	const args = [
		...shellOptions,
		`deno run --allow-all ${
			denoOptionsFFI.join(' ')
		} ./tests/helpers/consoleSize.display-results.ts`,
	];
	const process = new Deno.Command(cmd, {
		args,
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
		env: !isWinOS ? { TERM } : {},
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out) as { fn: string; v: { columns: number; rows: number } }[];
	console.debug({ cmd, args, code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
	const consoleSizeResult = results[0];
	assert(consoleSizeResult.fn === 'consoleSize', 'consoleSize() is first result');
	assert(
		results.reduce((matchOrNull, result) => {
			const equalOrNull = (result.v == null) || deepEqual(consoleSizeResult.v, result.v);
			if (!equalOrNull) {
				console.warn('Unmatched consoleSize sub-result\n', { consoleSizeResult, result });
			}
			return matchOrNull && equalOrNull;
		}, true),
		'all results match (or are null)',
	);
});
