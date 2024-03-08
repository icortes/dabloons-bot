import { CommandObject, CommandType } from 'wokcommands';
import prisma from '../prisma/prisma';

export default {
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
    });

    if (user === null) return { content: 'Ypu have no dabloons. Roll to get started!' };

    return {
      content: `${member} has ${user.currency} dabloons!`,
    };
  },
} as CommandObject;
