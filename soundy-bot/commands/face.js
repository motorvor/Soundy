module.exports = {
	name: 'face',
	description: 'Puts the face in chat',
	aliases: [],
	execute(message) {
    message.delete({ timeout: 500 });
    message.channel.send({ files: ['./face.jpg'] });
	},
};