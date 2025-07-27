// rewrite imports for file(s), using import map aliases from remote vendored modules
// * allows direct CDN import of vendored modules
// note: idempotent if/when run multiple times

// spell-checker:ignore (people) rivy
// spell-checker:ignore (shell/cmd) COMSPEC ERRORLEVEL NULLGLOB PATHEXT

// NOTE: [2023-07-27; rivy] ~ avoid using this to rewrite imports from vendor folders in the same repo/commit, as `deno vendor ...` will not succeed on modules which refer to files within the target 'vendored' folder
// ToDO: [2023-11-22; rivy] ~ add vendor location corrections for `// @deno-types=...` lines
// ToDO: [2023-11-22; rivy] ~ improve uses of path/URLs
// ToDO: [2023-11-22; rivy] ~ improve robustness, allowing possible use of non-vendor import mappings

// import { permitsAsync } from '../src/lib/$shared.TLA.ts';
import {
	$colors,
	// $fs,
	// $lodash,
	// $path,
} from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$deps.ts';

import {
	// decoder,
	// encoder,
	intoURL,
	pathFromURL,
} from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$shared.ts';

import {
	// abortIfMissingPermits,
	abortIfMissingPermitsSync,
	env,
} from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$shared.ts';

import * as $me from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/xProcess.ts';
import * as $consoleSize from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/consoleSize.ts';

import {
	$logger,
	logger,
} from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$shared.ts';

// import { eol as $eol } from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/eol.ts';
import { restyleYargsHelp } from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/restyleYargsHelp.ts';

//===

import {
	$yargs,
	type YargsArguments,
} from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$deps.cli.ts';

//===

import {
	dirname,
	fromFileUrl,
	join,
	relative,
	resolve,
	// toFileUrl,
} from 'https://deno.land/std@0.224.0/path/mod.ts';
import { toText } from 'https://deno.land/std@0.224.0/streams/mod.ts';

import * as $lib from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$shared.ts';
// $lib.intoPlatformPath();
import { traversal } from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@7a17530aab/src/lib/$shared.ts';

//===

abortIfMissingPermitsSync(
	([] as Deno.PermissionName[]).concat(
		['env'], // required shim/process argument expansion and environmental controls (eg, using DEBUG, LOG_LEVEL, NO_COLOR, NO_UNICODE, NULLGLOB, ...)
		['read'], // required for shim targeting of argument expansion and 'yargs'
		// ['run'], // (optional) required for consoleSize fallback when stdin and stderr are both redirected
		// * script specific requirements
		['env'], // required for `typescript`
		['net'], // (optional) but required for network fetches of files and/or vendor imports
		['read', 'write'], // required to read/write local files
	),
);

//===

// import ts from 'https://esm.sh/typescript@5.7.3';
// [why]: the `typescript` module attempts to read multiple environment variables when used after being statically imported
//    ... as a workaround to avoid the permission prompt, we dynamically import it after the `abortIfMissingPermits` check
//    ... JSDelivr and 'deno.vendor-storage' is used to ensure immutability of imported modules after esm.sh removed pinning and immutability guarantees
///import type tsTypes from 'https://esm.sh/typescript@5.7.3'; // types only (workaround for loss of typescript namespace import with dynamic import)
///const tsM = await import('https://esm.sh/typescript@5.7.3'); // dynamically import TypeScript after `abortIfMissingPermits`; avoids permission prompts
import type tsTypes from 'https://cdn.jsdelivr.net/gh/rivy-t/deno.vendor-storage@614722de3b/vendor/deno@1.46.3-vendor/esm.sh/typescript@5.7.3.js'; // types only (workaround for loss of typescript namespace import with dynamic import)
const tsM = await import(
	'https://cdn.jsdelivr.net/gh/rivy-t/deno.vendor-storage@614722de3b/vendor/deno@1.46.3-vendor/esm.sh/typescript@5.7.3.js'
); // dynamically import TypeScript after `abortIfMissingPermits`; avoids permission prompts
const ts = tsM.default;

//===

function tryFnOr<T>(fn: () => T, fallback: T) {
	try {
		return fn();
	} catch (_) {
		return fallback;
	}
}

function tryFn<T>(fn: () => T) {
	return tryFnOr(fn, undefined);
}

