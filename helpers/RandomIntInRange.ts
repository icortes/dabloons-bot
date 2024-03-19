import prand, { RandomGenerator } from 'pure-rand';

export class RandomIntInRange {
  private min: number;
  private max: number;
  private seed: number;
  private generator: RandomGenerator;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.seed = Date.now() ^ (Math.random() * 0x100000000);
    this.generator = this.generator = prand.xoroshiro128plus(this.seed);
  }

  public generate(): number {
    const randomNumber = prand.unsafeUniformIntDistribution(
      this.min,
      this.max,
      this.generator
    );
    this.newGenerator();
    return randomNumber;
  }

  private newGenerator(): void {
    this.seed = Date.now() ^ (Math.random() * 0x100000000);
    this.generator = this.generator = prand.xoroshiro128plus(this.seed);
  }
}
