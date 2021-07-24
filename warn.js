const Discord = require('discord.js');
const mongoose = require('mongoose')
const mongo = require("../mongo")
const warnSchema = require('../schema/warnSchema');
const Fs = require('fs')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return;
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('you did not mention a user for me to punish!')
//new stuff
    function joemama(length) {
        var result           = '';
        var characters       = '_-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
    
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
      }
    
      var punishmentID = joemama(20);
      var punishmentIDE = [`${punishmentID}`]

 //end of new stuff     
    var member;
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
    if(!member) return msg.reply('the user that you mentoined is not currently in the server!');
//new stuff


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  


    const guildID = msg.guild.id
    const userID = user.id
    const authorID = msg.author.id
    const today = new Date()
    const time = (today.getMonth() + 1) + '-' + today.getDate() + "-" + today.getFullYear() + " at " + formatAMPM(new Date)
//end of new stuff

    const reason = args.splice(1).join(' ');
  if(reason.length > 100) {
      return msg.reply('stop tryna crash me')
  }
    const warningInfoObject = {
        authorID: authorID,
        time: time,
        reason: reason,
        punishmentID: punishmentID,
    }

    if(!reason) return msg.reply('you forgot to include a reason!');
    if(msg.author.id === user.id) return msg.reply('you cannot warn yourself!')
    
    var warnEmbed = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${user} has been succesfully warned by ${msg.author}!`)
    .setFooter('This message will auto delete after 5 seconds!')
    var sendEmbed = await msg.channel.send(warnEmbed);
    msg.delete();

    setTimeout(() => {
        sendEmbed.delete()
    }, 5000);
    //new stuff
const logChannel = msg.guild.channels.cache.find(c => c.name === "logs")
const logEm = new Discord.MessageEmbed()
.setColor('RED')
.setTitle(`A Member Was Warned`)
.setDescription(`Warning Information:`)
.addField(`Time:`, `**${time}**`)
.addField(`User Warned:`, `<@${userID}> **|** \`${userID}\``)
.addField(`Warn Author:`, `<@${authorID}> **|** \`${authorID}\``)
.addField(`Reason:`, `\`${reason}\``)
.addField(`Punishment ID:`, `\`${punishmentID}\``)
logChannel.send(logEm)

    //end of new stuff

    //new stuff with db
  

    await mongo().then(async (mongoose) => {
        try {
          
       
           
          const warnData = {
                guildID,
                userID,
                punishmentIDE: punishmentIDE,

                warningInfo: warningInfoObject,
  
        
            }
            await new warnSchema(warnData).save()


         
        } finally {
            mongoose.connection.close()
        }
   })
    //end of new stuff with db
    var embed = new Discord.MessageEmbed()
    .setColor('0xff3030')
    .setTitle('You were warned by **Sub To Joey**!')
    .setDescription('Server: **The Infamous Test Server**')
    .addField('Reason:' , reason)
    .setThumbnail('https://media.discordapp.net/attachments/787808981166587937/805164682825957406/TestBotLogo.png?width=608&height=612');

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }


}
