const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../../ayarlar.json');
require("../../inlinereply");

    exports.run = async(client, message, args) => {
        let member = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);

        if(member){
            let erkekkayitsayi = db.fetch(`erkekkayit_${member.id}_${message.guild.id}`)
            let bayankayitsayi = db.fetch(`bayankayit_${member.id}_${message.guild.id}`)
            let toplam = erkekkayitsayi + bayankayitsayi

            const bilgi = new Discord.MessageEmbed()
            .setTitle("🔍 • KAYIT BİLGİSİ")
            .setThumbnail(member.avatarURL({dynamic: true}))
            .setDescription(`${member} (\`${member.id}\`) isimli yetkilinin kayıt bilgileri;`)
            .addFields(
                { name: "**`Erkek Kayıt`**", value: `${erkekkayitsayi || 0} Kullanıcı`, inline: true },
                { name: "**`Kadın Kayıt`**", value: `${bayankayitsayi || 0} Kullanıcı`, inline: true },
                { name: "**`Toplam Kayıt`**", value: `${toplam || 0} Kullanıcı`, inline: true }
            )
            .setColor('RANDOM')
            message.inlineReply(bilgi)
        } else {
            let erkekkayitsayi = db.fetch(`erkekkayit_${message.author.id}_${message.guild.id}`)
            let bayankayitsayi = db.fetch(`bayankayit_${message.author.id}_${message.guild.id}`)
            let toplam = erkekkayitsayi + bayankayitsayi

            const bilgi = new Discord.MessageEmbed()
            .setTitle("🔍 • KAYIT BİLGİSİ")
            .setThumbnail(message.author.avatarURL({dynamic: true}))
            .setDescription(`${message.author} (\`${message.author.id}\`) isimli yetkilinin kayıt bilgileri;`)
            .addFields(
                { name: "**`Erkek Kayıt`**", value: `${erkekkayitsayi || 0} Kullanıcı`, inline: true },
                { name: "**`Kadın Kayıt`**", value: `${bayankayitsayi || 0} Kullanıcı`, inline: true },
                { name: "**`Toplam Kayıt`**", value: `${toplam || 0} Kullanıcı`, inline: true }
            )
            .setColor('RANDOM')
            message.inlineReply(bilgi)
        }

    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Kayıt-bilgi','KAYIT-BİLGİ','kayıtbilgi', 'kb', 'kbilgi'],
    permLevel: 0
}

exports.help = {
    name: 'kayıt-bilgi'
}