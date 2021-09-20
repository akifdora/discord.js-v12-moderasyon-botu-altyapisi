const Discord = require('discord.js');
require("../../inlinereply");
const ayarlar = require('../../ayarlar.json');

exports.run = (client, message, args) => {
let mention = message.mentions.users.first() || client.users.cache.get(args[0]);
let sender = "";
if (message.channel.guild.member(message.author).nickname == null) {
  sender = message.author.username;
} else {
  sender = message.channel.guild.member(message.author).nickname;
}
if (mention != null || mention != undefined) {
  var name = mention.username + "'s ";
  if (mention.username.endsWith("s")) {
    name = mention.username + "' ";
  }
  const avatarEmbedOther = new Discord.MessageEmbed()
  .setAuthor(mention.username, mention.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setColor('RANDOM')
  .setThumbnail(mention.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL())
  .setDescription(`[Avatarın büyük halini göster!](${mention.avatarURL()})`);
  message.inlineReply(avatarEmbedOther).then(msg => msg.delete({timeout: 10000}));;
  return;
} else {
  const avatarEmbedYou = new Discord.MessageEmbed()
  .setAuthor(sender, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setColor('RANDOM')
  .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL())
  .setDescription(`[Avatarın büyük halini göster!](${message.author.avatarURL})`);
  message.inlineReply(avatarEmbedYou).then(msg => msg.delete({timeout: 5000}));;
  return;
}
message.inlineReply("Render hatası yada bilinmeyen bir hata oldu.");
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatarım'],
    kategori: 'kullanıcı',
  permLevel: 0
};
exports.help = {
  name: 'avatar',
  isim: 'Avatar',
  süre: 'Yok',

  description: 'Avatarınızı gösterir ve ya birini etiketlerseniz o kişinin avatarını gösterir.',
  usage: 'avatar <@kullanıcı>'
};
