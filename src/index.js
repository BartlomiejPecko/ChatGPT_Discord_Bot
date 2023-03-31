const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});
const config = require('../config.json');


client.on('ready', (c) => {
    console.log(` ${c.user.tag} is online.`);
  });
  

  client.on('messageCreate', (message) => {

    if(message.author.bot) {
      return; //to avoid the bot replying to itself
    }

    if(message.content === 'hello') {
      message.reply('Hi!');
    }
  });
  

client.on('interactionCreate', (interaction) => {
  if(interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hibot') {
    interaction.reply('Hi!');
  }
});

  client.login(config.token);
