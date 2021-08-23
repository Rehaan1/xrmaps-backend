const mongose = require('mongoose')

const Schema = mongose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

const User = mongose.model('user', userSchema)
module.exports = User