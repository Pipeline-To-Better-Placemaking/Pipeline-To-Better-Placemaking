const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')

const coord = new Schema({
    lat: Number,
    long: Number, 
})

const entry = mongoose.Schema({

    location:{type:coord},
    age:{
        type:string,
        enum:['<15','15-30','30-45','45-60','60+']
    },
    posture:{
        type:string,
        enum:['sitting(formal)','sitting(informal)','standing','laying']
    },
    activity:{
        type:string,
        enum:['waiting','eating','talking','exercising']
    },
    time:{type:string}
})


const stationary_schema = mongoose.Schema({
    project:{type:objectId},
    owner:{type:objectId},
    start_time:{type:string},
    end_time:{type:string},
    data:{type:entry},
    complete:{type:bool}
})


const Stationarys = module.exports = mongoose.model('Stationary_Maps', stationary_schema)

module.exports.addTest = async function addTest(newTest){

}

module.exports.addEntry = async function(testId, marker){

}

module.exports.deleteEntry = async function(testId, markerId){

}

module.exports.claim = async function(testId, userId){

}

module.exports.complete = async function(testId){

}

module.exports.getData = async function(testId){

}