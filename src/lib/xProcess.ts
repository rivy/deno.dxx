// spell-checker:ignore (names) Deno
// spell-checker:ignore (vars) ARGX

import { Path } from './$deps.ts';

import * as xArgs from '../lib/xArgs.ts';

const isWinOS = Deno.build.os === 'windows';
const underEnhancedShell =
	((Deno.env.get('SHELL') || '').match(/[\\\/][^\\\/]*?sh$/msu) || []).length > 0;

// FixME: problematic transfer of information down to sub-processes
// ?... consume/reset all ENV variables when accessed;
//      this might work if using customized env variables so only xProcess-aware apps would access the variables
//      EXCEPT what of intervening non-xProcess aware app? The sub-process would see the API ENV vars but set for the non-aware parent by the grandparent.
//      Seems to need a variable which is process specific (similar to `GetCommandLine()`) or a way to specify the target sub-process.
// ?... same for SHIM_PIPE? (rename to xProcess_PIPE?)

// FixME: avoid double-expansions of command lines
// ?... use a stop-expansion token; but not transparent, requires coop of user process for option/argument processing
// ?... use separate ENV var for expanded command line (re-quoted) ... sub-processes would only "bareWS" tokenize and de-quote

const DQ = '"';
const SQ = "'";
// const DQStringReS = `${DQ}[^${DQ}]*(?:${DQ}|$)`; // double-quoted string (unbalanced at end-of-line is allowed)
// const SQStringReS = `${SQ}[^${SQ}]*(?:${SQ}|$)`; // single-quoted string (unbalanced at end-of-line is allowed)
// const DQStringStrictReS = '"[^"]*"'; // double-quoted string (quote balance is required)
// const SQStringStrictReS = "'[^']*'"; // single-quoted string (quote balance is required)

function deQuote(s?: string) {
	// ToDO: refactor/refine function
	if (!s) return s;
	let m = s.match(new RegExp(`${DQ}([^${DQ}]*)(?:${DQ}|$)`, 'msu'));
	if (m) return m[1];
	m = s.match(new RegExp(`${SQ}([^${SQ}]*)(?:${SQ}|$)`, 'msu'));
	if (m) return m[1];
	return s;
}

// needs ~ for best CLI operations
// ToDO: add conversion to URL (robustly; handling thrown error if present) o/w Path.toFileUrl(Path.resolve(...))
export const shimTargetURL = deQuote(Deno.env.get('DENO_SHIM_URL'));
// console.warn('xProcess', { shimTargetURL });
const isShimTarget = (shimTargetURL === Deno.mainModule); // ToDO: use `isShimTarget` to gate SHIM_ARGS/ARGx
/** * executable string which initiated execution of the current process */
export const shimArg0 = isShimTarget ? Deno.env.get('DENO_SHIM_ARG0') : undefined; // note: DENO_SHIM_ARG0 == `[runner [runner_args ]]name`
/** * raw argument text string for current process (needed for modern Windows argument processing, but generally not useful for POSIX) */
export const argsTextRaw = Deno.env.get('DENO_SHIM_ARGS');
/** * already expanded argument text (re-quoted); when present, avoids double-expansions for sub-processes */
export const argsTextPreExpanded = Deno.env.get('DENO_SHIM_ARGX');
export const argsText = argsTextPreExpanded || argsTextRaw;

export const targetURL = Deno.env.get('DENO_SHIM_URL');

export const enhanced = shimArg0 ? true : underEnhancedShell;
export const impaired = isWinOS && !enhanced;

// ... ToDO: add `alreadyExpanded` boolean to correctly avoid re-expansion for `args()`

/** * Promise for an array of 'shell'-expanded arguments; simple pass-through of `Deno.args` for non-Windows platforms */
export const argsAsync = async () => {
	if (!isWinOS || underEnhancedShell) return [...Deno.args]; // pass-through of `Deno.args` for non-Windows platforms // ToDO: investigate how best to use *readonly* Deno.args
	return await xArgs.argsAsync(argsText || Deno.args); // ToDO: add type ArgsOptions = { suppressExpansion: boolean } == { suppressExpansion: false }
};

/** * array of 'shell'-expanded arguments; simple pass-through of `Deno.args` for non-Windows platforms */
export const argsSync = () => {
	if (!isWinOS || underEnhancedShell) return [...Deno.args]; // pass-through of `Deno.args` for non-Windows platforms // ToDO: investigate how best to use *readonly* Deno.args
	return xArgs.argsSync(argsText || Deno.args); // ToDO: add type ArgsOptions = { suppressExpansion: boolean } == { suppressExpansion: false }
};

/** * array of 'shell'-expanded arguments; simple pass-through of `Deno.args` for non-Windows platforms */
export const args = argsSync;

/** * path string of main script file (best guess from all available sources) */
export const path = (() => {
	const denoExec = Deno.execPath();
	const nameFromArg0 = shimArg0 ? xArgs.wordSplitCLText(shimArg0).pop() : undefined;
	return nameFromArg0
		? nameFromArg0
		: !Path.basename(denoExec).match(/^deno([.]exe)?$/)
		? denoExec
		: Deno.mainModule;
})();

/** * name of main script file (best guess from all available sources) */
export const name = Path.parse(path).name;

/** * executable string which can be used to re-run current application; eg, `Deno.run({cmd: [ runAs, ... ]});` */
export const runAs = shimArg0 || name;

export const impairedWarningMessage = () => {
	return impaired
		? `diminished capacity; full function requires an enhanced runner (use \`dxr\` or install with \`dxi\`)`
		: undefined;
};

// deno-lint-ignore no-explicit-any
export const warnIfImpaired = (writer?: (...args: any[]) => void) => {
	if (impaired && impairedWarningMessage()) {
		if (writer) writer(impairedWarningMessage());
		else console.warn(`WARN/[${name}]: ` + impairedWarningMessage());
	}
};

/** * information related to any 'shim'-executable initiating the main script, when available */
export const shim = {
	// useful ~ for Windows modification of parent environment (needed for creation of equivalents for enhanced-`cd` (`enhan-cd`, `goto`, `scd`, ...) and `source` applications) // spell-checker:ignore enhan
	/** * path of pipe file (an escape hatch which allows modification of parent environment (variables and CWD)) */
	PIPE: Deno.env.get('DENO_SHIM_PIPE'),
	// implementation detail // ToDO? remove as implementation detail?
	/** * executable path of secondary shim (when needed; generally defined only for Windows) */
	EXEC: Deno.env.get('DENO_SHIM_EXEC'),
};

// consume/reset SHIM environment variables to avoid interpretation by a sub-process
Deno.env.set('DENO_SHIM_ARG0', '');
// ... ARGS, ARGX, and URL could be avoided if `GetCommandLine()` is available and full text control of sub-process arguments is enabled
Deno.env.set('DENO_SHIM_ARGS', '');
Deno.env.set('DENO_SHIM_ARGX', '');
Deno.env.set('DENO_SHIM_URL', '');
// ... EXEC is really an implementation detail (for maximum command line content flexibility within a no-'Terminate batch job (Y/N)?' formulated batch file)
Deno.env.set('DENO_SHIM_EXEC', '');
// ... PIPE is used to allow passage of ENV variable and CWD changes back up to the parent SHIM process (needed for utilities like `cdd`, `source`, etc.)
Deno.env.set('DENO_SHIM_PIPE', '');
