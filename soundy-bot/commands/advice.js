const c = require('../common.js');
const request = require('request');
module.exports = {
	name: 'advice',
	description: 'Read some solid voice',
	aliases: [],
	execute(message) {
		message.delete(2000);
        request('https://api.adviceslip.com/advice', (error, response, body) =>{
            c.googleVoice(message, JSON.parse(body).slip.advice)
        });
	},
};