// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) dprint git

// ref: <https://github.com/denoland/deno/discussions/12113>
// ToDO: re-evaluate as `deno check` comes to fruition

// import { $colors } from './$deps.ts';
import { $args, $path, assert } from './$deps.ts';
import {
	decode,
	haveMadge,
	isWinOS,
	panicIfMissingPermits,
	projectPath,
	test,
	traversal,
} from './$shared.ts';

//===

await panicIfMissingPermits(['read', 'run']);

//===

const expand = $args.shellExpandSync;

const projectTypeScriptFiles: Record<string, string[]> = {
	// benchmarks: expand(
	// 	['bench', 'benchmark', 'benchmarks'].map((s) => $path.join(projectPath, s, '*.ts')),
	// 	{ nullglob: true },
	// ),
	examples: expand(['eg', 'egs', 'examples'].map((s) => $path.join(projectPath, s, '*.ts')), {
		nullglob: true,
	}),
	source: expand(['source', 'src'].map((s) => $path.join(projectPath, s, '**/*.ts')), {
		nullglob: true,
	}),
	tools: expand($path.join(projectPath, 'tools/*.ts'), { nullglob: true }),
	tests: expand(
		['t', 'test', 'tests', 'bench', 'benchmark', 'benchmarks'].map((s) =>
			$path.join(projectPath, s, '**/*.ts')
		),
		{ nullglob: true },
	),
};
const projectFiles = Object.keys(projectTypeScriptFiles).flatMap((arr) =>
	projectTypeScriptFiles[arr].flat()
);

if (await haveMadge()) {
	test(`syntax ~ no circular references found (within ${projectFiles.length}+ files)`, async () => {
		const files = (projectFiles).flatMap((e) => traversal(e) || []);
		const cmd = [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'madge', '--circular', '--no-spinner']
			.concat(files);
		console.log({ files });
		const p = Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
		const [status, out, err] = await Promise
			.all([p.status(), p.output(), p.stderrOutput()])
			.finally(() => p.close());
		// console.debug({ status, stdout: decode(out), stderr: decode(err) });
		if (!status.success) {
			console.warn('`madge` status', status);
			console.warn(decode(out).replace(/\r?\n$/ms, ''));
			console.warn(decode(err).replace(/\r?\n$/ms, ''));
		}
		assert(status.success, '`madge` circular reference check succeeds');
	});
}

test(`syntax ~ examples compile correctly (${projectTypeScriptFiles.examples.length} found)`, async () => {
	const files = (projectTypeScriptFiles.examples).flatMap((e) => traversal(e) || []);
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
	const files = (projectTypeScriptFiles.source).flatMap((e) => traversal(e) || []);
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
	const files = (projectTypeScriptFiles.tests).flatMap((e) => traversal(e) || []);
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
	const files = (projectTypeScriptFiles.tools).flatMap((e) => traversal(e) || []);
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
