const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const ObjectId = mongoose.Schema.Types.ObjectId

var Coord = new Schema({
    lat: Number,
    long: Number, 
});

const project_schema = mongoose.Schema({

    title:{type: String},
    description:{type: String},
    points:{type: [Coord]},
    areas:{type: [[Coord]]},
    admins:{type: [ObjectId]},
    users:{type: [ObjectId]},
    activities:{type:[ObjectId]},
})

const Projects = module.exports = mongoose.model('Projects', project_schema)

module.exports.addProject = async function(newProject){

}

module.exports.addTest = async function(type, owner){

}

module.exports.getProjectById = async function(projectId){

}

module.exports.getTests = async function(projectId){

}