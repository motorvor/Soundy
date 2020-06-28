const { sendAndDelete, getRandomInt, googleVoice } = require('../common');

function getInsult() {
  let cuss = [
      'Ass',
      'Bitch',
      'Butt',
      'Cock',
      'Cum',
      'Dick',
      'Douche',
      'Fart',
      'Fuck',
      'Jizz',
      'Schlong',
      'Shit',
      'Sleepy',
      'Spunk',
      'Snatch',
      'Tit',
      'Titty',
      'Twat',
      'Wang',
      'Wank',
      'Whore',
  ];
  let noun = [
      'Bagel',
      'Biscuit',
      'Blister',
      'Burger',
      'Bubble',
      'Bucket',
      'Bonkhawna gahoogs',
      'Camel',
      'Canoe',
      'Cocktail',
      'Cracker',
      'Cranker',
      'Dragon',
      'Dumpster',
      'Farmer',
      'Fister',
      'Guzzler',
      'Hatchet',
      'Jeffrey',
      'Monkey',
      'Muffin',
      'Muncher',
      'Nozzle',
      'Nugget',
      'Panda',
      'Pilot',
      'Pistol',
      'Potato',
      'Pusher',
      'Sandwich',
      'Scratcher',
      'Scrubber',
      'Shitter',
      'Stain',
      'Sucker',
      'Taco',
      'Twiddler',
      'Waffle',
      'Wanker',
      'Whistle',
  ];
  return cuss[getRandomInt(0, cuss.length - 1)] + ' ' + noun[getRandomInt(0, noun.length - 1)];
}

module.exports = {
  name: 'insult',
  description: 'Insults someone.',
  execute(message, args) {
    googleVoice(message, `${args[0]} is a ${getInsult()}`)
    message.delete({ timeout: 3000 });
  }
}
