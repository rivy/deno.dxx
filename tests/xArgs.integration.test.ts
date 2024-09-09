// ToDO: [2023-10-03; rivy] add integration tests for xArgs (via `deno run -A ../eg/args.ts ...`)

// test for special character handling of
// .. "~" `` [ ] { } ; : , . ? ! @ # $ % ^ " & | < > " ( ) "!x" [!v]*x [!vs]* %this% %%o/w-that%% "%%%the other" ~ *

// test for handling of special characters for both shimmer-enabled and non-shimmer runners

// NOTE: Deno CLI environment variable configuration
// ... from `deno --help`
//
// ENVIRONMENT VARIABLES:
//     DENO_AUTH_TOKENS     A semi-colon separated list of bearer tokens and
//                          hostnames to use when fetching remote modules from
//                          private repositories
//                          (e.g. "abcde12345@deno.land;54321edcba@github.com")
//     DENO_TLS_CA_STORE    Comma-separated list of order dependent certificate
//                          stores. Possible values: "system", "mozilla".
//                          Defaults to "mozilla".
//     DENO_CERT            Load certificate authority from PEM encoded file
//     DENO_DIR             Set the cache directory
//     DENO_INSTALL_ROOT    Set the `deno install` output directory
//                          (defaults to $HOME/.deno/bin)
//     DENO_REPL_HISTORY    Set REPL history file path
//                          History file is disabled when the value is empty
//                          (defaults to $DENO_DIR/deno_history.txt)
//     DENO_NO_PACKAGE_JSON Disables auto-resolution of package.json
//     DENO_NO_PROMPT       Set to disable permission prompts on access
//                          (alternative to passing --no-prompt on invocation)
//     DENO_NO_UPDATE_CHECK Set to disable checking if a newer Deno version is
//                          available
//     DENO_V8_FLAGS        Set V8 command line options
//     DENO_JOBS            Number of parallel workers used for the --parallel
//                          flag with the test subcommand. Defaults to number
//                          of available CPUs.
//     HTTP_PROXY           Proxy address for HTTP requests
//                          (module downloads, fetch)
//     HTTPS_PROXY          Proxy address for HTTPS requests
//                          (module downloads, fetch)
//     NPM_CONFIG_REGISTRY  URL to use for the npm registry.
//     NO_COLOR             Set to disable color
//     NO_PROXY             Comma-separated list of hosts which do not use a proxy
//                          (module downloads, fetch)

import {
	// $args,
	// $path,
	assert,
	assertEquals,
	// equal
} from './$deps.ts';
import {
	haveDeno,
	// haveDenoVersion,
	panicIfMissingPermits,
	// versionCompare,
} from './$shared.ts';
import {
	decode,
	env,
	// haveDPrint,
	// haveGit,
	isWinOS,
	// projectLocations,
	// projectPath,
	test,
} from './$shared.ts';

import { /* requires `env` permission */ setEnvFromArgs } from './$shared.permit.ts';

await panicIfMissingPermits([
	/* `setEnvFromArgs()` requires `env` permit */ 'env',
	'env',
	'read',
	'run',
]);
setEnvFromArgs(Deno.args);

//===

// `Deno.Command(...)` is required to have full control of argument format and requires Deno >= 1.28.0
// ToDO: add skip logic for Deno versions < 1.28.0 (which do not support `Deno.Command()`)
// ToDO: [2023-10-10; rivy] deal with CWD != projectPath

const haveCommand = await haveDeno();
// const command = 'deno';
const command = Deno.execPath(); // use `Deno.execPath()` instead of `deno` to avoid any `deno` shim (with possible shimmed environment changes)
const commandArgs: string[] = ['run', '-A', 'eg/args.ts'];
const exeArgs = [
	'-l',
	'~',
	// note: "'test this'" produces ['test', "this''"] unless an advanced shim (or unstable FFI) is used
	'"test this"',
	`"^" '' "" [ ] { } : , . ? ! @ $ % "!x" %this% %%o/w-that%% "%%%the other"`,
	`"^ & | < >"`, // special characters which are interpreted by WinOS very early must be always be *double-quoted*
	`"; # ( )"`, // special characters (for POSIX shells) should also be double-quoted (though single-quotes will also work when using an advanced shim runner)
	// "``", // ToDO [2023-11-04; rivy] add testing for backticks
];
const cliArgs = [...commandArgs, ...exeArgs];
const cliCmd = [command, ...cliArgs].join(' ');

