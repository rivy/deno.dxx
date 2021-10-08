// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) dprint git

// ref: <https://github.com/denoland/deno/discussions/12113>
// ToDO: re-evaluate as `deno check` comes to fruition

import { Args, assert, decode, Path } from './$deps.ts';
import { createTestFn, projectPath, traversal } from './$shared.ts';

const expand = Args.shellExpandSync;

const test = createTestFn(import.meta.url);

const projectTypeScriptFiles = {
	examples: expand(Path.join(projectPath, 'eg/*.ts')),
	source: expand(Path.join(projectPath, 'src/**/*.ts')),
	tools: expand(Path.join(projectPath, 'tools/*.ts')),
	tests: expand(Path.join(projectPath, 'tests/**/*.ts')),
};

test(`syntax ~ examples compile correctly (${projectTypeScriptFiles.examples.length} found)`, async () => {
	const files = (projectTypeScriptFiles.examples).flatMap((e) =>
		traversal(e, Deno.cwd() + Path.SEP) || []
	);
	console.log({ files });
	const p = Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close()
	);
	if (!status.success) {
		console.warn({ status });
		console.warn(decode(out));
		console.warn(decode(err));
	}
	assert(status.success);
});

test(`syntax ~ source files (plus imports) compile correctly (${projectTypeScriptFiles.source.length} found)`, async () => {
	const files = (projectTypeScriptFiles.source).flatMap((e) =>
		traversal(e, Deno.cwd() + Path.SEP) || []
	);
	console.log({ files });
	const p = Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close()
	);
	if (!status.success) {
		console.warn({ status });
		console.warn(decode(out));
		console.warn(decode(err));
	}
	assert(status.success);
});

test(`syntax ~ test and benchmark files (plus imports) compile correctly (${projectTypeScriptFiles.tests.length} found)`, async () => {
	const files = (projectTypeScriptFiles.tests).flatMap((e) =>
		traversal(e, Deno.cwd() + Path.SEP) || []
	);
	console.log({ files });
	const p = Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close()
	);
	if (!status.success) {
		console.warn({ status });
		console.warn(decode(out));
		console.warn(decode(err));
	}
	assert(status.success);
});

test(`syntax ~ tools compile correctly (${projectTypeScriptFiles.tools.length} found)`, async () => {
	const files = (projectTypeScriptFiles.tools).flatMap((e) =>
		traversal(e, Deno.cwd() + Path.SEP) || []
	);
	console.log({ files });
	const p = Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close()
	);
	if (!status.success) {
		console.warn({ status });
		console.warn(decode(out));
		console.warn(decode(err));
	}
	assert(status.success);
});
