const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const ObjectId = mongoose.Schema.Types.ObjectId

const project_schema = mongoose.Schema({

    title:{type: String},
    description:{type: String},
    team:{type:ObjectId},
    area:{type: ObjectId},
    subareas:{type: [{area:[ {latitude: Number,
                     longitude: Number
                    }
                 ]}]},
    activities:{type:[{activity:ObjectId,
                       test_type:{
                               type:String,
                               enum:['survey','stationary','moving', 'program']
                            }
                      }]},
})

const Projects = module.exports = mongoose.model('Projects', project_schema)

module.exports.addProject = async function(newProject){
    project = await newProject.save()
    mainArea = project.subareas[0]._id

    await Projects.updateOne({
      _id:project._id
    },{
      $set: {area: mainArea}
    })

    return await Projects.findById(project._id)
}

module.exports.deleteProject = async function(projectId){
  return await Projects.findByIdAndDelete(projectId)
}

module.exports.teamCleanup = async function(teamId){
  return await Projects.deleteMany(
      {team:teamId}
  )
}

module.exports.addActivity = async function (projectId, activityId, testType){
  return await Projects.updateOne(
    {_id:projectId},
    {$push: {activities:{
                activity:activityId,
                test_type:testType
    }}}
  )
}

module.exports.updateProject = async function (projectId, newProject){
  return await Projects.updateOne(
    {_id:projectId},
    {$set: {title:newProject.title,
            description:newProject.description,
            points:newProject.poinst
        }}
    )
}

module.exports.removeActivity = async function(projectId, testId){
  return await Projects.updateOne({
    _id:projectId
  },{
    $pull:
    {
      activities:{activity:testId}
    }
  })
}

module.exports.getProjectById = async function(projectId){
    return await Projects.findById(projectId)
}

module.exports.getTests = async function(projectId){
     return await Projects.findById(projectId).activities
}