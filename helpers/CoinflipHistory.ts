import { Coinface } from "./enums";

/**
 * Represents the history of coin flips.
 */
export class CoinflipHistory {
  private numberOfBets: number;
  private historyString: string = 'History: ';

  /**
   * Creates an instance of CoinflipHistory.
   * @param numberOfBets - The number of bets in the history.
   */
  constructor(numberOfBets: number) {
    this.numberOfBets = numberOfBets;
  }

  /**
   * Adds a coin flip result to the history.
   * @param coinflipFace - The face of the coin flip.
   * @param counter - The counter value.
   */
  public add(coinflipFace: Coinface, counter: number): void {
    if (counter === 1) {
      this.historyString += `${Coinface[coinflipFace]}`;
    } else if (counter <= this.numberOfBets) {
      this.historyString += `${Coinface[coinflipFace]} | `;
    }
  }

  /**
   * Gets the history string.
   * @returns The history string.
   */
  public getHistory(): string {
    return this.historyString;
  }
}
