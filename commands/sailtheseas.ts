import { CommandObject, CommandType } from 'wokcommands';
import prisma from '../prisma/prisma';
import { GuildMember } from 'discord.js';
import { getCoinEmojis, getFileNameWithoutExtension } from '../helpers/functions';

export default {
  // init command is ran when the bot is first started
  init: () => {
    console.info(`[COMMAND] /${getFileNameWithoutExtension(__filename)} loaded!`);
  },
  // Required for slash commands
  description: 'Get your daily dabloons! 🪙',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  // Invoked when a user runs the ping command
  callback: async ({ member }: { member: GuildMember }) => {
    let userTotalDabloons: number;
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
          moneyAmount: randomNumber,
        },
      });

      userTotalDabloons = user.moneyAmount;
      console.info(`[Prisma]: ${member.displayName} created: ${JSON.stringify(user)}`);
    } else {
      let updatedUser = await prisma.user.update({
        where: {
          user_id: member.id,
        },
        data: {
          moneyAmount: randomNumber + user.moneyAmount,
        },
      });

      userTotalDabloons = updatedUser.moneyAmount;
      console.info(
        `[Prisma]: ${member.displayName} updated: ${JSON.stringify(updatedUser)}`
      );
    }

    return {
      content: `${randomNumber} / 20. Total: ${userTotalDabloons}!\n${getCoinEmojis(
        randomNumber
      )}`,
    };
  },
} as CommandObject;
