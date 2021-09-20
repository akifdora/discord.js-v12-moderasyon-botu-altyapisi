const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has('835340358866042920')){
        const cmfhata = new Discord.MessageEmbed()
        .setDescription(`<:antarticaemoji:836010813793239040> • Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)
        .setColor('#ff0000')
        return message.inlineReply(cmfhata).then(msg => msg.delete({timeout: 5000}));
    }

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let tag = 'ᛦ'
  let kız = "835227731108561026";
  let erkek = "835227731108561025";
  let kayıtsız = "835227731267944596";
  let confirmRooms = "835227732010598510" // Teyit odaları kategori ID
let publicRooms = "835227736431525975" // Public odaları kategori ID
let privRooms = "835227739149303829" // Priv odaları kategori ID


let Voice = message.guild.members.cache.filter(t => t.voice.channel).size;
let Confirm = message.guild.members.cache.filter(c => c.voice.channel && c.voice.channel.parentID === confirmRooms).size;
let Public = message.guild.members.cache.filter(c => c.voice.channel && c.voice.channel.parentID === publicRooms).size;
let Priv = message.guild.members.cache.filter(c => c.voice.channel && c.voice.channel.parentID === privRooms).size;
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
    	.setTitle(`Üye Sayma Sistemi`)
		.setDescription(`🌍 Sunucudaki toplam üye sayısı: **${message.guild.memberCount}**
        
        📞 Sunucudaki <@&${kayıtsız}> sayısı: **${message.guild.members.cache.filter(m => m.roles.cache.has(kayıtsız)).size}**

        👩 Sunucudaki <@&${kız}> sayısı: **${message.guild.members.cache.filter(m => m.roles.cache.has(kız)).size}**

        👨 Sunucudaki <@&${erkek}> sayısı: **${message.guild.members.cache.filter(m => m.roles.cache.has(erkek)).size}**
		
		✅ Çevrimiçi üye sayısı: **${message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}**

		🔊 Seslideki üye sayısı: **${Voice}**

        🔑 Teyit odalarındaki üye sayısı: **${Confirm}**

        🔓 Private odalardaki üye sayısı: **${Public}**

        🔒 Private odalardaki üye sayısı: **${Priv}**

		\` ᛦ \` Tagdaki üye sayısı: **${message.guild.members.cache.filter(m => m.user.username.includes(tag)).size}**`)
		.setFooter(`${ayarlar.sunucuadı} • Üye Sayma Sistemi`, client.user.avatarURL())
        .setTimestamp()
    message.inlineReply(embed).then(msg => msg.delete({timeout: 10000}));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['üyeler', 'say'],
    permLevel: 0
}

exports.help = {
    name: 'üyerapor',
    description: 'üyerapor',
    usage: "üyerapor"
};