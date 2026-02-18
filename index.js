import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import path from "node:path";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Map();

const commandsPath = path.join(process.cwd(), "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = (await import(filePath)).default;
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () =>{
    console.log(`${client.user.tag}としてログインしました！`)
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  await command.execute(interaction);
});

client.login(process.env.TOKEN);