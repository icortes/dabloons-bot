import WOK from 'wokcommands';
import { ChannelType, Client } from 'discord.js';
import ytdl from 'ytdl-core';
import { playYoutubeAudio } from '../helpers/functions';

export default (instance: WOK, client: Client) => {
  console.info('[FEATURE] Jukebox loaded!');
  client.on('messageCreate', async (message ) => {
    // Ignore not in voice channel
    if (!message.guild || !message.member?.voice.channel) return;
    const args: string[] = message.content.split(' ');

    if (args[0] === '!play') {

      console.log(args[0]);

      const url: string = args[1];
      if (!ytdl.validateURL(url)) {
        message.reply('Please provide a valid Youtube URL!');
        return;
      }

      const voiceChannel = message.member.voice.channel;
      if (voiceChannel?.type === ChannelType.GuildVoice) {
        playYoutubeAudio(voiceChannel, url);
        message.reply(`Now playing: ${url}`);
      } else {
        message.reply('Please join a voice channel!');
      }
    }

    if (args[0] === '!stop') {
      const voiceChannel = message.member.voice.channel;
      if (voiceChannel?.type === ChannelType.GuildVoice) {
        message.guild.members.me?.voice.disconnect();
        message.reply('Stopped playing audio!');
      } else {
        message.reply('Please join a voice channel!');
      }
    }
  });
};
