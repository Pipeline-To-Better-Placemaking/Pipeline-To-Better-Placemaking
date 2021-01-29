const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const survey_schema = mongoose.Schema({
    url: { type: String },
    answers: [{ type: String }]
})

const Surveys = module.exports = mongoose.model('Surveys', survey_schema)

module.exports.findSurveyById = async function(surveyId) {

}

module.exports.addResponse = async function(surveyId, responses) {

}

module.exports.getResponses = async function(surveyId) {

}