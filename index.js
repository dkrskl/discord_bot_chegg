const Discord = require("discord.js");
const config = require("./config.json");
const Enmap = require("enmap");
const fs = require("fs");

// Client settings
const client = new Discord.Client();
client.login(config.token);
client.config = config;

client.queue = [];

client.busy = false;

// Set events and commands

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap({ name: "commands" });

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loading command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
