const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const Entry = mongoose.Schema({
    location: {
        lat: Number,
        long: Number
    },
    address: String,
    type: {
        type: String,
        enum: ['residential','retail','restaurant','educational']
    },
    floor: {
        type: Number,
        default: 1
    },
    num_floors: {
        type: Number,
        default: 1
    },
    image: binData
})

const program_schema = mongoose.Schema({
    project: ObjectId,
    owner: ObjectId,
    data: Entry,
    complete: Boolean
})

const Programs = module.exports = mongoose.model('Programs', program_schema)

module.exports.addTest = async function(newTest) {

}

module.exports.addEntry = async function(testId, program) {

}

module.exports.addImage = async function(entryId, image) {

}

module.exports.deleteProgram = async function(testId, index) {

}