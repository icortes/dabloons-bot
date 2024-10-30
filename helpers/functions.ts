import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import { User } from '@prisma/client';
import { VoiceChannel } from 'discord.js';
import ytdl from 'ytdl-core';

/**
 * Returns the file name without the extension from the given file path.
 * @param filePath - The file path including the file name and extension.
 * @returns The file name without the extension.
 */
export function getFileNameWithoutExtension(filePath: string): string {
  const fileNameWithExtension: string = filePath.split('\\').pop() || '';
  const fileName: string = fileNameWithExtension.split('.').slice(0, -1).join('.');
  return fileName;
}

/**
 * Returns a string of coin emojis based on the number of coins.
 * @param coins - The number of coins to convert to emojis.
 * @returns A string of coin emojis.
 */
export function getCoinEmojis(coins: number): string {
  let coinString: string = '';
  for (let i: number = 0; i < coins; i++) {
    coinString += '🪙';
  }
  return coinString;
}

/**
 * Returns a formatted string of the top ten users.
 * @param userArray - The array of users.
 * @returns A formatted string of the top ten users.
 */
export function topTenMessageFormatter(userArray: User[]): string {
  let formattedString: string = '```\n';
  userArray.forEach((user, index) => {
    formattedString += `${((index + 1).toString() + '.').padEnd(3)} ${(
      user.name ?? 'unknown'
    ).padEnd(12)} ${user.moneyAmount.toString().padStart(4)} 🪙\n`;
  });
  return formattedString + '```';
}

export function playYoutubeAudio(channel: VoiceChannel, url: string) {
  const connection: VoiceConnection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
  });

  const player: AudioPlayer = createAudioPlayer();
  const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
  const resource = createAudioResource(stream);

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Idle, () => {
    connection.destroy();
  });
}
