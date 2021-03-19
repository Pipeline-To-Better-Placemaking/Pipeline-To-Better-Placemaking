const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ObjectId = mongoose.Schema.Types.ObjectId
const points_schema = mongoose.Schema({
    latitude:{
        type: Number,      
        required: true
    },

    longitude:{
        type: Number,
        required: true
    },
    title: String
})

const Standing_Points = module.exports = mongoose.model('Standing_Points', points_schema)

module.exports.updatePoint = async function (pointId, newPoint) {
    return await Standing_Points.updateOne(
        { _id: pointId },
        { $set: {
            title: newPoint.title,
            longitude: newPoint.longitude,
            latitude: newPoint.latitude
        }}
    )
}
