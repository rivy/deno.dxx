// spell-checker:ignore (vars) arr gmsu

// import * as Spin from 'https://deno.land/x/wait/mod.ts';
import Yargs from 'https://deno.land/x/yargs@v17.0.1-deno/deno.ts';

import * as Spin from './lib/xWait/mod.ts';
import * as Me from './lib/xProcess.ts';

// console.warn(Me.runAsName, { Me });

// if (Deno.build.os === 'windows' && !Me.arg0) {
// 	console.warn(
// 		Me.runAsName +
// 			': warn: diminished capacity; full function requires an enhanced runner (use `dxr` or install with `dxi`)',
// 		{ Me },
// 	);
// }

const runAsName = Me.shimArg0 || Me.name;
const version = '0.0.1';

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = Yargs()
	.scriptName(Me.name)
	.usage(`$0 ${version}\n\nUsage:\n  ${runAsName} <command>`)
	// help and version setup
	.help(false)
	.version(false)
	.option('help', { describe: 'Show help', boolean: true })
	.alias('help', 'h')
	.option('version', { describe: 'Show version number', boolean: true })
	.alias('version', 'V')
	.showHelpOnFail(true, `Use \`${runAsName} --help\` to show available options`)
	// ref: <https://github.com/yargs/yargs-parser#configuration>
	.parserConfiguration({
		'camel-case-expansion': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'unknown-options-as-args': true,
	});

const args = app.parse(Me.args());

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (args.help) {
	console.log(await app.getHelp());
	Deno.exit(0);
}
if (args.version) {
	console.log(version);
	Deno.exit(0);
}

console.warn(Me.name, { args });

// Deno.exit(0);

const decoder = new TextDecoder(); // defaults to 'utf-8'
const encoder = new TextEncoder(); // defaults to 'utf-8'

// install (using `deno install`)
const spinnerInstallTextBase = 'Installing (using `deno install ...`) ...';
const spinnerForInstall = Spin
	.wait({
		text: spinnerInstallTextBase,
		spinner: 'dotsHigh3Dual',
		symbols: Spin.symbolStrings.emoji,
	})
	.start();
const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

const denoOptions = ['install'];
const runOptions: Deno.RunOptions = {
	cmd: ['deno', ...denoOptions, ...args._],
	stderr: 'piped',
	stdin: 'null',
	stdout: 'piped',
};
// console.warn(Me.name, { runOptions });
const process = Deno.run(runOptions);
const status = (await Promise.all([delay(2000), process.status()]))[1]; // add simultaneous delay to avoid visible spinner flash
const outStd = decoder.decode(await process.output()).replace(
	/^(\S+)(?=\s+Success)/gmsu,
	Spin.symbolStrings.emoji.success,
);
const outErr = decoder.decode(await process.stderrOutput());
if (status.success) {
	spinnerForInstall.succeed(spinnerInstallTextBase + ' done');
} else spinnerForInstall.fail(spinnerInstallTextBase + ' failed');
Deno.stdout.writeSync(encoder.encode(outStd));
Deno.stdout.writeSync(encoder.encode(outErr));

const shimBinPath = (() => {
	const m = outStd.match(/^\s*(.*[.](?:bat|cmd))\s*$/mu);
	if (m) return m[1];
	return '';
})();

console.warn(Me.name, { shimBinPath });

// enhance shim
Deno.exit(status.success ? 0 : status.code);
