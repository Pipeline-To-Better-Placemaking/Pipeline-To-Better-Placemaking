const express = require('express')
const router = express.Router()
const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')



router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    

    if(Team.isAdmin(req.body.team,user._id)){
    
        let newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            points: req.body.points,
            team: req.body.team
        })

        const project = await Project.addProject(newProject)
        await Team.addProject(req.body.team,project._id)

        res.status(201).json(project)

    }
    else{
        res.json('unauthorized')
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json(await Project.findById(req.params.id))
})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    let newTeam = new Team({
        title: req.body.title,
        description: req.body.description,
        public: req.body.public
    })

    if (await Team.isAdmin(req.params.id,user._id)){
        res.status(201).json(await Team.updateTeam(req.params.id,newTeam))
    }

    else{
        res.json({
            msg: unauthorized
        })
    }
    
})

module.exports = router