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
        match: /[A-Za-z]/
    },
    lastname: {
        type: String,
        match: /[A-Za-z]/
    },
    institution: {
        type: String,
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
    is_verified: {
        type: Boolean,
        default: false
    },
    verification_code: String,
    verification_timeout: Date,
    invites: [ObjectId],
    teams: [{
        type: ObjectId,
        ref: 'Teams'
    }]
})

user_schema.plugin(uniqueValidator)

const Users = module.exports = mongoose.model('Users', user_schema)

module.exports.findUserByEmail = async function(email) {
    const query = { email: email }
    return await Users.findOne(query)
}

module.exports.addUser = async function(newUser) {
    // Replace password with hashed version
    const salt  = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash
    const savedUser = await newUser.save()
    // Generate an email verification code
    await Users.createVerification(savedUser._id)
    return Users.findById(savedUser._id)
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

// Verify a user's email address with the given verification code.
// Returns true if the user was successfully verified,
// Returns false if the code is incorrect or expired.
module.exports.verifyEmail = async function(userId, code) {
    
    const user = await Users.findById(userId)
    if (!user) return false
    
    if (code === user.verification_code && user.verification_timeout < new Date()) {
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

// Generate a verification code to verify the user's email address
// and update the active code in the user's data.
// Returns the code generated.
module.exports.createVerification = async function(userId) {
    const num = rand(100000, 9999999)
    const verificationString = String(num).padStart(7, '0')
    const expiryTime = new Date() + 10 + 60 * 1000

    const res = await Users.updateOne(
        { _id: userId },
        { $set: {
            verification_code: verificationString,
            verification_timeout: expiryTime
        }}
    )

    // No such user was found
    if (res.n === 0) {
        return undefined
    }

    return verificationString
}

module.exports.addTeam = async function(userId, teamId) {
    await Users.updateOne(
        { _id: userId },
        { $push: { teams: teamId }}
    )
}
module.exports.addInvite = async function(userId, teamId) {
    await Users.updateOne(
        { _id: userId },
        { $push: { invites: teamId }}
    )
}

module.exports.deleteInvite = async function(userId,teamId) {
    
    await Users.updateOne(
        { _id: userId },
        { $pull: { invites: teamId }}
    )
}