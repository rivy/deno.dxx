// spell-checker:ignore (names) Deno

import { $colors } from '../$deps.ts';
// import { env, permitsAsync } from '../$shared.TLA.ts';
// import { permitsAsync } from '../$shared.TLA.ts';
import { env } from '../$shared.ts';

// const atImportPermissions = await permitsAsync();

// // `env()`
// /** Return the value of the environment variable `varName` (or `undefined` if non-existent or not-allowed access).
//  * - will *not panic*
//  * - will *not prompt* for permission if `options.guard` is `true`
// @param `options``.guard` • verify unrestricted environment access permission *at time of module import* prior to access attempt (avoids Deno prompts/panics); defaults to `true`
//  */
// export function env(varName: string, options?: { guard: boolean }) {
// 	const guard = (options != null) ? options.guard : true;
// 	const useDenoGet = !guard || (atImportPermissions.env.state === 'granted');
// 	try {
// 		return useDenoGet ? Deno.env.get(varName) : undefined;
// 	} catch (_) {
// 		return undefined;
// 	}
// }

// const _havePermissions = await permitsAsync();
// const supportsUnicode = !!env('CI') || env('TERM') === 'xterm-256color';
const supportsUnicode: () => boolean = () => {
	return !!env('CI') || env('TERM') === 'xterm-256color';
};

