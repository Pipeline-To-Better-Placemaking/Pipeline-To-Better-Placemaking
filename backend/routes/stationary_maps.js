const express = require('express')
const router = express.Router()
const Map = require('../models/stationary_maps.js')
const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')

router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.body.project)

    if(await Team.isAdmin(project.team,user._id)){
    
        let newMap = new Map({
            owner: req.body.owner,
            claimed: req.body.claimed,
            area: req.body.area,
            project: req.body.project,
            start_time: req.body.start_time,
            end_time: req.body.end_time

        })

        const map = await Map.addMap(newMap)

        await Project.addActivity(req.body.project,map._id,'stationary')

        res.status(201).json(map)

    }
    else{
        res.json({msg:'unauthorized'})
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json(await Map.findById(req.params.id))
})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    let newMap = new Map({
        owner: req.body.owner,
        claimed: req.body.claimed,
        start_time: req.body.start_time,
        end_time: req.body.end_time
    })

    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)

    if (await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.updateProject(req.params.id,newProject))
    }

    else{
        res.json({
            msg: 'unauthorized'
        })
    }
    
})

module.exports = router