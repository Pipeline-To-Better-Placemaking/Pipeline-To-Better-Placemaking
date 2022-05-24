const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { model } = require('./surveys')

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
    }],
    refCount:{
        type:Number,
        required: true,
        default: 1
    }
})

const Areas = module.exports = mongoose.model('Areas', area_schema)

module.exports.updateArea = async function (areaId, newArea) {
    return await Areas.updateOne(
        { _id: areaId },
        { $set: {
            title: newArea.title,
            points: newArea.points
        }}
    )
}

module.exports.removeRefrence = async function(areaId) {
    area = await Areas.findById(areaId)
    area.refCount = area.refCount - 1
    if(area.refCount <= 0){
        Areas.findByIdAndDelete(areaId)
    }
    else{
        area.save()
    }
    return area;
}
module.exports.addRefrence = async function(areaId) {
    area = await Areas.findById(areaId)
    area.refCount = area.refCount + 1
    area.save()
    return area;
}