//===

const log = logger;
log.debug('logging to *STDERR*');

$me.warnIfImpaired((s) => log.warn(s));
log.trace({ $me });
log.trace('Deno:', { args: Deno.args, execPath: Deno.execPath, main: Deno.mainModule });

const logLevelFromEnv =
	$logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined) ?? undefined;
await log.debug(
	`log level of '${logLevelFromEnv}' generated from environment variables (LOG_LEVEL/LOGLEVEL or DEBUG)`,
);

// log.mergeMetadata({
// 	// Humane: { showLabel: true, showSymbol: false },
// 	// Humane: { showLabel: false, showSymbol: 'ascii' },
// 	// Humane: { showLabel: false, showSymbol: 'unicodeDoubleWidth' },
// 	// Humane: { showLabel: true, showSymbol: 'unicodeDoubleWidth' },
// 	Humane: {
// 		showLabel: true,
// 		showSymbol: 'unicodeDoubleWidth',
// 		// note: `labelFormatFn` should assume `s` is a unicode string (with possible surrogate pairs, not simple UTF-16 characters) and may contain ANSI escape codes
// 		labelFormatFn: (s: string) => $colors.inverse(s.slice(0, -1)),
// 	},
// 	// Humane: {
// 	// 	showLabel: false,
// 	// 	showSymbol: 'unicodeDoubleWidth',
// 	// 	labelFormatFn: (s: string) =>
// 	// 		$colors.bgBrightMagenta($colors.yellow($colors.stripColor(s))) + ' ',
// 	// },
// });

//===

const appName = $me.name;
const appCopyright = '* Copyright (c) 2025+ * Roy Ivy III (MIT license)';
// const appVersion = $version.v();
const appVersion = '0.0.0';
const appRunAs = $me.runAs;

const appLogLevelDefault = 'notice';
let appLogLevel: number | string = appLogLevelDefault;

let appExitValue = 0;
let appUsageError = false;

log.mergeMetadata({ authority: appName });

//===

