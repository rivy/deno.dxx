import { colors } from './deps.ts';

let supported = true;

if ((await Deno.permissions.query({ name: 'env' })).state === 'granted') {
	supported = supported && (!!Deno.env.get('CI') || Deno.env.get('TERM') === 'xterm-256color');
}

// unicode character prefixes
const main = {
	debug: colors.yellow('◉'), // debug sigil => "◉" == "fisheye"/U+25c9
	error: colors.red('!'),
	failure: colors.red('×'), // failure sigil => "×" == "multiplication"/U+00d7
	info: colors.cyan('i'),
	note: colors.brightCyan('*'),
	success: colors.green('✓'), // success sigil => "✓" == "check mark"/U+2713
	trace: colors.brightYellow('•'), // trace sigil => "•" == "bullet"/U+2022
	warning: colors.magenta('◬'), // warning sigil => "up-pointing triangle with dot"/U+25ec
};

// ASCII (eg, ANSI high-bit reset) character fallback prefixes
const fallbacks = {
	debug: colors.yellow('@'),
	error: colors.red('!'),
	failure: colors.red('x'),
	info: colors.cyan('i'),
	note: colors.brightCyan('*'),
	success: colors.green('+'),
	trace: colors.brightYellow('.'),
	warning: colors.magenta('*'),
};

export const symbols = supported ? main : fallbacks;
