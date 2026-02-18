import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { deployCommands } from './deployCommands.js';
import { pathToFileURL } from 'node:url';
import fs from "node:fs";
import path from "node:path";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Map();

const commandsPath = path.join(process.cwd(), "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = (await import(pathToFileURL(filePath))).default;
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () =>{
    console.log(`${client.user.tag}としてログインしました！`)
})

client.on(Events.InteractionCreate, async interaction => {
	try {
		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return;
			await command.execute(interaction);
		}

		if (interaction.isButton()) {
			if (interaction.customId === 'verify_button') {

				await interaction.deferReply({ ephemeral: true });

				const role = interaction.guild.roles.cache.find(
					r => r.name === "認証済み"
				);

				if (!role) {
					return interaction.editReply("ロールが見つかりません");
				}

				if (interaction.member.roles.cache.has(role.id)) {
					return interaction.editReply("すでに認証済みです。");
				}

				await interaction.member.roles.add(role);

				await interaction.editReply("✅ 認証完了！");
			}
		}

	} catch (error) {
		console.error(error);
		if (interaction.deferred || interaction.replied) {
			await interaction.editReply("エラーが発生しました。");
		} else {
			await interaction.reply({ content: "エラーが発生しました。", ephemeral: true });
		}
	}
});

client.once(Events.ClientReady, (readyClient) => {
    console.log('WS Ping:', readyClient.ws.ping);
});

await deployCommands();
client.login(process.env.TOKEN);