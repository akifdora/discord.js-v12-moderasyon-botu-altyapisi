const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix) => {
if(message.author.id !== "534739785172910100" && message.author.id !== "343831230426382336"  ) return message.reply(`Bu komutu sadece Bot Sahibi kullanabilir!`);
    try {
        let codein = args.join(" ");
        let code = eval(codein);

      if (codein.length < 1) return message.reply(`deneyebilmek için bir kod girmelisin!`)

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .addField('» Kod', `\`\`\`js\n${codein}\`\`\``)
        .addField('» Sonuç', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
      let embed2 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .addField('» Hata', "\`\`\`js\n"+e+"\n\`\`\`")
        message.channel.send(embed2);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kod'],
    permLevel: 0
  };

  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval'
  };
