const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
	if(message.author.id !== "339033591185014784")
  return message.channel.send('Bu komudu kullanman için yetkin yok.')

	
	if (args[0] == 'mod') {
	message.channel.send(`**Moderation** botuna ${message.author} (\`${message.author.id}\`) tarafından restart atıldı.`)

 message.channel.send(`Bot yeniden başlatılıyor...`).then(msg => {
    console.log(`BOT: Bot yeniden başlatılıyor...`);

    process.exit(0);
    
  })
};
}

module.exports.configuration = {
    name: "r",
    aliases: [],
    usage: "",
    description: ""
};
