const Discord = require('discord.js');
require("../../inlinereply");
const ayarlar = require('../../ayarlar.json');
exports.run = async(client, message, args) => {
  var guild = message.guild;
  var banlayan = message.author;
  let banxx = await message.guild.fetchBans();
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.inlineReply('Kullanıcıyı Banlayamıyorum Çünkü `Üyeleri Yasakla` Yetkim Yok.').then(msg => msg.delete({timeout: 5000}));
  if (!message.member.roles.cache.has("835508731662958622"))
  return message.inlineReply(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanmak için <@&835508731662958622> rolüne sahip olmalısın!`)).then(msg => msg.delete({timeout: 5000}));
 
  var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  if(!kisi) return message.inlineReply("<:antarticaemoji:836010813793239040> • Banlayacağım kişiyi belirtmen gerekiyor `ID / @kullanici / username`").then(msg => msg.delete({timeout: 5000}));
 var sebeb = args.slice(1).join(" ");


    if(message.author == kisi) return message.inlineReply("<:antarticaemoji:836010813793239040> • Kendini banlayamazsın kafan mı iyi!").then(msg => msg.delete({timeout: 5000}));
    if (banxx.get(kisi.id)) return message.inlineReply("<:antarticaemoji:836010813793239040> • Kişi zaten banlanmış!").then(msg => msg.delete({timeout: 5000}));

 var now = new Date()
 if (!sebeb) {
         try {
          message.guild.channels.cache.get("835911300655480933").send(
            new Discord.MessageEmbed()
            .setThumbnail(message.author.avatarURL())
            .setColor(0x00ae86)
            .setTitle("İşlem: Ban")
            .setTimestamp()
            .addField("**Banlanan Kişi:**", kisi)
            .addField("**Yetkili:**", banlayan)
            .addField("**Sebep:**", "Sebep belirtilmemiş")
            .setFooter(`© ${ayarlar.sunucuadı} Ban Sistemi`, client.user.avatarURL())
          );
          guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
        } catch (error) {
          message.inlineReply("Bir Sorun Oldu Lütfen Botun Geliştiricisi veya Yapımcısıyla İletişime Geçiniz!").then(msg => msg.delete({timeout: 5000}));
          console.log(error)
        }
 } else {
 try {
   message.guild.channels.cache.get("835911300655480933").send(
    new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(0x00ae86)
    .setTitle("İşlem: Ban")
    .setTimestamp()
    .addField("**Banlanan Kişi:**", kisi)
    .addField("**Yetkili:**", banlayan)
    .addField("**Sebep:**", sebeb)
    .setFooter(`© ${ayarlar.sunucuadı} Ban Sistemi`, client.user.avatarURL())
  );
   guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
 } catch (error) {
   message.inlineReply("Bir Sorun Oldu Lütfen Botun Geliştiricisi veya Yapımcısıyla İletişime Geçiniz!").then(msg => msg.delete({timeout: 5000}));
   console.log(error)
 }

 }
};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Botun Pingini Gösterir !',
  usage: 'ban'
};