const Discord = require('discord.js');
const canvacord = require("canvacord");
const doradb = require("quick.db")

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let seyit = doradb.get(`level_${user.id}`) || 0;
  let hyperion = doradb.get(`exp_${user.id}`) || 0;
  let asunack = Math.floor(Math.pow(seyit / 0.1, 2));

  let herkes = doradb.all().filter(i => i.ID.startsWith("exp_")).sort((a, b) => b.data - a.data);
  let seviye = herkes.map(x => x.ID).indexOf(`exp_${user.id}`) + 1;

  const rank = new canvacord.Rank()
    .setAvatar(user.displayAvatarURL({dynamic: false,  format: 'png'}))
    .setCurrentXP(hyperion)
    .setRequiredXP(asunack)
    .setRank(seviye, "RANK", true)
    .setLevel(seyit)
    .setStatus(user.presence.status)
    .setProgressBar("BLACK", "COLOR")
    .setOverlay("WHITE", 0.5, true)
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setBackground("COLOR", "WHİTE");

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "levelcard.png");
        message.channel.send(attachment);
    });   
}


exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['level', 'lvl'],
  permLevel: 0,
}
exports.help = {
    name: 'seviye'
}