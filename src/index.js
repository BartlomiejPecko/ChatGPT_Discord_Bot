const { Client, IntentsBitField } = require('discord.js');
const config = require('../config.json');
const { Configuration, OpenAIApi} = require('openai');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});



client.on('ready', (c) => {
    console.log(` ${c.user.tag} is online.`);
  });

const configuration = new Configuration({
  apiKey: config.OPENAI_SECRET,
})
  
const openai = new OpenAIApi(configuration);

  client.on('messageCreate', async (message) => {

    if(message.author.bot) return;
    if(message.channel.id !== config.GPT3_ID) return;
    if(message.content.startsWith('!')) return;


    let conversationLog = [{role: 'system', content: "You are a very friendly chatbot"}];

    conversationLog.push({
      role: 'user',
      content: message.content,
    });
   await message.channel.sendTyping();

   const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversationLog,
   })
   message.reply(result.data.choices[0].message);
  });
  



  client.login(config.TOKEN);
