// spell-checker:ignore (yargs) positionals

import { $cliffyTable, $colors, } from './$deps.ts';

//===

import * as $consoleSize from './consoleSize.ts';

//===

export async function restyleYargsHelp(helpText: string, options?: { consoleWidth: number },) {
	// `helpText` is assumed to be *unwrapped* Yargs-style help text (ie, `wrap(null)` is used within the Yargs config)
	// performance.mark('restyleYargsHelp():start');
	const Cell: typeof $cliffyTable.Cell = $cliffyTable.Cell;
	const Table: typeof $cliffyTable.Table = $cliffyTable.Table;
	// FixME: [2021-11-22; rivy] function needs significant cleanup of technical debt and refactoring for general use
	const border = false; // note: `true` can be helpful in debugging output irregularities
	const sectionTextIndent = 2;
	const endOfLinePadding = 1;
	const displayWidth = options?.consoleWidth ?? (await $consoleSize.consoleSize())?.columns ?? 80; // `consoleSize()` may take ~ 150 ms if fallback to shell scripts are needed
	const helpColumnN = 6; // division of screen for help (assists visual organization of help text elements)
	const maxColWidths = [displayWidth / 2, 1, 1, displayWidth / 2, 1, displayWidth / 2,];
	const minColWidths = [4, 0, 0, 8, 0, 3 * displayWidth / helpColumnN,];
	const sectionTable = new Table()
		.maxColWidth(maxColWidths,)
		.minColWidth(minColWidths,)
		.border(border,)
		.padding(0,)
		.indent(sectionTextIndent - 1,);
	// performance.mark('restyleYargsHelp():helpLines:start');
	const helpLines = helpText.replace(/\r?\n$/, '',).split(/\r?\n/,);
	// performance.mark('restyleYargsHelp():helpLines:stop');
	// logger.trace(durationText('restyleYargsHelp():helpLines'));
	// console.warn({ helpLines });
	const help: string[] = [];
	const titleLine = helpLines.shift();
	if (titleLine == undefined) return [];
	// 1st line == name + version
	help.push($colors.italic(titleLine,),);
	while ((helpLines.length > 0) && helpLines[0].length === 0) {
		help.push(helpLines.shift() || '',);
	}
	// console.warn({ helpLines, help });
	// merge multi-line descriptions into single item text strings
	// * help items within sections are generally indented by two spaces or six spaces for double-dashed options
	// ... any line with larger indention is assumed to be a continuation of the prior line description
	const helpItems: string[] = [];
	for (let i = 0; i < helpLines.length; i++) {
		const line = helpLines[i];
		const match = line.match(/^\s\s\s\s\s\s+([^\s-].*)/,);
		if (match) {
			const l = helpItems.length;
			if (l > 0) {
				helpItems[l - 1] += '\n' + match[1];
			}
		} else helpItems.push(line,);
	}
	console.warn({ helpLines, helpItems, help, },);
	let state: undefined | 'arguments' | 'examples' | 'options' | 'other' = undefined;
	// performance.mark(`restyleYargsHelp():linesOfHelpLines:start`);
	const lineRegExp = {
		// :sad: ... no change to execution speed by using "precompiled" regexps
		// *However*, NOT using unicode-flagged regexps ... 100 ms => 5 ms total rendering time
		// unicode case folding is *expensive*, avoid it!; ref: <http://www.guido-flohr.net/unicode-regex-pitfalls> @@ <https://archive.is/szfPd>
		// ref: <https://mathiasbynens.be/notes/es6-unicode-regex> @@ <https://archive.md/cJYO2>
		sectionHeader: new RegExp(/^\S.*:$/u,),
		sectionArguments: new RegExp(/^(?:arguments|positionals):$/i,),
		sectionExamples: new RegExp(/^examples:$/i,),
		sectionOptions: new RegExp(/^options:$/i,),
		sectionArgumentsLines: new RegExp(/^\s+(\S+)\s+([\S\s]*)$/u,),
		sectionExamplesLines: new RegExp(/^\s+([\S\s]*?)(?:\s\s+([\S\s]*))$/u,),
		sectionOptionsLines: new RegExp(/^\s+(-.*?)(\s\s+)([\S\s]*?)(\s+)((?:\s?\[.*?\])+)$/u,),
	};
	for (const line of helpItems) {
		// const initialState: typeof state = state;
		// console.warn({ length: line.length, line });
		if (line.length === 0) {
			// empty line
			if (sectionTable.length) {
				// empty line with section data => end of section; render final formatting of section and add to help text
				// * last column is given floating max width
				// performance.mark(`restyleYargsHelp():renderTable(${initialState})`);
				// console.warn(`render table for ${state}`, { sectionTable });
				// console.warn({ line: sectionTable[0] });
				let realMaxWidths = sectionTable.getMaxColWidth();
				let realMinWidths = sectionTable.getMinColWidth();
				// console.warn({ realMaxWidths, realMinWidths });
				// console.warn({ sectionTable });
				let tableLines = sectionTable.toString().split(/\r?\n/,);
				// console.warn({ tableLines });
				const maxLineLength = (() => {
					let max = 0;
					for (const line of tableLines) {
						const arrOfChars = [...$colors.stripColor(line,),];
						max = (arrOfChars.length > max) ? arrOfChars.length : max;
					}
					return max;
				})();
				// console.warn({ maxLineLength, displayWidth });
				// if (maxLineLength < maxWidth) {
				if (!Array.isArray(realMaxWidths,)) {
					realMaxWidths = new Array<number>(helpColumnN,).fill(realMaxWidths,);
					// realMaxWidths[helpColumnN - 1] = displayWidth;
				}
				if (!Array.isArray(realMinWidths,)) {
					realMinWidths = new Array<number>(helpColumnN,).fill(realMinWidths,);
				}

				const maxWidthLastCol = realMinWidths[realMinWidths.length - 1] + displayWidth -
					maxLineLength;
				// console.warn({ maxSizeLast });
				// if (Array.isArray(realMaxWidths)) {
				// realMaxWidths = [...realMaxWidths];
				realMaxWidths[realMaxWidths.length - 1] = maxWidthLastCol;
				// if (Array.isArray(realMinWidths)) {
				// 	realMinWidths = [...realMinWidths];
				realMinWidths[realMinWidths.length - 1] = realMaxWidths[realMaxWidths.length - 1];
				// }
				// console.warn({ realMaxWidths, realMinWidths });
				tableLines = sectionTable
					.maxColWidth(realMaxWidths, true,)
					.minColWidth(realMinWidths, true,)
					.toString()
					.split(/\r?\n/,);
				// }
				// }
				// console.warn({ tableLines });
				help.push(...tableLines.filter(Boolean,).filter((s,) => s.match(/\S/,)),);
				sectionTable.length = 0;
				sectionTable.maxColWidth(Infinity, true,).minColWidth(0, true,);
				// performance.mark(`restyleYargsHelp():renderTable(${initialState})`);
				// await logger.trace(durationText(`restyleYargsHelp():renderTable(${initialState})`));
				// performance.clearMarks(`restyleYargsHelp():renderTable(${initialState})`);
			}
			help.push('',);
			state = undefined;
			continue;
		}
		if (line.match(lineRegExp.sectionHeader,)) {
			// section header
			// console.warn(`new section`);
			if (line.match(lineRegExp.sectionArguments,)) {
				state = 'arguments';
			} else if (line.match(lineRegExp.sectionExamples,)) {
				state = 'examples';
			} else if (line.match(lineRegExp.sectionOptions,)) {
				state = 'options';
			} else state = 'other';
			help.push($colors.dim($colors.italic(line,),),);
			continue;
		}
		if (state == null) {
			help.push(line,);
			continue;
		}
		if (state === 'arguments') {
			const matchOption = line.match(lineRegExp.sectionArgumentsLines,);
			if (matchOption == null) {
				help.push(line,);
			} else {
				const [_s, item, desc,] = matchOption as RegExpMatchArray;
				// console.warn(state, _s, item, desc);
				sectionTable.push([
					Cell.from(item,).colSpan(1,),
					Cell.from('',).colSpan(1,),
					Cell.from(desc,).colSpan(4,),
				],);
				let x = sectionTable.getMinColWidth();
				if (!Array.isArray(x,)) x = new Array<number>(helpColumnN,).fill(x,);
				x[0] = Math.max(x[0], $colors.stripColor(item,).length,);
				x[5] = Math.max(x[5], $colors.stripColor(desc,).length,);
				// console.warn({ x });
				sectionTable.minColWidth(x, true,);
			}
			continue;
		}
		if (state === 'examples') {
			const matchOption = line.match(lineRegExp.sectionExamplesLines,);
			if (sectionTable.length) {
				sectionTable.push([Cell.from('\0',).colSpan(6,),],);
			}
			if (matchOption == null) {
				if (line.match(/^\s+/,)) {
					sectionTable.push(/* [Cell.from('\0').colSpan(6)], */ [
						Cell.from($colors.dim('$',),).colSpan(1,),
						Cell.from(line.replace(/^\s*/, '',),).colSpan(5,),
					],);
				} else help.push(line,);
			} else {
				const [_s, item, desc,] = matchOption as RegExpMatchArray;
				// console.warn({ state, line, _s, item, desc });
				sectionTable.push(/* [Cell.from('\0').colSpan(6)], */ [
					Cell.from('#',).colSpan(1,),
					Cell.from(desc,).colSpan(5,),
				], [
					Cell.from('',).colSpan(1,),
					Cell.from($colors.dim('$',),).colSpan(1,),
					Cell.from(item,).colSpan(4,),
				],);
			}
			continue;
		}
		if ((state === 'options') || (state === 'other')) {
			const matchOption = line.match(lineRegExp.sectionOptionsLines,);
			if (matchOption == null) {
				help.push(line,);
			} else {
				const [_s, item, _sep, desc, _sep2, info,] = matchOption as RegExpMatchArray;
				const i = info.replace(
					/\[(.*?)\]/g,
					(_: string, content: string,) => $colors.dim(`{${content}}`,),
				);
				// resolve any BS within item
				let item_ = item;
				while (item_.match(/[^\b][\b]/,)) item_ = item_.replace(/[^\b][\b]/g, '',);

				// console.warn({ state, line, _s, item, _sep, desc, _sep2, info, i, item_ });
				// console.warn({
				// 	maxWidth,
				// 	maxDiv6: maxWidth / 6,
				// 	itemLength: item_.length,
				// 	infoLength: info.length,
				// });
				// if ((item.length > (maxWidth / 6)) || (info.length > (maxWidth / 6))) {
				if ((item_.length > (2 * displayWidth / 6)) || (info.length > (2 * displayWidth / 6))) {
					// |  |  |  |  |  |  |
					// | item            |
					// | | info          |
					// | | * | desc      |
					sectionTable.push([Cell.from(item_,).colSpan(6,),], [
						Cell.from('',).colSpan(2,),
						Cell.from(i,).colSpan(4,),
					], [
						Cell.from('',).colSpan(2,),
						Cell.from('*',).colSpan(1,),
						Cell.from(desc,).colSpan(3,),
					],);
					// } else if ((item_.length > (maxWidth / 6)) || (info.length > (maxWidth / 6))) {
					// } else if ((item_.length + info.length) > (2 * maxWidth / 6)) {
					let x = sectionTable.getMinColWidth();
					if (!Array.isArray(x,)) x = new Array<number>(helpColumnN,).fill(x,);
					// x[0] = Math.max(x[0], $colors.stripColor(item_).length);
					x[5] = Math.max(
						x[5],
						$colors.stripColor(item_,).length,
						$colors.stripColor(i,).length,
						$colors.stripColor(desc,).length,
					);
					// console.warn({ x });
					sectionTable.minColWidth(x, true,);
					// } else if ((item_.length > (maxWidth / 6)) || (info.length > (maxWidth / 6))) {
				} else if (((item_.length + info.length) > (displayWidth / 2))) {
					// |   |   |   |   |   |   |
					// | item  ||||| info      |
					// |   | * | desc          |
					sectionTable.push([
						Cell.from(item_,).colSpan(1,),
						Cell.from('',).colSpan(1,),
						Cell.from(i,).colSpan(4,),
					], [
						Cell.from('',).colSpan(2,),
						Cell.from('*',).colSpan(1,),
						Cell.from(desc,).colSpan(3,),
					],);
					let x = sectionTable.getMinColWidth();
					if (!Array.isArray(x,)) x = new Array<number>(helpColumnN,).fill(x,);
					x[0] = Math.max(x[0], $colors.stripColor(item_,).length,);
					x[5] = Math.max(x[5], $colors.stripColor(i,).length, $colors.stripColor(desc,).length,);
					// console.warn({ x });
					sectionTable.minColWidth(x, true,);
				} else {
					// |    |    |    |    |    |    |
					// | item   || info | * | desc   |
					sectionTable.push([
						Cell.from(item_,).colSpan(1,),
						Cell.from('',).colSpan(1,),
						Cell.from(i,).colSpan(2,),
						Cell.from('*',).colSpan(1,),
						Cell.from(desc,).colSpan(1,),
					],);
					let x = sectionTable.getMinColWidth();
					if (!Array.isArray(x,)) x = new Array<number>(helpColumnN,).fill(x,);
					x[0] = Math.max(x[0], $colors.stripColor(item_,).length,);
					x[3] = Math.max(x[3], $colors.stripColor(i,).length,);
					x[5] = Math.max(x[5], $colors.stripColor(desc,).length,);
					// console.warn({ x });
					sectionTable.minColWidth(x, true,);
				}
			}
			continue;
		}
	}
	// performance.mark(`restyleYargsHelp():linesOfHelpLines:stop`);
	// logger.trace(durationText('restyleYargsHelp():linesOfHelpLines'));
	if (sectionTable.length > 0) {
		let realMaxWidths = sectionTable.getMaxColWidth();
		let realMinWidths = sectionTable.getMinColWidth();
		// console.warn({ realMaxWidths, realMinWidths });
		let tableLines = sectionTable.toString().split(/\r?\n/,);
		// console.warn({ tableLines });
		const maxLineLength = (() => {
			let max = 0;
			for (const line of tableLines) {
				const arrOfChars = [...$colors.stripColor(line,),];
				max = (arrOfChars.length > max) ? arrOfChars.length : max;
			}
			return max;
		})();
		if (maxLineLength < displayWidth) {
			if (Array.isArray(realMaxWidths,)) {
				realMaxWidths = [...realMaxWidths,];
				realMaxWidths[realMaxWidths.length - 1] += displayWidth - maxLineLength - endOfLinePadding;
				if (Array.isArray(realMinWidths,)) {
					realMinWidths = [...realMinWidths,];
					realMinWidths[realMinWidths.length - 1] = realMaxWidths[realMaxWidths.length - 1];
				}
				tableLines = sectionTable
					.maxColWidth(realMaxWidths, true,)
					.minColWidth(realMinWidths, true,)
					.toString()
					.split(/\r?\n/,);
			}
		}
		// console.warn({ tableLines });
		help.push(...tableLines.filter(Boolean,).filter((s,) => s.match(/\S/,)),);
		help.push('',);
		sectionTable.length = 0;
		sectionTable.maxColWidth(maxColWidths, true,).minColWidth(minColWidths, true,);
	}

	// performance.mark('restyleYargsHelp():stop');
	// logger.trace(durationText('restyleYargsHelp()'));
	return help.join('\n',);
}
