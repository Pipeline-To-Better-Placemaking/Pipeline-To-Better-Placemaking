const config = require('../utils/config')
const jwt = require('jsonwebtoken')

// Get a valid token for a specific user
const getToken = async (user) => {
    return jwt.sign(user.toJSON(), config.PRIVATE_KEY, {
        expiresIn: 86400 //1 day
    })
}

module.exports = {
    getToken
}