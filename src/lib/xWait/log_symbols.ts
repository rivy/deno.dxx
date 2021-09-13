import { Colors } from '../$deps.ts';

let supportsUnicode = true;

if ((await Deno.permissions.query({ name: 'env' })).state === 'granted') {
	supportsUnicode = supportsUnicode &&
		(!!Deno.env.get('CI') || Deno.env.get('TERM') === 'xterm-256color');
}

export const symbolStrings: Record<string, Record<string, string>> = {
	// ASCII (eg, ANSI high-bit reset) character fallback prefixes
	ascii: {
		debug: Colors.yellow('@'),
		die: Colors.red('!'),
		error: Colors.red('!'),
		failure: Colors.red('x'),
		info: Colors.brightCyan('i'),
		note: Colors.cyan(Colors.blue('#')),
		success: Colors.green('+'),
		trace: Colors.brightYellow('.'),
		warning: Colors.magenta('*'),
	},
	// emoji glyph prefixes
	// * note: emoji are double-wide characters
	emoji: {
		debug: Colors.yellow('⚙️'), // ⚙️/U+ or ⚙/U+2699
		die: Colors.red('🔥'), // 🔥/U+1F525 or 💥/U+1F4A5 or 🧨/U+1F9E8 or 💣/U+1F4A3 or 💀/U+1F480 or ☠️/☠/U+2620 or ⚰️/⚰/U+26B0
		error: Colors.red('❗'), // ❗/U+2757
		failure: Colors.red('❌'), // ❌/U+274C or ⮾/U+2BBE or ⮿/U+2BBF
		info: Colors.cyan('ℹ️'), // ℹ️/U+2139
		note: Colors.blue('📋'), // 📋/U+1F4CB or 🔔/U+1F514 or ✉️/U+2709 or 📝/U+1F4DD or 🧾/U+1F9FE or 🗉/U+1F5C9 or 📓/U+1F4D3 or 🗊/U+1F5CA or ♪/U+266A or ♯/U+266F or ⧆/U+29C6 or ⊛/U+229B or ✨/U+2728 or 📄/U+1F4C4
		success: Colors.green('✔️'), // ✔️/✔/U+2714
		trace: Colors.brightYellow('🔎'), // 🔎/U+1F50E or 🩺/U+1FA7A
		warning: Colors.yellow('⚠️'), // ⚠️/⚠/U+26A0 or 🛆/U+1F6C6 or
	},
	// unicode character prefixes
	unicode: {
		debug: Colors.yellow('◉'), // debug sigil => "◉" == "fisheye"/U+25c9
		die: Colors.red('‼'),
		error: Colors.red('!'),
		failure: Colors.red('×'), // failure sigil => "×" == "multiplication"/U+00d7
		info: Colors.brightCyan('i'),
		note: Colors.cyan('#'),
		success: Colors.green('✓'), // success sigil => "✓" == "check mark"/U+2713
		trace: Colors.brightYellow('•'), // trace sigil => "•" == "bullet"/U+2022
		warning: Colors.magenta('◬'), // warning sigil => "up-pointing triangle with dot"/U+25ec
	},
};

export const symbols = supportsUnicode ? symbolStrings.unicode : symbolStrings.ascii;
