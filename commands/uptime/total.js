const UrlsConfig = require('./../../database/models/UrlsConfig');
const discord = require('discord.js');

module.exports = {
    name: "total",
    description: "Shows all projects",
    category: "uptime",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message, args) => {
        UrlsConfig.countDocuments({}, async function( err, total){
            // GETS ALL DATA
            var all = await UrlsConfig.find();
            var ping = 0;
            await all.forEach(u => {
                ping = u.pinged + ping;
            });
            const embed = new discord.MessageEmbed()
                .setTitle(`Uptimer Bot Stats`)
                .setColor("RANDOM")
                .addField("Total Projects: ", total, true)
                .addField("Total Pings: ", ping, true)
            return message.channel.send(embed);
        });


    }
}