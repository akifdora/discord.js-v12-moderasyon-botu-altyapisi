const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');
require("../../inlinereply");
const ayarlar = require('../../ayarlar.json');

exports.run = (client, message, args) => {// can ♡ b#1010

let mention = client.users.cache.get(args[0]) || message.author
if(message.mentions.members.first()) mention = message.mentions.members.first().user || client.users.cache.get(args[0]) || message.author;
let mentionMember = message.guild.members.cache.get(mention.id) || client.users.cache.get(args[0]) || message.author;

let slm = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar',
  mobile: 'Mobil'
}
let oyunlar = [];
mention.presence.activities.forEach(slm => {
if(slm.type === 'CUSTOM_STATUS') {
oyunlar.push(`${slm.emoji ? slm.emoji : ''} ${slm.state}`);
} else {
oyunlar.push(`**${slm.name}** ${slm.type.replace('PLAYING', 'oynuyor').replace('STREAMING', 'yayınlıyor').replace('LISTENING', 'dinliyor').replace('WATCHING', 'izliyor')}`)
}});

nitroDurum = false;
if(mention.presence.activities[0]) {
if(mention.presence.activities[0].emoji) {
if(mention.presence.activities[0].emoji.animated) nitroDurum = true;
};
};
if(mention.avatarURL().includes('.gif')) nitroDurum = true;

let rozetler = false;
if(mention.flags.toArray().length <= 0) {
rozetler = false;
} else {
rozetler = true;
};

let mentionFlags = mention.flags.toArray().join(' | ')
.replace('HOUSE_BRAVERY', 'Bravery')  
.replace('HOUSE_BRILLIANCE', 'Brilliance')
.replace('HOUSE_BALANCE', 'Balance')
.replace('VERIFIED_DEVELOPER', '1. Dönemde Doğrulanmış Bot Geliştiricisi')
.replace('DISCORD_EMPLOYEE', 'Discord Çalışanı')
.replace('PARTNERED_SERVER_OWNER', 'Discord Partner')
.replace('HYPESQUAD_EVENTS', 'HypeSquad Events')
.replace('BUGHUNTER_LEVEL_1', 'Bug Avcısı 1. Lvl')
.replace('EARLY_SUPPORTER', 'Erken Destekçi')
.replace('TEAM_USER', 'Takım Üyesi')
.replace('SYSTEM', 'Sistem')
.replace('BUGHUNTER_LEVEL_2', 'Bug Avcısı 2. Lvl')
.replace('VERIFIED_BOT', 'Onaylı Bot');
let sa;
if(mention.bot) {
sa = 'Bilinmiyor.'
} else {
sa = slm[Object.keys(mention.presence.clientStatus)[0]];
};
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(mention.tag, mention.avatarURL({dynamic: true}))
.setThumbnail(mention.avatarURL({dynamic: true}))
.addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'), true)
.addField('İstemci Durumu', sa, true)
.addField('Ad', mention.username+` (${mention})`, true)
.addField('Takma Ad', mentionMember.displayName, true)
.addField('Sunucuya Katılım Tarihi', moment(mentionMember.joinedAt).format('D MMMM YYYY'), true)
.addField('Hesap Kurulum Tarihi', moment(mention.createdAt).format('D MMMM YYYY'), true)
.addField('Aktivite', oyunlar.join('\n') ? oyunlar.join('\n') : 'Hiç yok.')
.addField('Roller', mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Hiç yok.')
.addField('Rozetler', `${rozetler ? mentionFlags : 'Hiç yok.'}`)
.addField('Kullanıcı Kimliği', mention.id)
.setFooter(mention.username, mention.avatarURL({dynamic: true}))
.setTimestamp();

message.inlineReply(embed);
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profil', 'kullanıcı'],
  permLevel: 0
};
 
exports.help = {
  name: 'ui'
};