const { Client } = require("discord.js");

/**
 * Load command + event handlers.
 * @param {Client} client
 */
module.exports = (client) => {
  ["command", "events"].forEach((handler) => {
    require(`../handlers/${handler}`)(client);
  });
};
