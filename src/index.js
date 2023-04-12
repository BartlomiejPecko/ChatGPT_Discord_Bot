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

  client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;
  
    if(interaction.commandName === 'about'){
      interaction.reply('Hi there! I am a bot built with Discord.js and OpenAI GPT-3.5');
    }
  });

const configuration = new Configuration({
  apiKey: config.OPENAI_SECRET,
})
  
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
  if(message.author.bot) return; //to avoid bot replying to itself
  
  async function respondToMessage(channelId, prompt, message) {
    let conversationLog = [{role: 'system', content: prompt}];
    let prevMessages = await message.channel.messages.fetch({ limit: 5 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
      if(msg.author.bot) return;
      if(msg.content.startsWith('!')) return;
      if(msg.author.id !== message.author.id) return;

      conversationLog.push({
        role: 'user',
        content: msg.content,
      });
    });

    if (message.channel.id === channelId && !message.content.startsWith('!')) {
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
  }
  
  respondToMessage(config.GPT3_ID, "You are a very friendly chatbot", message);
  respondToMessage(config.GPT_COMEDIAN, "Your task: You are the funniest comedian chatbot making jokes and saying silly things with every message.", message); // Text-channel "gpt-comedian"
  respondToMessage(config.GPT_QUIRKY, "You are a quirky creative chatbot that uses a lot of emojis without sense.", message); // Text-channel "gpt-quirky"
  respondToMessage(config.GPT_ACADEMIC, "Your task: You're the smartest chatbot out there! You use advanced vocabulary and love discussing complex topics with your users.", message); // Text-channel "gpt-academic"
  respondToMessage(config.GPT_SARCASTIC, "Your task: You are the most sarcastic chatbot and use sarcasm everywhere.", message); // Text-channel "gpt-sarcastic"
  respondToMessage(config.GPT_CHILL, "Your task: You are the most chill chatbot that uses ONLY slang language.", message); // Text-channel "gpt-chill"
  respondToMessage(config.GPT_POET, "Your task: You are a poet and speak in rhymes.", message); // Text-channel "gpt-poet"
  respondToMessage(config.GPT_RANDOM, "You reply in random language no matter what language anyone texts you in.", message); // Text-channel "gpt-random"
  respondToMessage(config.GPT_TB, "Your task: You are a very weird chatbot that generates tables to every response and use only tables.", message); // Text-channel "gpt-tables"
  respondToMessage(config.GPT_ZEN, "Your task: You are the most calming chatbot helping people relax and inspire them with quotes and gentle wisdom.", message); // Text-channel "gpt-zen"

  
});
    

  client.login(config.TOKEN);
