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
		note: colors.cyan(colors.blue('#')),
		success: colors.green('+'),
		trace: colors.brightYellow('.'),
		warning: colors.magenta('*'),
	},
	// emoji glyph prefixes
	// * note: emoji are double-wide characters
	emoji: {
		debug: colors.yellow('⚙️'), // ⚙️/U+ or ⚙/U+2699
		die: colors.red('🔥'), // 🔥/U+1F525 or 💥/U+1F4A5 or 🧨/U+1F9E8 or 💣/U+1F4A3 or 💀/U+1F480 or ☠️/☠/U+2620 or ⚰️/⚰/U+26B0
		error: colors.red('❗'), // ❗/U+2757
		failure: colors.red('❌'), // ❌/U+274C or ⮾/U+2BBE or ⮿/U+2BBF
		info: colors.cyan('ℹ️'), // ℹ️/U+2139
		note: colors.blue('📋'), // 📋/U+1F4CB or 🔔/U+1F514 or ✉️/U+2709 or 📝/U+1F4DD or 🧾/U+1F9FE or 🗉/U+1F5C9 or 📓/U+1F4D3 or 🗊/U+1F5CA or ♪/U+266A or ♯/U+266F or ⧆/U+29C6 or ⊛/U+229B or ✨/U+2728 or 📄/U+1F4C4
		success: colors.green('✔️'), // ✔️/✔/U+2714
		trace: colors.brightYellow('🔎'), // 🔎/U+1F50E or 🩺/U+1FA7A
		warning: colors.yellow('⚠️'), // ⚠️/⚠/U+26A0 or 🛆/U+1F6C6 or
	},
	// unicode character prefixes
	unicode: {
		debug: colors.yellow('◉'), // debug sigil => "◉" == "fisheye"/U+25c9
		die: colors.red('‼'),
		error: colors.red('!'),
		failure: colors.red('×'), // failure sigil => "×" == "multiplication"/U+00d7
		info: colors.brightCyan('i'),
		note: colors.cyan('#'),
		success: colors.green('✓'), // success sigil => "✓" == "check mark"/U+2713
		trace: colors.brightYellow('•'), // trace sigil => "•" == "bullet"/U+2022
		warning: colors.magenta('◬'), // warning sigil => "up-pointing triangle with dot"/U+25ec
	},
};

export const symbols = supportsUnicode ? symbolStrings.unicode : symbolStrings.ascii;
