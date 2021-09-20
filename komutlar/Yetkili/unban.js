const { MessageEmbed } = require('discord.js');
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has("835508731662958622"))
    return message.inlineReply(new Discord.MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanmak için <@&835508731662958622> rolüne sahip olmalısın!`)).then(msg => msg.delete({timeout: 5000}));
    let user = args[0];
    const banList = await message.guild.fetchBans();
    if (!user || isNaN(user) || !banList.has(user)) {
        return message.channel.send(new MessageEmbed().setDescription(`<:antarticaemoji:836010813793239040> • Kullanıcı id hatalı veya kullanıcı yasaklı değil!`)).then(msg => msg.delete({timeout: 5000}));
    }
    message.guild.members.unban(user);
    message.channel.send(new MessageEmbed().setDescription(`:white_check_mark: Başarılı!`)).then(msg => msg.delete({timeout: 5000}));
};

exports.conf = {
    aliases: ["un-ban"]
};

exports.help = {
    name: 'unban'
};