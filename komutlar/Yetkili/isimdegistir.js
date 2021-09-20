const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("835945563421540363") && !message.member.roles.cache.has("835227731359694913"))
  return message.channel.send(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanabilmek için <@&835227731359694913> veya <@&835945563421540363> yetkisine sahip olmalısın!`)).then(msg => msg.delete({timeout: 5000}));
  let isim = args.slice(1).join(' ');
  let kullanici = message.mentions.users.first();
  if(!kullanici) return message.inlineReply(`<:antarticaemoji:836010813793239040> • Lütfen bir kullanıcı giriniz! \nDoğru Kullanım; \`${prefix}isimdeğiştir @${client.user.username}#${client.user.discriminator} \``).then(msg => msg.delete({timeout: 5000}));
  if(!isim) return message.inlineReply(`<:antarticaemoji:836010813793239040> • Lütfen bir kullanıcı adı giriniz! \nDoğru Kullanım; \`${prefix}isimdeğiştir @${client.user.username}#${client.user.discriminator} \``).then(msg => msg.delete({timeout: 5000}));
  if(isim.length > 32) return message.inlineReply(`<:antarticaemoji:836010813793239040> • Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`).then(msg => msg.delete({timeout: 5000}));
  message.guild.members.cache.get(kullanici.id).setNickname(`${isim}`)
  let embed = new Discord.MessageEmbed()
  .setDescription(`:white_check_mark: Başarılı bir şekilde \`${kullanici.username}\` adlı kişinin kullanıcı adı \`${isim}\` olarak değiştirildi.`).then(msg => msg.delete({timeout: 10000}));
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimdegistir'],
    permLevel: 0
}

exports.help = {
    name: 'isimdeğiştir',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı '
}