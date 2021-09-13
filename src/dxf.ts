// spell-checker:ignore (vars) ARGX arr gmsu ; (utils) dprint dprintrc

import { fs } from './lib/$deps.ts';

import * as Me from './lib/xProcess.ts';

Me.warnIfImpaired();

// const isWinOS = Deno.build.os === 'windows';
// const pathSeparator = isWinOS ? /[\\/]/ : /\//;
// const pathListSeparator = isWinOS ? /;/ : /:/;
// const paths = Deno.env.get('PATH')?.split(pathListSeparator) || [];
// const pathExtensions = (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [];
// const pathCaseSensitive = !isWinOS;

// console.warn(Me.name, { Me });

const args = Me.args();

// console.warn(Me.name, { args, args });

const runOptions: Deno.RunOptions = (() => {
	let options: Deno.RunOptions;
	const dprintConfigPaths = ['.dprint.json', 'dprint.json', '.dprintrc.json'];
	const dprintConfigPath = dprintConfigPaths.filter(fs.existsSync);
	if (dprintConfigPath.length > 0) {
		// console.info(Me.name, 'Using `dprint` formatting');
		const dprintConfig = dprintConfigPath ? ['--config', dprintConfigPath[0]] : [];
		const dprintConfigArgs = [...dprintConfig, ...args];
		const cmdPath = 'dprint';
		const cmdArgs = ['fmt', ...dprintConfigArgs, ...args];
		const cmd = [cmdPath, ...cmdArgs];
		// console.warn(Me.name, { cmd });
		options = {
			cmd,
			stderr: 'inherit',
			stdin: 'inherit',
			stdout: 'inherit',
			// env: {
			// 	DENO_SHIM_ARG0: cmdPath,
			// 	DENO_SHIM_ARGX: cmdArgs.join(' '),
			// 	DENO_SHIM_URL: cmdPath,
			// },
		};
	} else {
		// console.info(Me.name, 'Using `deno` formatting');
		const cmdPath = 'deno';
		const cmdArgs = ['fmt', ...args];
		const cmd = [cmdPath, ...cmdArgs];
		// console.warn(Me.name, { cmd });
		options = {
			cmd,
			stderr: 'inherit',
			stdin: 'inherit',
			stdout: 'inherit',
			// env: {
			// 	DENO_SHIM_ARG0: cmdPath,
			// 	DENO_SHIM_ARGX: cmdArgs.join(' '),
			// 	DENO_SHIM_URL: cmdPath,
			// },
		};
	}
	return options;
})();

// console.warn(Me.name, { runOptions });
const process = Deno.run(runOptions);
const status = await process.status();
Deno.exit(status.success ? 0 : status.code);
