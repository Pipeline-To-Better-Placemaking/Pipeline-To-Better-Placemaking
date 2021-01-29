const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ObjectId = mongoose.Schema.Types.ObjectId

const rand = (min = 0, max = 50) => {
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
};

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
    is_verified: { type: Boolean },
    vefification_code: { type: String },
    verification_timeout: { type:String },
    invites: [{ type: ObjectId }],
    teams: [{ type: ObjectId, ref: 'Teams' }]
})

user_schema.plugin(uniqueValidator)

const Users = module.exports = mongoose.model('Users', user_schema)

module.exports.getUserByEmail = async function(email) {
    const query = { email: email }
    return await Users.findOne(query)
}

module.exports.addUser = async function(newUser) {
    // Replace password with hashed version
    const salt  = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash
    return await newUser.save()
}

module.exports.updateUser = async function(userId, newUser) {
    return await Users.updateOne(
        { _id: userId },
        { $set: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            institution: newUser.institution
        }}
    )
}

module.exports.comparePassword = async function(candidatePassword, hash) {
    return await bcrypt.compare(candidatePassword, hash)
}

module.exports.verifyEmail = async function(userId, code) {
    
    var user = await Users.findById(userId)
    
    if (code == user.verification_code && user.expiryTime < new Date()) {
        await Users.updateOne(
            { _id: userId },
            { $set: { is_verified: true }}
        )
        
        return true
    }
    else {
        return false
    }
}

module.exports.createVerification = async function(userId) {
    const num = rand(100000, 9999999)
    const verificationString = String(num).padStart(7, '0')
    const expiryTime = new Date() + 10 + 60 * 1000
    await Users.updateOne(
        { _id: userId },
        { $set: {
            verification_code: verificationString,
            verification_timeout: expiryTime
        }}
    )
    return verificationString
}

module.exports.getInvites = async function(userId) {
    return await Users.findById(userId).invites
}

module.exports.createInvite = async function(userId, teamId) {
    await Users.updateOne(
        { _id: userId },
        { $addToSetid: { invites: teamId }}
    )
}

module.exports.deleteInvite = async function(userId,teamId) {
    await Users.updateOne(
        { _id: userId },
        { $pull: { invites: teamId }}
    )
}