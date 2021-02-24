const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const area_schema = mongoose.Schema({
    title: String,
    points: [{
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }]
})

const Areas = module.exports = mongoose.model('Areas', area_schema)

module.exports.updateArea = async function (areaId, newArea) {
    return await Maps.updateOne(
        { _id: projectId },
        { $set: {
            title: newArea.title,
            points: newArea.points
        }}
    )
}