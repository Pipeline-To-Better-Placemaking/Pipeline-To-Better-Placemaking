//.env will not be published to github.  Access to keys can be found in dashboard of heroku application

require('dotenv').config()

let PORT = process.env.PORT
let DB_URI = process.env.DB_URI
let PRIVATE_KEY = process.env.PRIVATE_KEY
let PROJECT_EMAIL = process.env.PROJECT_EMAIL
let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
let REFRESH_TOKEN = process.env.REFRESH_TOKEN
let ACCESS_TOKEN = process.env.ACCESS_TOKEN
let GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY
let FIREBASE_API_KEY = process.env.FIREBASE_API_KEY
let FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN
let FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
let FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
let FIREBASE_MESSAGING_ID = process.env.FIREBASE_MESSAGING_ID
let FIREBASE_APP_ID = process.env.FIREBASE_APP_ID
let FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID

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
    ACCESS_TOKEN,
    GOOGLE_MAP_KEY,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
}