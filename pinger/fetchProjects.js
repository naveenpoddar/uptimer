const fetch = require('node-fetch');

module.exports = async (UrlsConfig) => {
    let all = await UrlsConfig.find();
    all.forEach(async (data) => {
        let url = data.projectURL;
        let pinged = data.pinged;
        fetch(url);
        pinged++;
        await UrlsConfig.findOneAndUpdate({
            projectURL: url,
        }, {pinged}, {
            new: true,
        });
    });
}