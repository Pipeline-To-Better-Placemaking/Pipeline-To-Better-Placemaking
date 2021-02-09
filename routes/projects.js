const express = require('express')
const router = express.Router()
const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const Stationary_Map = require('../models/stationary_maps.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')

const { BadRequestError, UnauthorizedError } = require('../utils/errors')

router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user

    if(await Team.isAdmin(req.body.team,user._id)){
    
        let newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            subareas: [{area:req.body.points}],
            team: req.body.team
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
    res.json(await Project.findById(req.params.id))
})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    project = await Project.findById(req.params.id)
    let newProject = new Project({
        title: (req.body.title ? req.body.title : project.title),
        description: (req.body.description ? req.body.description : project.description),
        area: (req.body.area ? req.body.area : project.area)
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
        await Stationary_Map.projectCleanup(project._id)
        res.json(await Project.deleteProject(project._id))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }

})

router.post('/:id/areas', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isUser(project.team,user._id)){
        
        if(req.body.area.length < 3)
            throw new BadRequestError('Areas require at least three points')
        
        res.json(await Project.addArea(project._id,req.body.area))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/areas/:areaId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    project = await Project.findById(req.params.id)
    if (await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.updateArea(project._id,req.params.areaId,req.body.area))
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }  
})

router.put('/:id/areas/', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    project = await Project.findById(req.params.id)
    if (await Team.isAdmin(project.team,user._id)){

        if(req.body.areas){
            
            for(var i = 0; i < req.body.areas.length; i++){
                if(req.body.areas[i].length < 3)
                throw new BadRequestError('Area ' + i + ' requires at least three points.')
            }
            for(var i = 0; i < req.body.areas.length; i++){
                await Project.updateArea(project._id,req.body.areas[i].id,req.body.areas[i].points)
            }
            res.status(201).json(await Project.findById(req.params.id))
        }
        else{
            await Project.updateArea(project._id,area.id,req.body.area)
            res.status(201).json(await Project.findById(req.params.id))
        }   
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})
router.delete('/:id/areas/:areadId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.deleteArea(project._id,req.params.areaId))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})


module.exports = router