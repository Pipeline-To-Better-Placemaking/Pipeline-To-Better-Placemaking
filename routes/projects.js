const express = require('express')
const router = express.Router()
const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const Area = require('../models/areas.js')
const Standing_Point = require('../models/standing_points.js')
const Stationary_Map = require('../models/stationary_maps.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')

const { BadRequestError, UnauthorizedError } = require('../utils/errors')

router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user

    if(await Team.isAdmin(req.body.team,user._id)){

        if(req.body.points < 3)
            throw new BadRequestError('Areas require at least three points')

        let newArea = new Area({
            title: req.body.areaTitle,
            points: req.body.points
        })
        newArea.save()

        var pointIds = []
        for(var i = 0; i < req.body.standingPoints.length; i++){
            let newPoint = new Standing_Point({
                longitude: req.body.standingPoints[i].longitude,
                latitude: req.body.standingPoints[i].latitude,
                title: req.body.standingPoints[i].title
            })
            newPoint.save()
            pointIds[i] = newPoint._id
        }
        let newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            area: newArea._id,
            subareas: [newArea._id],
            standingPoints: pointIds,
            team: req.body.team,
            surveyDuration: req.body.surveyDuration,
            movingDuration: req.body.movingDuration,
            stationaryDuration: req.body.stationaryDuration
        })

        const project = await Project.addProject(newProject)

        await Team.addProject(req.body.team,project._id)
        res.status(201).json(project)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json(await Project.findById(req.params.id).populate('area').populate('subareas').populate('standingPoints'))
})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    project = await Project.findById(req.params.id)
    let newProject = new Project({
        title: (req.body.title ? req.body.title : project.title),
        description: (req.body.description ? req.body.description : project.description),
        area: (req.body.area ? req.body.area : project.area),
        surveyDuration: (req.body.surveyDuration ? req.body.surveyDuration : project.surveyDuration),
        movingDuration: (req.body.movingDuration ? req.body.movingDuration : project.movingDuration),
        stationaryDuration: (req.body.stationaryDuration ? req.body.stationaryDuration: project.stationaryDuration) 
    })

    if (await Team.isAdmin(project.team,user._id)){
        if (newProject.area > project.subareas.length){
            throw new BadRequestError('Cannot set main area to non-existant subarea')
        }
        else{
            res.status(201).json(await Project.updateProject(req.params.id,newProject))
        }
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.delete('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        await Team.removeProject(project.team,project._id)
    
        res.json(await Project.deleteProject(project._id))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }

})

router.post('/:id/areas', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)

    let newArea = new Area({
        title: req.body.title,
        points: req.body.points
    })

    newArea.save()

    if(await Team.isUser(project.team,user._id)){
        
        if(req.body.points.length < 3)
            throw new BadRequestError('Areas require at least three points')
        
        res.json(await Project.addArea(project._id,newArea._id))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.delete('/:id/areas/:areaId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.deleteArea(project._id,req.params.areaId))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.post('/:id/standing_points', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)

    let newPoint = new Standing_Point({
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        title: req.body.title
    })
    newPoint.save()

    if(await Team.isUser(project.team,user._id)){      
        res.json(await Project.addPoint(project._id,newPoint._id))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.delete('/:id/standing_points/:pointId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.deletePoint(project._id,req.params.pointId))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

module.exports = router