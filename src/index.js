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

client.on('ready', () => {
    console.log('I am ready');
  });
  
  client.on('message', msg => {
    if(msg.content === 'ping') {
      msg.reply('pong');
    }
  });
  
  client.login(config.token);
