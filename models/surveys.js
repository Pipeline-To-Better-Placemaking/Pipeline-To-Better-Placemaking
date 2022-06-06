const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId


const survey_schema = mongoose.Schema({
    
    title:String,
    
    project: {
        type: ObjectId,
        required: true
    },
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
        ref: 'Survey_Collections',
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    key:{
        type: String,
        unique: true
    }          
})

const Surveys = module.exports = mongoose.model('Surveys', survey_schema)

module.exports.addSurvey = async function(newSurvey){
    const surveyId = await newSurvey.save()

    survey = await Surveys.addKey(surveyId)
    return await survey.save()
}

module.exports.addKey = async function(surveyId) {
    var builderString = "3UROGSWIVE01A9LMKQB7FZ6DJ4NC28Y5HTXP"

    var survey = await Surveys.findById(surveyId)
    if(survey == null){
        survey = new Survey({
            key: 0
        })
    }

    var keyCount = survey.key
    survey.key = keyCount + 1
    await survey.save()

    var keyInt = (keyCount * 823543 + 23462) % 2176782336
    var keyString = ""
    
    for(var i = 0; i < 6; i++){
        keyString += builderString[ keyInt % 36 ]
        keyInt = Math.floor(keyInt/36)
    }
    survey.key = keyString
    
    return await survey.save()
}

module.exports.updateSurvey = async function (surveyId, newSurvey) {
    return await Surveys.updateOne(
        { _id: surveyId },
        { $set: {
            title: newSurvey.title,
            date: newSurvey.date,
            maxResearchers: newSurvey.maxResearchers,
        }}
    )
}

module.exports.deleteSurvey = async function(surveyId) {
    return await Surveys.findByIdAndDelete(surveyId)
}

module.exports.projectCleanup = async function(projectId) {
    return await Surveys.deleteMany({ project: projectId })
}

module.exports.addResearcher = async function(surveyId, userId){
    return await Surveys.updateOne(
        { _id: surveyId },
        { $push: { researchers: userId}}
    )
}

module.exports.removeResearcher = async function(surveyId, userId){
    return await Surveys.updateOne(
        { _id: surveyId },
        { $pull: { researchers: userId}}
    )
}

module.exports.isResearcher = async function(surveyId, userId){
    try{
        const doc = await Surveys.find(
            {
                _id: surveyId, 
                researchers: { $elemMatch:  userId }
            }
        )
    }catch(error){
        return false
    }
    if (doc.length === 0) {
        return false
    }
    return true
}

module.exports.addEntry = async function(surveyId, newEntry) {
    var entry = new Entry({
        time: newEntry.time,
    })

    return await Surveys.updateOne(
        { _id: surveyId },
        { $push: { data: entry}}
    )
}


module.exports.deleteEntry = async function(surveyId, entryId) {

    return await Surveys.updateOne(
        { _id: surveyId },
        { $pull: { data: {_id:entryId }}
        })
}

