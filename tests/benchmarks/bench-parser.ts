// spell-checker:ignore (abbrev/acronym) LOGLEVEL NOTSET PRNG
// spell-checker:ignore (names) Deno

import { logger as log } from '../$shared.ts';
import { formatDuration, formatN, median, stdDevSample } from '../$shared.ts';

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

import { Table } from 'https://deno.land/x/tbl@1.0.3/mod.ts';

//===

import * as Parser from '../../src/lib/xArgs.ts';

//===

const logLevelFromEnv = Deno.env.get('LOG_LEVEL') ??
	Deno.env.get('LOGLEVEL') ??
	(Deno.env.get('DEBUG') ? 'DEBUG' : undefined) ??
	undefined;
log.debug(`log level of '${logLevelFromEnv}' generated from environment variables`);

const mayBeLogLevelName = logLevelFromEnv &&
	log.logLevelDetail(logLevelFromEnv.toLocaleLowerCase())?.levelName;
const logLevel = mayBeLogLevelName || 'note';

log.mergeMetadata({ Filter: { level: logLevel } });
log.debug(`log level set to '${logLevel}'`);
await log.resume();

await log.debug('setup: started');

performance.mark('setup:start');

const runs = 5000;

const usePresetPRNGSeed = false;
const presetPRNGSeed = 'bpcc2cfyslscmgrylcy2'; // spell-checker:disable-line
const seed = usePresetPRNGSeed ? presetPRNGSeed : (new Random()).string(20);
console.log({ seed });

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

await log.debug(`setup done (duration: ${
	(() => {
		const duration = performance.getEntriesByName('setup')[0].duration;
		const [unit, n] = (duration > 1000) ? ['s', duration / 1000] : ['ms', duration];
		return (new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(n)) + ' ' + unit;
	})()
})`);

await log.debug('starting benchmarking');

performance.mark('bench:start');

const benchMarkRunResult = await runBenchmarks(
	{ silent: true, skip: /_long/ },
	prettyBenchmarkProgress(),
)
	.then(prettyBenchmarkResult({ parts: { extraMetrics: true, graph: true } }));

//===

const table = new Table({
	header: ['Name', 'Run count', 'Avg Time +/- StdDev(Sample)', 'Median', 'Ratio'],
});

const results = benchMarkRunResult.results;
const minDuration = Math.min(...results.map((r) => r.measuredRunsAvgMs));
for (const result of results) {
	table.push([
		result.name,
		result.runsCount,
		formatDuration(result.measuredRunsAvgMs) + ' +/- ' +
		formatDuration(stdDevSample(result.measuredRunsMs) ?? 0),
		formatDuration(median(result.measuredRunsMs) ?? 0),
		formatN(result.measuredRunsAvgMs === minDuration ? 1 : result.measuredRunsAvgMs / minDuration, {
			minimumFractionDigits: 1,
		}),
	]);
}

console.log(table.toString());

//===

performance.mark('bench:stop');
performance.measure('bench', 'bench:start', 'bench:stop');
await log.debug(`benchmarking done (duration: ${
	(() => {
		const duration = performance.getEntriesByName('bench')[0].duration;
		return formatDuration(duration, { maximumFractionDigits: 3 });
	})()
})`);
