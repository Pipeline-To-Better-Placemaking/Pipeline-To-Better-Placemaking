require('dotenv').config()

let PORT = process.env.PORT
let DB_URI = process.env.DB_URI
let PRIVATE_KEY = process.env.PRIVATE_KEY
let PROJECT_EMAIL = process.env.PROJECT_EMAIL
let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
let REFRESH_TOKEN = process.env.REFRESH_TOKEN
let ACCESS_TOKEN = process.env.ACCESS_TOKEN

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
	DB_URI = process.env.TEST_DB_URI
    PRIVATE_KEY = process.env.TEST_PRIVATE_KEY
}

module.exports = {
    PORT,
    DB_URI,
    PRIVATE_KEY,
    PROJECT_EMAIL,
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    ACCESS_TOKEN
}