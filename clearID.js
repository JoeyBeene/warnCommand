const mongo = require('../mongo')
const Discord = require('discord.js')


const warnSchema = require('../schema/warnSchema.js')

exports.run = async(client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("you do not have permission to use this command!")
  if(msg.member.hasPermission('MANAGE_MESSAGES') && !msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('even though you are a moderator, you still do not have the required permissions to run this command! Only administrators of the server have permission to use it!')
 
 

   const punishmentID = args[0]
   if(!punishmentID) return msg.reply("please specify a valid punishment ID for me to clear!")

    await mongo().then(async (mongoose) => {
        try {
          const results = await warnSchema.findOne({
             punishmentIDE: [`${punishmentID}`]
           })
           if(results == null) {
            return msg.channel.send(`A warning with that punishment ID was not found in the database! Please double check to see that you have the correct one!`)
           }
            await warnSchema.deleteMany({
               punishmentIDE: [`${punishmentID}`]
              })
              msg.channel.send(`The warning with the punishment ID: ${punishmentID} has been succesfully cleared!`)
           


           
try{
  var authore = msg.member
 
  
    const channele = msg.guild.channels.cache.find(c => c.id === `868990396171173918`)
   
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
