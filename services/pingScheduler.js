const fetchProjects = require("../fetchProjects");
const { updateProjectCount } = require("./projectRegistry");

/**
 * Run a single ping cycle and refresh bot activity.
 * @param {import("discord.js").Client} client
 * @param {boolean} disableFetching
 */
const runPingCycle = async (client, disableFetching) => {
  const total = await updateProjectCount(client);

  if (client.user) {
    client.user.setActivity(`${total} Project(s)`, {
      type: "WATCHING",
    });
  }

  if (!disableFetching) {
    await fetchProjects(client.projects, client);
  }
};

/**
 * Start the ping scheduler for the bot.
 * @param {{ client: import("discord.js").Client, intervalMs: number, disableFetching: boolean }} options
 * @returns {NodeJS.Timeout}
 */
const startPingScheduler = ({ client, intervalMs, disableFetching }) => {
  runPingCycle(client, disableFetching).catch((error) => {
    console.error("Ping cycle failed:", error);
  });

  return setInterval(() => {
    runPingCycle(client, disableFetching).catch((error) => {
      console.error("Ping cycle failed:", error);
    });
  }, intervalMs);
};

module.exports = startPingScheduler;
