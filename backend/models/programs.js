const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')


const entry = mongoose.Schema({

    location:{type: {lat: Number,
                     long: Number}},
    adress:{type:string},
    type:{
        type:string,
        enum:['residential','retail','restaurant','educational']
    },
    floor:{type:number,default:1},
    num_floors:{type:number,defualt:1},
    image:{type:binData}
})


const program_schema = mongoose.Schema({
    project:{type:objectId},
    owner:{type:objectId},
    data:{type:entry},
    complete:{type:bool}
})


const Programs = module.exports = mongoose.model('Programs', program_schema)

module.exports.addTest = async function(newTest){

}

module.exports.addEntry = async function(testId, program){

}

module.exports.addImage = async function(entryId, image){

}

module.exports.deleteProgram = async function(testId, index){

}