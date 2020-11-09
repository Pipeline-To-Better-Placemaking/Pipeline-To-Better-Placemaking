const express = require('express')
const app = express()
const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('Connecting to ', config.DB_URI)
mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error.message)
    })

module.exports = app