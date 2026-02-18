import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('botの応答速度を調べる'),

  async execute(interaction) {
    const start = Date.now();
    await interaction.reply("Pinging...");
    const end = Date.now();
    const time = end - start;
    const wsPing = interaction.client.ws.ping;
    const embed = new EmbedBuilder()
    .setTitle("Pong! 🏓")
    .addFields(
        { name: 'API応答速度', value: `${time}ms`},
        { name: 'WebSocket Ping', value: wsPing >= 0 ? `${wsPing}ms` : "測定中..."}
    )
    .setTimestamp();
    await interaction.editReply({ content: "", embeds: [embed] });
  }
};