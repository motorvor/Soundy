const { googleVoice } = require('../common');
const request = require('request');
module.exports = {
	name: 'advice',
	description: 'Read some solid voice',
	aliases: [],
	execute(message) {
		message.delete({ timeout: 2000 });
    request('https://api.adviceslip.com/advice', (error, response, body) =>{
      googleVoice(message, JSON.parse(body).slip.advice);
    });
	},
};