// ref: <https://devhints.io/yargs> , <https://github.com/yargs/yargs/tree/v17.0.1-deno/docs>
const app = $yargs(/* argv */ undefined, /* cwd */ undefined)
	// * usage, description, and epilog (ie, notes/copyright)
	.usage(`$0 ${appVersion}\n
Expand and rewrite module imports to enable direct loading of 'vendored' packages (without requiring *import_map.json*).\n
* Usual ESM export/import statements are all matched and rewritten.
* However, only simple dynamic imports of the form \`const M = [await] import('...');\` are matched and rewritten.\n
* NOTE: this is most useful to expand import maps in a stored 'vendor' directory which can then be loaded from a CDN, by commit/version.\n
Usage:\n  ${appRunAs} [OPTION..] FILE..`)
	.updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.positional('OPTION', { describe: 'OPTION(s); see listed *Options*' })
	.positional('FILE', { describe: `FILE(s) to expand` })
	.epilog(`${appCopyright}`)
	// * (boilerplate)
	.scriptName(appName)
	.wrap(/* columns */ null) // disable built-in Yargs display text wrapping (required for later custom formatting with `restyleYargsHelp()`)
	// * (boilerplate) revised terminology for errors/help text
	// ref: update string keys/names from <https://github.com/yargs/yargs/blob/59a86fb83cfeb8533c6dd446c73cf4166cc455f2/locales/en.json>
	// .updateStrings({ 'Positionals:': 'Arguments:' }) // note: Yargs requires this `updateStrings()` to precede `.positional(...)` definitions for correct help display
	.updateStrings({
		'Unknown argument: %s': { one: 'Unknown option: %s', other: 'Unknown options: %s' },
	})
	// * (boilerplate) fail function
	.fail((msg: string, err: Error, _: ReturnType<typeof $yargs>) => {
		appUsageError = true;
		log.error(msg);
		if (err) throw err;
	})
	// * (boilerplate) help and version setup
	.help(false) // disable built-in 'help' (for later customization)
	.version(false) // disable built-in 'version' handling (for later customization)
	.option('help', {
		describe:
			'Display help text and exit (exit status => 1 if combined with other arguments/options)',
		type: 'boolean',
	})
	.alias('help', 'h')
	.option('version', {
		describe:
			'Display version text and exit (exit status => 1 if combined with other arguments/options)',
		type: 'boolean',
	})
	.alias('version', 'V')
	// * (boilerplate) logging options
	.option('log-level', {
		alias: ['loglevel', '\b\b\b\b LOG_LEVEL'], // fixme/hack: display option argument description (see <https://github.com/yargs/yargs/issues/833#issuecomment-982657645>)
		describe: 'Set logging level to LOG_LEVEL (overrides any prior setting)',
		type: 'string',
		choices: ['error', 'warning', 'warn', 'note', 'info', 'debug', 'trace'], // required for help display of choices
	})
	.choices('logLevel', ['error', 'warning', 'warn', 'note', 'info', 'debug', 'trace']) // fixme/hack: required for correct error handling of incorrect choices by Yargs
	.option('silent', {
		describe: `Silent mode; suppress non-error output (sets 'error' level logging)`,
		type: 'boolean',
	})
	.option('quiet', {
		describe: `Quiet mode; suppress informational output (sets 'warn' level logging)`,
		type: 'boolean',
	})
	.option('verbose', {
		describe: `Verbose mode; display verbose output (sets 'info' level logging)`,
		type: 'boolean',
	})
	.option('debug', { describe: `Set 'debug' level logging`, type: 'boolean' })
	.option('trace', { describe: `Set 'trace' (high-detail 'debug') level logging`, type: 'boolean' })
	// * (boilerplate) configure Options, Logging, and Help/Info groups
	.group([], 'Options:')
	.group(['log-level', 'silent', 'quiet', 'verbose', 'debug', 'trace'], '*Logging:')
	.group(['help', 'version'], '*Help/Info:')
	// * Yargs parser configuration
	// ref: [Yargs Parser ~ Configuration](https://github.com/yargs/yargs-parser#configuration)
	.parserConfiguration({
		// * per app configuration options
		'boolean-negation': false, // disable automatic interpretation of `--no-...` as option negations (required when configuring options which are *only* `--no-...`)
		'halt-at-non-option': false, // disable halting parse at first non-option/argument
		'unknown-options-as-args': true, // treat unknown options as arguments
		// * (boilerplate) usual parser options
		'camel-case-expansion': true, // enable camelCase aliases for hyphenated options (only within generated Yargs parse result object)
		'parse-numbers': false, // treat all arguments as strings (do not parse numbers)
		'parse-positional-numbers': false, // treat all arguments as strings (do not parse numbers)
		'strip-aliased': true, // remove option aliases from parse result object
		'strip-dashed': true, // remove hyphenated option aliases from parse result object
	})
	/* Options... */
	.strictOptions(/* enable */ true)
	.option('vendor-from', {
		describe: 'Location of folder containing vendored packages (path or URL; required)',
		type: 'string',
		// demandOption: true,
	})
	.alias('vendor-from', ['v'])
	/* Examples...*/
	.example(`${appRunAs} --vendor-from vendor/deno@1.46.3-vendor`)
	.example([]);

const bakedArgs = $me.args();

let optionArgs = bakedArgs;
const nonOptionArgs: typeof bakedArgs = [];

// normalize all Logging options to `--log-level=...`
// * allows easier selection and also for the trailing log-level CLI option to override all prior settings
const endOfOptionsSignal = '--';
let endOfOptionsFound = false;
optionArgs = optionArgs.map((v) => {
	if (endOfOptionsFound) return v;
	if (v === endOfOptionsSignal) {
		endOfOptionsFound = true;
		return v;
	}
	if (v === '--silent') return '--log-level=error';
	if (v === '--quiet') return '--log-level=warn';
	if (v === '--verbose') return '--log-level=info';
	if (v === '--debug') return '--log-level=debug';
	if (v === '--trace') return '--log-level=trace';
	return v;
});

await log.trace({ optionArgs, nonOptionArgs });

const yargs = (() => {
	try {
		return app.parse(optionArgs) as YargsArguments;
	} catch (e) {
		if (e instanceof Error) log.error(e.message);
		else log.error(`ERROR: Unknown error parsing arguments (${String(e)})`);
		appExitValue = 1;
		return;
	}
})();

