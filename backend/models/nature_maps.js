const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId
const Points = require('../models/standing_points.js')

const dataSchema = mongoose.Schema({
   
    animals: {
        enum: ['domesticated','free roam','none'],
        required: true
    },

    landscape: {
        enum: ['landscape plants','natural plants','designed plants','open field'],
        required: true
    },

    weather: {
        enum: ['sunny','cloudy','rainy','foggy'],
        required: true
    },

    water: {
        enum: ['pond','lake','fountain','river', 'ocean'],
        required: true
    },

})

const stationary_schema = mongoose.Schema({
    
    
    project: {
        type: ObjectId,
        required: true
    },
    standingPoints: [{
        type: ObjectId,
        required: true,
        ref: 'Standing_Points'
    }],
    researchers: [{
        type: ObjectId,
        required: true,
        ref: 'Users'
    }],

    maxResearchers:{
        type: Number,
        required: true,
        default: 1
    },

    sharedData:{
        type: ObjectId,
        ref: 'Nature_Collections',
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    data:[dataSchema]   
})


const Maps = module.exports = mongoose.model('Sound_Maps', stationary_schema)
const Entry = mongoose.model('Data_Entry', dataSchema)