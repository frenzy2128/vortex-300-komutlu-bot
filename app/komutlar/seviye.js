const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");

const ark = ["renk", "color"]
const arm = ["resim", "image"]
const reset = ['sıfırla', 'reset']
const saydam = ['saydamlaştır', 'saydam']
const award = ['ödül', 'ödüller', 'award', 'reward', 'prize']

exports.run = async (client, msg, args) => {
    
    if (db.has(`lvl2_${msg.author.id}`) === true) {
  if (db.has(`lvll_${msg.guild.id}`) === true) {
    	
        if(ark.includes(args[0])) {
    if(reset.includes(args[1])) {
                        if(!db.has(`${msg.author.id}.renk`)) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription("Renk değiştirilmemiş neyi sıfırlayacaksın!")
                                        .setColor("RANDOM")
                                msg.channel.send({embed})
                                return
                        }
                        db.delete(`${msg.author.id}.renk`)
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Renk başarıyla sıfırlandı!")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
                if(!args[1]) {
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Bir renk kodu veya `sıfırla` yazmalısın!")
      .setFooter("Başına # koymayınız!")
                               .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
                if(args[1].length !== 6) {
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Renk kodları 6 hane olur!")
      .setFooter("Başına # koymayınız!")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
                        
                db.set(`${msg.author.id}.renk`, `#${args[1]}`)
    
    var Canvas = require('canvas')
                var canvas = Canvas.createCanvas(150, 150)
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = `#${args[1]}`;
                ctx.fill()
                ctx.fillRect(0, 0, 150, 150)
                const embed = new Discord.MessageEmbed()
                        .setAuthor("Ayarlanan Renk: #{renk}".replace("{renk}", args[1].toUpperCase()))
                        .setImage(`attachment://renk.png`)
                        .setColor("RANDOM")
                msg.channel.send({embed, files:[{attachment:canvas.toBuffer(),name:"renk.png"}]})
                return
        }
        if(arm.includes(args[0])) {
                if(reset.includes(args[1])) {
                        if(!db.has(`${msg.author.id}.resim`)) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription("Ayarlı bir resim yok neyi sıfırlayacaksın!")
                                        .setColor("RANDOM")
                                msg.channel.send({embed})
                                return
                        }
                        db.delete(`${msg.author.id}.resim`)
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Resim başarıyla sıfırlandı!")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
                if(!args[1]) {
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Ayarlamak istediğiniz resmin linkini veya `sıfırla` yazınız!")
      .setFooter("NOT: Resim linki http veya https ile başlamalı!")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
                if(!args[1].startsWith('http')) {
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Resim linki http veya https ile başlamalı!")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }

                db.set(`${msg.author.id}.resim`, args[1])
                const embed = new Discord.MessageEmbed()
                        .setAuthor("Resim başarıyla ayarlandı!")
                        .setImage(args[1])
                        .setColor("RANDOM")
                msg.channel.send({embed})
                return
        }
  
  if (award.includes(args[0])) {
    
    if (!msg.member.hasPermission("MANAGE_ROLES")) {
      const embed = new Discord.R