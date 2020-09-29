const processAnswers = require("../functions/processAnswers");

// Adds a new chegg request to the queue
exports.run = (client, message, args) => {
  const { queue, busy } = client;
  queue.push({ user: message.author.id, link: args[0] });

  // If the bot is not processing any answers then start the process
  if (!busy) processAnswers(client, message);
};