const useCMD = isWinOS && !command.match(/[.](com|exe)$/); // `/[.](com|exe|bat|cmd)$/` also seems to work but might have internal/unknown argument parsing/quoting by `Deno.Command()`
const runner = isWinOS ? (useCMD ? 'cmd' : command) : env('SHELL') || 'bash';
const args = (() => {
	if (isWinOS) {
		return [...(useCMD ? ['/x/d/c', `"${[`"${command}"`, ...cliArgs].join(' ')}"`] : [...cliArgs])];
	}
	/* POSIX shell */
	return ['-c', [command, ...cliArgs].join(' ')];
})();

const description = `xArgs/CLI argument expansion ~ \`${cliCmd}\``;
// console.debug({ runner, args });
if (!haveCommand) {
	test.skip(`${description}...skipped (\`${command}\` not found)`);
} else {
	test(description, async () => {
		// note: `Deno.Command(...)` requires Deno >= 1.28.0
		const c = new Deno.Command(runner, {
			args,
			stdin: 'null',
			stdout: 'piped',
			stderr: 'piped',
			windowsRawArguments: true,
		});
		const { code, stdout, stderr } = await c.output();
		// console.debug(decode(stdout));
		// console.debug('stderr:', decode(stderr));
		if (code != 0) {
			console.warn(`\`${command}\` status`, code);
			console.warn(decode(stdout).replace(/\r?\n$/ms, ''));
			console.warn(decode(stderr).replace(/\r?\n$/ms, ''));
		}
		assert(code == 0, `\`${command}\` check succeeds`);
		const actual = decode(stdout).trimEnd().split(/\r?\n/ms);
		const expected = [
			env('HOME'),
			'test this',
			'^',
			'',
			'',
			'[',
			']',
			'{',
			'}',
			':',
			',',
			'.',
			'?',
			'!',
			'@',
			'$',
			'%',
			'!x',
			'%this%',
			'%%o/w-that%%',
			'%%%the other',
			'^ & | < >',
			'; # ( )',
			// '``', // ToDO [2023-11-04; rivy] add testing for backticks
		];
		assertEquals(actual, expected);
	});
}

// {
// 	// ToDO: [2023-10-10; rivy] deal with CWD != projectPath
// 	// const command = 'deno';
// 	const command = Deno.execPath(); // use `Deno.execPath()` instead of `deno` to avoid any `deno` shim (with possible shimmed environment changes)
// 	const commandArgs: string[] = ['run', '-A', /* '--unstable', */ 'eg/args.ts'];
// 	const haveCommand = await haveDeno();
// 	const exeArgs = ['*'];
// 	const exeCmd = [command, ...commandArgs, ...exeArgs].join(' ');
// 	const cmd = [...(isWinOS ? ['cmd', '/x/d/c'] : []), exeCmd];
// 	const description = `xArgs/CLI argument expansion ~ \`${exeCmd}\``;
// 	if (!haveCommand) {
// 		test.skip(description + `...skipped (\`${command}\` not found)`);
// 	} else {
// 		const fn = async () => {
// 			// console.debug({ cmd });
// 			// deno-lint-ignore no-deprecated-deno-api
// 			const p = Deno.run({ cmd, stdin: 'null', stdout: 'piped', stderr: 'piped' });
// 			const [status, out, err] = await Promise
// 				.all([p.status(), p.output(), p.stderrOutput()])
// 				.finally(() => p.close());
// 			// console.debug({ status, out, err });
// 			// console.debug({ status, stdout: decode(out), stderr: decode(err) });
// 			// console.debug(decode(out).replace(/\r?\n$/ms, ''));
// 			const o = decode(out).replace(/\r?\n$/ms, '');
// 			const e = decode(err).replace(/\r?\n$/ms, '');
// 			if (o != null && o !== '') console.debug(o);
// 			if (e != null && e !== '') console.debug('stderr:', e);
// 			// console.debug('out:', o);
// 			// console.debug('err:', e);
// 			// assert((o != null) && (o !== ''), `\`${exeCmd}\` output is not empty`);
// 			if (!status.success) {
// 				console.warn(`\`${command}\` status`, status);
// 				console.warn(decode(out).replace(/\r?\n$/ms, ''));
// 				console.warn(decode(err).replace(/\r?\n$/ms, ''));
// 			}
// 			assert(status.success, `\`${command}\` check succeeds`);
// 		};
// 		test(description, fn);
// 		// console.log('note:');
// 		// await fn();
// 	}
// }