export const symbolStrings: Record<string, Record<string, string>> = {
	// ASCII (ie, ANSI high-bit reset) character fallback prefixes
	ascii: {
		debug: $colors.yellow('@'),
		die: $colors.red('!'),
		error: $colors.red('!'),
		failure: $colors.red('x'),
		info: $colors.brightCyan('i'),
		note: $colors.cyan('#'),
		success: $colors.green('+'),
		trace: $colors.brightYellow('.'),
		warning: $colors.magenta('*'),
	},
	// emoji glyph prefixes
	// * note: selected emoji are double-wide "emoji-style" characters (implemented using emoji-variation codes where needed)
	// ref: <https://www.unicode.org/reports/tr51/tr51-21.html#Emoji_Variation_Sequences> @@ <https://archive.md/BT41I>
	// ref: <https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)> @@ <https://archive.is/vyfzp>
	// ref: <https://unicode.org/emoji/charts/emoji-variants.html> @@ <https://archive.md/mI8co>
	// ref: <http://www.iemoji.com> (note double-width "emoji-style" versions [vs single width "text-style"])
	// ref: <http://russellcottrell.com/greek/utilities/SurrogatePairCalculator.htm> (calculate 16-bit surrogate pair from 21-bit unicode code unit)
	// ref: <https://www.browserling.com/tools/utf8-encode> (text/unicode to UTF-8 encoding)
	// ref: <https://r12a.github.io/app-conversion> (conversions between various types of character encodings)
	// * note: use `String.fromCodePoint(codePointValue)` or `'\u{HEX}` to convert UTF-32 code points to internal UTF-8 format
	// ref: <https://mathiasbynens.be/notes/javascript-escapes> @@ <https://archive.is/Dcfol>
	// ref: <https://gitlab.freedesktop.org/terminal-wg/specifications/-/issues/9>
	// * note: MS Windows Terminal has "evolving" rendering issues
	// ref: https://github.com/microsoft/terminal/issues/8000 , https://github.com/microsoft/terminal/issues/1472 , (and #10287, #10139, ...)
	emoji: {
		debug: $colors.yellow('🧭'), // 🧭/U+1F9ED or 🔮/U+1F52E or 💭/U+1F4AD or 🕵️/U+1F575,U+FE0F or ⚗️/U+2697,U+FE0F or 🔦/U+1F526 or 🤿/U+1F93F or 🥽/U+1F97D or 🐛/U+1F41B or 🎓/U+1F393 or 🧐/U+1F9D0 or 🔭/U+1F52D or 🔍/U+1F50E or 🔎/U+1F50E or ❄️/u+2744,u+fe0f or ⚙️/U+2699,UFE0F (aka ⚙/U+2699 as single width text-style)
		die: $colors.red('🔥'), // 🔥/U+1F525 or 💥/U+1F4A5 or 🧨/U+1F9E8 or 💣/U+1F4A3 or 💀/U+1F480 or ☠️/U+2620,U+FE0F (aka ☠/U+2620 as single-width text-style) or ⚰️/U+26B0,U+FE0F (aka ⚰/U+26B0 as single width text-style)
		error: $colors.red('❗'), // ❗/U+2757
		failure: $colors.red('❌'), // ❌/U+274C or ⮾/U+2BBE,U+FE0F or ⮿/U+2BBF,U+FE0F or 🛑/U+1F6D1 or 🔴/U+1f534 or ⬤/U+2b24,U+fe0f (in double-width 'emoji-style')
		info: $colors.brightCyan('📍'), // 📍/U+1F4CD or 🕯️/U+1F56F,U+FE0F or ✉️/U+2709,U+FE0F or 🛈️/U+1f6c8,U+fe0f ([2021-11-02]; renders with incorrect spacing for MS-WT) or ℹ️/U+2139,U+FE0F
		note: $colors.cyan('📋'), // ⊛️/U+229b,UFE0F or 📋/U+1F4CB or 🔔/U+1F514 or ✉️/U+2709 or 📝/U+1F4DD or 🧾/U+1F9FE or 🗉/U+1F5C9 or 📓/U+1F4D3 or 🗊/U+1F5CA or ♪/U+266A or ♯/U+266F or ⧆/U+29C6 or ⊛/U+229B or ✨/U+2728 or 📄/U+1F4C4
		success: $colors.green('✔️'), // ✔️/U+2714,U+FE0F (aka ✔/U+2714 as single width text-style)
		trace: $colors.brightYellow('🔬'), // 🔬/U+1F52C or 🔎/U+1F50E or 🩺/U+1FA7A
		warning: $colors.magenta('⚠️'), // ⚠️/U+26A0,UFE0F (aka ⚠/U+26A0 as single width text-style) or 🛆/U+1F6C6
	},
	// unicode character (single-width) prefixes
	// ref: <https://www.compart.com/en/unicode>
	// * note: may be changed into slightly larger, centered, double width form with an "emoji"-style variation code (U+fe0f)
	unicode: {
		debug: $colors.yellow('•'), // debug sigil => "•" == "bullet"/U+2022 or "●" == "black circle"/U+25cf or "⊙" == "circled dot operator"/U+2299 "●" == "black circle"/U+25cf or "◉" == "fisheye"/U+25c9
		die: $colors.red('‼'),
		error: $colors.red('!'),
		failure: $colors.red('×'), // failure sigil => "×" == "multiplication"/U+00d7 or "●" == "black circle"/U+25cf or "⬤" == "black large circle"/U+2b24
		info: $colors.brightCyan('i'),
		note: $colors.cyan('#'),
		success: $colors.green('✓'), // success sigil => "✓" == "check mark"/U+2713
		trace: $colors.brightYellow('▪'), // trace sigil => "▪" == "black small square"/U+25aa or "●" == "black circle"/U+25cf or "•" == "bullet"/U+2022
		warning: $colors.magenta('\u{27c1}'), // warning sigil => "⟁" == "White Triangle Containing Small White Triangle"/u+27c1 or "◬" == "up-pointing triangle with dot"/U+25ec
	},
	// unicode character (double-width) prefixes
	// * slightly larger, centered, double width form by using the "emoji"-style variation code (U+fe0f)
	unicodeDoubleWidth: {
		debug: $colors.yellow('•\u{fe0f}'), // debug sigil => "•" == "bullet"/U+2022 or "●" == "black circle"/U+25cf or "⊙" == "circled dot operator"/U+2299 "●" == "black circle"/U+25cf or "◉" == "fisheye"/U+25c9
		die: $colors.red('‼\u{fe0f}'),
		error: $colors.red('!\u{fe0f}'),
		failure: $colors.red('×\u{fe0f}'), // failure sigil => "×" == "multiplication"/U+00d7 or "●" == "black circle"/U+25cf or "⬤" == "black large circle"/U+2b24
		info: $colors.brightCyan('i\u{fe0f}'),
		note: $colors.cyan('#\u{fe0f}'),
		success: $colors.green('✓\u{fe0f}'), // success sigil => "✓" == "check mark"/U+2713
		trace: $colors.brightYellow('▪\u{fe0f}'), // trace sigil => "▪" == "black small square"/U+25aa or "●" == "black circle"/U+25cf or "•" == "bullet"/U+2022
		warning: $colors.magenta('\u{27c1}\u{fe0f}'), // warning sigil => "⟁" == "White Triangle Containing Small White Triangle"/u+27c1 or "◬" == "up-pointing triangle with dot"/U+25ec
	},
};

export const symbols = supportsUnicode() ? symbolStrings.unicode : symbolStrings.ascii;
