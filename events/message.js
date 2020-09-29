module.exports = (client, message) => {
  // Ignore other bots
  if (message.author.bot) return;
  // A command must start with our prefix
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Ger arguments
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get commands from enmap
  const cmd = client.commands.get(command);

  // Return if the command doesnt exist
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
