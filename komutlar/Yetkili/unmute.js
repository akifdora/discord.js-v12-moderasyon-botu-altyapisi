const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const db = require("quick.db");
require("../../inlinereply");
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));

if (!msg.member.roles.cache.has("835507256124244040")) return msg.channel.send(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanabilmek için <@&835507256124244040> rolüne olmalısın!`));

let log = `${ayarlar.mutelog}`
 
if (!user) return msg.inlineReply('<:antarticaemoji:836010813793239040> • Kullanıcı Etiketlemedin').then(msg => msg.delete({timeout: 5000}));
if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`<:antarticaemoji:836010813793239040> • Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`).then(msg => msg.delete({timeout: 5000}));
 
let mute = msg.guild.roles.cache.find(r => r.name === "Muted");
                        
db.delete(`muteli_${msg.guild.id + user.id}`)
user.roles.remove(mute.id)
msg.guild.channels.cache.get(log).send(`<@${user.id}> Muten açıldı.`).then(msg => msg.delete({timeout: 5000}));
 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: "unmute",
  description: "",
  usage: ""
};