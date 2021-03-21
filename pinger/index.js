require('dotenv').config();
require('./database/connect');
const UrlsConfig = require('./database/models/UrlsConfig');
const fetchProjects = require('./fetchProjects');

fetchProjects(UrlsConfig);

setInterval(async () => {
    fetchProjects(UrlsConfig);
}, 260000);