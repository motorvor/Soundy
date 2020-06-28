const fs = require('fs');
const path = require('path');
let {
  vConnection,
  vDispatcher,
  sounds
} = require('./vars');

exports.updateSoundsList = () => {
  sounds = [];
  fs.readdirSync('../soundy-clips/').forEach(file => {
    if (file !== 'uploads' && file !== 'goodnight' && file !== 'roulette') {
      console.log(file);
      sounds.push(file.substring(0, file.length - 4));
    }
  });
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
