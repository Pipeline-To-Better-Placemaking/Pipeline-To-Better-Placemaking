const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId

const Entry = mongoose.Schema({

    location: {lat: Number,
               long: Number},
    age:{
        type:String,
        enum:['<15','15-30','30-45','45-60','60+']
    },
    posture:{
        type:String,
        enum:['sitting(formal)','sitting(informal)','standing','laying']
    },
    activity:{
        type:String,
        enum:['waiting','eating','talking','exercising']
    },
    time:{type:Date},
})


const stationary_schema = mongoose.Schema({
    project:{type:ObjectId},
    owner:{type:ObjectId},
    area:{type:ObjectId},
    claimed:{type:Boolean,
             default:false},
    start_time:{type:Date},
    end_time:{type:Date},
    data:{type:[Entry]},
    complete:{type:Boolean,
              default:false}
})


const Stationarys = module.exports = mongoose.model('Stationary_Maps', stationary_schema)

module.exports.addMap = async function addTest(newMap){
    return await newMap.save()
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