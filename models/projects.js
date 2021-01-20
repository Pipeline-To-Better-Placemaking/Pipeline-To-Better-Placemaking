const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const ObjectId = mongoose.Schema.Types.ObjectId

const project_schema = mongoose.Schema({

    title:{type: String},
    description:{type: String},
    team:{type:ObjectId},
    points:{type: [{latitude: Number,
                    longitude: Number
                   }]},
    areas:{type: [[ {latitude: Number,
                     longitude: Number
                    }
                 ]]},
    activities:{type:[{activity:ObjectId,
                       testType:{
                               type:String,
                               enum:['survey','stationary','moving', 'program']
                            }
                      }]},
})

const Projects = module.exports = mongoose.model('Projects', project_schema)

module.exports.addProject = async function(newProject){
    return await newProject.save()
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