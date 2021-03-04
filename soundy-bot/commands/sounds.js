const { getSounds } = require('../common');


module.exports = {
  name: 'sounds',
  description: 'Sends a list of sounds to the user.',
  aliases: [],
  execute(message) {
    let data = '```';
    let sounds = getSounds();
    for (let i = 0; i < sounds.length - 1; i++) {
        data = data.concat('\n' + sounds[i]);
    }
    data = data.concat('\n```');
    message.author.send("Here are the current sounds: " + data)
    message.delete(2000);
  },
}