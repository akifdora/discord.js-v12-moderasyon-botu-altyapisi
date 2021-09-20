const emran = require('discord.js');
const ayarlar = require('../../ayarlar.json');
//codarev12

exports.run = async(client, message, args) => {
              const codare = require('../../ayarlar.json')
            let prefix = codare.prefix
//codarev12

              if(message.channel.type == "dm")  return;
if (message.channel.type !== "text") return;
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.inlineReply("<:antarticaemoji:836010813793239040> • Bu Komutu Kullanabilmen İçin **Mesajları Yönet** Yetkisine Sahip Olman Gerek!.");
//codarev12
const limit = args[0] ? args[0] : 0;//codare
  if(!limit) {//codare
              var embed = new emran.MessageEmbed()
                .setDescription("<:antarticaemoji:836010813793239040> • HATA!")
                .setDescription(`Doğru kullanım: \`${prefix}yavaşmod [0-100]\``)//codare
                .setColor('RANDOM')
            message.channel.send({embed})
            return
          }//codare
if (limit > 100) {
    return message.channel.send(new emran.MessageEmbed().setDescription("<:antarticaemoji:836010813793239040> • Süre limiti maksimum **100** saniye olabilir.").setColor('RED'));
}
    message.channel.send(new emran.MessageEmbed().setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).setColor('GREEN')).then(m => m.delete({ timeout: 5000, reason: 'Siliniyor.' }));

var request = require('request');
request({
    url: `https://discord.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
  permLevel: 0,

};

exports.help = {
  name: 'yavaş-mod',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaşmod [1/10]',
};
