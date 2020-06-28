const { canPlay, getRandomInt, playSound } = require('../common');

module.exports = {
  name: 'gn',
  description: 'Jeffrey says goodnight to you.',
  execute(message, args) {
    let version = getRandomInt(1, 3);
    if (canPlay(message)) {
      playSound(message.member.voice.channel, `../soundy-clips/goodnight/gnj${version}.wav`);
    }
    message.delete({ timeout: 3000 });
  }
}
