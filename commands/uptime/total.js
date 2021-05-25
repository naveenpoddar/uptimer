const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "total",
  description: "Shows all projects",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    UrlsConfig.countDocuments(
      { authorID: message.author.id },
      async function (err, total) {
        const embed = new MessageEmbed()
          .setTitle(`Uptimer Bot Stats`)
          .setColor("RANDOM")
          .addField("Total Projects: ", client.projectsSize, true)
          .addField("Your Projects: ", total, true);
        return message.channel.send(embed);
      }
    );
  },
};
