const mongose = require('mongoose')

const Schema = mongose.Schema

const geoTagSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lon:{
        type: Number,
        required: true
    },
    building:{
        type: String,
        default: null
    }
})

const geoTag = mongose.model('geoTag', geoTagSchema)
module.exports = geoTag