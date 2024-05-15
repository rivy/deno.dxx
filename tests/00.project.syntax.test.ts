// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) dprint git

// ref: <https://github.com/denoland/deno/discussions/12113>
// ToDO: re-evaluate as `deno check` comes to fruition

import { Deprecated } from '../src/lib/$deprecated.ts';

import { $args, $colors, $path, assert, assertEquals } from './$deps.ts';
import {
	decode,
	haveExpectVersion,
	haveMadgeVersion,
	isWinOS,
	panicIfMissingPermits,
	projectPath as maybeProjectPath,
	test,
	traversal,
	versionCompare,
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
	examples: expand(
		['eg', 'egs', 'examples'].map((s) => $path.join(projectPath, s, '*.ts')),
		{
			nullglob: true,
		},
	),
	libs: expand(
		['source', 'src'].map((s) => $path.join(projectPath, s, 'lib/**/*.ts')),
		{
			nullglob: true,
		},
	),
	source: expand(
		['source', 'src'].map((s) => $path.join(projectPath, s, '**/*.ts')),
		{
			nullglob: true,
		},
	),
	tools: expand($path.join(projectPath, 'tools/*.ts'), { nullglob: true }),
	tests: expand(
		['t', 'test', 'tests', 'bench', 'benchmark', 'benchmarks'].map((s) =>
			$path.join(projectPath, s, '**/*.ts'),
		),
		{ nullglob: true },
	),
};
const projectCodeFiles = Object.keys(projectCodeFilesByKind).flatMap((arr) =>
	// 'libs' are all duplicates of 'source' files
	arr != 'libs' ? projectCodeFilesByKind[arr].flat() : [],
);

test(`syntax ~ all code files compile/reload w/o warnings (${projectCodeFiles.length} found)`, async () => {
	const files = projectCodeFiles.flatMap((e) => traversal(e) || []);
	console.log({ files });

	const p = Deprecated.Deno.run({
		cmd: ['deno', 'test', '--reload', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close(),
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
	const madgeVersion = await haveMadgeVersion();
	if (madgeVersion == null) {
		test.skip(description + '...skipped (`madge` not found)');
	} else if (versionCompare(madgeVersion, '7.0') >= 0) {
		// ## maint: [2024-04-25; rivy] disable test for madge v7+ until fixed for typescript projects
		// ## ... ref: [Update typescript support for v7](https://github.com/pahen/madge/issues/410)
		test.skip(description + '...skipped (`madge` version >= 7)');
	} else {
		test(description + ` (within ${projectCodeFiles.length}+ files)`, async () => {
			const files = projectCodeFiles.flatMap((e) => traversal(e) || []);
			const cmd = [
				...(isWinOS ? ['cmd', '/x/d/c'] : []),
				'madge',
				'--circular',
				'--no-spinner',
			].concat(files);
			console.log({ files });

			const p = Deprecated.Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
			const [status, out, err] = await Promise.all([
				p.status(),
				p.output(),
				p.stderrOutput(),
			]).finally(() => p.close());
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

	const p = Deprecated.Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close(),
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

	const p = Deprecated.Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close(),
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

	const p = Deprecated.Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close(),
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

	const p = Deprecated.Deno.run({
		cmd: ['deno', 'test', '--no-run'].concat(files),
		stdin: 'null',
		stdout: 'piped',
		stderr: 'piped',
	});
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close(),
	);
	if (!status.success) {
		console.warn({ status });
		console.warn(decode(out));
		console.warn(decode(err));
	}
	assert(status.success);
});

// ref: [HowTO test that a module is *no-panic* and *no-prompt* when statically imported?](https://github.com/denoland/deno/discussions/15356)

test(`syntax ~ all libs are *no-panic* (${projectCodeFilesByKind.libs.length} found)`, async () => {
	const files = projectCodeFilesByKind.libs.flatMap((e) => traversal(e) || []);
	console.log({ files });

	const flawedFilesPromises = files.map(async (file) => {
		const cmd = ['deno', 'run', '--no-prompt', '--', file];
		// console.debug({ cmd });
		const p = Deprecated.Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
		const [status, out, err] = await Promise.all([
			p.status(),
			p.output(),
			p.stderrOutput(),
		]).finally(() => p.close());
		return !status.success
			? { file, cmd: cmd.join(' '), status, out: decode(out), err: decode(err) }
			: undefined;
	});
	const flawedFiles = (await Promise.all(flawedFilesPromises)).filter(Boolean);
	if (flawedFiles.length > 0) {
		console.warn('The following files *panic* when run via `deno run --no-prompt FILE`:');
		console.warn(flawedFiles);
	}
	assertEquals({ flawedFiles: 0 }, { flawedFiles: flawedFiles.length });
});

{
	const description = `syntax ~ all libs are *no-prompt* (${projectCodeFilesByKind.libs.length} found)`;
	const expectVersion = await haveExpectVersion();
	if (expectVersion == null) {
		test.skip(description + '...skipped (`expect` not found)');
	} else {
		test(description, async () => {
			const files = projectCodeFilesByKind.libs.flatMap((e) => traversal(e) || []);
			console.log({ files });

			const flawedFilesPromises = files.map(async (file) => {
				// spell-checker:ignore noecho
				const cmd = [
					'expect',
					'-c',
					`spawn -noecho deno run -- "${file.replace(
						'$',
						'\\$',
					)}" 2>&1 ; expect -regexp ".+" { exit 1 } ;`,
				];
				const p = Deprecated.Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
				const [status, out, err] = await Promise.all([
					p.status(),
					p.output(),
					p.stderrOutput(),
				]).finally(() => p.close());
				return !status.success
					? { file, cmd: cmd.join(' '), status, out: decode(out), err: decode(err) }
					: undefined;
			});
			const flawedFiles = (await Promise.all(flawedFilesPromises)).filter(Boolean);
			if (flawedFiles.length > 0) {
				console.warn('The following files *prompt* when run via `deno run FILE`:');
				console.warn(flawedFiles);
			}
			assertEquals({ flawedFiles: 0 }, { flawedFiles: flawedFiles.length });
		});
	}
}
