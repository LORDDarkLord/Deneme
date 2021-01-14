const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('ready', () => {
  console.log(`Botun Olan ${client.user.tag} Sunucuya Giriş Yaptı!`);
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bye') {
    msg.reply('Görüşürüz Kendine İyi Bak');
  }
  if (msg.content.toLowerCase() === 'byee') {
    msg.reply('Görüşürüz Kendine İyi Bak');
  }
  if (msg.content.toLowerCase() === 'by') {
    msg.reply('Görüşürüz Kendine İyi Bak');
  }
  if (msg.content.toLowerCase() === 'bb') {
    msg.reply('Görüşürüz Kendine İyi Bak');
  }
if (msg.content.toLowerCase() === prefix + 'sahip' ) {
  msg.reply('LRD|DarkLord#3360')
 }
if (msg.content.toLowerCase() === prefix + 'kuruluş' ) {
  msg.reply('1 Ocak 2021')
 }
 if (msg.content.toLowerCase() === prefix + 'tarih' ) {
   msg.reply('13 Ocak 2021 Çarşamba')
 }
 if (msg.content.toLowerCase() === 'sa') {
   msg.reply('Aleykümselam Hoşgeldin');
 }
 if (msg.content.toLowerCase() === 'Selamun Aleyküm') {
   msg.reply('Aleykümselam Hoşgeldin');
 }
 if (msg.content.toLowerCase() === 'SelamunAleyküm') {
   msg.reply('Aleykümselam Hoşgeldin');
 }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));

});
module.exports = {
    emojis: {
        off: ':x:',
        error: ':warning:',
        queue: ':bar_chart:',
        music: ':musical_note:',
        success: ':white_check_mark:',
    },

    discord: {
        token: 'Nzk0NTUxMDM2NjE4MjExMzM4.X-8dUQ.Lrr-2BExRZbdYtq2leM1Te-spCA',
        prefix: 'h.',
        activity: 'HerusBot | Eğlenceli Türkçe Bot',



    },

    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
};
client.login(ayarlar.token);
