const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')

const ObjectId = mongoose.Schema.Types.ObjectId

const user_schema = mongoose.Schema({
    firstname: {
        type: String,
        required: false,
        unique: false,
        match: /[A-Za-z]/
    },
    lastname: {
        type: String,
        required: false,
        unique: false,
        match: /[A-Za-z]/
    },
    institution: {
        type: String,
        required: false,
        unique: false,
        match: /[A-Za-z ]/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    is_verified:{type: Boolean},
    vefification_code:{type: String},
    invites:{type:[ObjectId]},
    teams:{type:[ObjectId]}
})

user_schema.plugin(uniqueValidator)

const Users= module.exports = mongoose.model('Users', user_schema)

module.exports.getUserById = async function(id){
    return await Users.findById(id)
}

module.exports.getUserByEmail = async function(email){
    const query = {email: email}
    return await Users.findOne(query)
}

module.exports.addUser = async function(newUser){
    // Replace password with hashed version
    const salt  = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash
    const user = await Users.save(newUser)
    return user
}

module.exports.comparePassword = async function(candidatePassword, hash){
    return await bcrypt.compare(candidatePassword, hash)
}

module.exports.verifyEmail = async function(userId, code){
    return await Users.updateOne(
        {id:userId},
        {$set: {is_verified:true}}
        )
}

module.exports.createVerificationCode = async function(userId){
    return 0
}

module.exports.getInvites = async function(userId){

}

module.exports.acceptInvite = async function(userId,teamId){

}

module.exports.denyInvite = async function(userId,teamId){

}