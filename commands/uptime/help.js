const discord =  require('discord.js');
const {default_prefix} = require('./../../config.json');

module.exports = {
    name: "help",
    description: "Shows all commands of the bot",
    category: "uptime",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message, args) => {
        let embed = new discord.MessageEmbed()
            .setTitle("<a:0042:785431567924723753> Here are my comamnds!")
            .setColor("RANDOM")
            .setFooter(`Prefix: "${default_prefix}"`)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();

        var commands = client.commands.filter(c => c.ownerOnly === false).map(cmd => `**${default_prefix}${cmd.name}** - ${cmd.description}`)
        embed.setDescription(commands.sort().join("\n"));

        message.channel.send(embed);
    }
}