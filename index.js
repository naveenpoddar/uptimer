require("dotenv").config();
const discord = require("discord.js");
const fetch = require("node-fetch");
const UrlsConfig = require("./database/models/UrlsConfig");
const fetchProjects = require("./fetchProjects");
const { timeout } = require("./config.json");

const client = new discord.Client({
  disableEveryone: true,
});

require("./database/connect");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN);

// pinging
fetchProjects(UrlsConfig);
setInterval(async () => {
  let docs = await UrlsConfig.find();
  client.user.setActivity(`${docs.length} Projetc(s)`, {
    type: "WATCHING",
  });
  fetchProjects(UrlsConfig);
}, timeout);
