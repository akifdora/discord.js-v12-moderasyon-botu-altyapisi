const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const db = require("quick.db");
require("../../inlinereply");
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));

if (!msg.member.roles.cache.has("835507256124244040")) return msg.channel.send(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanabilmek için <@&835507256124244040> rolüne olmalısın!`)).then(msg => msg.delete({timeout: 5000}));


let log = `${ayarlar.mutelog}`
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
 
  if (!user) return msg.inlineReply('<:antarticaemoji:836010813793239040> • Kullanıcı Etiketlemedin').then(msg => msg.delete({timeout: 5000}));
  if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`<:antarticaemoji:836010813793239040> • Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`).then(msg => msg.delete({timeout: 5000}));
 if (!reason) return msg.inlineReply('<:antarticaemoji:836010813793239040> • Süre Belirtmedin! Seçeneklerin : 1sn/1dk/1s/1g').then(msg => msg.delete({timeout: 5000}));
if (!sebep) return msg.inlineReply('<:antarticaemoji:836010813793239040> • Sebep Belirtmedin!').then(msg => msg.delete({timeout: 5000}));
 
 
 
  let mute = msg.guild.roles.cache.find(r => r.name === "Muted");
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
 
    }
 
 
await(user.roles.add(mute.id));
let mutezaman = args[1]

if(mutezaman == "süresiz"){
  db.set(`muteli_${msg.guild.id + user.id}`, 'süresiz')
  msg.channel.send(`${user} Adlı Kişi , süresiz mutelendi!`).then(msg => msg.delete({timeout: 5000}));
  const muteembed = new Discord.MessageEmbed()
        .setTitle('Ceza: Mute')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`\`SÜRESİZ\``)
  . setColor("RANDOM")
msg.guild.channels.cache.get(log).send(muteembed)
} else {
  msg.channel.send(`${user} Adlı Kişi , ${mutezaman        .replace(/d/, " Gün")
  .replace(/s/, " Saniye")
  .replace(/m/, " Dakika")
  .replace(/h/, " Saat")} Susturuldu! Sunucudan Çıkarsa Bile Mutesi Devam edecek!`).then(msg => msg.delete({timeout: 5000}));
db.set(`muteli_${msg.guild.id + user.id}`, 'muteli')
db.set(`süre_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                        
  const muteembed = new Discord.MessageEmbed()
        .setTitle('Ceza: Mute')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`\`${mutezaman
        .replace(/d/, " Gün")
        .replace(/s/, " Saniye")
        .replace(/m/, " Dakika")
        .replace(/h/, " Saat")}\``)
  . setColor("RANDOM")
msg.guild.channels.cache.get(log).send(muteembed)
 
  setTimeout(function(){
db.delete(`muteli_${msg.guild.id + user.id}`)
    user.roles.remove(mute.id)
 msg.channel.send(`<@${user.id}> Muten açıldı.`).then(msg => msg.delete({timeout: 5000}));
  }, ms(mutetime));

}


 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 0
};
 
exports.help = {
  name: "mute",
  description: "",
  usage: ""
};