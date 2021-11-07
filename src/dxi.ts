// spell-checker:ignore (names) Deno ; (vars) arr gmsu ; (text) positionals

import { Lodash as _, Path, Yargs } from './lib/$deps.ts';
import { $version as Version, decoder, encoder, logger } from './lib/$shared.ts';

// import * as LogSymbols from '../src/lib/xWait/log_symbols.ts';
// import * as Version from './lib/version.ts';
import * as Me from './lib/xProcess.ts';
import * as Spin from './lib/xWait/$mod.ts';

import { consoleSize } from './lib/consoleSize.ts';

// Me.warnIfImpaired(); // non-essential, so avoid for `dxi`; allows normal (non-warning) execution from installation via `deno install ...`

const isWinOS = Deno.build.os === 'windows';
// const symbolDebug = LogSymbols.symbolStrings.emoji.debug;

const version = Version.v();
const runAsName = Me.runAs;

logger.mergeMetadata({ authority: Me.name });

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = Yargs(undefined, undefined, undefined)
	.scriptName(Me.name)
	.usage(
		`$0 ${version}\n\nUsage:\n  ${runAsName} [OPTIONS..] <COMMAND>`,
		undefined,
		undefined,
		undefined,
	)
	.wrap(Math.min((await consoleSize())?.columns ?? 80, 100))
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
	})
	.updateStrings({ 'Positionals:': 'Arguments:' })
	.positional('OPTIONS', {
		describe: 'options (as listed; may also include any `deno install` options)',
	})
	.positional('COMMAND', { describe: 'Path/URL of command to install' })
	.option('debug', { describe: 'Show debug logging', boolean: true })
	.option('trace', {
		describe: 'Show trace (lower-level/higher-detail debug) logging',
		boolean: true,
	});

const args = app.parse(Me.args(), undefined, undefined);

await logger.debug({ args });

if (args.debug) logger.mergeMetadata({ Filter: { level: 'debug' } });
if (args.trace) logger.mergeMetadata({ Filter: { level: 'trace' } });
await logger.resume();

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (args.help) {
	console.log(await app.getHelp());
	Deno.exit(0);
}
if (args.version) {
	console.log(version);
	Deno.exit(0);
}

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
await logger.debug({ runOptions });
const process = Deno.run(runOptions);
const status = (await Promise.all([delay(1000), process.status()]))[1]; // add simultaneous delay to avoid visible spinner flash
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

await logger.debug({ shimBinPath });

import { eol } from './lib/eol.ts';
import { cmdShimTemplate, shimInfo } from './lib/shim.windows.ts';

const enablePipe = true;

// enhance shim for successful installs on the Windows platform
if (status.success && isWinOS) {
	const contentsOriginal = eol.LF(decoder.decode(await Deno.readFile(shimBinPath)));
	const shimBinName = Path.parse(shimBinPath).name;
	const info = shimInfo(contentsOriginal);
	const { denoRunOptions, denoRunTarget } = info;
	const contentsUpdated = eol.CRLF(
		_.template(cmdShimTemplate(enablePipe))({ denoRunOptions, denoRunTarget, shimBinName }),
	);
	Deno.writeFileSync(shimBinPath, encoder.encode(contentsUpdated));
	Deno.stdout.writeSync(
		encoder.encode(
			`${Spin.symbolStrings.emoji.success} Successfully enhanced installation of \`${shimBinName}\`\n`,
		),
	);
}

// done
Deno.exit(status.success ? 0 : status.code);
