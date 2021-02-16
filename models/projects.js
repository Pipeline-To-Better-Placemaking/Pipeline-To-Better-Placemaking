const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ObjectId = mongoose.Schema.Types.ObjectId

const project_schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    team: {
        type: ObjectId,
        required: true
    },
    area: {
        type: Number,
        default: 0,
        required: true
    },
    subareas: [{
        area: [{
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        }]
    }],
    activities: [{
        activity: {
            type: ObjectId,
            required: true,
            unique: true
        },
        test_type: {
            type: String,
            enum: ['survey','stationary','moving', 'program'],
            required: true
        }
    }],
})

project_schema.plugin(uniqueValidator)

const Projects = module.exports = mongoose.model('Projects', project_schema)


module.exports.addProject = async function(newProject) {
    const project = await newProject.save()
    await Projects.updateOne(
        { _id: project._id },
        { $set: {area: 0}}
    )

    return await Projects.findById(project._id)
}

module.exports.updateProject = async function (projectId, newProject) {
    return await Projects.updateOne(
        { _id: projectId },
        { $set: {
            title: newProject.title,
            description: newProject.description,
            area: newProject.area
        }}
    )
}

module.exports.deleteProject = async function(projectId) {
    return await Projects.findByIdAndDelete(projectId)
}

module.exports.teamCleanup = async function(teamId) {
    return await Projects.deleteMany({ team: teamId })
}

module.exports.addActivity = async function (projectId, activityId, testType) {
    return await Projects.updateOne(
        { _id: projectId },
        { $push: {
            activities: {
                activity: activityId,
                test_type: testType
            }
        }}
    )
}

module.exports.removeActivity = async function(projectId, testId) {
    return await Projects.updateOne(
        { _id: projectId },
        { $pull: { activities: { activity: testId }}}
    )
}

module.exports.addArea = async function(projectId, newArea) {
    return await Projects.updateOne(
        { _id: projectId },
        { $push: { subareas: { area: newArea }}}
    )
}

module.exports.getArea = async function(projectId, areaId) {
    const out = (await Projects.find({
        _id: projectId,
        'subareas._id': areaId 
    },
    {'subareas.$':1}))
    
    return out[0].subareas[0]
}

module.exports.updateArea = async function(projectId, areaId, newArea){
return await Projects.updateOne(
    {
        _id: projectId,
        'subareas._id': areaId 
    },
    { $set: { "subareas.$.area": newArea }}
)
}

module.exports.deleteArea = async function(projectId, areaId) {
  return await Projects.updateOne(
      { _id: projectId },
      { $pull: { subareas: { _id: areaId }}}
  )
}