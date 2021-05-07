import { colors } from './deps.ts';

let supportsUnicode = true;

if ((await Deno.permissions.query({ name: 'env' })).state === 'granted') {
	supportsUnicode = supportsUnicode &&
		(!!Deno.env.get('CI') || Deno.env.get('TERM') === 'xterm-256color');
}

export const symbolStrings: Record<string, Record<string, string>> = {
	// ASCII (eg, ANSI high-bit reset) character fallback prefixes
	ascii: {
		debug: colors.yellow('@'),
		die: colors.red('!'),
		error: colors.red('!'),
		failure: colors.red('x'),
		info: colors.brightCyan('i'),
		note: colors.cyan(colors.blue('*')),
		success: colors.green('+'),
		trace: colors.brightYellow('.'),
		warning: colors.magenta('*'),
	},
	// emoji glyph prefixes
	// * note: emoji are double-wide characters
	emoji: {
		debug: colors.yellow('⚙️'), // ⚙️
		die: colors.red('💥'), //
		error: colors.red('❗'),
		failure: colors.red('❌'), // failure sigil => "×" == "multiplication"/U+00d7
		info: colors.cyan('ℹ️'),
		note: colors.blue('✉️'), //✉️
		success: colors.green('✔️'), // ✔️
		trace: colors.brightYellow('🩺'), // trace sigil => "•" == "bullet"/U+2022
		warning: colors.yellow('⚠️'), // ⚠️
	},
	// unicode character prefixes
	unicode: {
		debug: colors.yellow('◉'), // debug sigil => "◉" == "fisheye"/U+25c9
		die: colors.red('‼'),
		error: colors.red('!'),
		failure: colors.red('×'), // failure sigil => "×" == "multiplication"/U+00d7
		info: colors.brightCyan('i'),
		note: colors.cyan('*'),
		success: colors.green('✓'), // success sigil => "✓" == "check mark"/U+2713
		trace: colors.brightYellow('•'), // trace sigil => "•" == "bullet"/U+2022
		warning: colors.magenta('◬'), // warning sigil => "up-pointing triangle with dot"/U+25ec
	},
};

export const symbols = supportsUnicode ? symbolStrings.unicode : symbolStrings.ascii;
