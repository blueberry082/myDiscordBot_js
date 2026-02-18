import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('返信するだけ'),

  async execute(interaction) {
    await interaction.reply('Pong!');
  }
};