const Discord = require('discord.js');
require("../../inlinereply");
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args) => {
 
    const davet = new Discord.MessageEmbed()
    .setTitle(`💌 Davet Linkimiz`)
    .setDescription(`Arkadaşlarınızı sunucumuza davet ederek bize destek\nolabilir ve sunucumuzun gelişimine katkıda bulunabilirsiniz!\n\n• https://discord.gg/SGWQqfuajf`)
    .setThumbnail("https://s3.gifyu.com/images/Logodd5bd5976845c883.gif")

    message.inlineReply(davet).then(msg => msg.delete({timeout: 10000}));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'davet',
  description: "Davet Linki",
  usage: 'davet'
}