const args = yargs?._?.concat(...nonOptionArgs).map((arg) => String(arg)) || [];

log.trace({ bakedArgs, yargs, args });

appLogLevel = ((defaultLogLevel = appLogLevelDefault) => {
	const anyLogLevelFromOption = yargs?.logLevel as string | string[] | undefined;
	const logLevelFromOption = Array.isArray(anyLogLevelFromOption)
		? anyLogLevelFromOption.at(-1)
		: anyLogLevelFromOption;
	const levels = [defaultLogLevel, logLevelFromEnv, logLevelFromOption].filter(Boolean);
	return levels.at(-1) ?? Infinity;
})();

log.mergeMetadata({ Filter: { level: appLogLevel } });
log.debug(`log level set to '${appLogLevel}'`);

await log.resume();

//===

// ref: <https://stackoverflow.com/questions/50565408/should-bash-scripts-called-with-help-argument-return-0-or-not-zero-exit-code>
if (yargs?.help) {
	const yargsHelp = await app.getHelp();
	const consoleSize = await $consoleSize.consoleSize();
	const help = await restyleYargsHelp(yargsHelp, { consoleWidth: consoleSize?.columns ?? 80 });
	console.log(help);
	const onlyHelp =
		yargs._.length === 0 &&
		Object.keys(yargs).filter((s) => !['help', '_', '$0'].includes(s)).length === 0;
	appExitValue = onlyHelp ? 0 : 1;
	Deno.exit(appExitValue);
}
if (yargs?.version) {
	console.log(appVersion);
	const onlyVersion =
		yargs._.length === 0 &&
		Object.keys(yargs).filter((s) => !['version', '_', '$0'].includes(s)).length === 0;
	appExitValue = onlyVersion ? 0 : 1;
	Deno.exit(appExitValue);
}

//===

if (yargs == null || yargs._.length === 0) {
	await log.warn(`arguments are required; try \`${appRunAs} --help\``);
	appExitValue = 1;
	Deno.exit(appExitValue);
}
if (yargs.vendorFrom == null) {
	await log.error('Missing required argument: --vendor-from');
	appExitValue = 1;
	Deno.exit(appExitValue);
}

//===

const scriptDirURL = intoURL('./', intoURL(import.meta.url));

const vendorFrom = (yargs.vendorFrom as string | undefined) ?? '';
const vendorDirURL = intoURL(vendorFrom + (vendorFrom.endsWith('/') ? '' : '/.'));
const importMapURL = intoURL('import_map.json', vendorDirURL);

await log.debug({
	scriptDir: pathFromURL(scriptDirURL),
	vendorDir: pathFromURL(vendorDirURL),
	importMap: pathFromURL(importMapURL),
});
await log.trace({ scriptDirURL, vendorDirURL, importMapURL });

if (importMapURL == null) {
	await log.error(`Failed to construct *import-map.json* URL`);
	appExitValue = 1;
	Deno.exit(appExitValue);
}

// Load the import map
// const importMapText = await Deno.readTextFile(importMapURL);
const importMapText = await tryFn(async () => await fetchText(importMapURL))?.catch((_) => '');

if (importMapText == null || importMapText.length === 0) {
	await log.error(`Failed to import *import-map.json* (from '${pathFromURL(importMapURL)}')`);
	appExitValue = 1;
	Deno.exit(appExitValue);
}
await log.trace({ importMapText });

const importMap = JSON.parse(importMapText ?? '{}');
const globalImports = importMap.imports || {};
const scopes = importMap.scopes || {};

await log.trace({ importMap });

/**
 * Creates a transformer that replaces module specifiers using both global imports
 * and scope-specific mappings.
 *
 * @param fileURL - The URL corresponding to the current file (aka, the parent module).
 * @!param parentURL - The URL corresponding to the current file (aka, the parent module).
 * @param importMapURL - The URL corresponding to the *import_map.json* file.
 * @param imports - Global imports mapping from the import map.
 * @param scopes - Scopes mapping from the import map.
 */
