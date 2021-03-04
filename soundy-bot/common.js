const fs = require('fs');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: './googleAuth.json',
});

let {
  vConnection,
  vDispatcher,
  sounds
} = require('./vars');

exports.updateSoundsList = () => {
  sounds = [];
  fs.readdirSync('../soundy-clips/').forEach(file => {
    if (file !== 'uploads' && file !== 'goodnight' && file !== 'roulette') {
      sounds.push(file.substring(0, file.length - 4));
    }
  });
}

exports.getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getSounds = () => {
  return sounds;
}

exports.sendAndDelete = (message, content, timeout) => {
  message.channel.send(content).then(msg => msg.delete({ timeout })).catch();
}

exports.isSpeaking = () => {
  return vConnection && vConnection.speaking ? true : false;
}

exports.vConnect = (channel) => {
  return new Promise((resolve) => {
    if (!vConnection || vConnection.channel !== channel) {
      channel.join().then((connection) => {
        vConnection = connection;
        resolve(connection);
      });
    } else {
      resolve(vConnection);
    }
  });
};
exports.vDisconnect = () => {
  if (vConnection) { vConnection.disconnect(); }
  vConnection = null;
}
exports.playSound = (channel, sound) => {
  try {
    this.vConnect(channel).then((connection) => {
      vDispatcher = connection.play(sound, { volume: 2 });
      vDispatcher.on('finish', () => {
        this.vDisconnect();
      })
    })
  } catch (err) {
    console.log('Error in playSound', err);
  }
}
exports.googleVoice = async (message, text) => {
  if (!this.isSpeaking()) {
    let data = { 
      "input": {
        "text": text
      },
      "voice": {
        "languageCode":"en-US",
        "name":"en-US-Wavenet-F"
      },
      "audioConfig": {
        "audioEncoding":"MP3",
        "pitch":"0.00",
        "speakingRate":"1.00"
      }
    }
    const [response] = await ttsClient.synthesizeSpeech(data);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('stream.mp3', response.audioContent, 'binary');
    this.playSound(message.member.voice.channel, './stream.mp3');
  } else {
    this.sendAndDelete(message, 'I\'ll assume you\'re deaf and can\'t fucking hear me.', 5000)
  }
}
exports.canPlay = (message) => {
  if (!this.isSpeaking()) {
    let voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      return true;
    } else {
      this.sendAndDelete(message, 'Look with your special eyes. You\'re not in a voice channel.', 5000);
      return false;
    }
  } else {
    this.sendAndDelete(message, 'Wait your turn you fucking child.', 5000);
    return false;
  }
}
