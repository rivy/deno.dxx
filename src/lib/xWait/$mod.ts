// spell-checker:ignore (libs) [tty] wcswidth
// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) listr

// deno-lint-ignore-file no-inferrable-types

// forked from [wait](https://deno.land/x/wait@0.1.12); [repo](https://github.com/denosaurs/wait); MIT
// inspiration from...
// * [listr](https://www.npmjs.com/package/listr); [repo](https://github.com/SamVerschueren/listr); MIT
// * [ora](https://www.npmjs.com/package/ora) ; [repo](https://github.com/sindresorhus/ora); MIT
// further ideas from [progress](https://deno.land/x/progress@v1.2.4); [repo](https://github.com/deno-library/progress); MIT

import { $colors, $tty } from '../$deps.ts';
import { encode } from '../$shared.ts';

import { $consoleSize } from '../$locals.ts';

import spinners from './spinners.ts';
import type { SpinnerAnimation } from './spinners.ts';
export type { SpinnerAnimation } from './spinners.ts';

import { symbols as Symbols } from './log_symbols.ts';
export { symbols, symbolStrings } from './log_symbols.ts';

type ColorFunction = (message: string) => string;
const colorMap: { [key: string]: ColorFunction } = {
	black: $colors.black,
	red: $colors.red,
	green: $colors.green,
	yellow: $colors.yellow,
	blue: $colors.blue,
	magenta: $colors.magenta,
	cyan: $colors.cyan,
	white: $colors.white,
	gray: $colors.gray,
};

export interface SpinnerOptions {
	text: string;
	prefix?: string;
	spinner?: string | SpinnerAnimation;
	color?: string | ColorFunction;
	clearOnWrite?: boolean;
	hideCursor?: boolean;
	indent?: number;
	interval?: number;
	stream?: Deno.WriterSync & { rid: number };
	enabled?: boolean;
	discardStdin?: boolean;
	symbols?: typeof Symbols;
}

export interface PersistOptions {
	prefix?: string;
	symbol?: string;
	text?: string;
}

export function wait(opts: string | SpinnerOptions) {
	if (typeof opts === 'string') {
		opts = { text: opts };
	}
	return new Spinner({
		text: opts.text,
		prefix: opts.prefix ?? '',
		color: opts.color ?? $colors.cyan,
		spinner: opts.spinner ?? 'dots',
		clearOnWrite: opts.clearOnWrite ?? true,
		hideCursor: opts.hideCursor ?? true,
		indent: opts.indent ?? 0,
		interval: opts.interval ?? 100,
		stream: opts.stream ?? Deno.stdout,
		enabled: true,
		discardStdin: true,
		symbols: opts.symbols ?? Symbols,
	});
}

export class Spinner {
	#opts: Required<SpinnerOptions>;

	isSpinning: boolean;

	#stream: Deno.WriterSync & { rid: number };
	indent: number;
	interval: number;

	#id: number = 0;

	#enabled: boolean;
	#frameIndex: number;
	#linesToClear: number;
	#linesCount: number;

