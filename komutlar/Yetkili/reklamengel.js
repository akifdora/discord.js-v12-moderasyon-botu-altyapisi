
const db = require('quick.db')
const Discord = require('discord.js')
let ayarlars = require('../../ayarlar.json');
const prefix = ayarlars.prefix

 let ayarlar = ['aç','kapat']
exports.run = async (bot, message, args) => {
  const yetki = new Discord.MessageEmbed()
  .setColor('#F93B3B')
  .setDescription('<:antarticaemoji:836010813793239040> • Bu komutu kullanabilmek için <@&835227731427852290> rolüne olmalısın')
if (!message.member.roles.cache.has("835227731427852290")) return message.channel.send(yetki).then(msg => msg.delete({timeout: 5000}));
  const reklamkullanım = new Discord.MessageEmbed()
    .setColor('#F93B3B')
    .setDescription(`<:antarticaemoji:836010813793239040> • Reklam filtresini kullanmak için \`${prefix}aç\` yada \`${prefix}kapat\` yazmalısın!`)
  if (!args[0]) return message.channel.send(reklamkullanım).then(msg => msg.delete({timeout: 5000}));
  const parametreler = new Discord.MessageEmbed()
    .setColor('#F93B3B')
    .setDescription(`<:antarticaemoji:836010813793239040> • Geçerli parametreleri kullanmalısın.\nParametreler: \`${ayarlar.join(' - ')}\``)
  if(!ayarlar.includes(args[0])) return message.channel.send(parametreler).then(msg => msg.delete({timeout: 5000}));

  if (args[0] == 'aç') {
    const zatena = new Discord.MessageEmbed()
      .setColor('#F93B3B')
      .setDescription(`<:antarticaemoji:836010813793239040> • Sistem zaten açık!`)
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(zatena).then(msg => msg.delete({timeout: 5000}));
    db.set(`reklam_${message.guild.id}`, 'acik')
    const açıldı = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription('Reklam Engel başarıyla açıldı!\n\n`Üyeleri Yasakla` yetkisine sahip olanların reklamı engellenmeyecektir.')
      message.channel.send(açıldı).then(msg => msg.delete({timeout: 5000}));
  }
  if (args[0] == 'kapat') {
    const zatenk = new Discord.MessageEmbed()
      .setColor('#F93B3B')
      .setDescription(`<:antarticaemoji:836010813793239040> • Sistem zaten kapalı!`)
        if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(zatenk).then(msg => msg.delete({timeout: 5000}));
    db.delete(`reklam_${message.guild.id}`)
    const kapandı = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription('Reklam Engel başarıyla kapatıldı!\n\nArtık herkes reklam yapabilir.')
      message.channel.send(kapandı).then(msg => msg.delete({timeout: 5000}));
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['advertisement','reklam'],
  permLevel: 0
};

exports.help = {
  name: 'reklam-engelle',
  description: '[Admin Komutu]',
  usage: 'reklam-engelle'
};
