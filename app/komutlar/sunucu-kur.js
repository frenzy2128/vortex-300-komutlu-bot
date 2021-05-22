const Discord = require('discord.js');
const db = require('quick.db');
const {stripIndents} = require('common-tags');

exports.run = async (client, message, args) => {
  var p24 = client.ws.ping
  try {
	const embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasını onaylıyor musunuz?')
	.setFooter('10 saniye içinde "evet" yazarsanız onaylamış olursunuz. 10 saniye içinde yazmazsanız işlem iptal edilir')
	message.channel.send({embed: embed})
	 message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.guild.channels.cache.forEach((kanal) => {
          	kanal.delete()
          })
           setTimeout(() => {
          message.guild.roles.cache.forEach((rol) => {
          	rol.delete()
          })
      }, 5000)
     
     const embedd = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasını onayladınız! Sunucu kuruluyor bu işlem biraz zaman alabilir.')
	message.author.send({embed: embedd})

    let every = message.guild.roles.cache.find(r => r.name === '@everyone')

    //Kategoriler
    message.guild.channels.create('Bilgilendirme', 'category').then(bilgi => {
    message.guild.channels.create('Toplum', 'category').then(toplum => {
    message.guild.channels.create('Kayıtlar', 'category').then(kayitlar => {
    message.guild.channels.create('Sesli Kanallar', 'category').then(sesli => {

    //Kanallar
    setTimeout(() => {
    	message.guild.channels.create('kurallar', 'text').then(kurallar => {
    	kurallar.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
    	kurallar.setParent(bilgi.id)
    	kurallar.send(stripIndents`
    	\`\`\`md
> Kurallar
1. Küfür etmek, hakaretlerde bulunmak yasaktır!
2. Reklam yapmak, link atmak sunucu içersin de de, sunucudaki bir üyeye özelden mesaj olarak ta kesinlikle yasaktır!
3. #komutlar kanalı dışında bir kanalda komut kullanmak yasaktır!
4. Sesli kanallarda bas açmak vb. hareketler yapmak yasaktır!
5. Din, dil, ırk ayrımı yapmak yasaktır!
6. Siyaset hakkında tartışmak, konuşmak yasaktır!
7. Spam ve flood yapmak yasaktır!
8. Uygunsuz davranışlarda bulunmak, uygunsuz paylaşımlar yapmak yasaktır!
9. Yetkilileri sebesiz, saçma sebepler yüzünden rahatsız etmek yasaktır!
- Kuralları okumamak kesinlikle yasaktır!

> Üyelerin bu kanalda konuşmaları yasaklanmıştır.
\`\`\`
    	`)
    	kurallar.send(stripIndents`
    		\`\`\`md
[NOT]: Sunucudaki her üye *yetkili dahil* kuralları okumuş olarak kabul edilir. Buradaki maddelere herhangi bir karşı gelme olayı olduğu an "bilmiyordum, okumamıştım" gibi bahanelerin *hiç biri* umursanmaz ve gerekli işlem yapılır!
\`\`\`
    	`)
    })
    	message.guild.channels.create('duyurular', 'text').then(duyurular => {
         duyurular.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Burası duyurular. Burda önemli bilgiler verilir.
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.


- ${client.user.username} -
\`\`\`
    	`)
    
    	duyurular.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
    	duyurular.setParent(bilgi.id)
    })
    	message.guild.channels.create('sohbet', 'text').then(sohbet => {
    	sohbet.setParent(toplum.id)
         sohbet.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Burası sohbet. Burdan arkadaşlarınla vb sohbet etmek için kuruldu. Uygunsuz konuşmalara izinli değildir.



- ${client.user.username} -
\`\`\`
    	`)
    })
     message.guild.channels.create('destek', 'text').then(destek => {
    	destek.setParent(toplum.id)
    	destek.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal destek sistemi kanalıdır! Buraya bir mesaj yazıldığında otomatik olarak bir Destek Talebi açılır ve yetkililerimiz açılan talep kanalında size yardımcı olurlar. 

[Uyarı!]: Gereksiz yere kullanmak yasaktır!

- ${client.user.username} Gelişmiş Destek Sistemi -
\`\`\`
    	`)
    	db.set(`destekK_${message.guild.id}`, destek.id)
    })
    }, 5000)

    setTimeout(() => {
    	message.guild.channels.create('komut-kullanım', 'text').then(komutlar => {
           komutlar.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Burası komutlar odası. !!yardım yazarak Vortex'in komutlarını görebilirsiniz.



- ${client.user.username} -
\`\`\`
    	`)
           	db.set(`ktr_${message.guild.id}`, komutlar.id)
    	komutlar.setParent(toplum.id)
    })
      
    }, 5000)

    setTimeout(() => {
    	message.guild.channels.create('gelen-giden', 'text').then(gc => {
    	gc.setParent(kayitlar.id)
    	gc.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
         gc.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen üyeleri yazılı bir şekilde karşılar. 
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.


- ${client.user.username} Gelişmiş Gelen-Giden Sistemi -
\`\`\`
    