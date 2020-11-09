require('dotenv').config()

let PORT = process.env.PORT
let DB_URI = process.env.DB_URI
let PRIVATE_KEY = process.env.PRIVATE_KEY
if (process.env.NODE_ENV === 'test') {
    DB_URI = process.env.TEST_DB_URI
    PRIVATE_KEY = process.env.TEST_PRIVATE_KEY
}

module.exports = {
    PORT,
    DB_URI,
    PRIVATE_KEY
}