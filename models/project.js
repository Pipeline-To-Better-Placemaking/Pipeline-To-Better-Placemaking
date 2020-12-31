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
    points:{type: [{lat: Number,
                    long: Number
                   }]},
    areas:{type: [[ {lat: Number,
                     long: Number
                    }
                 ]]},
    admins:{type: [ObjectId]},
    users:{type: [ObjectId]},
    activities:{type:[{activity:ObjectId,
                       testType:{
                               type:String,
                               enum:['survey','stationary','moving', 'program']
                            }
                      }]},
})

const Projects = module.exports = mongoose.model('Projects', project_schema)

module.exports.addProject = async function(newProject){
    return await Projects.save(newProject)
}

module.exports.addTest = async function(projectId, type){
    Projects.updateOne({
        _id: projectId
      }, {
        $addToSetid:
         {
          activities:{activity:projectId, testType:type}
        }
      })
}

module.exports.getProjectById = async function(projectId){
    return await Projects.findById(projectId)
}

module.exports.getTests = async function(projectId){
     return await Projects.findById(projectId).activities
}