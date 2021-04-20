const { Discord, MessageEmbed, Client } = require('discord.js');
const client = new Client({fetchAllMembers: true});
const db = require("quick.db");
const fs = require("fs");
const ayar = require("./settings.json");

const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;
global.client = client;
fs.readdir("./Commands", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(file => {
        let prop = require(`./Commands/${file}`);
        if(!prop.configuration) return;
        console.log(`${prop.configuration.name} komutu yükleniyor!`);
        if(typeof prop.onLoad === "function") prop.onLoad(client);
        commands.set(prop.configuration.name, prop);
        if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));
    });
});


setInterval(() => {
process.exit(0);
}, 7200000) 


fs.readdir("./Events", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./Events/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

fs.readdir("./Controllers", (err, files) => {
  if(err) return console.error(err);
  files.filter(file => file.endsWith(".js")).forEach(file => {
      let prop = require(`./Controllers/${file}`);
      if(!prop.configuration) return;
      client.on(prop.configuration.name, prop);
  });
});




/*
client.on('message' , message =>{
  if(message.member.roles.cache.has('773281623751131158') && ["ban yetkili" , "cezalı yetkili","sorun çözücü"].includes(message.content.toLowerCase())){
  var jailyetkili = message.guild.members.cache.filter(x => x.roles.cache.has('773281623734222909') && x.user.presence.status !== 'offline')
  var banyetkili = message.guild.members.cache.filter(x => x.roles.cache.has('773281623730421769') && x.user.presence.status !== 'offline')
    var banyetkili = message.guild.members.cache.filter(x => x.roles.cache.has('773281623730421769') && x.user.presence.status !== 'offline')
  var soruncözücü = message.guild.members.cache.filter(x => x.roles.cache.has('773281623730421762') && x.user.presence.status !== 'offline')
    var sorunçözücü = message.guild.members.cache.filter(x => x.roles.cache.has('773281623730421762') && x.user.presence.status !== 'offline')
  if(message.content.toLowerCase() == "ban yetkili") return message.channel.send(`[**!**] ${message.author} adlı yetkilinin size ihtiyacı var.\n ${banyetkili.map(x => x).join(' ')}`)
  if(message.content.toLowerCase() == "cezalı yetkili") return message.channel.send(`[**!**] ${message.author} adlı yetkilinin size ihtiyacı var.\n ${jailyetkili.map(x => x).join(' ')}`)
  if(message.content.toLowerCase() == "sorun çözücü") return message.channel.send(`[**!**] ${message.author} adlı yetkilinin size ihtiyacı var.\n ${soruncözücü.map(x => x).join(' ')}`)

  }
  })
*/

  client.on("message", (message) => {
        if (/*!message.author.bot ||*/!message.content.startsWith(ayar.prefix) || !message.channel || message.channel.type == "dm") return;
        let args = message.content
          .substring(ayar.prefix.length)
          .split(" ");
        let command = args[0];
        let bot = message.client;
        args = args.splice(1);
        let calistirici;
        if (commands.has(command)) {
          calistirici = commands.get(command);
          calistirici.execute(bot, message, args);
        } else if (aliases.has(command)) {
          calistirici = aliases.get(command);
          calistirici.execute(bot, message, args);
        }
  });

Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };
  

client.login(ayar.token).then(console.log("Bot başarılı bir şekilde giriş yaptı.")).catch(e => console.error(e));

  
  client.on("message", async msg => {
    if (msg.content.toLowerCase() === 'tag') {
      msg.channel.send('**#1947**');
    }
  });

  client.on("message", async msg => {
    if (msg.content.toLowerCase() === '!tag') {
      msg.channel.send('**#1947**');
    }
  });

  client.on("message", async msg => {
    if (msg.content.toLowerCase() === '.tag') {
      msg.channel.send('**#1947**');
    }
  });


  client.on("ready", async () => {
    let maiwenVoice = client.channels.cache.get("SES KANAL İD");
    if (maiwenVoice) maiwenVoice.join().catch(err => console.error("Ayarladığınız ses kanalına bot bağlanamadı!"));
  });

  function afkSil(message, afk, isim) {
    message.channel.send(`${message.author} Artık **AFK** değilsiniz.`);
    db.delete(`afkSebep_${afk.id}_${message.guild.id}`)
    db.delete(`afkid_${afk.id}_${message.guild.id}`)
    db.delete(`afkAd_${afk.id}_${message.guild.id}`)
    db.delete(`afk_süre_${afk.id}_${message.guild.id}`)
    message.member.setNickname(isim)
  };
  
  client.on("message" , async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    var fd = false
    var sdd = new Set();
    let afk = message.mentions.users
    if (afk.first()) {
      afk.forEach(async afk => {
        if (sdd.has(afk.id)) return;
        else sdd.add(afk.id)
        var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
        var kisi2 = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
        if (kisi) {
          var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
          if (kisi2) {
            fd = true
            afkSil(message, message.member, isim)
          }
          if (afk.id == message.member.id) {
            if (!fd) afkSil(message, afk, isim)
          }
          if (afk.id !== message.member.id) {
            var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
            if (sebep) {
              let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
              let timeObj = ms(Date.now() - süre);
              message.channel.send(`${afk} şu an da AFK!
  Şu kadar süredir: ${timeObj.days} Gün, ${timeObj.hours} Saat, ${timeObj.minutes} Dakika, ${timeObj.seconds} Saniye
  Sebep: ${sebep}`);
            };
          }
        } else {
          afk = message.member
          kisi = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
          if (kisi) {
            var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
            if (afk.id == message.member.id) {
              afkSil(message, afk, isim)
            }
            if (afk.id !== message.member.id) {
              var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
              if (message.content.includes(kisi)) {
                if (sebep) {
                  let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
                  let timeObj = ms(Date.now() - süre);
                  message.channel.send(`${afk} şu an da AFK!
  Şu kadar süredir: ${timeObj.days} Gün, ${timeObj.hours} Saat, ${timeObj.minutes} Dakika, ${timeObj.seconds} Saniye
  Sebep: ${sebep}`);
                };
              }
            }
          }
        }
      })
    } else {
      afk = message.member
      var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
      if (!kisi) return;
      var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
      afkSil(message, afk, isim)
    }
  });



const emojiler = {
   0: "<a:0x:830716722096242689>", // Emoji ID 0
   1: "<a:1x:830716723119259648>", // Emoji ID 1
   2: "<a:2x:830716723169853470>", // Emoji ID 2
   3: "<a:3x:830716722474123294>", // Emoji ID 3
   4: "<a:4x:830716722893422612>", // Emoji ID 4
   5: "<a:5x:830716722834440222>", // Emoji ID 5
   6: "<a:6x:830716722494570516>", // Emoji ID 6
   7: "<a:7x:830716722880708638>", // Emoji ID 7
   8: "<a:8x:830716722193235999>", // Emoji ID 8
   9: "<a:9x:830716723300794388>"} // Emoji ID 9
  client.emojili = (string) => {
    let arx = "";
    String(string).split("").forEach(x => {
      arx += "" + emojiler[Number(x)];
    });
    return arx;
  };
    client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

    