const { canPlay, getSounds, getRandomInt, vConnect, vDisconnect } = require('../common');
const { getAudioDurationInSeconds } = require('get-audio-duration');

function getRandomPause(duration) {
  let time = Math.round(duration * 1000);
  let pauseTime = getRandomInt(500, time - 500);
  return pauseTime;
}

module.exports = {
  name: 'mash',
  description: 'Mashes two random sound clips together',
  async execute(message, args) {
    if (canPlay(message)) {
      try {
        let sounds = getSounds();
        let sound1 = sounds[getRandomInt(1, sounds.length) - 1];
        let duration1 = await getAudioDurationInSeconds(`../soundy-clips/${sound1}.wav`);
        let sound2 = sounds[getRandomInt(1, sounds.length) - 1];
        vConnect(message.member.voice.channel).then((connection) => {
          let dispatch1 = connection.play(`../soundy-clips/${sound1}.wav`, { volume: 2 });
          setTimeout(() => {
            dispatch1.pause();
            let dispatch2 = connection.play(`../soundy-clips/${sound2}.wav`, { volume: 2 });
            setTimeout(() => {
              vDisconnect();
            }, duration1 - dispatch1.streamTime);
          }, getRandomPause(duration1));
        })
      } catch (err) {
        console.log('Error in playSound', err);
      }
    }
    message.delete({ timeout: 3000 });
  }
}