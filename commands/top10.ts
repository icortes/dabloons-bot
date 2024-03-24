import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import {
  getFileNameWithoutExtension,
  topTenMessageFormatter,
} from '../helpers/functions';
import prisma from '../prisma/prisma';
import { User } from '@prisma/client';

export default {
  // init command is ran when the bot is first started
  init: () => {
    console.info(`[COMMAND] /${getFileNameWithoutExtension(__filename)} loaded!`);
  },
  // Required for slash commands
  description: 'Top 10 pirates with the most dabloons.',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  // Invoked when a user runs the ping command
  callback: async (options: CommandUsage) => {
    const top10: User[] = await prisma.user.findMany({
      take: 10,
      orderBy: { moneyAmount: 'desc' },
    });
    return {
      content: `${topTenMessageFormatter(top10)}`,
    };
  },
} as CommandObject;
