const { getRandomInt, sendAndDelete } = require('../common.js');
module.exports = {
	name: '8ball',
	description: '8ball function',
	aliases: [],
	execute(message) {
		let version = getRandomInt(1,6);
      switch (version) {
        case 1: 
          sendAndDelete(message, "Um, No?", 7000);
          break;
        case 2:
          sendAndDelete(message, "Nah, I don't really feel like answering your question.", 7000);
          break;
        case 3:
          sendAndDelete(message, "Yes.", 7000);
          break;
        case 4:
          sendAndDelete(message, "Maybe.", 7000);
          break;
        case 5:
          sendAndDelete(message, "Go fuck yourself.", 7000);
          break;
        case 6:
          sendAndDelete(message, "That's like asking me if we'll ever see Archie again...Hell no.", 7000);
          break;
      }
      message.delete({ timeout: 7000 });
	},
};