require("dotenv").config();
const { Client, Collection } = require("discord.js");
const connectDatabase = require("./database/connect");
const { timeout, disable_fetching } = require("./config.json");
const loadHandlers = require("./services/loadHandlers");
const { loadProjects } = require("./services/projectRegistry");
const startPingScheduler = require("./services/pingScheduler");

const createClient = () => {
  const client = new Client({
    disableEveryone: true,
  });

  client.commands = new Collection();
  client.aliases = new Collection();
  client.projectsSize = 0;
  client.projects = [];

  return client;
};

const startBot = async () => {
  await connectDatabase();

  const client = createClient();
  await loadProjects(client);
  loadHandlers(client);

  await client.login(process.env.BOT_TOKEN);

  startPingScheduler({
    client,
    intervalMs: timeout,
    disableFetching: disable_fetching,
  });
};

startBot().catch((error) => {
  console.error("Failed to start Uptimer:", error);
  process.exitCode = 1;
});
