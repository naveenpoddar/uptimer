const UrlsConfig = require('./../database/models/UrlsConfig');

module.exports.run = async (client) => {
    console.log(`${client.user.tag} has logged in.`);
    var pros = await UrlsConfig.find();
    client.user.setActivity(`${pros.length} Projetc(s)`, {
        type: "WATCHING",
    });
};