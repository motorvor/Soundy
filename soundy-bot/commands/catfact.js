const { googleVoice } = require('../common');
const request = require('request');
module.exports = {
	name: 'catfact',
	description: 'Read a catfact',
	aliases: [],
	execute(message) {
		message.delete({ timeout: 2000 });
    request('https://catfact.ninja/fact?max_length=150', (error, repsonse, body) =>{
      googleVoice(message, JSON.parse(body).fact);
    });
	},
};