// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) dprint git

import { $args, $path, assert, assertEquals, equal } from './$deps.ts';
import { haveDPrint, isWinOS, projectPath, test } from './$shared.ts';

const args = $args.argsSync;

const excludeDirsRxs = ['[._@#$]?build', 'fixtures', '[.]git', '[.]gpg', 'vendor'];
const binaryFileExtRxs = '[.](cache|dll|exe|gif|gz|lib|zip|xz)';
const _crlfFilesRxs = '[.](bat|cmd)';
const _tabbedFilesRxs = '[.](bat|cmd)';

// ToDO: instead, use `git ls -r` for project files

const projectPaths = args($path.join(projectPath, `!(${excludeDirsRxs.join('|')}){*,*/**/*}`))
	.filter((path) =>
		!$path.relative(projectPath, path).match(
			new RegExp(
				`(^|${$path.SEP_PATTERN})${excludeDirsRxs.join('|')}(${$path.SEP_PATTERN}|$)`,
				isWinOS ? 'i' : '',
			),
		)
	);

const projectFiles = projectPaths.filter((path) => Deno.lstatSync(path).isFile);
const projectNonBinaryFiles = projectFiles.filter((file) =>
	!$path.extname(file).match(new RegExp(binaryFileExtRxs, isWinOS ? 'i' : ''))
);
// const projectDirs = projectPaths.filter((s) => Deno.lstatSync(s).isDirectory);

// console.warn({ projectFiles, projectDirs });
// console.warn({ projectPath, projectDirs });

test('style ~ `deno lint` succeeds', async () => {
	const p = Deno.run({ cmd: ['deno', 'lint'], stdin: 'null', stdout: 'piped', stderr: 'piped' });
	const [status] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(() =>
		p.close()
	);
	assert(status.success, '`deno lint` fails');
});

if (await haveDPrint()) {
	test('style ~ `dprint check` succeeds', async () => {
		const p = Deno.run({
			cmd: ['dprint', 'check'],
			stdin: 'null',
			stdout: 'piped',
			stderr: 'piped',
		});
		const [status] = await Promise.all([p.status(), p.output(), p.stderrOutput()]).finally(() =>
			p.close()
		);
		assert(status.success, '`dprint check` fails');
	});
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
		console.log('The following files contain leading utf-8 BOM:');
		console.log(flawedFiles);
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
