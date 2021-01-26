const express = require('express')
const router = express.Router()
const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const Stationary_Map = require('../models/stationary_maps.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')



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
        res.json({msg:'unauthorized'})
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json(await Project.findById(req.params.id))
})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    let newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    })

    project = await Project.findById(req.params.id)

    if (await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.updateProject(req.params.id,newProject))
    }

    else{
        res.json({
            msg: 'unauthorized'
        })
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
        res.json({
            msg: 'unauthorized'
        })
    }

})

module.exports = router