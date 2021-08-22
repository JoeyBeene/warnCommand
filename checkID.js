const mongo = require('../mongo')
const Discord = require('discord.js')
const warnSchema = require('../schema/warnSchema')
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("you do not have permission to use this command!")
    const punishmentID = args[0]
    if(!punishmentID) {
        return msg.reply('please specify a punishment ID')
    }

    await mongo().then(async (mongoose) => {
     
         try{
        const results = await warnSchema.findOne({
            punishmentIDE: [`${args[0]}`]
        })
    
        if(results == null) {
           return msg.channel.send("That is not a valid ID!")
        }


        
         const { warningInfo } = results

        const member = msg.guild.members.cache.get(results.userID)
        
       


    
      var authorID = warningInfo[0]["authorID"]
      var time = warningInfo[0]["time"]
      var reason = warningInfo[0]["reason"]
        var userID = results.userID
       
            

            const embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`Warning Info For ID: \`${punishmentID}\``)
            .setDescription(`**Warn author:** <@${authorID}>\n\n**Member warned:** <@${userID}>\n\n**Time:** \`${time}\`\n\n **Reason for warn:** \`${reason}\`\n\n\n`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 2048}))
            msg.channel.send(embed)
           
        
    }finally {
        mongoose.connection.close()
    }
})
    
}



