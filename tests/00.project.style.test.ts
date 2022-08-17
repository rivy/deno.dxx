// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) dprint git
// spell-checker:ignore (options) refname

// import { $colors } from './$deps.ts';
import { $args, $path, assert, assertEquals, equal } from './$deps.ts';
import {
	haveCommitLint,
	haveCSpell,
	haveCSpellVersion,
	panicIfMissingPermits,
	versionCompare,
} from './$shared.ts';
import {
	decode,
	haveDPrint,
	haveGit,
	isWinOS,
	projectLocations,
	projectPath,
	test,
} from './$shared.ts';

import { /* requires `env` permission */ setEnvFromArgs } from './$shared.permit.ts';

//===

// const permissionsRequired = ['--allow-env', '--allow-read', '--allow-run'];
// const permissionsGranted = await Promise.all(permissionsRequired.map(async (cliPermission) => {
// 	return ((await Deno.permissions.query(
// 		{ name: cliPermission.replace(/^--allow-/, '') } as Deno.PermissionDescriptor,
// 	))
// 		.state) === 'granted';
// }));
// const allPermissionsGranted = permissionsGranted.find((v) => !v) ?? true;
// // console.warn({ permissionsRequired, permissionsGranted, allPermissionsGranted });
// if (!allPermissionsGranted) {
// 	const errText = `Missing required permissions; re-run with all required permissions (${
// 		Deno.inspect(permissionsRequired, { colors: true })
// 	})`;
// 	// console.warn($colors.red('ERR!'), errText);
// 	const err = new Error(errText);
// 	err.stack = undefined;
// 	throw err;
// }

await panicIfMissingPermits([
	/* `setEnvFromArgs()` requires `env` permit */ 'env',
	'env',
	'read',
	'run',
]);
setEnvFromArgs(Deno.args);

//===

const args = $args.argsSync;

// import (experimental) *no-panic*/*no-prompt* EditorConfig package from '@rivy-labs' via `esm.sh` conversion CDN
// * `deno-std=0.134.0` pins polyfills to deno::std-v0.134.0 (prior to try...catch [prompting] behavior)
// * `pin=v90` == use specific esm.sh (for immutability)
import * as EditorConfig from 'https://esm.sh/@rivy-labs/-x-e34b1a4b-ab58-4d84-9787-309e53006932@0.16.0?deno-std=0.134.0&pin=v90';

const _haveEditorConfig = async () => (await Deno.lstat(projectLocations.editorconfig)).isFile;

function xSplit(s: string, sep: RegExp | string, options?: { trailing: boolean }) {
	const opts = { trailing: false, ...options };
	const r = s.split(sep);
	if (!opts.trailing && (r[r.length - 1] === '')) r.pop();
	return r;
}