async function createTransformer(
	fileURL: URL,
	// parentURL: URL,
	// importMapURL: URL,
	imports: Record<string, string>,
	scopes: Record<string, Record<string, string>>,
) {
	await log.trace('createTransformer():', { fileURL, imports, scopes });
	// ref: [JS Import Maps, Part 1](https://spidermonkey.dev/blog/2023/02/23/javascript-import-maps-part-1-introduction.html) @@ <https://archive.is/EkKuc>
	// ref: [JS Import Maps, Part 2 (In-Depth Exploration)](https://spidermonkey.dev/blog/2023/03/02/javascript-import-maps-part-2-in-depth-exploration.html) @@ <https://archive.is/1z1NO>

	// Helper: Given a module specifier string, return its rewritten version if applicable.
	function resolveSpecifier(specifier: string): string {
		log.suspend();
		// console.warn('resolveSpecifier():', { specifier });
		log.trace('resolveSpecifier():', { specifier });
		if (importMapURL == null) {
			throw new Error(`Missing import map URL`);
		}
		// console.warn(`resolveSpecifier(${specifier}) for file='${fileURL.href}'`);
		// log.trace(`resolveSpecifier(${specifier}) for file='${fileURL.href}'`);

		let finalSpecifier = specifier;

		let specifierMatched = false;
		// Check scope mappings first: if the file's URL starts with a scope key,
		// then check that scope's mapping for a matching prefix.
		for (const [scope, scopeImports] of Object.entries(scopes)) {
			const scopeURL = new URL(scope, importMapURL);
			// log.trace(`scope=${scopeURL.href}`);
			// const scopePath = resolve(join(dirname(resolve(importMapURL)), scope));
			// const scopePrefixURL = new URL(scopePrefix, importMapURL);
			// log.trace(`scopePrefix=${scopePrefixURL.href}`);
			log.trace({ scope: scopeURL.href, specifierMatched });
			if (fileURL.href.startsWith(scopeURL.href)) {
				// entries sorted by longest common prefix
				for (const [remote, local] of Object.entries(scopeImports).sort(
					([a], [b]) => b.length - a.length,
				)) {
					log.trace('resolveSpecifier()/scopes:', { remote, local });
					if (finalSpecifier.startsWith(remote)) {
						specifierMatched = true;
						finalSpecifier = finalSpecifier.replace(remote, local);
					}
				}
			}
		}
		if (!specifierMatched) {
			// Fall back to the global imports mapping.
			for (const [remote, local] of Object.entries(imports).sort(
				([a], [b]) => b.length - a.length,
			)) {
				log.trace('resolveSpecifier()/imports:', { remote, local });
				if (finalSpecifier.startsWith(remote)) {
					specifierMatched = true;
					finalSpecifier = finalSpecifier.replace(remote, local);
				}
			}
		}

		if (
			finalSpecifier !== specifier &&
			(finalSpecifier.startsWith('./') || finalSpecifier.startsWith('../'))
		) {
			const fullImportFolderPath = dirname(pathFromURL(importMapURL) ?? '');
			const fullFileFolderPath = dirname(pathFromURL(fileURL) ?? '');
			const prefix = relative(fullFileFolderPath, fullImportFolderPath);
			finalSpecifier = $lib.pathToPOSIX(join(prefix, finalSpecifier));
			if (!(finalSpecifier.startsWith('./') || finalSpecifier.startsWith('../'))) {
				// ensure that the finalSpecifier starts with a relative directory prefix
				finalSpecifier = `./${finalSpecifier}`;
			}
		}

		finalSpecifier = $lib.pathToPOSIX(finalSpecifier);
		log.info(
			`resolveSpecifier(file='${pathFromURL(fileURL)}'; '${specifier}') => ${
				finalSpecifier === specifier ? '(*NO-CHANGE*) ' : ''
			}'${finalSpecifier}'`,
		);
		return finalSpecifier; // as POSIX-style path
	}

	return (context: tsTypes.TransformationContext) => {
		const visit /* : tsTypes.Visitor */ = (node: tsTypes.Node): tsTypes.Node => {
			// Process both import and export declarations with a module specifier.
			if (
				(ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
				node.moduleSpecifier &&
				ts.isStringLiteral(node.moduleSpecifier)
			) {
				const moduleText = node.moduleSpecifier.text;
				const newModuleText = resolveSpecifier(moduleText);
				if (newModuleText !== moduleText) {
					if (ts.isImportDeclaration(node)) {
						return ts.factory.updateImportDeclaration(
							node,
							node.modifiers,
							node.importClause,
							ts.factory.createStringLiteral(newModuleText),
							node.attributes,
						);
					} else if (ts.isExportDeclaration(node)) {
						return ts.factory.updateExportDeclaration(
							node,
							node.modifiers,
							node.isTypeOnly,
							node.exportClause,
							ts.factory.createStringLiteral(newModuleText),
							node.attributes,
						);
					}
				}
			}
			// Process dynamic imports: `import('module-specifier')`
			if (
				ts.isCallExpression(node) &&
				ts.isIdentifier(node.expression) &&
				node.expression.text === 'import' &&
				node.arguments.length > 0 &&
				ts.isStringLiteral(node.arguments[0])
			) {
				const moduleText = node.arguments[0].text;
				const newModuleText = resolveSpecifier(moduleText);
				if (newModuleText !== moduleText) {
					return ts.factory.updateCallExpression(node, node.expression, node.typeArguments, [
						ts.factory.createStringLiteral(newModuleText),
						...node.arguments.slice(1),
					]);
				}
			}
			// Process variable statements with import calls: `const M = [await] import('module-specifier')`
			if (ts.isVariableStatement(node)) {
				const declarations = node.declarationList.declarations;
				let modified = false;
				// Create new declarations array with updated import specifiers
				const newDeclarations = declarations.map((decl) => {
					// // Debug the structure
					// if (decl.initializer && ts.isCallExpression(decl.initializer)) {
					// 	console.warn('Call expression structure:', {
					// 		kind: ts.SyntaxKind[decl.initializer.expression.kind],
					// 		text: decl.initializer.expression.getText?.(),
					// 		hasArguments: decl.initializer.arguments.length > 0,
					// 		firstArgKind: decl.initializer.arguments[0]
					// 			? ts.SyntaxKind[decl.initializer.arguments[0].kind]
					// 			: null,
					// 	});
					// }
					// Case 1: Direct import call: `const M = import('...')`
					if (
						decl.initializer &&
						ts.isCallExpression(decl.initializer) &&
						decl.initializer.expression.kind === ts.SyntaxKind.ImportKeyword &&
						decl.initializer.arguments.length > 0 &&
						ts.isStringLiteral(decl.initializer.arguments[0])
					) {
						const moduleText = decl.initializer.arguments[0].text;
						const newModuleText = resolveSpecifier(moduleText);
						if (newModuleText !== moduleText) {
							modified = true;
							return ts.factory.updateVariableDeclaration(
								decl,
								decl.name,
								decl.exclamationToken,
								decl.type,
								ts.factory.updateCallExpression(
									decl.initializer,
									decl.initializer.expression,
									decl.initializer.typeArguments,
									[
										ts.factory.createStringLiteral(newModuleText),
										...decl.initializer.arguments.slice(1),
									],
								),
							);
						}
					}
					// Case 2: Awaited import call: `const M = await import('...')`
					if (
						decl.initializer &&
						ts.isAwaitExpression(decl.initializer) &&
						ts.isCallExpression(decl.initializer.expression) &&
						decl.initializer.expression.expression.kind === ts.SyntaxKind.ImportKeyword &&
						decl.initializer.expression.arguments.length > 0 &&
						ts.isStringLiteral(decl.initializer.expression.arguments[0])
					) {
						const moduleText = decl.initializer.expression.arguments[0].text;
						const newModuleText = resolveSpecifier(moduleText);
						if (newModuleText !== moduleText) {
							modified = true;
							const updatedCallExpr = ts.factory.updateCallExpression(
								decl.initializer.expression,
								decl.initializer.expression.expression,
								decl.initializer.expression.typeArguments,
								[
									ts.factory.createStringLiteral(newModuleText),
									...decl.initializer.expression.arguments.slice(1),
								],
							);
							return ts.factory.updateVariableDeclaration(
								decl,
								decl.name,
								decl.exclamationToken,
								decl.type,
								ts.factory.updateAwaitExpression(decl.initializer, updatedCallExpr),
							);
						}
					}
					return decl;
				});
				// If any declaration was modified, return updated variable statement
				if (modified) {
					return ts.factory.updateVariableStatement(
						node,
						node.modifiers,
						ts.factory.updateVariableDeclarationList(node.declarationList, newDeclarations),
					);
				}
			}
			return ts.visitEachChild(node, visit, context);
		};
		return (node: tsTypes.Node) => ts.visitNode(node, visit);
	};
}

async function fetchText(url: URL): Promise<string> {
	// ToDO: add support for non-['file:','http:','https:'] protocols to `fetch` by using `curl`
	const href = url.href;
	const response = await fetch(url).catch((e) => {
		throw new Error(e.message);
	});
	// note: response status codes >= 200 < 300 should be ok
	if (!response.ok) {
		const msg = [response.statusText, `[status: ${response.status}]`].filter(Boolean).join(' ');
		if (response.status === 404) {
			throw new Deno.errors.NotFound(`'${href}' not found; ${msg}`);
		}
		throw new Error(`'${href}' fetch failed; ${msg}`);
	}
	if (response.body == null) {
		throw new Deno.errors.NotFound(`'${href}' content not found`);
	}
	const readableStream = response.body;
	return toText(readableStream);
}

/**
 * Processes a single file: parses it, applies the AST transformation, and writes back
 * the updated file.
 */
async function processFile(file: string | URL) {
	await log.trace('processFile():', { file });
	const fileURL = typeof file === 'string' ? intoURL(file) : file;
	const filePath = pathFromURL(fileURL);
	if (fileURL == null || filePath == null) {
		await log.error(`Invalid file path: ${file}`);
		return;
	}
	await log.trace('processFile():', { filePath });
	if (filePath == null) {
		return;
	}
	if (!(filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.mjs'))) {
		return;
	}

	// const content = await Deno.readTextFile(file);
	const content = await tryFn(async () => await fetchText(fileURL));
	await log.trace('processFile():', { fileContent: content });
	if (content == null) {
		await log.error(`Failed to read file (\`${filePath}\`)`);
		appExitValue = 1;
		return;
	}

	// Compute the parent's remote URL by removing the vendor folder prefix.
	// const relativePath = filePath.replace(new RegExp(`^${vendorDirURL.href}`), '');
	// const parentUrl = "https://" + relativePath.replace(/\\/g, "/");
	// const parentPath = resolve(relativePath.replace(/\\/g, '/'));

	const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
	const transformer = await createTransformer(fileURL, globalImports, scopes);
	log.suspend();
	const result = ts.transform(sourceFile, [transformer]);
	await log.resume();
	const transformedSourceFile = result.transformed[0] as tsTypes.SourceFile;
	const printer = ts.createPrinter();
	const newContent = printer.printFile(transformedSourceFile);
	if (fileURL.protocol === 'file:') {
		await Deno.writeTextFile(fromFileUrl(fileURL), newContent);
		const updateText = `'${file}'...${sourceFile === transformedSourceFile ? $colors.blue('up-to-date') : $colors.green('updated')}`;
		// await log.info(updateText);
		if ($logger.shouldDisplayLevel(log, 'note')) {
			console.warn(updateText);
		}
	} else {
		console.log(newContent);
	}
	result.dispose();
}

/**
 * Recursively processes all .ts and .js (including .mjs) files in the given directory.
 */
async function processDir(dir: string) {
	await log.trace('processDir():', { dir });
	for await (const entry of Deno.readDir(dir)) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory) {
			await processDir(fullPath);
		} else {
			await processFile(fullPath);
		}
	}
}

async function processArgs(args: string[]) {
	await log.trace('processArgs():', { args });
	for (const arg of args) {
		const path = resolve(arg);
		const stat = tryFn(() => Deno.lstatSync(path));
		await log.trace('processArgs():', { path, stat });
		if (stat == null) {
			await log.error(`Unable to read status of file (\`${arg}\`)`);
			appExitValue = 1;
		} else if (stat.isDirectory) {
			await processDir(path);
		} else await processFile(path);
	}
}

await log.debug({ args });
await processArgs(args);

//===

await log.resume();
if (appUsageError && appExitValue === 0) appExitValue = 1;
Deno.exit(appExitValue);
