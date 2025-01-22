import { generateSeeder, generateRange, generateValue } from './utils.ts';

export enum PRNGs {
  sfc32 = 'sfc32',
  jsf32 = 'jsf32',
  mulberry32 = 'mulberry32',
  xoshiro128 = 'xoshiro128',
}

export class Seed {
  // Default PRNG is sfc32
  public prng = PRNGs.sfc32;

  private _seed: string;
  private _seeder: () => number;

  set seed(seed: string) {
    // If the seed hasn't changed just return
    if (this._seed === seed) return;

    this._seed = seed;
    this._seeder = generateSeeder(seed);
  }

  get seed() {
    return this._seed;
  }

  constructor(seed: string = '', prng?: PRNGs) {
    // Only set a prng if it has been provided
    if (prng) this.prng = prng

    this._seed = seed;
    this._seeder = generateSeeder(seed);
  }

  public randomFloat(min: number = 0, max: number = 1): number {
    // Fetch a random value from the selected PRNG and map it
    return generateRange(generateValue(this.prng, this._seeder), min, max);
  }

  public randomInt(min: number = 0, max: number = 1): number {
    // Fetch a random float and round it into an integer
    return Math.round(this.randomFloat(min, max));
  }
}