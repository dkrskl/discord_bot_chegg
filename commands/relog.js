const login = require("../functions/login");

exports.run = async (client, message) => {
  try {
    message.channel.send("Trying to relog.");

    if ((await login(client)) === true) message.channel.send("Logged back in!");
    else {
      message.channel.send("Login failed! Will try again in few seconds. ");

      const cmd = client.commands.get("relog");
      cmd.run(client, message, {});
    }
  } catch (err) {
    console.error(err);
  }
};
