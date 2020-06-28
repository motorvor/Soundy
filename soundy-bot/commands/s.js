const { canPlay, isSpeaking, getSounds, sendAndDelete, playSound } = require('../common');

function checkSounds(possibleSound) {
  return getSounds().find(val => val == possibleSound);
}

module.exports = {
  name: 's',
  description: 'Plays a sound clip from the sound library.',
  execute(message, args) {
    let selectedSound = checkSounds(args.join(' '));
    if (selectedSound) {
      if (canPlay(message)) {
        playSound(message.member.voice.channel, `../soundy-clips/${selectedSound}.wav`);
      } 
    } else {
      sendAndDelete(message, 'Looks like you fucked up the command.', 5000);
    }
    message.delete({ timeout: 3000 });
  }
}