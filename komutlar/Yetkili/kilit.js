const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../../ayarlar.json');
require("../../inlinereply");
exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_CHANNELS"))
return message.inlineReply(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanmak için \`MANAGE_CHANNELS\` yetkisine sahip olmalısın!`));

let channel = message.mentions.channels.first() || message.channel;
let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
let kilitlimi = await db.get(`Kilit_${channel.id}`)

if(!kilitlimi) {
db.set(`Kilit_${channel.id}`, 1)
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false });
channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setTitle('🔒 • KANAL KİLİTLENDİ!'))
} else {
db.delete(`Kilit_${channel.id}`)
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': null });
channel.send(new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle('🔓 • KANAL KİLİDİ AÇILDI!'))
}

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kilitle"],
  permLevel: 0
};
 
exports.help = {
  name: 'kilit',
  description: 'kanal kilit',
  usage: "kilit"
};