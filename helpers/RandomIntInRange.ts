import prand, { RandomGenerator } from 'pure-rand';

/**
 * Represents a class that generates random integers within a specified range.
 */
export class RandomIntInRange {
  private min: number;
  private max: number;
  private seed: number;
  private generator: RandomGenerator;

  /**
   * Creates an instance of RandomIntInRange.
   * @param min - The minimum value of the range (inclusive).
   * @param max - The maximum value of the range (inclusive).
   */
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.seed = Date.now() ^ (Math.random() * 0x100000000);
    this.generator = this.generator = prand.xoroshiro128plus(this.seed);
  }

  /**
   * Generates a random integer within the specified range.
   * @returns The generated random integer.
   */
  public generate(): number {
    const randomNumber = prand.unsafeUniformIntDistribution(
      this.min,
      this.max,
      this.generator
    );
    this.newGenerator();
    return randomNumber;
  }

  /**
   * Generates a new random number generator.
   */
  private newGenerator(): void {
    this.seed = Date.now() ^ (Math.random() * 0x100000000);
    this.generator = this.generator = prand.xoroshiro128plus(this.seed);
  }
}
