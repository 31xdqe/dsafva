const Discord = require("discord.js");
module.exports.execute = async (client, message, args) => {
  let executor = message.member

let confirmRooms = "830390751321653276" // Teyit odaları kategori ID
let publicRooms = "830390752148062235" // Public odaları kategori ID
let privRooms = "830390752345456663" // Priv odaları kategori ID


let Voice = message.guild.members.cache.filter(t => t.voice.channel).size;
let Confirm = message.guild.members.cache.filter(c => c.voice.channel && c.voice.channel.parentID === confirmRooms).size;
let Public = message.guild.members.cache.filter(c => c.voice.channel && c.voice.channel.parentID === publicRooms).size;
let Priv = message.guild.members.cache.filter(c => c.voice.channel && c.voice.channel.parentID === privRooms).size;
message.channel.send(new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
.setDescription(`
\`•\` Sesli odalarda toplam **${Voice}** kişi var.
\`•\` Teyit odalarında bulunan **${Confirm}** kişi var.
\`•\` Public odalarımda bulunan **${Public}** kişi var.
\`•\` Priv odalarımda bulunan **${Priv}** kişi var.
`))
}
module.exports.configuration = {
  name: "ses",
  aliases: ["ses-say"],
  usage: "!ses",
  description: "Belirtilen miktar kadar komutun kullanıldığı kanalı yavaşlatır."
};