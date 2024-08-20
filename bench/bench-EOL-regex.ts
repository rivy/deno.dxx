// spell-checker:ignore (abbrev/acronym) LOGLEVEL NOTSET PRNG
// spell-checker:ignore (names) Deno

import { assertEquals } from '../tests/$deps.ts';
import { $logger, /* deepEqual,*/ logger as log } from '../tests/$shared.ts';
import { env, formatDuration, formatN, median, stdDevSample } from '../tests/$shared.ts';

import {
	bench,
	type BenchmarkTimer,
	runBenchmarks,
} from 'https://deno.land/std@0.134.0/testing/bench.ts';
import {
	prettyBenchmarkProgress,
	prettyBenchmarkResult,
} from 'https://deno.land/x/pretty_benching@v0.3.3/mod.ts';

import Random from 'https://deno.land/x/random@v1.1.2/Random.js';
// import { Seed } from 'https://deno.land/x/seed@1.0.0/index.ts';

import { Table } from 'https://deno.land/x/tbl@1.0.3/mod.ts';

//===

const logLevelFromEnv = $logger.logLevelFromEnv() ?? (env('DEBUG') ? 'debug' : undefined);
log.debug(`log level of '${logLevelFromEnv}' generated from environment variables`);

const mayBeLogLevelName =
	logLevelFromEnv && log.logLevelDetail(logLevelFromEnv.toLocaleLowerCase())?.levelName;
const logLevel = mayBeLogLevelName || 'note';

log.mergeMetadata({ Filter: { level: logLevel } });
log.debug(`log level set to '${logLevel}'`);
await log.resume();

await log.debug('setup: started');

performance.mark('setup:start');

const runs = 10000;

const usePresetPRNGSeed = false;
const presetPRNGSeed = 'rft6tgk10mg1szn83nam'; // spell-checker:disable-line
const seed = usePresetPRNGSeed ? presetPRNGSeed : (new Random() as Random).string(20);
console.log({ seed });

// const seededPRNG = new Seed(seed);
// const random = new Random(() => seededPRNG.randomFloat());

// function randomBoolean() {
// 	return random.real(0, 1) > 0.5;
// }

// // build random token strings
// const arr: string[] = [];
// const size = 1000;
// for (let i = 0; i < size; i++) {
// 	const length = random.int(0, 10000);
// 	arr.push(random.string(length, Random.ALPHA_NUMERICS + EOL) + (randomBoolean() ? EOL : ''));
// }

const EOLs = [/\n|\r\n?/, /\r?\n|\r/, /\r\n?|\n/, /\n|\r\n|\r/];
const line_content = 'line content';
const lines: [string, number][] = [
	[`${line_content}\n${line_content}\n${line_content}`, 3],
	[`${line_content}\r${line_content}\r${line_content}`, 3],
	[`${line_content}\r\n${line_content}\r\n${line_content}`, 3],
	[`${line_content}\n${line_content}\r\n${line_content}\r${line_content}`, 4],
	[
		`${line_content}\n${line_content}\r\n${line_content}\r${line_content}\r\r\n\n\n\r\r${line_content}`,
		10,
	],
];
await log.debug({ lines });

function split(line: string, EOL: RegExp): string[] {
	return line.split(EOL);
}

// performance.mark('setup:verify:start');
// await log.debug('setup: verifying output equality');
// for (let i = 0; i < lines.length; i++) {
// 	assertEquals(chompThenSplit(lines[i]), splitThenSlice(lines[i]));
// }
// performance.mark('setup:verify:stop');

for (let i = 0; i < EOLs.length; i++) {
	const EOL = EOLs[i];
	bench({
		name: `Split (via ${EOL})`,
		runs,
		func: (() => {
			return (b: BenchmarkTimer) => {
				for (let i = 0; i < lines.length; i++) {
					b.start();
					const arr = split(lines[i][0], EOL);
					b.stop();
					assertEquals(arr.length, lines[i][1]);
				}
			};
		})(),
	});
}

performance.mark('setup:stop');
// performance.measure('setup:verify', 'setup:verify:start', 'setup:verify:stop');
performance.measure('setup', 'setup:start', 'setup:stop');

await log.debug(
	`setup done (duration: ${(() => {
		const duration = performance.getEntriesByName('setup')[0].duration;
		return formatDuration(duration, { maximumFractionDigits: 3 });
	})()})`,
);

await log.debug('starting benchmarking');

performance.mark('bench:start');

const benchMarkRunResult = await runBenchmarks(
	{ silent: true, skip: /_long/ },
	prettyBenchmarkProgress(),
).then(prettyBenchmarkResult({ parts: { extraMetrics: true, graph: true } }));

await log.debug({ benchMarkRunResult });

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
		`${formatDuration(result.measuredRunsAvgMs)} +/- ${formatDuration(stdDevSample(result.measuredRunsMs) ?? 0)}`,
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
await log.debug(
	`benchmarking done (duration: ${(() => {
		const duration = performance.getEntriesByName('bench')[0].duration;
		return formatDuration(duration, { maximumFractionDigits: 3 });
	})()})`,
);
