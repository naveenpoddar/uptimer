const UrlsConfig = require("./../../database/models/UrlsConfig");
const discord = require("discord.js");
const { default_prefix } = require("./../../config.json");

module.exports = {
  name: "projects",
  description: "Shows all of your projects",
  category: "uptime",
  aliases: [],
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    const filter = {
      authorID: message.author.id,
    }; // THIS WILL ONLY GET THE PROJECTS OF THE USER

    let content = [];

    const all = await UrlsConfig.find(filter); // GETS ALL DATA FROM DATABASE

    var menuEmoji = "<a:musica:785432181065121802>";

    // PRE-DEFINED EMBED
    var embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${menuEmoji} Your Projects ${menuEmoji}`)
      .setTimestamp();

    var count = 0; // FOR SERIAL NUMBERS FOR DISPLAY

    all.forEach(async (data) => {
      // LOOPS THROUGH ALL DATA
      count++;
      content.push(`**${count}**. \`${data.projectURL}\``);
    });

    // DATA HANDLING
    if (content.length === 0) {
      // RUNS IF THE DATA RETURNS IS 0 MEANS THE DATABSE HAS NO DATA OF THE USER
      embed.setDescription(
        `*You don't have any projects Added.*\nAdd one by using: ${default_prefix}add [project Url]`
      );
    } else {
      // RUNS WHEN DATA FOUND IN THE DATABASE
      embed.setDescription(content.join("\n"));
    }

    // THANKS MESSAGE :)
    embed.setFooter("Thanks for using me!");

    // NO ERRORS
    var errors = false;

    // SENDS THE EMBED TO THE USER
    await message.author.send(embed).catch((err) => {
      errors = true;
      if (err.message === "Cannot send messages to this user") {
        // RUNS WHEN THE USER HAS THEIR DMS OFF
        return message.channel.send(
          `Error: \`Cannot send message to you. please turn on your Dms\`.`
        );
      }
    });
    if (!errors) {
      // EVERYTHING SUCCESSFULL NOTIFIES USER WITH AN MESSAGE
      message.channel.send("📥 Check your DM.");
    }
  },
};
