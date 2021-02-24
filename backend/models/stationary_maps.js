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
    },
})
const stationary_schema = mongoose.Schema({
    
    title:String,
    
    project: {
        type: ObjectId,
        required: true
    },
    area: {
        type: ObjectId,
        required: true,
        ref: 'Areas'
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

    duration:{
        type: Number,
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    data:[Entry]   
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
            title: newMap.title,
            date: newMap.date,
            area: newMap.area,
            standingPoints: newMap.standingPoints
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

module.exports.addResearcher = async function(mapId, userId){
    await Maps.updateOne(
        { _id: mapId },
        { $push: { users: userId}}
    )
}

module.exports.isResearcher = async function(mapId, userId){
    const doc = await Maps.find(
        {
            _id: mapId, 
            researchers: { $elemMatch:  userId }
        }
    )
    if (doc.length === 0) {
        return false
    }
    return true
}
    

module.exports.findData = async function(mapId, entryId){
    const out = (await Maps.find({
        _id: mapId,
        'data._id': entryId 
    },
    {'data.$':1}))

    return out[0].data[0]
}

module.exports.updateData = async function(mapId, dataId, newEntry){
    return await Maps.updateOne(
        {
            _id: mapId,
            'data._id': dataId 
        },
        { $set: { "data.$": newEntry}}
    )}

module.exports.deleteEntry = async function(mapId, entryId) {
    return await Maps.updateOne(
        { _id: mapId },
        { $pull: { data: {_id:entryId }}
        })
}
