const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
    let executor = message.member
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('yetkin yok')
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`Fex was here.`)
    let tag = "fex"
    let tagrol = "830390751099617301"

    let taglılar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(tagrol))
    let tagsızlar = message.guild.members.cache.filter(s => !s.user.username.includes(tag) && s.roles.cache.has(tagrol))

    taglılar.array().forEach((cross, index) => {
        setTimeout(async() => {
            cross.roles.add(tagrol)
        }, index * 1000)

    })
    tagsızlar.array().forEach((cross, index) => {
        setTimeout(async() => {
            cross.roles.remove(tagrol)
        }, index * 1000)
    })
    message.channel.send(embed.setDescription(`**${taglılar.size}** Kullanıcıya taglı rolü verilecek.\n **${tagsızlar.size}** Kullanıcıdan taglı rolü alınacak.`))

}
module.exports.configuration = {
    name: "tagtara",
    aliases: ["tag-kontrol", "tag-kont"],
    usage: "tagtara kontrol",
    description: ""
};
