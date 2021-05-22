const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

  const db = require('quick.db');
  

    
  if (!message.guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply('Gerekli izin yok')
  //if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  //let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (db.has(`log_${message.guild.id}`) === false) return message.reply('Mod log kanalı ayarlanmamış');
  let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.cache.size < 1) return message.reply('Lütfen banlamak istediğiniz üyeyi etiketleyin');
  if (reason.length < 1) return message.reply('Lütfen sebep giriniz');
  if (user.id === message.author.id) return message.reply('Kendinimi banlayacaksın?');
  /*if (user.roles.highest.position > message.member.roles.highest.position - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  //if (!message.guild.member(user).members.bannable) return message.channel.send(`Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('İşlem', 'Ban')
  .addField('Banlanan üye', `${user.tag} (${user.id})`)
  .addField('Banlayan yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Ban sebebi', "```" + reason + "```")
  modlog.send(embed);
  user.send(`\`${message.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız\nYetkilinin girdiği sebep: \`${reason}\``)
  
   //if (!message.guild.member(user).members.bannable) return message.reply('Yetkilileri yasaklayamam!');
  message.guild.members.ban(user, 2);
  
  const embed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`Başarıyla banlandı`)
  message.channel.send(embed2)

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban','yasakla','banla'],
  permLevel: 3,
  kategori: "moderasyon",
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};