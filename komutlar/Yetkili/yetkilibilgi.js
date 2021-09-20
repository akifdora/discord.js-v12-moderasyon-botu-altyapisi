const Discord = require('discord.js');
const doradb = require("quick.db")
const moment = require('moment');
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args) => {
    var gün = [moment().format('DD-MM-YYYY | H:mm:ss')]
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let tarih = doradb.fetch(`Yetkili.${member.id}`, gün) || "Henüz yetkili olmamış."
if (!message.member.roles.cache.has("835227731343704143"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanabilmek için <@&835227731343704143> olmalısın!`)).then(msg => msg.delete({timeout: 5000}));
if (!member) return message.channel.send(new Discord.MessageEmbed().setDescription('<:antarticaemoji:836010813793239040> • Kimin yetkili olduğu tarihi görmek istiyorsun o_O')).then(msg => msg.delete({timeout: 5000}));
try{
message.channel.send(new Discord.MessageEmbed().setTitle(`${member.user.tag}`) .addField("<:antarticaemoji:836010813793239040> • Yetkiye Başlama Tarihi", `${tarih}`).setFooter(message.author.tag, message.author.avatarURL({dynamic: true})) .setThumbnail(member.user.avatarURL({dynamic: true})).setColor('#D2EE07')).then(msg => msg.delete({timeout: 10000}));
} catch (e) {
    console.log(e);
    message.channel.send('<:antarticaemoji:836010813793239040> • Hata oluştu!').then(msg => msg.delete({timeout: 5000}));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkilib'],
  permLevel: 0
};

exports.help = {
  name: 'yetkilibilgi',
  description: 'Belirttiğiniz kullanıcıya belirttiğiniz rolü verir.',
  usage: 'yetkilibilgi'
};