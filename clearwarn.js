const mongoose = require('mongoose')
const mongo = require('../mongo')
const Discord = require('discord.js')

const warnSchema = require('../schema/warnSchema.js')

exports.run = async(client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("you do not have permission to use this command!")
  if(msg.member.hasPermission('MANAGE_MESSAGES') && !msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('even though you are a moderator, you still do not have the required permissions to run this command! Only administrators of the server have permission to use it!')
 
    const target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if (!target) {
      msg.reply('please specify a valid user so that I can clear their warnings.')
      return
    }
   
    const userID = target.id
    const guildID = msg.guild.id

    await mongo().then(async (mongoose) => {
        try {
            await warnSchema.deleteMany({
                guildID: guildID,
                userID: userID,
              })
              msg.channel.send(`<@${userID}>'s warnings have been succesfully cleared!`)
              
try{
  var authore = msg.member
 
  
    const channele = msg.guild.channels.cache.find(c => c.id === `802725920313311262`)
   
    var log = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle('A Member\'s Warnings Were Cleared! Logging Info:')
    .addField(`Member:` , `${target}`)
    .addField(`Moderator/Author:`, `${authore}`)
    .setFooter(`${authore.user.username}`, authore.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

    channele.send(log)
    
} catch(err) {
  console.log(err)
}
              
        } finally {
            mongoose.connection.close()
        }
        
        })
    }
