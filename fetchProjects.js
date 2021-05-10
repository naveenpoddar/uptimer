const { Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const UrlsConfig = require("./database/models/UrlsConfig");

/**
 * Fetch Projects
 * @param {string[]} projects
 * @param {Client} client
 */
module.exports = async (projects, client) => {
  projects.forEach(async (url) => {
    let pro = await UrlsConfig.findOne({
      projectURL: url,
    });

    let pinged = pro.get("pinged");
    let author = pro.get("authorID");

    try {
      await fetch(url);
    } catch (e) {
      let embed = new MessageEmbed()
        .setTitle(`Unable to fetch`)
        .setColor("#2990ff")
        .addField("Url", url)
        .addField("Author", author)
        .addField("Error", e.message);

      await UrlsConfig.findOneAndUpdate(
        { projectURL: url },
        { error: true, errorText: e.message },
        { new: true }
      );

      return client.channels.cache.get(process.env.ERROR_LOGS)?.send(embed);
    }

    pinged++;

    UrlsConfig.findOneAndUpdate(
      {
        projectURL: url,
      },
      { pinged },
      {
        new: true,
      }
    );
  });
};
