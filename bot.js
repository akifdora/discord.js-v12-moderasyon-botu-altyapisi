// Modüller
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require("quick.db");
const ms = require("ms");
const AntiSpam = require('discord-anti-spam'); 
const moment = require('moment');
const { error } = require('console');
moment.locale('tr');
require("moment-duration-format");
require("./inlinereply");
const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})
client.cooldown = new Discord.Collection();
client.config = {
cooldown: 1 * 1000
}

// ==================================================
// # KOMUTLAR BAŞLANGICI                            #
// ==================================================

// BOTUN ALTYAZISI //
client.on("ready", () => {
  client.channels.cache.get("837026336224444467").join();
  var altyazı = [
    `.yardım | Sunucuyu`,
	  `Bot Yapımcısı | akifdora#1205`,
    `Antartica ᛦ Adaleti`
  ];
  setInterval(function() {
    var random = Math.floor(Math.random() * altyazı.length);
    client.user.setActivity(altyazı[random], { type: 'WATCHING' });
    }, 2 * 3500);

})
// BOTUN ALTYAZISI //

// ANTİSPAM //
const antiSpam = new AntiSpam({
	warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 8, // Amount of messages sent in a row that will cause a mute
  kickEnabled: false,
  banEnabled: false,
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, spam yapmaya devam edersen mute yiyeceksin!', // Message that will be sent in chat upon warning a user.
	muteMessage: '{@user} spam yaptığı için <@&835227731327057973> rolü verildi!',// Message that will be sent in chat upon muting a user.
	maxDuplicatesWarning: 4, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 7, // Ammount of duplicate message that trigger a mute.
	exemptPermissions: ['👑︱Kurucu'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: false // If the bot should remove all the spam messages when taking action on a user!
});
client.on('message', (message) => antiSpam.message(message)); 
// ANTİSPAM //

// REKLAM FİLTRELEME //
client.on("message", msg => {
  if (!msg.guild) return;
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg","discord.io"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Bu sunucuda `Reklam Engelleme` sistemi aktiftir, reklam yapamazsın!').then(msg => msg.delete({timeout: 5000}));
            }
          } catch(err) {
            console.log(err);
          }
        }
    });
// REKLAM FİLTRELEME //

// MUTE KORUMA //
client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === "Muted");
 let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
 let süre = db.fetch(`süre_${member.id + member.guild.id}`)
 if (!mutelimi) return;
 if (mutelimi == "muteli") {
 member.roles.add(mute.id)
 member.send("Sunucumuzda `Muted` rolün varken sunucudan çıktığın için tekrar `Muted` rolün eklendi!")
setTimeout(function(){
 db.delete(`muteli_${member.guild.id + member.id}`)
     member.send(`<@${member.id}> Mute süren bittiği için \`Muted\` rolünü senden aldım, daha dikkatli ol!`)
     member.roles.remove(mute.id);
   }, ms(süre));
 }
if (mutelimi == "süresiz") {
  member.roles.add(mute.id)
  member.send("Sunucumuzda `Muted` rolün varken sunucudan çıktığın için tekrar `Muted` rolün eklendi!")
}
})
// MUTE KORUMA //

// VMUTE KORUMA //
client.on('guildMemberAdd', async(member) => {
  let vmute = member.guild.roles.cache.find(r => r.name === "V.Muted");
   let vmutelimi = db.fetch(`vmuteli_${member.guild.id + member.id}`)
   let vsüre = db.fetch(`vsüre_${member.id + member.guild.id}`)
   if (!vmutelimi) return;
   if (vmutelimi == "vmuteli") {
   member.roles.add(vmute.id)
   member.send("Sunucumuzda `V.Muted` rolün varken sunucudan çıktığın için tekrar `V.Muted` rolün eklendi!")
  setTimeout(function(){
   db.delete(`vmuteli_${member.guild.id + member.id}`)
       member.send(`<@${member.id}> Mute süren bittiği için \`V.Muted\` rolünü senden aldım, daha dikkatli ol!`)
       member.roles.remove(vmute.id);
     }, ms(vsüre));
   }
  if (vmutelimi == "süresiz") {
    member.roles.add(vmute.id)
    member.send("Sunucumuzda `V.Muted` rolün varken sunucudan çıktığın için tekrar `V.Muted` rolün eklendi!")
  }
  })
// VMUTE KORUMA //

// ÖNERİ SİSTEMİ //
client.on("message", async message => {  
  if(message.channel.id !== `${ayarlar.önerikanalı}`) return; 
  if(message.author.bot) return
  message.delete()
  let embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Öneri")
  .addField("Kullanıcı:", `${message.author}`)
  .setThumbnail(message.author.avatarURL({ dynamic:true }))
  .setDescription(`${message.content}`)
  .setFooter(`${ayarlar.sunucuadı} • Öneri Sistemi`)
  client.channels.cache.get(`${ayarlar.önerikanalı}`).send(embed).then(sentEmbed => {
    sentEmbed.react("✅")
    sentEmbed.react("❌")
  })
})
// ÖNERİ SİSTEMİ //

