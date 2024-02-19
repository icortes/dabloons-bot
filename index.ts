import { Client, Events, IntentsBitField, Partials } from 'discord.js';
import WOK from 'wokcommands';
import path from 'path';
require('dotenv/config');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  client.user?.setPresence({
    status: 'online',
    activities: [
      {
        name: 'with your heart ❤️',
        type: 0,
      },
    ],
  });

  new WOK({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    botOwners: ['95377567707566080'],
    testServers: ['289669662612914176'],
    mongoUri: process.env.DATABASE_URL,
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again.',
      botOwnersBypass: true,
      dbRequired: 300,
    },
  });
});

client.login(process.env.TOKEN);
