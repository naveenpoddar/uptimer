require("dotenv").config();
const { Client, Collection } = require("discord.js");
const UrlsConfig = require("./database/models/UrlsConfig");
const fetchProjects = require("./fetchProjects");
const { timeout } = require("./config.json");

const client = new Client({
  disableEveryone: true,
});

(async () => {
  await require("./database/connect");
  let pros = await UrlsConfig.find();
  let tempPros = pros.map((p) => p.projectURL);

  client.commands = new Collection();
  client.projects = tempPros;
  client.aliases = new Collection();

  ["command", "events"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
  });

  await client.login(process.env.BOT_TOKEN);

  fetchProjects(client.projects, client);
})();

// pinging
setInterval(async () => {
  client.user.setActivity(`${client.projects.length} Project(s)`, {
    type: "WATCHING",
  });

  fetchProjects(client.projects, client);
}, timeout);
