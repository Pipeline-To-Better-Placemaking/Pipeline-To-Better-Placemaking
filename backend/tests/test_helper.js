require('dotenv').config()
const jwt = require('jsonwebtoken')

// Get a valid token for a specific user
const getToken = async (username) => {
    return jwt.sign(username, process.env.TEST_PRIVATE_KEY)
}

module.exports = {
    getToken
}