// SUNUCUYA GİRİŞ //
client.on('guildMemberAdd', async member => {
  member.setNickname("ᛦ İsim | Yaş")
  db.add(`${member.guild.id}_${member.id}_sunucuyagirmismi`, 1)
  
  let kanal = "835227732010598515";
  let cmfzaman = new Date().getTime() - member.user.createdAt.getTime();
  let cmfzaman2 = new Date().getTime() - member.user.createdAt.getTime();
  let girmismi = db.fetch(`${member.guild.id}_${member.id}_sunucuyagirmismi`)

  var guvenlik = [];
    if(cmfzaman > 604800000) {
      member.roles.add('835227731267944596');
      guvenlik = "<a:antarticaemoji33:836011223878336543> Güvenli";
      } else {
      member.roles.add("835227731327057977");
      await member.roles.remove("835227731267944596");
      guvenlik = "<a:antarticaemoji:836011224076255323> Güvenilir Değil";
    }

    if(girmismi > 1){
      giriskontrol = "<a:antarticaemoji:836011224076255323> Daha önce sunucuya katılmış!"
    } else {
      giriskontrol = "<a:antarticaemoji33:836011223878336543> Sunucuya ilk kez katıldı!"
    }


  const gecen = moment.duration(cmfzaman2).format(` Y **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 

  const embed = new Discord.MessageEmbed()
  .setTitle("<a:antarticakraltaci:836010237244080158> ANTARTİCA • HOŞGELDİN! <a:antarticakraltaci:836010237244080158>")
  .setThumbnail(member.user.displayAvatarURL({dynamic : true}))
  .setDescription(`<a:antarticaemoji:836011621473320990> ${member} sunucumuza hoşgeldin!
  
  <:antarticaemoji:836010812896051220> Seninle birlikte \`${member.guild.memberCount}\` kişi olduk!
  
  <a:antarticaemoji:836011223253647380> Ses teyit odalarına geçerek kayıt olabilirsin.
  Ayrıca tagımızı (\`ᛦ\`) alarak bize destek olabilirsin!
  
  📆 **Hesap Açılış Tarihi**
  \`${gecen}\``)
  .addFields(
    { name: "Güvenlik", value: guvenlik, inline: true },
    { name: "Kontrol", value: giriskontrol, inline: true }
  )
  client.channels.cache.get(kanal).send(`<@&835227731359694913> • ${member}`, embed)
})
// SUNUCUYA GİRİŞ //

// XP KAZANIM //
client.on("message", async (message) => {
  exp(message);
function exp(message) {
  if (!client.cooldown.has(`${message.author.id}`) || (Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
      let exp = db.add(`exp_${message.author.id}`, 1);
      let level = Math.floor(0.3 * Math.sqrt(exp));
      let lvl = db.get(`level_${message.author.id}`) || db.set(`level_${message.author.id}`,1);
      if (level > lvl) {
          let newLevel = db.set(`level_${message.author.id}`,level);
          const levelup = new Discord.MessageEmbed()
          .setTitle("<:antarticaemoji:836010812896051220> • LEVEL ATLADIN!")
          .setDescription(`${message.author}, seviye atladın! Artık ${newLevel} levelsin!`)
          message.guild.channels.cache.get("836363130077970432").send(message.author, levelup).catch(err => console.log(err));
      }
      client.cooldown.set(`${message.author.id}`, Date.now());
  }
}
});
// XP KAZANIM //

// GELEN GİDEN //
client.on(`guildMemberAdd`, async member => {
  var gelen = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("📥 • YENİ BİR ÜYEMİZ VAR!")
  .setThumbnail(member.user.avatarURL({display: true}))
  .setDescription(`${member.user} sunucuya katıldı, şu an sunucumuzda ${member.guild.memberCount} üye var!`)
  client.channels.cache.get("835227732010598514").send(gelen)
});

client.on(`guildMemberRemove`, async member => {
  var giden = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("📤 • BİR ÜYE SUNUCUDAN AYRILDI!")
  .setThumbnail(member.user.avatarURL({display: true}))
  .setDescription(`${member.user} sunucudan ayrıldı, şu an sunucumuzda ${member.guild.memberCount} üye var!`)
  client.channels.cache.get("835227732010598514").send(giden)
});
// GELEN GİDEN //

// ÖZEL ODA SİSTEMİ //
client.on('voiceStateUpdate', async (oldState, newState) => {

  if (newState.channel != null && newState.channel.name.startsWith('ᛦ 2 Kişi • Oda Aç')) {
    newState.guild.channels.create(`🎧 ${newState.member.displayName} Odası`, {type: 'voice', parent: newState.channel.parent
  }).then((cloneChannel) => {newState.setChannel(cloneChannel);
    cloneChannel.setUserLimit(2);})}
// Kullanıcı ses kanalından ayrılınca ve kanalda kimse kalmazsa kanalı siler;
if (oldState.channel != undefined) {
  if (oldState.channel.name.startsWith('🎧')) {
    if (oldState.channel.members.size == 0) {oldState.channel.delete();}
      else { // İlk kullanıcı ses kanalından ayrılınca kanaldaki başka kullanıcı adını kanal adı yapar.
        let matchMember = oldState.channel.members.find(x => `🎧 ${x.displayName} kanalı` == oldState.channel.name);
        if (matchMember == null) {
        oldState.channel.setName(`🎧 ${oldState.channel.members.random().displayName} kanalı`)
          }
       }
     }
   }
});
// ÖZEL ODA SİSTEMİ //

// TAG ALANA ROL //
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'ᛦ'
  const sunucu = '835227730819285022'
  const kanal = '835529171789807636'
  const rol = '835227731209486367'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} isimli kullanıcı tagimizi (${tag}) aldığı için <@&${rol}> rolünü aldı!`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, sunucumuzda tagımızı (${tag}) aldığın için sana ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} rolü verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} isimli kullanıcı tagimizi (${tag}) çıkardığı için <@&${rol}> rolünü aldım!`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, sunucumuzda tagımızı (${tag}) çıkardığın için ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} rolünü senden aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
