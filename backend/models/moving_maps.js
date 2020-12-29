const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')

const ObjectId = mongoose.Schema.Types.ObjectId

const coord = new Schema({
    lat: Number,
    long: Number, 
})

const entry = mongoose.Schema({

    path:{type:[coord]},
    age:{
        type:String,
        enum:['<15','15-30','30-45','45-60','60+']
    },
    mofr:{
        type:String,
        enum:['running','walking','biking','skateboarding','other']
    },
    time:{type:String}
})

const moving_schema = mongoose.Schema({
    project:{type:ObjectId},
    owner:{type:ObjectId},
    start_time:{type:String},
    end_time:{type:String},
    data:{type:entry},
    complete:{type: Boolean}
})

const Movings = module.exports = mongoose.model('Moving_Maps', moving_schema)

module.exports.addTest = async function addTest(newTest){

}

module.exports.addEntry = async function(testId, entry){

}

module.exports.deleteEntry = async function(testId, entryId){

}

module.exports.claim = async function(testId, userId){

}

module.exports.complete = async function(testId){

}

module.exports.getData = async function(testId){

}