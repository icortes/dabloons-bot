import { CommandObject, CommandType } from 'wokcommands';
import prisma from '../prisma/prisma';
import { getFileNameWithoutExtension } from '../helpers/functions';

export default {
  // init command is ran when the bot is first started
  init: () => {
    console.info(`[COMMAND] /${getFileNameWithoutExtension(__filename)} loaded!`);
  },
  // Required for slash commands
  description: 'Check your dabloon balance.',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  // Invoked when a user runs the ping command
  callback: async ({ member }) => {
    let user = await prisma.user.findUnique({
      where: {
        user_id: member?.id,
      },
      select: {
        moneyAmount: true,
      },
    });

    if (user === null) return { content: 'You have no dabloons. Roll to get started!' };

    return {
      content: `${member} has ${user.moneyAmount} dabloons!`,
    };
  },
} as CommandObject;
