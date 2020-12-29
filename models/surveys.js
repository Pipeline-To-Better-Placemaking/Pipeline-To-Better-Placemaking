const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const survey_schema = mongoose.Schema({

    url:{type: string},
    answers:{type: [string]}
})

const Surveys = module.exports = mongoose.model('Surveys', survey_schema)

module.exports.findSurveyById = async function(surveyId){

}

module.exports.addResponse = async function(id, responses){

}

