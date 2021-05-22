const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');

exports.run = async (client, message, args) => {
  




  this.fighting = new Set();
  
        let opponent = message.mentions.users.first()
        if (!opponent) return message.reply("<:ak:617145990742278144> Oynamak istediğin kişiyi etiketlemelisiniz.")
  
  if (opponent.bot) return message.reply('<:ak:617145990742278144> Botlar ile düello yapamazsın dostum.');
  if (opponent.id === message.author.id) return message.reply('<:ak:617145990742278144> Kendin ile düello atamazsın dostum.');
                if (this.fighting.has(message.channel.id)) return message.reply('Kanal sayısına göre savaş yapabilirsin.');
                this.fighting.add(message.channel.id);
                try {
                        if (!opponent.bot) {
                await message.channel.send(`${opponent}, düello isteği geldi. Düello'yu kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
                                const verification = await verify(message.channel, opponent);
                                if (!verification) {
                                        this.fighting.delete(message.channel.id);
                                        return message.channel.send(`<:ak:617145990742278144> Düello kabul edilmedi...`);
                                }
                        }
                        let userHP = 500;
                        let oppoHP = 500;
                        let userTurn = false;
                        let guard = false;
                        const reset = (changeGuard = true) => {
                                userTurn = !userTurn;
                                if (changeGuard && guard) guard = false;
                        };
                        const dealDamage = damage => {
                                if (userTurn) oppoHP -= damage;
                                else userHP -= damage;
                        };
                        const forfeit = () => {
                                if (userTurn) userHP = 0;
                                else oppoHP = 0;
                        };
                        while (userHP > 0 && oppoHP > 0) { // eslint-disable-line no-unmodified-loop-condition
                                const user = userTurn ? message.author : opponent;
                                let choice;
                                if (!opponent.bot || (opponent.bot && userTurn)) {
                                        await message.channel.send(stripIndents`
                                                ${user}, ne yapmak istersin? \`saldır\`, \`savun\`, \`ultra güç\`, veya \`kaç\`?
                                                **${message.author.username}**: ${userHP} :heartpulse:
                                                **${opponent.username}**: ${oppoHP} :heartpulse:
                                        `);
                                        const filter = res =>
                                                res.author.id === user.id && ['saldır', 'savun', 'ultra güç', 'kaç'].includes(res.content.toLowerCase());
                                        const turn = await message.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 30000
                                        });
                                        if (!turn.size) {
                                                await message.reply(`Üzgünüm ama, süre doldu!`);
                                                reset();
                                                continue;
                                        }
                                        choice = turn.first().content.toLowerCase();
                                } else {
                                        const choices = ['saldır', 'savun', 'ultra güç'];
                                        choice = choices[Math.floor(Math.random() * choices.length)];
                                }
                                if (choice === 'saldır') {
                                        const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
                                        await message.channel.send(`${user}, **${damage}** hasar vurdu!`);
                                        dealDamage(damage);
                                        reset();
                                } else if (choice === 'savun') {
                                        await message.channel.send(`${user}, kendisini süper kalkan ile savundu!`);
                                        guard = true;
                                        reset(false);
                                } else if (choice === 'ultra güç') {
                                        const miss = Math.floor(Math.random() * 4);
                            