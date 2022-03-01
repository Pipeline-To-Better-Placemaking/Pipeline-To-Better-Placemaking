const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId
const Points = require('../models/standing_points.js')

const dataSchema = mongoose.Schema({
   
    decibal_1: {
        type: double,
        required: true
    },

    decibal_2: {
        type: double,
        required: true
    },

    decibal_3: {
        type: double,
        required: true
    },

    decibal_4: {
        type: double,
        required: true
    },

    decibal_5: {
        type: double,
        required: true
    },
    
    average: {
        type: double,
        required: true
    },

    sound_type: {
        type: double,
        enum: ['nature','diffused conversations','traffic noise','equipment','foundations (water)'],
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
        ref: 'Sound_Collections',
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
