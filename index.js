import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient =>{
    console.log(`${readyClient.user.tag}としてログインしました！`)
})

client.login(process.env.TOKEN);