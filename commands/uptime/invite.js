const { MessageEmbed } = require("discord.js");
const { invite_link } = require("./../../config.json");

module.exports = {
  name: "invite",
  description: "Invites the bot",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    let github_repo = "https://github.com/naveenpoddar/uptimer";

    let embed = new MessageEmbed()
      .setTitle("Invite Me / Support Me.")
      .setDescription(
        "Uptimer is a open-source, free discord bot that allows you to make your projects online 24/7 just by using a single cmd."
      )
      .setColor("#a1eb34")
      .addField(
        "<:link:807875763415416853> **Invite Me**",
        "[Click here](" + invite_link + ") to invite me to into server."
      )
      .addField(
        "<:link:807875763415416853> **Source Code**",
        "[Click here](" + github_repo + ") Support this open-source project."
      )
      .setTimestamp();

    return message.channel.send(embed);
  },
};
