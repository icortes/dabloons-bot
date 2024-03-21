import { CommandObject, CommandType } from 'wokcommands';

export default {
  // Required for slash commands
  description: 'Ping pong command',

  // Create a legacy and slash command
  type: CommandType.SLASH,

  // This command can only be ran by the owner of the bot
  ownerOnly: true,

  // Invoked when a user runs the ping command
  callback: () => {
    
    return {
      content: 'Pong!',
    };
  },
} as CommandObject;
