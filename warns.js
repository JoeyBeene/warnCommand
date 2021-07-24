
const mongo = require('../mongo')
const Discord = require('discord.js')
const Fs = require('fs')
const warningsSchema = require('../schema/warnSchema')

exports.run = async(client, msg, args) => {
  const guilde = client.guilds.cache.find(g => g.name === 'The Infamous Test Server')
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
      var target = msg.member
        if(msg.mentions.users.first() || args[0]) {
          return msg.reply("You do not have permission to view the warnings of other users!")
        }
        var member;
    try {
            member = await msg.guild.members.fetch(target);
        } catch(err) {
            member = null;
        }
        var infoEm = guilde.emojis.cache.find(emoji => emoji.name === 'info');
        var guildID = msg.guild.id
       
       var userID = target.id
  member = msg.guild.members.cache.get(userID)
       
   
        
        await mongo().then(async (mongoose) => {
      
            var results = await warningsSchema.find({
             guildID: guildID,
            userID: userID,
            })
     
         var Array2 = []
        
            var num = results.length + 1
        for(let i = 1; i < num; i++) {
            
            Array2.push({
                reason: results[i - 1]["warningInfo"][0]["reason"],
                authorID: results[i - 1]["warningInfo"][0]["authorID"],
                time: results[i - 1]["warningInfo"][0]["time"],
                punishmentID: results[i - 1]["warningInfo"][0]["punishmentID"],
            })
        }
     
    
    
              
           
            let reply = `${infoEm} Tip: Use the \`clearwarn\` command to clear all warnings for a user!\n\n`
            
        for (const warningObject of Array2) {
              const { authorID, time, reason, punishmentID } = warningObject
              
              reply += `**Warn author:** Undisclosed Information Due To Lack Of Permission: \`"MANAGE_MESSAGES"\`\n\n**Time:** **${time}**\n\n **Reason for warn:** \`${reason}\`\n\n**Punishment ID:** \`${punishmentID}\`\n\n\n`
    
              var warne = new Discord.MessageEmbed()
            .setColor('0x05ff4c')
            .setTitle(`All Warning Information For ${member.user.tag}:`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setDescription(`${reply}`)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp();
      }
            msg.channel.send(warne).catch(error => {
                if(error.code == 50006) {
                    msg.channel.send("You do not have any current warnings.")
                }
            })
        
    
    
            
        
        
    
      })
    }
  if(msg.member.hasPermission('MANAGE_MESSAGES')) {

    var target = msg.guild.members.cache.get(args[0])
    if (!target) {
      target = msg.member
    }
    var member;
try {
        member = await msg.guild.members.fetch(target);
    } catch(err) {
        member = null;
    }
    var infoEm = guilde.emojis.cache.find(emoji => emoji.name === 'info');
    var guildID = msg.guild.id
    var mentione = msg.mentions.users.first()
    var mention = mentione ? mentione.id : msg.author.id
   var userID = mention ? mention : args[0]
   member = msg.guild.members.cache.get(userID)
  
   if(!msg.guild.member(userID)) {
     return msg.reply("please specify a valid user mention or ID!")
   }
    
    await mongo().then(async (mongoose) => {
      try {
        var results = await warningsSchema.find({
         guildID: guildID,
        userID: userID,
        })
 
     var Array2 = []
    
        var num = results.length + 1
    for(let i = 1; i < num; i++) {
        
        Array2.push({
            reason: results[i - 1]["warningInfo"][0]["reason"],
            authorID: results[i - 1]["warningInfo"][0]["authorID"],
            time: results[i - 1]["warningInfo"][0]["time"],
            punishmentID: results[i - 1]["warningInfo"][0]["punishmentID"],
        })
    }
 


          
       
        let reply = `${infoEm} Tip: Use the \`clearwarn\` command to clear all warnings for a user!\n\n`
        
      for (const warningObject of Array2) {
          const { authorID, time, reason, punishmentID } = warningObject
          
          reply += `**Warn author:** <@${authorID}>\n\n**Time:** **${time}**\n\n **Reason for warn:** \`${reason}\`\n\n**Punishment ID:** \`${punishmentID}\`\n\n\n`

          var warne = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`All Warning Information For ${member.user.tag}:`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${reply}`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp();
  }
        msg.channel.send(warne).catch(error => {
            if(error.code == 50006) {
                msg.channel.send("This user does not have any current warnings.")
            }
        })
      


        
      } finally {
        mongoose.connection.close()
      }
    

  })
}
}
