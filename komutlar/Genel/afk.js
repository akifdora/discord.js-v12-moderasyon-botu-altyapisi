const Discord = require("discord.js");
const ayarlar = require('../../ayarlar.json');
const db = require("quick.db");
require("../../inlinereply");
exports.run = async (client, message, args) => {
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;
  const sebep = args[0];
  if (!args[0]) {
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;

    await db.set(
      `afkSebep_${message.author.id}_${message.guild.id}`,
      "Sebep girilmemiş o_O"
    );
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);

    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    const bafk = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor("GREEN")
    .setDescription(`Başarıyla AFK oldun, a-ama özlettirme kendini, t-tamam mı :')`)
    .addField(`Sebep:`,`${a}`)
    .setThumbnail("https://s3.gifyu.com/images/Logodd5bd5976845c883.gif")

    message.inlineReply(bafk).then(msg => msg.delete({timeout: 5000}));
    if(message.author.id !== "779226623505334283"){
      message.member.setNickname(`[AFK] ` + b);
      return;
    } 
    
  }
  if (args[0]) {
    let sebep = args.join(" ");
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);
    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    const bafk2 = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor("GREEN")
    .setDescription(`Başarıyla AFK oldun, a-ama özlettirme kendini, t-tamam mı :')`)
    .addField(`Sebep:`,`${a}`)
    .setThumbnail("https://s3.gifyu.com/images/Logodd5bd5976845c883.gif")

    message.inlineReply(bafk2).then(msg => msg.delete({timeout: 5000}));

    if(message.author.id !== "779226623505334283"){
      message.member.setNickname(`[AFK] ` + b);
      return;
    } 
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk "
};