const _gitLsFiles = (await haveGit())
	? () => {
		try {
			const p = Deno.run({
				cmd: ['git', 'ls-files', '--eol', '--full-name', projectPath],
				stdout: 'piped',
				stderr: 'piped',
			});
			return Promise
				.all([p.status(), p.output(), p.stderrOutput()])
				.then(([_status, out, _err]) => {
					return decode(out);
				})
				.finally(() => p.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	}
	: () => Promise.resolve(undefined);

const _gitFiles = xSplit((await _gitLsFiles()) || '', /r?\n|\r/);
// console.warn({ gitFiles });

const _ec = EditorConfig.parseString(Deno.readTextFileSync(projectLocations.editorconfig));
// console.warn({ ec });

const excludeDirsRxs = [
	'[._@#$]?build',
	'[._@#$]?coverage',
	'fixtures',
	'[.]git',
	'[.]gpg',
	'vendor',
];
const binaryFileExtRxs = '[.](cache|dll|exe|gif|gz|lib|zip|xz)';
const _crlfFilesRxs = '[.](bat|cmd)';
const _tabbedFilesRxs = '[.](bat|cmd)';

// ToDO: instead, use `git ls -r` for project files

const projectPotentialPaths = args(
	$path.join(projectPath, `!(${excludeDirsRxs.join('|')}){*,*/**/*}`),
)
	.filter((path) =>
		!$path.relative(projectPath, path).match(
			new RegExp(
				`(^|${$path.SEP_PATTERN})${excludeDirsRxs.join('|')}(${$path.SEP_PATTERN}|$)`,
				isWinOS ? 'i' : '',
			),
		)
	);

const projectFiles = projectPotentialPaths.filter((path) => Deno.lstatSync(path).isFile);
const projectNonBinaryFiles = projectFiles.filter((file) =>
	!$path.extname(file).match(new RegExp(binaryFileExtRxs, isWinOS ? 'i' : ''))
);
// const projectDirs = projectPaths.filter((s) => Deno.lstatSync(s).isDirectory);

// console.warn({ projectFiles, projectDirs });
// console.warn({ projectPath, projectDirs });

{
	const command = 'commitlint';
	const haveCommand = await haveCommitLint();
	const commitLintFrom = await (async () => {
		// find a commit-ish reference to use as base parent for "new" commits
		// * using "new" commits avoids testing for errors in earlier commits which might be "immutable" (ie, after being published)
		// * (in priority order) 'origin/last' (by project convention), a tag which contains HEAD~1 commit, or first repo commit hash
		const p = Deno.run({
			cmd: [
				...(isWinOS ? ['cmd', '/x/d/c'] : ['sh', '-c']),
				// POSIX requires quotes to avoid glob-expansion, *but* `Deno.run()` has a WinOS bug breaking any `cmd` element containing double-quotes
				// * ref: <https://github.com/denoland/deno/issues/8852>
				'git tag --list ' +
				(isWinOS ? '[#v]*' : '"[#v]*"') +
				' --contains origin/last --sort=v:refname' +
				' && git describe --tags --abbrev=0 HEAD~1 && git rev-list --max-parents=0 HEAD --abbrev-commit --abbrev=16',
			],
			stderr: 'piped',
			stdout: 'piped',
		});
		await p.status();
		return (decode(await p.output()).split(/\r?\n/))[0] || undefined;
	})();
	const exeArgs = ['--config', '.commitlint.config.js', '--from', commitLintFrom];
	const exeCmd = [command, ...exeArgs].join(' ');
	const cmd = [...(isWinOS ? ['cmd', '/x/d/c'] : []), exeCmd];
	const description = `style ~ \`${exeCmd}\``;
	if (!haveCommand) {
		test.skip(description + `...skipped (\`${command}\` not found)`);
	} else if (!commitLintFrom) {
		test.skip(description + `...skipped (unable to determine a \`--from\` commit)`);
	} else {
		// console.debug({ cSpellVersion, cSpellArgs, cmd });
		test(description, async () => {
			const p = Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
			const [status, out, err] = await Promise
				.all([p.status(), p.output(), p.stderrOutput()])
				.finally(() => p.close());
			// console.debug({ status, stdout: decode(out), stderr: decode(err) });
			if (!status.success) {
				console.warn(`\`${command}\` status`, status);
				console.warn(decode(out).replace(/\r?\n$/ms, ''));
				console.warn(decode(err).replace(/\r?\n$/ms, ''));
			}
			assert(status.success, `\`${command}\` check succeeds`);
		});
	}
}

{
	const cSpellVersion = await haveCSpellVersion();
	const command = 'cspell';
	const haveCommand = await haveCSpell();
	const exeArgs = [
		...((versionCompare(cSpellVersion, '5.0.0') >= 0) ? ['lint', '--no-progress'] : []),
		'--config',
		'./.vscode/cspell.json',
		'**',
	];
	const exeCmd = [command, ...exeArgs].join(' ');
	const cmd = [...(isWinOS ? ['cmd', '/x/d/c'] : []), exeCmd];
	const description = `style ~ \`${exeCmd}\``;
	if (!haveCommand) {
		test.skip(description + `...skipped (\`${command}\` not found)`);
	} else {
		// console.debug({ cSpellVersion, cSpellArgs, cmd });
		test(description, async () => {
			const p = Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
			const [status, out, err] = await Promise
				.all([p.status(), p.output(), p.stderrOutput()])
				.finally(() => p.close());
			// console.debug({ status, stdout: decode(out), stderr: decode(err) });
			if (!status.success) {
				console.warn(`\`${command}\` status`, status);
				console.warn(decode(out).replace(/\r?\n$/ms, ''));
				console.warn(decode(err).replace(/\r?\n$/ms, ''));
			}
			assert(status.success, `\`${command}\` check succeeds`);
		});
	}
}

test('style ~ `deno lint`', async () => {
	const p = Deno.run({ cmd: ['deno', 'lint'], stdin: 'null', stdout: 'piped', stderr: 'piped' });
	const [status, out, err] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(
		() => p.close()
	);
	if (!status.success) {
		console.warn('`deno lint` status', status);
		console.warn(decode(out).replace(/\r?\n$/ms, ''));
		console.warn(decode(err).replace(/\r?\n$/ms, ''));
	}
	assert(status.success, '`deno lint` fails');
});

{
	const description = 'style ~ `dprint check`';
	if (!await haveDPrint()) {
		test.skip(description + '...skipped (`dprint` not found)');
	} else {
		test(description, async () => {
			const p = Deno.run({
				cmd: ['dprint', 'check'],
				stdin: 'null',
				stdout: 'piped',
				stderr: 'piped',
			});
			const [status, out, err] = await Promise
				.all([p.status(), p.output(), p.stderrOutput()])
				.finally(() => p.close());
			if (!status.success) {
				console.warn('`dprint check` status', status);
				console.warn(decode(out).replace(/\r?\n$/ms, ''));
				console.warn(decode(err).replace(/\r?\n$/ms, ''));
			}
			assert(status.success, '`dprint check` fails');
		});
	}
}

test(`style ~ non-binary project files exist (${projectNonBinaryFiles.length} found)`, () => {
	assert(projectNonBinaryFiles.length > 0);
});

test('style ~ non-binary project files do not contain leading utf-8 BOM', () => {
	// # utf-8 BOM == 0xEF 0xBB 0xBF
	const UTF8_BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
	const flawedFiles = projectNonBinaryFiles.filter((file) => {
		const content = Deno.readFileSync(file);
		return (content.length > 0 && (equal(content.slice(0, 3), UTF8_BOM)));
	});
	if (flawedFiles.length > 0) {
		console.warn('The following files contain leading utf-8 BOM:');
		console.warn(flawedFiles);
	}
	assertEquals({ flawedFiles: 0 }, { flawedFiles: flawedFiles.length });
});

test('style ~ non-binary project files (when non-empty) end with a newline', () => {
	const flawedFiles = projectNonBinaryFiles.filter((file) => {
		const content = Deno.readTextFileSync(file);
		return (content.length > 0 && (!content.slice(-1).match(/\r|\n/ms)));
	});
	if (flawedFiles.length > 0) {
		console.warn('The following files do not end with a newline:');
		console.warn(flawedFiles);
	}
	assertEquals({ flawedFiles: 0 }, { flawedFiles: flawedFiles.length });
});

test('style ~ non-binary project files (when non-empty) use LF as newline by default', () => {
	const flaws = projectNonBinaryFiles.flatMap((file) => {
		const content = Deno.readTextFileSync(file);
		const lines: string[] = (content.length > 0) ? content.split(/(?<=\r?\n)/) : []; // CRLF | LF | CR
		// const content = Deno.readTextFileSync(file).split(/(?<=\r?\n|\r)/); // CRLF | LF | CR // ref: https://runkit.com/rivy/6146e4954b13950008d994ca
		const files: [string, number, string][] = [];
		// console.error({ file, lines: content.length });
		lines.forEach((line, index) => {
			// console.error({ file, index, line });
			if (!line.match(/(^|[^\r])\n$/)) files.push([file, index, line]);
		});
		return files;
	});
	if (flaws.length > 0) {
		console.warn(`The following ${flaws.length} line(s) have non-LF newlines:`);
		console.warn(
			flaws.map(([file, index, line]) =>
				`File: '${$path.relative(projectPath, file)}', Line: ${index}, "${line}"`
			),
		);
	}
	assertEquals({ flaws: 0 }, { flaws: flaws.length });
});

test('style ~ non-binary project files have no lines containing trailing whitespace', () => {
	const flaws = projectNonBinaryFiles.flatMap((file) => {
		const content = Deno.readTextFileSync(file).split(/\r?\n|\r/);
		const lines: [string, number, string][] = [];
		content.forEach((line, index) => {
			if (line.match(/\s$/)) lines.push([file, index, line]);
		});
		return lines;
	});
	if (flaws.length > 0) {
		console.warn(`The following ${flaws.length} line(s) contain trailing whitespace:`);
		console.warn(
			flaws.map(([file, index, _line]) =>
				`File: '${$path.relative(projectPath, file)}', Line: ${index}`
			),
		);
	}
	assertEquals({ flaws: 0 }, { flaws: flaws.length });
});
