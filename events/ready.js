module.exports.run = async (client) => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity(`${client.projects.length} Project(s)`, {
    type: "WATCHING",
  });
};
