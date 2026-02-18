import {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('認証メッセージを送信'),

    async execute(interaction) {

    const embed = new EmbedBuilder()
        .setTitle('✅ 認証')
        .setDescription('下のボタンを押して認証してください。')
        .setColor(0x57f287);

    const button = new ButtonBuilder()
        .setCustomId('verify_button')
        .setLabel('認証する')
        .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
        embeds: [embed],
        components: [row]
    });
    }
};