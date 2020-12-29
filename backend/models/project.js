const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

var Coordinate = new Schema({
    lat: Number,
    long: Number, 
});

const project_schema = mongoose.Schema({

    title:{type: string},
    description:{type: string},
    points:{type: Coordinate},
    areas:{type: [[Coordinate]]},
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