const Discord = require("discord.js");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
let executor = message.member
let embed = new Discord.MessageEmbed().setColor("#313136").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
if(!message.member.roles.cache.has(ayar.üstYetkili) && !message.member.hasPermission("ADMINISTRATOR")) message.reply("Yeterli Yetkiye Sahip Değilsin")
let kanal = message.guild.channels.cache.get(args[0])
if(!kanal) message.channel.send(embed.setDescription(`Lütfen KanalID Giriniz.`))
kanal.members.filter(a => !a.hasPermission("ADMINISTRATOR")).array().forEach(üyeler => {
  üyeler.voice.setMute(true)
});

message.channel.send(embed.setDescription(`
\`${kanal.name}\` **AllMute İşlemi**

\`•\` **KanalID:** \`${kanal.id}\`
\`•\` **KanalName:** \`${kanal.name}\`
\`•\` **Kanal Uye Sayısı:** \`${kanal.members.size}\`
\`•\` **Susturulan:** \`${kanal.members.filter(a => !a.hasPermission("ADMINISTRATOR")).size}\`
\`•\` **Susturulmayan:** \`${kanal.members.filter(a => a.hasPermission("ADMINISTRATOR")).size}\``))

}
module.exports.configuration = {
    name: "allmute",
    aliases: ["herkesmute", "toplumute", "hereksisustur"],
    usage: "allmute",
    description: ""
};
