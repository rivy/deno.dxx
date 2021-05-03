// spell-checker:ignore (abbrev/acronym) LOGLEVEL NOTSET PRNG

import { getLevelByName } from 'https://deno.land/std@0.93.0/log/levels.ts';
import * as Log from 'https://deno.land/std@0.93.0/log/mod.ts';

const logLevels = ['NOTSET', 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'];
const logFromEnv = Deno.env.get('LOG_LEVEL') ||
	Deno.env.get('LOGLEVEL') ||
	(Deno.env.get('DEBUG') ? 'DEBUG' : undefined) ||
	'';
const logLevelName = logLevels.find((v) => v === logFromEnv.toLocaleUpperCase()) || 'INFO';
// deno-lint-ignore no-explicit-any
const logLevel = getLevelByName(logLevelName as unknown as any);

// await Log.setup({
// 	handlers: {
// 		console: new Log.handlers.ConsoleHandler('DEBUG'),
// 	},
// 	loggers: {
// 		default: {
// 			level: 'INFO',
// 			handlers: ['console'],
// 		},
// 	},
// });

const log = Log.getLogger();
log.level = log.handlers[0].level = logLevel; // quick, but hackish (for handler level setting) => assumes console is `handlers[0]`

import {
	bench,
	BenchmarkTimer,
	runBenchmarks,
} from 'https://deno.land/std@0.93.0/testing/bench.ts';
import {
	prettyBenchmarkProgress,
	prettyBenchmarkResult,
} from 'https://deno.land/x/pretty_benching@v0.3.3/mod.ts';

import Random from 'https://deno.land/x/random@v1.1.2/Random.js';
import { Seed } from 'https://deno.land/x/seed@1.0.0/index.ts';

import * as Parser from '../../src/lib/xArgs.ts';

log.debug('setup: started');
// log.info('setup');
// log.warning('setup');
// log.error('setup');
// log.critical('setup');

performance.mark('setup:start');

const runs = 5000;

const usePresetPRNGSeed = false;
const presetPRNGSeed = 'bpcc2cfyslscmgrylcy2'; // spell-checker:disable-line
const seed = usePresetPRNGSeed ? presetPRNGSeed : (new Random()).string(20);
log.info({ seed });

const seededPRNG = new Seed(seed);
const random = new Random(() => seededPRNG.randomFloat());

function randomBoolean() {
	return random.real(0, 1) > 0.5;
}

function randomTokenFragment() {
	const quote = randomBoolean() ? '' : (randomBoolean() ? '"' : "'");
	const length = random.int(1, 10);
	return (quote +
		random.string(length, Random.LOWER_ALPHA_NUMERICS + (quote ? '' : '           ')) +
		quote);
}

function randomTokenString() {
	const tokenNumber = random.int(1, 20);
	const WS = randomBoolean() ? '' : ' ';
	let tokenS = '';
	for (let i = 0; i < tokenNumber; i++) tokenS += randomTokenFragment();
	return WS + tokenS;
}

// build random token strings
const arr: string[] = [];
const size = 1000;
for (let i = 0; i < size; i++) {
	arr.push(randomTokenString());
}

log.debug({ arrEg: arr.slice(0, 10) });

bench({
	name: 'Single function parse',
	runs,
	func: (() => {
		let passN = 0;
		return (b: BenchmarkTimer) => {
			const idx = passN++ % arr.length;
			b.start();
			Parser.wordSplitCLText(arr[idx]);
			b.stop();
		};
	})(),
});

bench({
	name: 'Shifting parse',
	runs,
	func: (() => {
		let passN = 0;
		return (b: BenchmarkTimer) => {
			const idx = passN++ % arr.length;
			b.start();
			Parser.wordSplitCLTextByShift(arr[idx]);
			b.stop();
		};
	})(),
});

performance.mark('setup:stop');
performance.measure('setup', 'setup:start', 'setup:stop');

log.debug(`setup done (duration: ${
	(() => {
		const duration = performance.getEntriesByName('setup')[0].duration;
		const [unit, n] = (duration > 1000) ? ['s', duration / 1000] : ['ms', duration];
		return (new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(n)) + ' ' + unit;
	})()
})`);

log.debug('starting benchmarking');

performance.mark('bench:start');

await runBenchmarks({ silent: true, skip: /_long/ }, prettyBenchmarkProgress()).then(
	prettyBenchmarkResult(),
);

performance.mark('bench:stop');
performance.measure('bench', 'bench:start', 'bench:stop');
log.debug(`benchmarking done (duration: ${
	(() => {
		const duration = performance.getEntriesByName('bench')[0].duration;
		const [unit, n] = (duration > 1000) ? ['s', duration / 1000] : ['ms', duration];
		return (new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(n)) + ' ' + unit;
	})()
})`);
