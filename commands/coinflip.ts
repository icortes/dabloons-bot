import { ApplicationCommandOptionType, AutocompleteInteraction } from 'discord.js';
import { Command, CommandObject, CommandType, CommandUsage } from 'wokcommands';
import { RandomIntInRange } from '../helpers/RandomIntInRange';
import { CoinflipHistory } from '../helpers/CoinflipHistory';
import { Coinface } from '../helpers/enums';
import { ArgsTypes } from '../helpers/types';
import prisma from '../prisma/prisma';
import { getFileNameWithoutExtension } from '../helpers/functions';

export default {
  // init command is ran when the bot is first started
  init: () => {
    console.info(`[COMMAND] /${getFileNameWithoutExtension(__filename)} loaded!`);
  },
  // Required for slash commands
  description: 'Gamble your points away! 🎰',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  expectedArgs: '<coinface> <bet-amount> [number-of-bets]',
  minArgs: 2,
  maxArgs: 3,

  // The message to be sent if the user doesn't provide the correct syntax
  correctSyntax: 'Correct syntax: {PREFIX}{COMMAND} {ARGS}',

  options: [
    {
      name: 'coinface',
      description: 'heads or tails, two sides of a coin',
      type: ApplicationCommandOptionType.String,
      required: true,
      // Required for autocomplete to work
      autocomplete: true,
    },
    {
      name: 'bet-amount',
      description: 'number of dabloons to bet',
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      required: true,
      // Required for autocomplete to work
      autocomplete: true,
    },
    {
      name: 'number-of-bets',
      description: 'number of times to bet, each coinflip will add/subtract bet-amount',
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 20,
      required: false,
      // Required for autocomplete to work
      autocomplete: true,
    },
  ],

  // This function is invoked when autocomplete is ran in this command.
  // To enable autocomplete pass in an options array with "autocomplete: true"
  autocomplete: (
    command: Command,
    argument: string,
    interaction: AutocompleteInteraction
  ): string[] | undefined => {
    if (argument === 'coinface') return ['heads', 'tails'];
    else if (argument === 'bet-amount') return ['5', '10', '25', '50', '100'];
    else if (argument === 'number-of-bets') return ['3', '5', '10', '15', '20'];
  },

  // Invoked when a user runs the ping command
  callback: async (options: CommandUsage) => {
    try {
      const { args, member } = options;

      let [coinface, betAmount, numberOfBets = 1]: ArgsTypes = <ArgsTypes>args;
      betAmount = Number(betAmount);
      numberOfBets = Number(numberOfBets);
      let jackpot: number = 0;

      // random number generator
      let coin: RandomIntInRange = new RandomIntInRange(0, 1);
      // Coinflip history to show the user
      let coinflipHistory = new CoinflipHistory(numberOfBets);

      // validate coinface
      if (!(coinface.toLowerCase() === 'heads' || coinface.toLowerCase() === 'tails')) {
        return {
          content: "'heads' or 'tails' only valid for coinface, try again!",
          ephemeral: true,
        };
      }

      // get user dabloons
      const user = await prisma.user.findUnique({
        where: {
          user_id: member?.id,
        },
        select: {
          moneyAmount: true,
        },
      });

      // check if user is in db
      if (user === null) {
        return {
          content:
            'You have no dabloons! Use `/sailtheseas` first! <:ostrich:669760025182339092>',
          ephemeral: true,
        };
      }

      // check that the bet amount * numberOfBets is less than user dabloon amount
      if (user.moneyAmount < betAmount * numberOfBets) {
        return {
          content:
            'Bet amount exceeds your dabloon amount! Try a smaller bet! <:CAUGHT:1192270643534766191>',
          ephemeral: true,
        };
      }

      console.info(`[Coinflip] ${member?.displayName} chose ${coinface}.`);
      // loop for numberOfBets
      while (numberOfBets > 0) {
        // flipcoin
        let coinResult: Coinface = coin.generate();
        //add result to history string
        coinflipHistory.add(coinResult, numberOfBets);
        // check the coinface we picked matches the coinflip
        if (coinface === Coinface[coinResult]) {
          // add jackpot
          jackpot += betAmount;
        }
        // else subtract
        else {
          jackpot -= betAmount;
        }
        numberOfBets--;
      }

      const updatedUser: { moneyAmount: number } = await prisma.user.update({
        where: {
          user_id: member?.id,
        },
        data: {
          moneyAmount: user.moneyAmount + jackpot,
        },
        select: {
          moneyAmount: true,
        },
      });

      // send message with jackpot and updated dabloons
      return {
        content: `${member} chose ${coinface}. ${
          jackpot > 0
            ? `Won ${jackpot} dabloons❗ total dabloons: ${updatedUser.moneyAmount} <a:catJAM:738060105576218750>`
            : `Lost ${jackpot} dabloons❗ total dabloons: ${updatedUser.moneyAmount} <a:BLUBBERS:855166052492771378>`
        } \n${coinflipHistory.getHistory()}`,
      };
    } catch (error) {
      return {
        content: error,
      };
    }
  },
} as CommandObject;
