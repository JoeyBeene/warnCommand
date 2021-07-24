const mongoose = require('mongoose')
const mongo = require('../mongo')
const Discord = require('discord.js')
const Fs = require('fs')

const warnSchema = require('../schema/warnSchema.js')

exports.run = async(client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("you do not have permission to use this command!")
  if(msg.member.hasPermission('MANAGE_MESSAGES') && !msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('even though you are a moderator, you still do not have the required permissions to run this command! Only administrators of the server have permission to use it!')
 
 

   const punishmentID = args[0]
   if(!punishmentID) return msg.reply("please specify a valid punishment ID for me to clear!")

    await mongo().then(async (mongoose) => {
        try {
            try{
            await warnSchema.deleteMany({
               punishmentIDE: [`${punishmentID}`]
              })
              msg.channel.send(`Any warnings with the punishment ID: ${punishmentID} have been succesfully cleared!`)
           


            } catch(err) {
                console.log(err)
                msg.channel.send(`A warning with that punishment ID was not found in the database! Please double check to see that you have the correct one!`)
            }
try{
  var authore = msg.member
 
  
    const channele = msg.guild.channels.cache.find(c => c.id === `802725920313311262`)
   
    var log = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle('A Member\'s Warnings Were Cleared! Logging Info:')
    .addField(`Punishment ID` , `${punishmentID}`)
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
