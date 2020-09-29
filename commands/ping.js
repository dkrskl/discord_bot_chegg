exports.run = (client, message, args) => {
  try {
    message.channel.send(client.queue.length);
  } catch (err) {
    console.error(err);
  }
};
