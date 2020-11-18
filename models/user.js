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

module.exports.getUserById = function(id,callback){
    User.findById(id,callback)
}

module.exports.getUserByEmail = function(username,callback){
    const query = {email: email}
    User.findOne(query,callback)
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newUser.password,salt, (err,hash) => {
            if(err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err,isMatch) => {
        if(err) throw err
        callback(null,isMatch)
    })
}