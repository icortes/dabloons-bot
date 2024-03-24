import { Client } from 'discord.js';
import WOK from 'wokcommands';
import prisma from '../prisma/prisma';
import { User } from '@prisma/client';

/**
 * Initializes the Passive Point Accumulation feature.
 * @param instance - The WOK instance.
 * @param client - The Discord client.
 */
export default (instance: WOK, client: Client): void => {
  console.info('[FEATURE] Passive Point Accumulation loaded!');
  client.on('messageCreate', async (message) => {
    // Ignore bots and DMs
    if (message.author.bot || !message.guild) return;

    // Get user moneyAmount from the database
    let user: User | null = await prisma.user.findUnique({
      where: { user_id: message.author.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { user_id: message.author.id, moneyAmount: 0, name: message.author.tag },
      });
    }

    // Add 1 to the user's moneyAmount
    const updatedUser: User = await prisma.user.update({
      where: { user_id: message.author.id },
      data: { moneyAmount: user.moneyAmount + 1, name: message.author.tag },
    });

    console.info(
      `[Prisma]: ${message.author.tag} moneyAmount: ${updatedUser.moneyAmount}`
    );
  });
};
