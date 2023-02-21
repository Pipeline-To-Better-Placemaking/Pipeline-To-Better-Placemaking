// In a similar fashion to config.js this handles initializing firebase 
// and firebase storage

require('dotenv').config()
const { initializeApp } = require('firebase/app')
const { getStorage } = require('firebase/storage')

let FIREBASE_API_KEY = process.env.FIREBASE_API_KEY
let FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN
let FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
let FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
let FIREBASE_MESSAGING_ID = process.env.FIREBASE_MESSAGING_ID
let FIREBASE_APP_ID = process.env.FIREBASE_APP_ID
let FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)