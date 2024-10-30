import { ActivityType, Client, Events, IntentsBitField, Partials } from 'discord.js';
import WOK from 'wokcommands';
import path from 'path';
import { StatusSetter } from './helpers/StatusSetter';
require('dotenv/config');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const statusSetter: StatusSetter = StatusSetter.getInstance();
  statusSetter.setBotStatus(client);

  new WOK({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    botOwners: ['95377567707566080'],
    testServers: ['289669662612914176', '1215498228271677540'],
    mongoUri: process.env.DATABASE_URL,
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again.',
      botOwnersBypass: true,
      dbRequired: 300,
    },
  });
});

client.login(process.env.TOKEN);

//TODO: leaderboards
//TODO: https://discord.js.org/docs/packages/discord.js/14.14.1/GuildMember:Class#disableCommunicationUntil
//TODO: alexa feature with image search
