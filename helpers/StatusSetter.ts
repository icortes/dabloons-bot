import { ActivityType, Client } from 'discord.js';
import { StatusSetterProps } from './types';

/**
 * Represents a class that sets the status of a bot.
 */
export class StatusSetter {
  // Singleton instance
  private static _instance: StatusSetter = new StatusSetter({
    name: 'Valorante 🔫',
    type: ActivityType.Playing,
    state: '*★,°*:.☆(￣▽￣) / $:*.°★* 。',
  });

  private name: string;
  private type: ActivityType;
  private state: string;

  /**
   * Creates an instance of StatusSetter.
   * @param name - The name of the bot's activity.
   * @param type - The type of the bot's activity.
   * @param state - The state of the bot's activity.
   */
  private constructor({ name, type, state }: StatusSetterProps) {
    this.name = name;
    this.type = type || ActivityType.Playing;
    this.state = state || '*★,°*:.☆(￣▽￣) / $:*.°★* 。';
  }

  /**
   * Gets the singleton instance of StatusSetter.
   * @returns The singleton instance of StatusSetter.
   */
  public static getInstance(): StatusSetter {
    return this._instance;
  }

  /**
   * Sets the status of the bot.
   * @param client - The client object representing the bot.
   */
  public setBotStatus(client: Client): void {
    client.user?.setPresence({
      status: 'online',
      activities: [
        {
          name: this.name,
          type: this.type,
          state: this.state,
        },
      ],
    });
  }

  /**
   * Sets the status properties.
   * @param name - The name of the bot's activity.
   * @param type - The type of the bot's activity.
   * @param state - The state of the bot's activity.
   */
  public setStatusProps({
    name,
    type = ActivityType.Playing,
    state = '*★,°*:.☆(￣▽￣) / $:*.°★* 。',
  }: StatusSetterProps): void {
    this.name = name;
    this.type = type;
    this.state = state;
  }
}
