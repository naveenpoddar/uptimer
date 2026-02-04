const { Client } = require("discord.js");
const UrlsConfig = require("../database/models/UrlsConfig");

/**
 * Load projects from the database and hydrate the client cache.
 * @param {Client} client
 */
const loadProjects = async (client) => {
  const projects = await UrlsConfig.find();
  client.projects = projects.map((project) => project.projectURL);
  client.projectsSize = projects.length;
};

/**
 * Update the project count and return the total.
 * @param {Client} client
 * @returns {Promise<number>}
 */
const updateProjectCount = async (client) => {
  const total = await UrlsConfig.countDocuments();
  client.projectsSize = total;
  return total;
};

module.exports = {
  loadProjects,
  updateProjectCount,
};
