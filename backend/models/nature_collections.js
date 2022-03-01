const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId

const Nature_Maps = require('./nature_maps.js')
const Area = require('./areas.js')
const { collection } = require('./surveys.js')


const collection_schema = mongoose.Schema({
    title: String,

    area: {
        type: ObjectId,
        required: true,
        ref: 'Areas'
    },

    duration: {
        type: Number,
        required: true,
        default: 15
    },

    maps: [{
        type: ObjectId,
        ref: 'Sound_Maps'
    }]

})

const Collection = module.exports = mongoose.model('Nature_Collections', collection_schema)