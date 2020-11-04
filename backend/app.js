require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

console.log('Connecting to ', process.env.TEST_DB_URI)
mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error.message)
    })

module.exports = app