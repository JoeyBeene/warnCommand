
const mongoose = require('mongoose')


const requiredString = {
    type: String,
    required: true
}


const warnSchema = mongoose.Schema({
   
    guildID: requiredString, 
    userID: requiredString,
    punishmentIDE: [String],

    warningInfo: {
        type: [Object],
        require: true

    },
})

module.exports = mongoose.model('testBotWarnings' , warnSchema)