// TAG ALANA ROL //

// OTO CEVAPLAR //
client.on('message', async msg => {
  if (msg.content.toLowerCase() === '.tag') {
    msg.inlineReply("Sunucu tagimizi `ᛦ` kullanıcı adına ekleyerek bize destek olabilir ve `ᛦ Antartica Tagges` rolüne sahip olabilirsin!");
  }
});
// OTO CEVAPLAR //

// AFK //
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

    const adamafk = new Discord.MessageEmbed()
    .setDescription(`${afk} kişisi AFK!`)
    .addField(`Sebep:`,`${sebep}`)
    .setThumbnail("https://s3.gifyu.com/images/Logodd5bd5976845c883.gif")
    msg.inlineReply(adamafk).then(msg => msg.delete({timeout: 5000}));
   }
 }
  if(msg.author.id === kisi){

    const afkgg = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag)
      .setColor("GREEN")
      .setDescription("AFK durumundan çıktın, tekrar hoşgeldin :)")
      .setThumbnail("https://s3.gifyu.com/images/Logodd5bd5976845c883.gif")
   msg.inlineReply(afkgg).then(msg => msg.delete({timeout: 5000}));
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});
// AFK //

// KÜFÜR FİLTRESİ //
client.on('message', async msg => {//dawn
  const filtre = await db.fetch(`${msg.guild.id}.kufur`)
     if (filtre) {
         const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
         let kelimeler = msg.content.split(' ');
         kelimeler.forEach(kelime=> {//CODARE
          if(kufurler.some(küfür => küfür === kelime))  {
           try {   
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                           
                       return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
           }              
           } catch(err) {
             console.log(err);
           }
         }
     })
    }
     if (!i) return;
 });
 client.on("messageUpdate", (oldMessage, newMessage) => {
   
   
  const filtre = db.fetch(`${newMessage.guild.id}.kufur`)
     if (filtre) {//dawn
         const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
         let kelimeler = newMessage.content.split(' ');
         kelimeler.forEach(kelime=> {
          if(kufurler.some(küfür => küfür === kelime))  {
           try {   
             if (!msg.member.hasPermission("BAN_MEMBERS")) { //buradaki izni editleyebilirsiniz
                   msg.delete();
                           
                       return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
           }              
           } catch(err) {
             console.log(err);
           }
         }
     })
    } //CODARE
     if (!i) return;
 });
// KÜFÜR FİLTRESİ //

// ALTYAPI (DOKUNMA) //
require('./util/eventLoader')(client);

const log = message => {
  console.log(`${message}`)
};

 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
  fs.readdir(`./komutlar/${f}/`, (err, filess) => {
    if (err) console.error(err);
    log(`${f} Klasöründen ${filess.length} Komut Yüklenecek;`);
    filess.forEach(fs => {
      let props = require(`./komutlar/${f}/${fs}`);
      log(`${props.help.name} // Yüklendi`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
     });
    });
   });
  });

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

// ALTYAPI (DOKUNMA) //