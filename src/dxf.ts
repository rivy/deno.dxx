// spell-checker:ignore (vars) ARGX arr gmsu ; (utils) dprint dprintrc

import { exists, existsSync } from 'https://deno.land/std@0.83.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.83.0/fs/expand_glob.ts';
import { walk, walkSync } from 'https://deno.land/std@0.83.0/fs/walk.ts';
const fs = { exists, existsSync, expandGlob, expandGlobSync, walk, walkSync };

import * as Me from './lib/xProcess.ts';

// const isWinOS = Deno.build.os === 'windows';
// const pathSeparator = isWinOS ? /[\\/]/ : /\//;
// const pathListSeparator = isWinOS ? /;/ : /:/;
// const paths = Deno.env.get('PATH')?.split(pathListSeparator) || [];
// const pathExtensions = (isWinOS && Deno.env.get('PATHEXT')?.split(pathListSeparator)) || [];
// const pathCaseSensitive = !isWinOS;

// console.warn(Me.name, { Me });

if (Deno.build.os === 'windows' && !Me.shimArg0) {
	console.warn(
		Me.name +
			': warn: diminished capacity; full function requires an enhanced runner (use `dxr` or install with `dxi`)',
	);
}

const args = Me.args();

// console.warn(Me.name, { args, args });

const runOptions: Deno.RunOptions = (() => {
	let options: Deno.RunOptions;
	const dprintConfigPaths = ['.dprint.json', 'dprint.json', '.dprintrc.json'];
	const dprintConfigPath = dprintConfigPaths.filter(fs.existsSync);
	if (dprintConfigPath) {
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
