const { canPlay, getSounds, getRandomInt, playSound } = require('../common');

module.exports = {
  name: 'random',
  description: 'Plays a random sound clip from the sound library.',
  execute(message, args) {
    let sound = getSounds()[getRandomInt(1, getSounds().length) - 1];
    if (canPlay(message)) {
      playSound(message.member.voice.channel, `../soundy-clips/${sound}.wav`);
    }
    message.delete({ timeout: 3000 });
  }
}