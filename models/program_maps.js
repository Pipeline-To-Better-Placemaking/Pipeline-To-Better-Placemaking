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

    //stores the points for the perimeter of the building
    //used to render the model. 
    perimeterPoints: [{
        latitude:{
            type: Number,
            required: true
        },
        longitude:{
            type: Number,
            required: true 
        }
    }],

    modified: {
        type: Date,
        required: true
    },

    //stores an array of floors with the floor schema
    floors: [floorSchema]
    
})

const newProgramSchema = mongoose.Schema({
    //stores the points for this section
    //perimeter of the section made by user.  
    points: [{
        latitude:{
            type: Number,
            required: true
        },
        longitude:{
            type: Number,
            required: true 
        }
    }],

    programType: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    }

})

const floorSchema = mongoose.Schema({
    floorNum:{
        type: Number,
        required: true
    },

    //number of program sections identified on this floor
    programCount: {
        type: Number,
        required: true
    },

    //programs that are identified on this floor. 
    programs: [newProgramSchema]
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

    date:{
        type: Date,
        required: true
    },

    data: [dataSchema]
})

const Maps = module.exports = mongoose.model('Program_Maps', program_schema)
const Entry = mongoose.model('Program_Entry', dataSchema)
const FloorEntry = mongoose.model('Floor_Entry', floorSchema)
const ProgramEntry = mongoose.model('Program_Entry', newProgramSchema)

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
        numFloors: newEntry.numFloors,
        perimeterPoints: newEntry.perimeterPoints,
    })

    return await Maps.updateOne(
        { _id: mapId },
        { $push: { data: entry}}
    )
}

module.exports.addFloor = async function(mapId, entryId, newEntry) {
    var entry = new FloorEntry({
        floorNum: newEntry.floorNum,
        programCount: newEntry.programCount,
    })

    return await Maps.updateOne(
        { 
            _id: mapId,
            'data._id': entryId
        },
        { $push: { floors: entry}}
    )
}

module.exports.addProgram = async function(mapId, entryId, floorId, newEntry) {
    var entry = new FloorEntry({
        points: newEntry.points,
        programType: newEntry.programType,
    })

    return await Maps.updateOne(
        { 
            _id: mapId,
            'data._id': entryId,
            'floors._id': floorId
        },
        { $push: { programs: entry}}
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

module.exports.findFloor = async function(mapId, entryId, floorId){
    
    const out = (await Maps.find({
        _id: mapId,
        'data._id': entryId,
        'floors._id': floorId
    },
    {'floors.$': 1}))

    return out[0].floors[0]
}

module.exports.findProgram = async function(mapId, entryId, floorId, programId){
    
    const out = (await Maps.find({
        _id: mapId,
        'data._id': entryId,
        'floors._id': floorId,
        'programs._id': programId
    },
    {'programs.$': 1}))

    return out[0].programs[0]
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

module.exports.deleteFloor = async function(mapId, entryId, floorId){
    return await Maps.updateOne(
        {
            _id: mapId, 
            'data._id': entryId
        },
        { $pull: {floors: {_id:floorId}}}
        )
}


    
module.exports.updateFloor = async function(mapId, dataId, floorId, newEntry){
        return await Maps.updateOne(
            {
                _id: mapId,
                'data._id': dataId,
                'floors._id': floorId
            },
        { $set: { "floors.$": newEntry}}
    )}

module.exports.updateProgram = async function(mapId, dataId, floorId, programId, newEntry){
    return await Maps.updateOne(
        {
            _id: mapId,
            'data._id': dataId,
            'floors._id': floorId,
            'programs._id:': programId
        },
        { $set: { "programs.$": newEntry}}
    )}
        
        
module.exports.deleteProgram = async function(mapId, entryId, floorId, programId){
    return await Maps.updateOne(
        {_id: mapId}, 
        {'data._id': entryId},
        {'floors._id': floorId},
        { $pull: {programs: {_id:programId}}}
    )
}