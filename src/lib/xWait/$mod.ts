// spell-checker:ignore (libs) [tty] wcswidth
// spell-checker:ignore (names) Deno
// spell-checker:ignore (utils) listr

// deno-lint-ignore-file no-inferrable-types

// forked from [wait](https://deno.land/x/wait@0.1.12); [repo](https://github.com/denosaurs/wait); MIT
// inspiration from...
// * [listr](https://www.npmjs.com/package/listr); [repo](https://github.com/SamVerschueren/listr); MIT
// * [ora](https://www.npmjs.com/package/ora) ; [repo](https://github.com/sindresorhus/ora); MIT
// further ideas from [progress](https://deno.land/x/progress@v1.2.4); [repo](https://github.com/deno-library/progress); MIT

import { Colors, TTY as tty } from '../$deps.ts';
import { encode } from '../$shared.ts';

import spinners from './spinners.ts';

import { symbols as Symbols } from './log_symbols.ts';
export { symbols, symbolStrings } from './log_symbols.ts';

type ColorFunction = (message: string) => string;
const colorMap: { [key: string]: ColorFunction } = {
	black: Colors.black,
	red: Colors.red,
	green: Colors.green,
	yellow: Colors.yellow,
	blue: Colors.blue,
	magenta: Colors.magenta,
	cyan: Colors.cyan,
	white: Colors.white,
	gray: Colors.gray,
};

export interface SpinnerAnimation {
	interval: number;
	frames: string[];
}

export interface SpinnerOptions {
	text: string;
	prefix?: string;
	spinner?: string | SpinnerAnimation;
	color?: string | ColorFunction;
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
		color: opts.color ?? Colors.cyan,
		spinner: opts.spinner ?? 'dots',
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
			: tty.isInteractive(this.#stream);

		if (opts.hideCursor) {
			addEventListener('unload', () => {
				tty.showCursorSync(this.#stream);
			});
		}
	}

	#spinner: SpinnerAnimation = spinners.dots;
	#color: ColorFunction = Colors.cyan;
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
		this.#stream.writeSync(encode(data));
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
			tty.hideCursorSync(this.#stream);
		}

		this.render();
		this.#id = setInterval(this.render.bind(this), this.interval);
		return this;
	}

	render(): void {
		this.clear();
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
			tty.goUpSync(1, this.#stream);
			tty.clearLineSync(this.#stream);
			tty.goRightSync(this.indent - 1, this.#stream);
		}

		this.#linesToClear = 0;
	}

	updateLines(): void {
		// `Deno.consoleSize()` is unstable API (as of v1.12) => deno-lint-ignore no-explicit-any
		// deno-lint-ignore no-explicit-any
		const denoConsoleSize = (Deno as any).consoleSize;
		const columns = denoConsoleSize ? denoConsoleSize(this.#stream.rid)?.columns || 80 : 80;
		const fullPrefixText = typeof this.prefix === 'string' ? this.prefix + '-' : '';
		this.#linesCount = Colors.stripColor(fullPrefixText + '--' + this.text).split('\n').reduce(
			(count, line) => {
				return count + Math.max(1, Math.ceil(tty.wcswidth(line) / columns));
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
			tty.showCursorSync(this.#stream);
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
