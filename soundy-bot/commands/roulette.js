const fs = require('fs');
const { canPlay, playSound } = require('../common');
const { Canvas } = require('canvas-constructor');

function genUserImage(member, message) {
  let confetti = fs.readFileSync(`${process.cwd()}/confetti.png`);
  let fontSize = 85;
  let image = new Canvas(700, 250);
  image.addImage(confetti, 0, 0, image.width, image.height)
  .setTextAlign('center')
  do {
    image.setTextSize(fontSize -= 10);
  } while(image.measureText(member.displayName).width > image.width - 300);
  image = image.setTextFont(`bold ${fontSize}px sans-serif`)
  .addText(member.displayName, image.width / 2, image.height / 2)
  .toBuffer();
  message.channel.send({ files: [image] });
}

module.exports = {
  name: 'roulette',
  description: 'Plays a game of mute roulette.',
  execute(message, args) {
    if (canPlay(message)) {
      playSound(message.member.voice.channel, '../soundy-clips/roulette/roulette.wav');
      setTimeout(() => {
        message.channel.send('If you wish to participate, react with a thumbs up.').then((sentMessage) => {
          sentMessage.react('👍');
          setTimeout(async() => {
            sentMessage.delete();
            sentMessage.reactions.cache.first().users.cache.sweep((user) => user.id === sentMessage.author.id);
            if (sentMessage.reactions.cache.first().users.cache.size > 0) {
              let selectedMember = sentMessage.reactions.cache.first().users.cache.random();
              selectedMember = await message.guild.members.fetch(selectedMember.id);
              setTimeout(() => {
                genUserImage(selectedMember, message);
                selectedMember.voice.setMute(true, 'You lost roulette. Better luck next time.');
                setTimeout(() => {
                  selectedMember.voice.setMute(false);
                }, 300000);
              }, 12000);
            } else {
              playSound(message.member.voice.channel, '../soundy-clips/roulette/noroulette.wav');
            }
          }, 21000);
        });
      }, 10000);
    }
    message.delete({ timeout: 3000 });
  }
}
