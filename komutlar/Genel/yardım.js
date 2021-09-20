const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
exports.run = (client, message, args) => {
message.delete();
  let pages = [
              `**Genel Komutlar**\n\n  \`${ayarlar.prefix}afk (sebep)\`: Sebebi ile birlikte AFK olmanızı sağlar. \n \`${ayarlar.prefix}avatar @etiket\`: Kendinizin veya istediğiniz kişinin avatarını büyütür. \n \`${ayarlar.prefix}profil @etiket\`: Kendinizin veya istediğiniz kişinin profil bilgilerini gösterir. \n \`${ayarlar.prefix}davet\`: Sunucunun ana davet linkini gösterir. \n  \`${ayarlar.prefix}ping\`: Botun anlık gecikme süresini gösterir. \n \`${ayarlar.prefix}yardım\`: Yardım bölümünü açar. \n \`${ayarlar.prefix}git @etiket\`: Etiketlediğiniz kişi sesteyse onun yanına gitmek istediğinizi bildirirsiniz kişi kabul ederse o ses odasına gidersiniz. \n \`${ayarlar.prefix}çek @etiket\`: Etiketlediğiniz kişi sesteyse onu yanınıza davet etmek istediğinizi bildirirsiniz kişi kabul ederse bulunduğunuz ses odasına gelir. \n \`${ayarlar.prefix}level @etiket\`: Sizin veya etiketlediğiniz kişinin level kartını gösterir.`,
              `**Moderasyon Komutları**\n\n \`${ayarlar.prefix}ban (ID / @etiket) (sebep)\`: Kişiyi banlar. \n \`${ayarlar.prefix}unban (ID / @etiket) (sebep)\`: Kişinin banını kaldırır. \n \`${ayarlar.prefix}mute @etiket (1s/1m/1h/1d) (sebep)\`: Belirlediğiniz kişiye belirlediğiniz süre boyunca Chat Mute atar.\n  \`${ayarlar.prefix}unmute @etiket\`: Chat Muteli olan kişinin mutesini kaldırır.\n  \`${ayarlar.prefix}vmute @etiket (1s/1m/1h/1d) (sebep)\`: Belirlediğiniz kişiye belirlediğiniz süre boyunca Voice Mute atar.\n  \`${ayarlar.prefix}unvmute @etiket\`: Voice Muteli olan kişinin mutesini kaldırır.\n \`${ayarlar.prefix}dccezalı @kişi\`: Etiketlenen kişiye <@&835227731032670223> rolü verir.\n \`${ayarlar.prefix}streamcezalı @kişi\`: Etiketlenen kişiye <@&836103565750697994> rolü verir.\n \`${ayarlar.prefix}vkcezalı @kişi\`: Etiketlenen kişiye <@&835227731066093597> rolü verir.\n \`${ayarlar.prefix}yetkili @kişi\`: Etiketlenen kişiye <@&835227731267944595> rolü verir.\n \`${ayarlar.prefix}yetkilibilgi @kişi\`: Etiketlenen yetkilinin ne zaman yetki aldığını gösterir. \n \`${ayarlar.prefix}e @kişi (isim) (yaş)\`: Kişiye <@&835227731108561025> rolü verir, yazılan isim ve yaşla kaydeder. \n \`${ayarlar.prefix}k @kişi (isim) (yaş)\`: Kişiye <@&835227731108561026> rolü verir, yazılan isim ve yaşla kaydeder. \n  \`${ayarlar.prefix}sil (mesaj sayısı)\`: Yazdığınız sayı kadar mesajı siler.  \n \`${ayarlar.prefix}kilit\`: Belirlediğiniz kanalı kilitler veya kilidi açar.\n \`${ayarlar.prefix}yavaşmod [0-100]\`: Bu komutu yazdığınız kanalda belirlediğiniz saniyede yavaş modu aktif hale getirir.`,
              ];
  let page = 1;
 
  const embed = new Discord.MessageEmbed()
    .setColor('#00FF00')
    .setTitle(':information_source: Yardım Bölümü')
    .setThumbnail("https://s3.gifyu.com/images/Logodd5bd5976845c883.gif")
    .setFooter(`⬅ : Önceki Sayfa | ➡ : Sonraki Sayfa | ❌ : Pencereyi Kapat \n Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {
 
  msg.react('⬅')
  .then(r => {
    msg.react('➡')
      msg.react('❌')
 
      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
      const closeFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
      const close = msg.createReactionCollector(closeFilter, { time: 100000 });
 
      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setTitle(':information_source: Yardım Bölümü')
        embed.setDescription(pages[page-1]);
        embed.setColor('#00FF00')
        embed.setFooter(`⬅ : Önceki Sayfa | ➡ : Sonraki Sayfa | ❌ : Pencereyi Kapat \n Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setColor('#00FF00')
        embed.setTitle(':information_source: Yardım Bölümü')
        embed.setDescription(pages[page-1]);
        embed.setFooter(`⬅ : Önceki Sayfa | ➡ : Sonraki Sayfa | ❌ : Pencereyi Kapat \n Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      close.on('collect', r => {
        msg.delete(embed)
      })
 
    })
  })
};
 
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["help", "y", "h"],
permLevel: 0
};
 
exports.help = {
name: 'yardım',
description: 'Yardım Listesini Gösterir',
usage: 'yardım'
};