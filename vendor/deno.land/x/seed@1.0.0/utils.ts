import { PRNGs } from './index.ts';

import { sfc32, mulberry32, jsf32, xoshiro128 } from './prngs.ts';

export function generateRange(value: number, min: number, max: number): number {
  // Make sure the minimum and maximum values are correct
  if (min > max) throw new Error('The minimum value must be below the maximum value');
  else if (min === max) throw new Error('The minimum value cannot equal the maximum value');

  // Everything is run through the map value so if the defaults haven't changed just return
  else if (min === 0 && max === 1) return value;

  // Actually map the number range
  return ((value - 0) * (max - min)) / (1 - 0) + min;
}

export function generateSeeder(seed: string): () => number {
  // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
  // This is a seeded random generator
  // Returns a function which returns a value between 0 and 0xFFFFFFFF (32-bits)

  for (var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
    (h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));

  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

export function generateValue(prng: PRNGs, seeder: () => number) {
  // Execute the selected PRNG
  switch (prng) {
    case PRNGs.jsf32:
      return jsf32(seeder);
    case PRNGs.sfc32:
      return sfc32(seeder);
    case PRNGs.mulberry32:
      return mulberry32(seeder);
    case PRNGs.xoshiro128:
      return xoshiro128(seeder);
  }
}