	constructor(opts: Required<SpinnerOptions>) {
		this.#opts = opts;

		this.#stream = this.#opts.stream;

		this.text = this.#opts.text;
		this.prefix = this.#opts.prefix;

		this.color = this.#opts.color;
		this.spinner = this.#opts.spinner;
		this.indent = this.#opts.indent;
		this.interval = this.#opts.interval;
		this.symbols = this.#opts.symbols;

		this.isSpinning = false;
		this.#frameIndex = 0;
		this.#linesToClear = 0;
		this.#linesCount = 1;

		this.#enabled = typeof opts.enabled === 'boolean'
			? opts.enabled
			: $tty.isInteractive(this.#stream);

		if (opts.hideCursor) {
			addEventListener('unload', () => {
				$tty.showCursorSync(this.#stream);
			});
		}
	}

	#spinner: SpinnerAnimation = spinners.dots;
	#color: ColorFunction = $colors.cyan;
	#text: string = '';
	#prefix: string = '';
	#symbols: typeof Symbols = Symbols;

	set spinner(spin: string | SpinnerAnimation) {
		this.#frameIndex = 0;
		if (typeof spin === 'string') this.#spinner = spinners[spin];
		else this.#spinner = spin;
	}

	get spinner() {
		return this.#spinner;
	}

	set symbols(s: typeof Symbols) {
		this.#symbols = s;
	}
	get symbols() {
		return this.#symbols;
	}

	set color(color: string | ColorFunction) {
		if (typeof color === 'string') this.#color = colorMap[color];
		else this.#color = color;
	}

	get color() {
		return this.#color;
	}

	set text(value: string) {
		this.#text = value;
		this.updateLines();
	}

	get text() {
		return this.#text;
	}

	set prefix(value: string) {
		this.#prefix = value;
		this.updateLines();
	}

	get prefix() {
		return this.#prefix;
	}

	private write(data: string) {
		const lines = (() => {
			if (this.#opts.clearOnWrite) {
				return [{ text: data, eol: undefined }];
			} else {
				return data
					.split(/(\r?\n|\r)/)
					.map((line, index, array) => {
						if (index % 2 === 0) {
							return { text: line, eol: array[index + 1] };
						}
					})
					.filter(Boolean);
			}
		})();
		for (let i = 0; i < lines.length; i++) {
			let encodedData = encode(lines[i]?.text);
			// `writeSync()` may not write all data in a single call (ie, if buffer becomes full); alternative would be to use `writeAllSync()` (from streams/conversion.ts)
			let bytesWritten = 0;
			while (bytesWritten < encodedData.byteLength) {
				bytesWritten += this.#stream.writeSync(encodedData);
			}
			if (!this.#opts.clearOnWrite) $tty.clearRightSync(this.#stream);
			bytesWritten = 0;
			encodedData = encode(lines[i]?.eol);
			while (bytesWritten < encodedData.byteLength) {
				bytesWritten += this.#stream.writeSync(encodedData);
			}
		}
	}

	start(): Spinner {
		if (!this.#enabled) {
			if (this.text) {
				this.write(`- ${this.text}\n`);
			}
			return this;
		}

		if (this.isSpinning) return this;

		if (this.#opts.hideCursor) {
			$tty.hideCursorSync(this.#stream);
		}

		this.render();
		this.#id = setInterval(this.render.bind(this), this.interval);
		return this;
	}

	render(): void {
		if (this.#opts.clearOnWrite) this.clear();
		else {
			$tty.goUpSync(this.#linesCount - 1, this.#stream);
			$tty.goRightSync(this.indent - 1, this.#stream);
		}
		this.write(`${this.frame()}\n`);
		this.updateLines();
		this.#linesToClear = this.#linesCount;
	}

	frame(): string {
		const { frames } = this.#spinner;
		let frame = frames[this.#frameIndex];

		frame = this.#color(frame);

		this.#frameIndex = ++this.#frameIndex % frames.length;
		const fullPrefixText = typeof this.prefix === 'string' && this.prefix !== ''
			? this.prefix + ' '
			: '';
		const fullText = typeof this.text === 'string' ? ' ' + this.text : '';

		return fullPrefixText + frame + fullText;
	}

	clear(): void {
		if (!this.#enabled) return;

		for (let i = 0; i < this.#linesToClear; i++) {
			$tty.goUpSync(1, this.#stream);
			$tty.clearLineSync(this.#stream);
			$tty.goRightSync(this.indent - 1, this.#stream);
		}

		this.#linesToClear = 0;
	}

	updateLines(): void {
		const columns = $consoleSize.consoleSizeSync(this.#stream.rid)?.columns || 80;
		const fullPrefixText = typeof this.prefix === 'string' ? this.prefix + '-' : '';
		this.#linesCount = $colors.stripColor(fullPrefixText + '--' + this.text).split('\n').reduce(
			(count, line) => {
				return count + Math.max(1, Math.ceil($tty.wcswidth(line) / columns));
			},
			0,
		);
	}

	stop() {
		if (!this.#enabled) return;
		clearInterval(this.#id);
		this.#id = -1;
		this.#frameIndex = 0;
		this.clear();
		if (this.#opts.hideCursor) {
			$tty.showCursorSync(this.#stream);
		}
	}

	stopAndPersist(options: PersistOptions = {}) {
		const prefix = options.prefix || this.prefix;
		const fullPrefix = typeof prefix === 'string' && prefix !== '' ? prefix + ' ' : '';
		const text = options.text || this.text;
		const fullText = typeof text === 'string' ? ' ' + text : '';

		this.stop();
		// https://github.com/denoland/deno/issues/6001
		console.log(`${fullPrefix}${options.symbol || ' '}${fullText}`);
	}

	succeed(text?: string) {
		return this.stopAndPersist({ symbol: this.#symbols.success, text });
	}

	fail(text?: string) {
		return this.stopAndPersist({ symbol: this.#symbols.failure, text });
	}

	warn(text?: string) {
		return this.stopAndPersist({ symbol: this.#symbols.warning, text });
	}

	info(text?: string) {
		return this.stopAndPersist({ symbol: this.#symbols.info, text });
	}
}
