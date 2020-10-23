const jwt = require('jsonwebtoken')

const SIGNING_KEY = 'signkey' // TODO: get this from config file

// Get a valid token for a specific user
const getToken = async (username) => {
    return jwt.sign(username, SIGNING_KEY)
}

module.exports = {
    getToken
}