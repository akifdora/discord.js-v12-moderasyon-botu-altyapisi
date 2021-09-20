const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../../ayarlar.json');
require("../../inlinereply");

    exports.run = async(client, message, args) => {
        if(!message.member.roles.cache.has('835227731359694913')){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)
            .setColor('#ff0000')
            return message.inlineReply(cmfhata).then(msg => msg.delete({timeout: 5000}));
        }

        // Data
        db.get(`erkekkayit_${message.author.id}_${message.guild.id}`)
        db.add(`erkekkayit_${message.author.id}_${message.guild.id}`, +1)

        // Let tanımlarımız
        let kullanıcı = message.mentions.members.first();
        let isim = args[1];
        let yas = args[2];

        // Hata mesajlarımız
        if(!kullanıcı){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`<:antarticaemoji:836010813793239040> • Lütfen kayıt etmek istediğin kişiyi etiketle!`)
            .setColor('#ff0000')
            return message.inlineReply(cmfhata).then(msg => msg.delete({timeout: 5000}));
        }
        if(!isim){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`<:antarticaemoji:836010813793239040> • Lütfen kayıt etmek istediğin kişinin ismini gir!`)
            .setColor('#ff0000')
            return message.inlineReply(cmfhata).then(msg => msg.delete({timeout: 5000}));
        }
        if(!yas){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`<:antarticaemoji:836010813793239040> • Lütfen kayıt etmek istediğin kişinin yaşını gir!`)
            .setColor('#ff0000')
            return message.inlineReply(cmfhata).then(msg => msg.delete({timeout: 5000}));
        }
        function buyukHarf(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        

        if(kullanıcı && isim && yas){
            kullanıcı.setNickname("ᛦ " + buyukHarf(isim) + " | " + yas)
            kullanıcı.roles.add('835227731108561025')
            kullanıcı.roles.remove('835227731267944596')

            const basarili = new Discord.MessageEmbed()
            .setTitle("<a:antarticaemoji:836011310591508510> • KAYIT BAŞARILI")
            .setThumbnail(message.mentions.users.first().avatarURL({ dynamic: true }))
            .addFields(
                { name: "Kullanıcı", value: kullanıcı, inline: true },
                { name: "Kullanıcı ID", value: `\`${kullanıcı.id}\``, inline: true },
                { name: "Kayıt Edilişi", value: `\`${buyukHarf(isim)} | ${yas}\``, inline: true },
                { name: "Yetkili", value: message.author, inline: true },
                { name: "Yetkili ID", value:`\`${message.author.id}\``, inline: true },
                { name: "Verilen Rol", value: "👨 <@&835227731108561025>", inline: true }
            )
            .setColor('GREEN')
            message.inlineReply(basarili)
        }
    } // CodeMareFi - MareFi |\_/|

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Erkek','ERKEK','e'],
    permLevel: 0
}

exports.help = {
    name: 'erkek'
}