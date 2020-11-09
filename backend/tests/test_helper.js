const config = require('../utils/config')
const jwt = require('jsonwebtoken')

// Get a valid token for a specific user
const getToken = async (username) => {
    return jwt.sign(username, config.PRIVATE_KEY)
}

module.exports = {
    getToken
}