const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId

const Entry = mongoose.Schema({
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    age: {
        type: String,
        enum: ['<15','15-30','30-45','45-60','60+'],
        required: true
    },
    posture: {
        type: String,
        enum: ['sitting(formal)','sitting(informal)','standing','laying'],
        required: true
    },
    activity: {
        type: String,
        enum: ['waiting','eating','talking','exercising'],
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})


const stationary_schema = mongoose.Schema({
    project: {
        type: ObjectId,
        required: true
    },
    owner: {
        type: ObjectId,
        required: true
    },
    area: {
        type: ObjectId,
        required: true
    },
    claimed: {
        type: Boolean,
        default: false
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: Date,
    data: [Entry],
    complete: {
        type: Boolean,
        default: false
    }
})


const Maps = module.exports = mongoose.model('Stationary_Maps', stationary_schema)

module.exports.addMap = async function(newMap) {
    return await newMap.save()
}

module.exports.updateMap = async function (projectId, newMap) {
    return await Maps.updateOne(
        { _id: projectId },
        { $set: {
            owner: newMap.owner,
            start_time: newMap.start_time,
            end_time: newMap.end_time,
            area: newMap.area,
            claimed: newMap.claimed
        }}
    )
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

module.exports.deleteEntry = async function(mapId, entryId) {
    return await Maps.updateOne(
        { _id: mapId },
        { $pull: { data: {_id:entryId }}
    }
    )
}

module.exports.claim = async function(testId, userId) {

}

module.exports.complete = async function(testId) {

}

module.exports.getData = async function(testId) {

}