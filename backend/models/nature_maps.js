const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId
const Points = require('../models/standing_points.js')

const dataSchema = mongoose.Schema({
   
    animals: {
        type: String,
        enum: ['domesticated','free roam','none'],
        required: true
    },

    landscape: {
        type: String,
        enum: ['landscape plants','natural plants','designed plants','open field'],
        required: true
    },

    weather: {
        type: String,
        enum: ['sunny','cloudy','rainy','foggy'],
        required: true
    },

    water: {
        type: String,
        enum: ['pond','lake','fountain','river', 'ocean'],
        required: true
    },

    standingPoint: {
        type: ObjectId,
        required: true,
        ref: 'Standing_Points'
    }

})

const nature_schema = mongoose.Schema({
    
    title: String,
    
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

    time_of_day: {
        type: String,
        enum: ['morning','afternoon','night'],
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    data:[dataSchema]   
})


const Maps = module.exports = mongoose.model('Nature_Maps', nature_schema)
const Entry = mongoose.model('Nature_Entry', dataSchema)

module.exports.addMap = async function(newMap) {
    return await newMap.save()
}

module.exports.updateMap = async function (projectId, newMap) {
    return await Maps.updateOne(
        { _id: projectId },
        { $set: {
            title: newMap.title,
            date: newMap.date,
            maxResearchers: newMap.maxResearchers,
            standingPoints: newMap.standingPoints
        }}
    )
}

module.exports.deleteMap = async function(mapId) {

    const map = await Maps.findById(mapId)

    for(var i = 0; i < map.standingPoints.length; i++)
        Points.removeRefrence(map.standingPoints[i])
    
    return await Maps.findByIdAndDelete(mapId)
}

module.exports.projectCleanup = async function(projectId) {
    return await Maps.deleteMany({ project: projectId })
}

module.exports.addEntry = async function(mapId, newEntry) {
    var entry = new Entry({
        animals: newEntry.animals,
        landscape: newEntry.landscape,
        weather: newEntry.weather,
        water: newEntry.water,
        standingPoint: newEntry.standingPoint
    })

    Points.addRefrence(newEntry.standingPoint)

    return await Maps.updateOne(
        { _id: mapId },
        { $push: { data: entry}}
    )
}

module.exports.addResearcher = async function(mapId, userId){
    return await Maps.updateOne(
        { _id: mapId },
        { $push: { researchers: userId}}
    )
}

module.exports.removeResearcher = async function(mapId, userId){
    return await Maps.updateOne(
        { _id: mapId },
        { $pull: { researchers: userId}}
    )
}

module.exports.isResearcher = async function(mapId, userId){
    try{
        const doc = await Maps.find(
            {
                _id: mapId, 
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
    
        const doc = await Maps.find(
            {   
                _id: mapId, 
                data: { $elemMatch:  {_id:entryId }}
            }
        )
    
        await Points.removeRefrence(doc.data[0].standingPoint)
    
        return await Maps.updateOne(
            { _id: mapId },
            { $pull: { data: {_id:entryId }}
            })
    }
    