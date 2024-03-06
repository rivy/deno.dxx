// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) dprint git

// ref: <https://github.com/denoland/deno/discussions/12113>
// ToDO: re-evaluate as `deno check` comes to fruition

import { $args, $colors, $path, assert } from './$deps.ts';
import {
	decode,
	haveMadge,
	isWinOS,
	panicIfMissingPermits,
	projectPath as maybeProjectPath,
	test,
	traversal,
} from './$shared.ts';

//===

await panicIfMissingPermits(['read', 'run']);

//===

if (maybeProjectPath == null) {
	throw new Error('`projectPath` is not defined; unable to determine project files for testing');
}
const projectPath = maybeProjectPath;

//===

const expand = $args.shellExpandSync;

const projectCodeFilesByKind: Record<string, string[]> = {
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
const projectCodeFiles = Object.keys(projectCodeFilesByKind).flatMap((arr) =>
	projectCodeFilesByKind[arr].flat()
);

test(`syntax ~ all code files compile/reload w/o warnings (${projectCodeFiles.length} found)`, async () => {
	const files = projectCodeFiles.flatMap((e) => traversal(e) || []);
	console.log({ files });
	// deno-lint-ignore no-deprecated-deno-api
	const p = Deno.run({
		cmd: ['deno', 'test', '--reload', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close()
	);
	const haveWarnings = $colors.stripColor(decode(err)).match(/^warning/ims) != null;
	if (!status.success || haveWarnings) {
		console.warn({ status, haveWarnings });
		console.warn(decode(out));
		console.warn(decode(err));
	}
	assert(status.success && !haveWarnings);
});

{
	const description = 'syntax ~ no circular dependency found';
	if (!await haveMadge()) {
		test.skip(description + '...skipped (`madge` not found)');
	} else {
		test(description + ` (within ${projectCodeFiles.length}+ files)`, async () => {
			const files = projectCodeFiles.flatMap((e) => traversal(e) || []);
			const cmd = [...(isWinOS ? ['cmd', '/x/d/c'] : []), 'madge', '--circular', '--no-spinner']
				.concat(files);
			console.log({ files });
			// deno-lint-ignore no-deprecated-deno-api
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
}

test(`syntax ~ examples compile correctly (${projectCodeFilesByKind.examples.length} found)`, async () => {
	const files = projectCodeFilesByKind.examples.flatMap((e) => traversal(e) || []);
	console.log({ files });
	// deno-lint-ignore no-deprecated-deno-api
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

test(`syntax ~ source files (plus imports) compile correctly (${projectCodeFilesByKind.source.length} found)`, async () => {
	const files = projectCodeFilesByKind.source.flatMap((e) => traversal(e) || []);
	console.log({ files });
	// deno-lint-ignore no-deprecated-deno-api
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

test(`syntax ~ test and benchmark files (plus imports) compile correctly (${projectCodeFilesByKind.tests.length} found)`, async () => {
	const files = projectCodeFilesByKind.tests.flatMap((e) => traversal(e) || []);
	console.log({ files });
	// deno-lint-ignore no-deprecated-deno-api
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

test(`syntax ~ tools compile correctly (${projectCodeFilesByKind.tools.length} found)`, async () => {
	const files = projectCodeFilesByKind.tools.flatMap((e) => traversal(e) || []);
	console.log({ files });
	// deno-lint-ignore no-deprecated-deno-api
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
