import { CommandObject, CommandType } from 'wokcommands';
import prisma from '../prisma/prisma';
import { GuildMember } from 'discord.js';

export default {
  // Required for slash commands
  description: 'Get your daily dabloons! 🪙',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  // Invoked when a user runs the ping command
  callback: async ({ member }: { member: GuildMember }) => {
    let user = await prisma.user.findUnique({
      where: {
        user_id: member.id,
      },
    });

    let randomNumber: number = Math.floor(Math.random() * 20) + 1;

    if (user === null) {
      user = await prisma.user.create({
        data: {
          user_id: member.id,
          currency: randomNumber,
        },
      });

      console.info(`[Prisma]: ${member} created: ${user}`);
    } else {
      let updatedUser = await prisma.user.update({
        where: {
          user_id: member.id,
        },
        data: {
          currency: randomNumber + user.currency,
        },
      });

      console.info(`[Prisma]: ${member} updated: ${updatedUser}`);
    }

    return {
      content: `${randomNumber / 20}`,
    };
  },
} as CommandObject;
