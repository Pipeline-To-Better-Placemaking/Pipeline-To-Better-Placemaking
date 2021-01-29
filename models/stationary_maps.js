const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId

const Entry = mongoose.Schema({
    location: {
        latitude: Number,
        longitude: Number
    },
    age: {
        type: String,
        enum: ['<15','15-30','30-45','45-60','60+']
    },
    posture: {
        type: String,
        enum: ['sitting(formal)','sitting(informal)','standing','laying']
    },
    activity: {
        type: String,
        enum: ['waiting','eating','talking','exercising']
    },
    time: { type: Date },
})


const stationary_schema = mongoose.Schema({
    project: { type: ObjectId },
    owner: { type: ObjectId },
    area: { type: ObjectId },
    claimed: {
        type: Boolean,
        default: false
    },
    start_time: { type: Date },
    end_time: { type: Date },
    data: [{ type: Entry }],
    complete: {
        type: Boolean,
        default: false
    }
})


const Maps = module.exports = mongoose.model('Stationary_Maps', stationary_schema)

module.exports.addMap = async function(newMap) {
    return await newMap.save()
}

module.exports.deleteMap = async function(mapId) {
    return await Maps.findByIdAndDelete(mapId)
}

module.exports.projectCleanup = async function(projectId) {
    return await Maps.deleteMany({ project: projectId })
}

module.exports.addEntry = async function(mapId, newEntry) {
    return await Maps.updateOne(
        { _id: mapId },
        { $push: { data: newEntry }}
    )
}

module.exports.deleteEntry = async function(testId, markerId) {

}

module.exports.claim = async function(testId, userId) {

}

module.exports.complete = async function(testId) {

}

module.exports.getData = async function(testId) {

}