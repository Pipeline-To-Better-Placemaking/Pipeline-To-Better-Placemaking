const mongoose = require('mongoose')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId

//schema for all the specific recorded data from the test. 
const dataSchema = mongoose.Schema({
    //record the number of floors the building has
    numFloors: {
        type: Number,
        required: true
    },

    //stores the full building model url string provided by firebase
    //references the actual mesh stored in firebase
    orgFullModel: {
        type: String,
        required: true
    },

    //stores array of the object id that references each floors schema
    floors: [{
        type: ObjectId, 
        required: true
    }],
    
})

const floor_schema = mongoose.Schema({
    floorNum:{
        type: Number,
        required: true
    },

    //stores the original floor model url string provided by firebase
    //references the actual mesh stored in firebase
    orgFloorModel: {
        type: String,
        required: true
    },

    //stores updated floor mesh url from firebase. 
    //needs to be updated everytime a program is added and identified.
    updatedFloorModel:{
        type: String,
    },

    //number of program sections identified on this floor
    programCount: {
        type: Number,
        required: true
    },

    //array of object ids that refer to programs that have been identified
    //on this floor. each time a user identifies a program, add its id if not in already.
    programTypes:[{
        type:ObjectId,
    }],
})

const program_schema = mongoose.Schema({
    title: String,

    project: {
        type:ObjectId,
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
        ref: 'Program_Collections',
        required: true
    },

    modified:{
        type: Date,
        required: true
    },

    data: [dataSchema]
})

const Maps = module.exports = mongoose.model('Program_Maps', program_schema)
const Entry = mongoose.model('Program_Entry', dataSchema)

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
        }}
    )
}

module.exports.deleteMap = async function(mapId) {

    const map = await Maps.findById(mapId)
    
    return await Maps.findByIdAndDelete(mapId)
}

module.exports.projectCleanup = async function(projectId) {

    const data = await Maps.find({project: projectId})
    if (data === null){
        return
    }
    
    return await Maps.deleteMany({ project: projectId })
}

module.exports.addEntry = async function(mapId, newEntry) {
    var entry = new Entry({
        kind: newEntry.kind,
        value: newEntry.value,
        time: newEntry.time,
        description: newEntry.description,
        purpose: newEntry.purpose,
        path: newEntry.path
    })

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
        return await Maps.updateOne(
            { _id: mapId },
            { $pull: { data: {_id:entryId }}
            })
    }

//functions to do with the floors? figure that out