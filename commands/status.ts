import {
  ActivityType,
  ApplicationCommandOptionType,
  AutocompleteInteraction,
} from 'discord.js';
import { Command, CommandObject, CommandType, CommandUsage } from 'wokcommands';
import { getFileNameWithoutExtension } from '../helpers/functions';

export default {
  // init command is ran when the bot is first started
  init: () => {
    console.info(`[COMMAND] /${getFileNameWithoutExtension(__filename)} loaded!`);
  },
  // Required for slash commands
  description: 'Ping pong command',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  // This command can only be ran by the owner of the bot
  ownerOnly: true,

  // The minimum arguments required
  minArgs: 1,

  options: [
    {
      name: 'name',
      description: 'the name of the status to set for the bot',
      type: ApplicationCommandOptionType.String,
      required: true,
      // Required for autocomplete to work
      autocomplete: true,
    },
    {
      name: 'type',
      description: 'the type of status to set',
      type: ApplicationCommandOptionType.String,
      required: false,
      // Required for autocomplete to work
      autocomplete: true,
    },
    {
      name: 'state',
      description: 'set description for the bot',
      type: ApplicationCommandOptionType.String,
      required: false,
      // Required for autocomplete to work
      autocomplete: true,
    },
  ],

  autocomplete: (
    command: Command,
    argument: string,
    interaction: AutocompleteInteraction
  ): string[] | undefined => {
    switch (argument) {
      case 'name':
        return [
          'Valorante 🔫',
          'Overwatch 🤮',
          'Hell Divers 🚀',
          'Grand Theft Auto VI 🚗',
        ];
      case 'type':
        return [
          ...Object.keys(ActivityType).filter(
            (key): boolean => typeof ActivityType[key as any] === 'number'
          ),
        ];
      case 'state':
        return [
          '☆*: .｡. o(≧▽≦)o .｡.:*☆',
          '*★,°*:.☆(￣▽￣)/$:*.°★* 。',
          '（づ￣3￣）づ╭❤️～',
          'ε=ε=ε=(~￣▽￣)~',
          'o(*////▽////*)q',
          "I'm a bot, I don't have feelings.",
        ];
    }
  },

  // Invoked when a user runs the ping command
  callback: (options: CommandUsage) => {
    // TODO: make
    return {
      content: 'Pong!',
    };
  },
} as CommandObject;
