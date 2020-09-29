const login = require("../functions/login");

module.exports = (client) => {
  login(client);

  console.log(
    `${client.config.botName} is ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );
};
