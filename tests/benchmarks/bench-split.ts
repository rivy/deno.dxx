// spell-checker:ignore (abbrev/acronym) LOGLEVEL NOTSET PRNG
// spell-checker:ignore (names) Deno

import { assertEquals } from '../$deps.ts';
import { /* deepEqual,*/ logger as log } from '../$shared.ts';

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

await log.debug('setup: started');

performance.mark('setup:start');

const runs = 10000;

const usePresetPRNGSeed = false;
const presetPRNGSeed = 'couw68a3vtyod5bpyw5x'; // spell-checker:disable-line
const seed = usePresetPRNGSeed ? presetPRNGSeed : (new Random()).string(20);
console.log({ seed });

const seededPRNG = new Seed(seed);
const random = new Random(() => seededPRNG.randomFloat());

const EOL = '\n';

function randomBoolean() {
	return random.real(0, 1) > 0.5;
}

// build random token strings
const arr: string[] = [];
const size = 1000;
for (let i = 0; i < size; i++) {
	const length = random.int(0, 10000);
	arr.push(random.string(length, Random.ALPHA_NUMERICS + EOL) + (randomBoolean() ? EOL : ''));
}

await log.debug({ arrEg: arr.slice(0, 10) });

function chompThenSplit(s: string) {
	s = s.replace(/\n$/, '');
	const arr = s ? s.split('\n') : [];
	return arr;
}

function splitThenSlice(s: string) {
	const arr = s.split('\n');
	if (!arr.slice(-1)[0]) arr.pop();
	return arr;
}

performance.mark('setup:verify:start');
await log.debug('setup: verifying output equality');
for (let i = 0; i < arr.length; i++) {
	assertEquals(chompThenSplit(arr[i]), splitThenSlice(arr[i]));
}
performance.mark('setup:verify:stop');

bench({
	name: 'Chomp then split',
	runs,
	func: (() => {
		let passN = 0;
		return (b: BenchmarkTimer) => {
			const idx = passN++ % arr.length;
			b.start();
			chompThenSplit(arr[idx]);
			b.stop();
		};
	})(),
});

bench({
	name: 'Split then slice',
	runs,
	func: (() => {
		let passN = 0;
		return (b: BenchmarkTimer) => {
			const idx = passN++ % arr.length;
			b.start();
			splitThenSlice(arr[idx]);
			b.stop();
		};
	})(),
});

performance.mark('setup:stop');
performance.measure('setup:verify', 'setup:verify:start', 'setup:verify:stop');
performance.measure('setup', 'setup:start', 'setup:stop');

await log.debug(`setup done (duration: ${
	(() => {
		const duration = performance.getEntriesByName('setup')[0].duration;
		return formatDuration(duration, { maximumFractionDigits: 3 });
	})()
})`);

await log.debug('starting benchmarking');

performance.mark('bench:start');

const benchMarkRunResult = await runBenchmarks(
	{ silent: true, skip: /_long/ },
	prettyBenchmarkProgress(),
)
	.then(prettyBenchmarkResult({ parts: { extraMetrics: true, graph: true } }));

await log.debug({ benchMarkRunResult });

//===

import { Table } from 'https://deno.land/x/tbl@1.0.3/mod.ts';
import { formatDuration, formatN, median, stdDevSample } from '../$shared.ts';

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
