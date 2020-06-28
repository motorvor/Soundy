const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule')
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// Variable Tracker
const vt = require('./vars');

// Common Functions
const { updateSoundsList, isSpeaking, playSound, vConnect, vDisconnect } = require('./common');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  updateSoundsList();
  setThreeAM();
  console.log('Soundy is ready!');
});

client.on('message', (message) => {
  // Delete message if user is Music Bot ID
  if (message.author.id === '235088799074484224') { message.delete({ timeout: 20000 }).catch(); }
  // Delete message if it begins with '!' to help clean up music bot clutter.
  if (message.content.startsWith('!')) { message.delete({ timeout: 20000 }); }

  // If message doesn't begin with prefix, stop caring.
  if (!message.content.startsWith(prefix)) return;
  // Parse out the prefix and command name
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Get the command if it exists
  const command = client.commands.get(commandName);

  // If the command doesn't exist, tell the user 
  if (!command) {
    message.reply(`That's not a command. Go look up the right one.`).then(reply => reply.delete({ timeout: 8000 }));
    message.delete({ timeout: 5000 });
    return;
  }

  // If no args were passes, tell the user
  if (command.args && !args.length) {
    message.reply(`You'll need to pass so more info to me. "${message.content}" isn't going to cut it.`).then(reply => reply.delete({ timeout: 8000 }));
    message.delete({ timeout: 5000 });
    return;
  }

  // Execute the command
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`There was a critical error. You've managed to fuck me up real good. Thanks.`).then(reply => reply.delete({ timeout: 10000 }));
    message.delete({ timeout: 5000 });
  }

});

const { Readable } = require('stream');

const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

class Silence extends Readable {
  _read() {
    this.push(SILENCE_FRAME);
  }
}

// When the Voice State Updates (VS = Voice State)
client.on('voiceStateUpdate', (oldVS, newVS) => {
  // If the voice channels are the same, do nothing
  if (oldVS.channelID === newVS.channelID) return;

  // if (oldVS.channelID === '726818855732641823' && oldVS.member.id !== '351523490794438659' ) {
  //   vDisconnect();
  // }

  // if (newVS.member.id !== '351523490794438659' && newVS.channelID === '726818855732641823') {
  //   vConnect(newVS.channel).then(async(connection) => {
  //     connectionB = await vConnect(newVS.channel);
  //     let audioStream;
  //     connection.play('../soundy-clips/uploads/ding.wav');
  //     connection.on('ready', () => {
        
  //     });
  //     connection.on('speaking', (user, speaking) => {
  //       if (!user || user.bot) return;
  //       if (speaking) {
  //         audioStream = connection.receiver.createStream(user.id);
  //         setTimeout(() => {
  //           let dispatch = connectionB.play(audioStream, { type: 'opus', volume: 5 })
  //           dispatch.on('finish', () => {
  //             audioStream.destroy();
  //           });
  //         }, 500);
  //       }
  //     });
      
  //   });
    
  // }
  // 
  if (newVS.member.id === '351523490794438659') return;
  // If the new voice channel is Why Hello There, play Why Hello There clip
  if (newVS.channelID === '416455371046125588') {
    if (!isSpeaking()) {
      playSound(newVS.channel, '../soundy-clips/whyhello.wav')
    }
  // If the new voice channel is GIBBY, play GIBBY clip
  }
  if (newVS.channelID === '503633665318846474') {
    if (!isSpeaking()) {
      playSound(newVS.channel, '../soundy-clips/GIBBY.wav');
    }
  }
});

function setThreeAM() {
  let rule = new schedule.RecurrenceRule();
  rule.tz = 'US/Eastern';
  rule.hour = 3
  schedule.scheduleJob(rule, () => {
    let mostPopulatedVC = client.channels.cache.filter((channel) => channel.type == 'voice').reduce((prev, current) => prev.members.size > current.members.size ? prev : current);
    if (mostPopulatedVC) {
      playSound(mostPopulatedVC, '../soundy-clips/3am.wav');
    }
  });
}


client.login(token);