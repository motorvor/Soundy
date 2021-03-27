const { googleVoice, getRandomInt } = require('../common');
module.exports = {
	name: 'summon',
	description: 'Summon Soundy and get some sass',
	aliases: [],
	execute(message) {
		message.delete({ timeout: 2000 });
    googleVoice(message, getGreeting());
  },
};

function getGreeting(useIndex) {
    let index = getRandomInt(0, 7);
    if (useIndex != undefined) {
      index = useIndex;
    }
    switch (index) {
      case 0: return 'Can I fucking help you';
      case 1: return 'What the fuck do you want';
      case 2: return 'What now';
      case 3: return "I ain't your bitch";
      case 4: return 'I swear to god';
      case 5: return 'So fucking help me. What, ';
      case 6: return "Summon me one more time and we're going to have an issue";
      case 7: return "I will fucking cut you";
    }
}

function nameLookup(username) {
    switch (username) {
        case 'L9001': return 'Spearoff';
        case 'BlackKnightKozuki': return 'Cari';
        case 'Motor': return 'Vorisek';
        case 'Lucaedr': return 'Hogie';
        case 'Kitsuya': return 'Macklin';
        case 'B_Linns': return 'Linna';
        default: return username;
    }
}