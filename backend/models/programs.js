const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const Entry = mongoose.Schema({
    location: {
        type: {
            lat: Number,
            long: Number
        }
    },
    address: { type: String },
    type: {
        type: String,
        enum: ['residential','retail','restaurant','educational']
    },
    floor: {
        type: number,
        default: 1
    },
    num_floors: {
        type: number,
        default: 1
    },
    image: { type: binData }
})

const program_schema = mongoose.Schema({
    project: { type: ObjectId },
    owner: { type: ObjectId },
    data: { type: Entry },
    complete: { type: bool }
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