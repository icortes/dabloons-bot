import { ActivityType } from 'discord.js';

export type AllowedCoinFaces = 'heads' | 'tails';
export type ArgsTypes = [
  coinface: AllowedCoinFaces,
  betAmount: number,
  numberOfBets: number
];
export type StatusSetterProps = {
  name: string;
  type: ActivityType;
  state: string;
};
