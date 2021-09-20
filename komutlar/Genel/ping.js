const Discord = require('discord.js');
require("../../inlinereply");
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args,) => {
  const ping = `${Math.round(client.ws.ping)}ms`;

let embed = new Discord.MessageEmbed()
.setDescription('**Anlık Gecikme Süresi** :hourglass:')
.setColor("#00FF00")
.addField("Ping :", ping)
message.inlineReply(embed).then(msg => msg.delete({timeout: 5000}));

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Gecikme süresini gösterir.',
  usage: 'ping'
};
