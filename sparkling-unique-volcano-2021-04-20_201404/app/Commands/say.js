const Discord = require("discord.js");
module.exports.execute = async (client, message, args) => {
    let executor = message.member   

let Tag = "fex" //Tagınız
let BoosterRole =  "830514019927588866"

          var TotalMember = message.guild.memberCount
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          var Boost = message.guild.premiumSubscriptionCount;
          const arxEmbed = new Discord.MessageEmbed()
              .setColor('#2F3136')
              .setAuthor(`${message.guild.name}`,message.guild.iconURL())
              .setDescription(`
\`•\` Sunucumuzda ${client.emojili(`${TotalMember}`)} **Toplam** Kullanıcı Bulunmaktadır.
\`•\` Sunucumuzda ${client.emojili(`${Online}`)} **Aktif** Kullanıcı Bulunmaktadır.
\`•\` Sunucumuzda ${client.emojili(`${Taglı}`)} **Tagımıza** Sahip Kullanıcı Bulunmaktadır.
\`•\` Sunucumuzda **Sesli odalarda** ${client.emojili(`${Voice}`)} Kullanıcı Bulunmaktadır.
\`•\` Sunucuda ${client.emojili(`${Boost}`)} **Takviye** Bulunmaktadır.
`)
message.channel.send(arxEmbed)

}
module.exports.configuration = {
  name: "say",
    aliases: ["say"],
    usage: "say",
    description: ""
};

