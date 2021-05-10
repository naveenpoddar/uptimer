const UrlsConfig = require("./../../database/models/UrlsConfig");
const discord = require("discord.js");
const { default_prefix } = require("./../../config.json");

module.exports = {
  name: "stats",
  description: "Shows Stats of all of your Projects.",
  category: "uptime",
  aliases: [],
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    const filter = {
      authorID: message.author.id,
    };

    const all = await UrlsConfig.find(filter);

    var menuEmoji = "<a:musica:785432181065121802>";

    var embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(
        "<a:musica:785432181065121802> Your Project Stats <a:musica:785432181065121802>"
      );

    var count = 0;
    all.forEach(async (data) => {
      count++;
      if (count === 26) return;
      // <:red_dot:841223022560280588>

      if (data.get("error")) {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `<:LLdotwhite:793780355953065986> Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }\n<:red_dot:841223022560280588> FetchError: ${data.errorText}`
        );
      } else {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `<:LLdotwhite:793780355953065986> Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }`
        );
      }
    });

    if (count === 0) {
      embed.setDescription(
        `*You don't have any projects hosted.*\nHost one by using: ${default_prefix}add [project Url]`
      );
    }
    embed.setFooter(`Date Format: DD/MM/YY | HH:MM:SS`);

    var errors = false;

    await message.author.send(embed).catch((err) => {
      errors = true;
      if (err.message === "Cannot send messages to this user")
        return message.channel.send(
          `Error: \`Cannot send message to you. please turn on your Dms\`.`
        );
    });
    if (!errors) {
      message.channel.send("📥 Check your DM.");
    }
  },
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  hours = d.getHours();
  mins = d.getMinutes();
  sec = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  var format = `${day}/${month}/${year} | ${hours}:${mins}:${sec}`;

  return format;
}
