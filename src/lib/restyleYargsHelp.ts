import { $cliffyTable, $colors } from './$deps.ts';

//===

import * as $consoleSize from './consoleSize.ts';

//===

export async function restyleYargsHelp(helpText: string, options?: { consoleWidth: number }) {
	// performance.mark('restyleYargsHelp():start');
	const Cell: typeof $cliffyTable.Cell = $cliffyTable.Cell;
	const Table: typeof $cliffyTable.Table = $cliffyTable.Table;
	// FixME: [2021-11-22; rivy] function needs significant cleanup of technical debt and refactoring for general use
	const optionTextIndentSize = 2;
	const endOfLinePadding = 1;
	const border = false;
	const maxWidth = options?.consoleWidth ?? (await $consoleSize.consoleSize())?.columns ?? 80; // `consoleSize()` may take ~ 150 ms if fallback to shell scripts are needed
	const maxWidths = [maxWidth / 6, 1, 1, maxWidth / 6, 1, 3 * maxWidth / 6];
	const minWidths = [4, 0, 0, 8, 0, 3 * maxWidth / 6];
	const sectionTable = new Table()
		.maxColWidth(maxWidths)
		.minColWidth(minWidths)
		.border(border)
		.padding(0)
		.indent(optionTextIndentSize - 1);
	// performance.mark('restyleYargsHelp():helpLines:start');
	const helpLines = helpText.replace(/\r?\n$/, '').split(/\r?\n/);
	// performance.mark('restyleYargsHelp():helpLines:stop');
	// logger.trace(durationText('restyleYargsHelp():helpLines'));
	// console.warn({ helpLines });
	const help: string[] = [];
	const titleLine = helpLines.shift();
	if (titleLine == undefined) return [];
	// 1st line == name + version
	help.push($colors.italic(titleLine));
	while ((helpLines.length > 0) && helpLines[0].length === 0) {
		help.push(helpLines.shift() as string);
	}
	// console.warn({ helpLines, help });
	let state: undefined | 'arguments' | 'examples' | 'options' | 'other' = 'other';
	// performance.mark(`restyleYargsHelp():linesOfHelpLines:start`);
	const lineRegExp = {
		// :sad: ... no change to execution speed by using "precompiled" regexps
		// *However*, NOT using unicode-flagged regexps ... 100 ms => 5 ms total rendering time
		// unicode case folding is *expensive*, avoid it!; ref: <http://www.guido-flohr.net/unicode-regex-pitfalls> @@ <https://archive.is/szfPd>
		// ref: <https://mathiasbynens.be/notes/es6-unicode-regex> @@ <https://archive.md/cJYO2>
		sectionHeader: new RegExp(/^\S.*:$/u),
		sectionArguments: new RegExp(/^(?:arguments|positionals):$/i),
		sectionExamples: new RegExp(/^examples:$/i),
		sectionOptions: new RegExp(/^options:$/i),
		sectionArgumentsLines: new RegExp(/^\s*(\S+)\s+(.*)$/mu),
		sectionExamplesLines: new RegExp(/^\s*(\S.*?)\s\s+(.*)$/u),
		sectionOptionsLines: new RegExp(/^\s+(-.*?)(\s\s+)([\S\s]*?)(\s+)((?:\s?\[.*?\])+)$/mu),
	};
	for (const line of helpLines) {
		// const initialState: typeof state = state;
		// console.warn({ length: line.length, line });
		if (line.length === 0) {
			if (sectionTable.length) {
				// performance.mark(`restyleYargsHelp():renderTable(${initialState})`);
				// console.warn(`render table for ${initialState}`, { sectionTable });
				let realMaxWidths = sectionTable.getMaxColWidth();
				let realMinWidths = sectionTable.getMinColWidth();
				// console.warn({ realMaxWidths, realMinWidths });
				let tableLines = sectionTable.toString().split(/\r?\n/);
				// console.warn({ tableLines });
				const maxLineLength = (() => {
					let max = 0;
					for (const line of tableLines) {
						const arrOfChars = [...$colors.stripColor(line)];
						max = (arrOfChars.length > max) ? arrOfChars.length : max;
					}
					return max;
				})();
				if (maxLineLength < maxWidth) {
					if (Array.isArray(realMaxWidths)) {
						realMaxWidths = [...realMaxWidths];
						realMaxWidths[realMaxWidths.length - 1] += maxWidth - maxLineLength - endOfLinePadding;
						if (Array.isArray(realMinWidths)) {
							realMinWidths = [...realMinWidths];
							realMinWidths[realMinWidths.length - 1] = realMaxWidths[realMaxWidths.length - 1];
						}
						tableLines = sectionTable
							.maxColWidth(realMaxWidths, true)
							.minColWidth(realMinWidths, true)
							.toString()
							.split(/\r?\n/);
					}
				}
				// console.warn({ tableLines });
				help.push(...tableLines.filter(Boolean).filter((s) => s.match(/\S/)));
				sectionTable.length = 0;
				sectionTable.maxColWidth(maxWidths, true).minColWidth(minWidths, true);
				// performance.mark(`restyleYargsHelp():renderTable(${initialState})`);
				// await logger.trace(durationText(`restyleYargsHelp():renderTable(${initialState})`));
				// performance.clearMarks(`restyleYargsHelp():renderTable(${initialState})`);
			}
			help.push('');
			continue;
		}
		if (line.match(lineRegExp.sectionHeader)) {
			// section header
			// console.warn(`new section`);
			if (line.match(lineRegExp.sectionArguments)) {
				state = 'arguments';
			} else if (line.match(lineRegExp.sectionExamples)) {
				state = 'examples';
			} else if (line.match(lineRegExp.sectionOptions)) {
				state = 'options';
			} else state = 'other';
			help.push($colors.dim($colors.italic(line)));
			continue;
		}
		if (state === 'arguments') {
			const matchOption = line.match(lineRegExp.sectionArgumentsLines);
			if (matchOption == null) {
				help.push(line);
			} else {
				const [_s, item, desc] = matchOption as RegExpMatchArray;
				// console.warn(state, s, item, desc);
				sectionTable.push([
					Cell.from(item).colSpan(1),
					Cell.from('').colSpan(1),
					Cell.from(desc).colSpan(4),
				]);
			}
			continue;
		}
		if (state === 'examples') {
			const matchOption = line.match(lineRegExp.sectionExamplesLines);
			if (matchOption == null) {
				if (line.match(/^\s+/)) {
					sectionTable.push([Cell.from(line.replace(/^\s*/, '')).colSpan(6)]);
				} else help.push(line);
			} else {
				const [_s, item, desc] = matchOption as RegExpMatchArray;
				// console.warn({ state, line, _s, item, desc });
				sectionTable.push([Cell.from(item).colSpan(6)], [
					Cell.from('').colSpan(1),
					Cell.from('*').colSpan(1),
					Cell.from(desc).colSpan(4),
				]);
			}
			continue;
		}
		if ((state === 'options') || (state === 'other')) {
			const matchOption = line.match(lineRegExp.sectionOptionsLines);
			if (matchOption == null) {
				help.push(line);
			} else {
				const [_s, item, _sep, desc, _sep2, info] = matchOption as RegExpMatchArray;
				const i = info.replace(
					/\[(.*?)\]/g,
					(_: string, content: string) => $colors.dim(`{${content}}`),
				);
				if ((item.length > (maxWidth / 6)) || (info.length > (maxWidth / 6))) {
					sectionTable.push([Cell.from(item).colSpan(6)], [
						Cell.from('').colSpan(1),
						Cell.from(i).colSpan(5),
					], [Cell.from('').colSpan(1), Cell.from('*').colSpan(1), Cell.from(desc).colSpan(4)]);
				} else {
					sectionTable.push([
						Cell.from(item).colSpan(1),
						Cell.from('').colSpan(1),
						Cell.from(i).colSpan(2),
						Cell.from('*').colSpan(1),
						Cell.from(desc).colSpan(1),
					]);
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
		let tableLines = sectionTable.toString().split(/\r?\n/);
		// console.warn({ tableLines });
		const maxLineLength = (() => {
			let max = 0;
			for (const line of tableLines) {
				const arrOfChars = [...$colors.stripColor(line)];
				max = (arrOfChars.length > max) ? arrOfChars.length : max;
			}
			return max;
		})();
		if (maxLineLength < maxWidth) {
			if (Array.isArray(realMaxWidths)) {
				realMaxWidths = [...realMaxWidths];
				realMaxWidths[realMaxWidths.length - 1] += maxWidth - maxLineLength - endOfLinePadding;
				if (Array.isArray(realMinWidths)) {
					realMinWidths = [...realMinWidths];
					realMinWidths[realMinWidths.length - 1] = realMaxWidths[realMaxWidths.length - 1];
				}
				tableLines = sectionTable
					.maxColWidth(realMaxWidths, true)
					.minColWidth(realMinWidths, true)
					.toString()
					.split(/\r?\n/);
			}
		}
		// console.warn({ tableLines });
		help.push(...tableLines.filter(Boolean).filter((s) => s.match(/\S/)));
		help.push('');
		sectionTable.length = 0;
		sectionTable.maxColWidth(maxWidths, true).minColWidth(minWidths, true);
	}

	// performance.mark('restyleYargsHelp():stop');
	// logger.trace(durationText('restyleYargsHelp()'));
	return help.join('\n');
}
