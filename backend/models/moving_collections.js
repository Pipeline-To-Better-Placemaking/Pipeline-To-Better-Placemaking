const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Date = mongoose.Schema.Types.Date
const ObjectId = mongoose.Schema.Types.ObjectId

const Moving_Map = require('../models/moving_maps.js')


const collection_schema = mongoose.Schema({
    title: String,
    date: {
        type: Date,
        required: true
    },

    area: {
        type: ObjectId,
        required: true,
        ref: 'Areas'
    },

    duration: {
        type: Number,
        required: true,
        default: 15
    },

    maps: [{
        type: ObjectId,
        ref: 'Moving_Maps'
    }]

})

const Collection = module.exports = mongoose.model('Moving_Collections', collection_schema)

module.exports.deleteMap = async function(collectionId, mapId){
    await Moving_Map.findByIdAndDelete(mapId)
    return await Collection.updateOne(
        { _id: collectionId },
        { $pull: { maps: mapId}}
    )

}

module.exports.deleteCollection = async function(collectionId){
    collection = await Collection.findById(collectionId)

    for(var i = 0; i < collection.maps.length; i++)
        await Moving_Map.findByIdAndDelete(collection.maps[i])

    return await Collection.findByIdAndDelete(collectionId)
}

module.exports.addActivity = async function(collectionId, mapId){
    return await Collection.updateOne(
        { _id: collectionId },
        { $push: { maps: mapId}}
    )
}

module.exports.updateCollection = async function(collectionId, newCollection){
    return await Collection.updateOne(
        { _id: collectionId },
        { $set: {
            title: newCollection.title,
            time: newCollection.date,
            area: newCollection.area,
            duration: newCollection.duration
        }}
    )
}