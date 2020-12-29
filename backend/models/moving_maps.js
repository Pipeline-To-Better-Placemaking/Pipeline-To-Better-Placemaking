const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')

const coord = new Schema({
    lat: Number,
    long: Number, 
})

const entry = mongoose.Schema({

    path:{type:[coord]},
    age:{
        type:string,
        enum:['<15','15-30','30-45','45-60','60+']
    },
    mofr:{
        type:string,
        enum:['running','walking','biking','skateboarding','other']
    },
    time:{typpe:strin1g}
})

const moving_schema = mongoose.Schema({
    project:{type:objectId},
    owner:{type:objectId},
    start_time:{type:string},
    end_time:{type:string},
    data:{type:entry},
    complete:{type:bool}
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