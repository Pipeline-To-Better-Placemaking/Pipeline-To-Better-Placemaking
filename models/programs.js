const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const Entry = mongoose.Schema({
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['residential','retail','restaurant','educational'],
        required: true
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
    project: {
        type: ObjectId,
        required: true
    },
    owner: {
        type: ObjectId,
        required: true
    },
    data: {
        type: Entry,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    }
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