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
  if(message.author.bot) return; //to avoid bot replying to itself
  
  
  if(message.channel.id === config.GPT3_ID) {
    if(message.content.startsWith('!')) return; // to be able to text in the channel using ! at the beggining

    let conversationLog = [{role: 'system', content: "You are a very friendly chatbot"}];

    conversationLog.push({
      role: 'user',
      content: message.content,
    });

    await message.channel.sendTyping();

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });

    message.reply(result.data.choices[0].message);

  } 
  // Second channel
  else if (message.channel.id === config.GPT_COMEDIAN) {
    if(message.content.startsWith('!')) return;

    let conversationLog = [{role: 'system', content: "You are the funniest comedian chatbot making jokes and saying silly things with every message."}];
    conversationLog.push({
      role: 'user',
      content: message.content,
    });
    await message.channel.sendTyping();
    
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });
    message.reply(result.data.choices[0].message);
  }
  // THIRD CHANNEL
  else if (message.channel.id === config.GPT_QUIRKY) {
    if(message.content.startsWith('!')) return;

    let conversationLog = [{role: 'system', content: "You are a quirky creative chatbot that uses a lot of emojis without sense."}];
    conversationLog.push({
      role: 'user',
      content: message.content,
    });
    await message.channel.sendTyping();
    
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });
    message.reply(result.data.choices[0].message);
  }
  // FOURTH CHANNEL
  else if (message.channel.id === config.GPT_ACADEMIC) {
    if(message.content.startsWith('!')) return;

    let conversationLog = [{role: 'system', content: "You use only academic language and behave like smartest chatbot and philosopher out there."}];
    conversationLog.push({
      role: 'user',
      content: message.content,
    });
    await message.channel.sendTyping();
    
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });
    message.reply(result.data.choices[0].message);
  }
  // FIFTH 
  else if (message.channel.id === config.GPT_SARCASTIC) {
    if(message.content.startsWith('!')) return;

    let conversationLog = [{role: 'system', content: "You are the most sarcastic chatbot and use sarcasm everywhere."}];
    conversationLog.push({
      role: 'user',
      content: message.content,
    });
    await message.channel.sendTyping();
    
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });
    message.reply(result.data.choices[0].message);
  }
  // SIXTH
  else if (message.channel.id === config.GPT_CHILL) {
    if(message.content.startsWith('!')) return;

    let conversationLog = [{role: 'system', content: "You are the most chill chatbot that uses ONLY slang language."}];
    conversationLog.push({
      role: 'user',
      content: message.content,
    });
    await message.channel.sendTyping();
    
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });
    message.reply(result.data.choices[0].message);
  }

    // 7

  else if (message.channel.id === config.GPT_POET) {
    if(message.content.startsWith('!')) return;

    let conversationLog = [{role: 'system', content: "You are a poet and speak in rhymes."}];
    conversationLog.push({
      role: 'user',
      content: message.content,
    });
    await message.channel.sendTyping();
    
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });
    message.reply(result.data.choices[0].message);
  }

});
    

   
   

   
 
  



  client.login(config.TOKEN);
