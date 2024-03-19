import { Coinface } from './enums';

export class CoinflipHistory {
  private numberOfBets: number;
  private historyString: string = 'History: ';

  constructor(numberOfBets: number) {
    this.numberOfBets = numberOfBets;
  }

  public add(coinflipFace: Coinface, counter: number): void {
    if (counter === 1) {
      this.historyString += `${Coinface[coinflipFace]}`;
    } else if (counter <= this.numberOfBets) {
      this.historyString += `${Coinface[coinflipFace]} | `;
    }
  }

  public getHistory(): string {
    return this.historyString;
  }
}
