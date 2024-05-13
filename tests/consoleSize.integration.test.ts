import { $semver, /* $fs, $path, */ assert /* , assertEquals */ } from './$deps.ts';
import {
	decode,
	// deepEqual,
	// env,
	// panicIfMissingPermits,
	// pathToOsStyle,
	// projectPath as maybeProjectPath,
	test,
} from './$shared.ts';

// import * as $consoleSize from './src/lib/console-size.ts';

const isWinOS = Deno.build.os == 'windows';

const shell = isWinOS ? 'cmd' : 'sh';
const shellOptions = isWinOS ? ['/d/c'] : ['-c'];

const denoOptionsFFI = $semver.satisfies(Deno.version.deno, '>= 1.38.0')
	? ['--allow-ffi', '--unstable-ffi']
	: ['--allow-ffi', '--unstable'];

test('consoleSize ~ fully redirected, no permissions', () => {
	const process = new Deno.Command('deno', {
		args: ['run', './tests/helpers/consoleSize.display-results.ts'],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});

test('consoleSize ~ fully redirected, run permission', () => {
	const process = new Deno.Command('deno', {
		args: ['run', '--allow-run', './tests/helpers/consoleSize.display-results.ts'],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});

test('consoleSize ~ fully redirected, FFI permission', () => {
	const process = new Deno.Command('deno', {
		args: ['run', '-A', ...denoOptionsFFI, './tests/helpers/consoleSize.display-results.ts'],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});

test('consoleSize ~ fully redirected, full permissions', () => {
	const process = new Deno.Command('deno', {
		args: ['run', '-A', './tests/helpers/consoleSize.display-results.ts'],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});

test('consoleSize ~ fully redirected, full permissions, via shell', () => {
	const process = new Deno.Command(shell, {
		args: [...shellOptions, 'deno run -A ./tests/helpers/consoleSize.display-results.ts'],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});

test('consoleSize ~ fully redirected, full permissions + FFI', () => {
	const process = new Deno.Command('deno', {
		args: ['run', '-A', ...denoOptionsFFI, './tests/helpers/consoleSize.display-results.ts'],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});

test('consoleSize ~ fully redirected, full permissions + FFI, via shell', () => {
	const process = new Deno.Command(shell, {
		args: [
			...shellOptions,
			`deno run -A ${denoOptionsFFI.join(' ')} ./tests/helpers/consoleSize.display-results.ts`,
		],
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const { code, stdout, stderr } = process.outputSync();
	const out = decode(stdout);
	const err = decode(stderr);
	if (code != 0) console.warn({ code, out, err });
	const results = JSON.parse(out);
	console.debug({ code, results });
	assert(code == 0, 'consoleSize integration test succeeds');
});
