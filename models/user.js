const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
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
    }
})

userSchema.plugin(uniqueValidator)

const User = module.exports = mongoose.model('User', userSchema)

module.exports.getUserById = async function(id){
    return await User.findById(id)
}

module.exports.getUserByEmail = async function(email){
    const query = {email: email}
    return await User.findOne(query)
}

module.exports.addUser = async function(newUser){
    // Replace password with hashed version
    const salt  = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash

    const user = await newUser.save()
    return user
}

module.exports.comparePassword = async function(candidatePassword, hash){
    return await bcrypt.compare(candidatePassword, hash)
}