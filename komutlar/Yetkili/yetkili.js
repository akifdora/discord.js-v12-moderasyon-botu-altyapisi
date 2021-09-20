const Discord = require('discord.js');
const doradb = require("quick.db")
const moment = require('moment');
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args) => {
  var gün = [moment().format('DD-MM-YYYY | H:mm:ss')]
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!message.member.roles.cache.has("835227731343704143"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanabilmek için <@&835227731343704143> olmalısın!`)).then(msg => msg.delete({timeout: 5000}));
if (!member) return message.channel.send(new Discord.MessageEmbed().setDescription('<:antarticaemoji:836010813793239040> • Kime rol vereceğim etiketlesene o_O')).then(msg => msg.delete({timeout: 5000}));
  if (message.member.roles.highest.comparePositionTo("835227731267944595") < 1) {
  return message.channel.send(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Verilecek rol senin rolünün altında olmalı akıllı bıdık seni :)`)).then(msg => msg.delete({timeout: 5000}));
  }

  try{
await (member.roles.add("835227731267944595"))
 doradb.set(`Yetkili.${member.id}`, gün)
 message.channel.send(new Discord.MessageEmbed().setDescription(`${member} isimli üyeye <@&835227731267944595> isimli yetki başarıyla verildi!`)  .setFooter(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('#D2EE07')).then(msg => msg.delete({timeout: 5000}));
    
  } catch (e) {
    console.log(e);
    message.channel.send('Hata oluştu!').then(msg => msg.delete({timeout: 5000}));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Belirttiğiniz kullanıcıya belirttiğiniz rolü verir.',
  usage: 'yetkili'
};