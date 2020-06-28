const { isSpeaking, getSounds, sendAndDelete, playSound } = require('../common');

function checkSounds(possibleSound) {
  return getSounds().find(val => val == possibleSound);
}

module.exports = {
  name: 's',
  description: 'Plays a sound clip from the sound library.',
  execute(message, args) {
    let selectedSound = checkSounds(args.join(' '));
    if (selectedSound) {
      if (!isSpeaking()) {
        let voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
          playSound(voiceChannel, `../soundy-clips/${selectedSound}.wav`);
        } else {
          sendAndDelete(message, 'Look with your special eyes. You\'re not in a voice channel.', 5000)
        }
      } else {
        sendAndDelete(message, 'Wait your turn you fucking child.', 5000);
      }
    } else {
      sendAndDelete(message, 'Looks like you fucked up the command.', 5000);
    }
    message.delete({ timeout: 3000 });
  }
}