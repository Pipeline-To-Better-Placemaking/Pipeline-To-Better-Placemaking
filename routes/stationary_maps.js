const express = require('express')
const router = express.Router()
const Map = require('../models/stationary_maps.js')
const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')

const { UnauthorizedError, BadRequestError } = require('../utils/errors')

router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.body.project)

    if(await Team.isAdmin(project.team,user._id)){
    
        let newMap = new Map({
            title: req.body.title,
            area: req.body.area,
            standingPoints: req.body.standingPoints,
            researchers: req.body.researchers,
            project: req.body.project,
            date: req.body.date,
            duration: project.stationaryDuration
        })

        const map = await Map.addMap(newMap)
        await Project.addActivity(req.body.project,map._id,'stationary')
        res.status(201).json(map)

    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    const map = await  Map.findById(req.params.id).populate('area').populate('standingPoints').populate('researchers','firstname')
    res.status(200).json(map)
})

router.put('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    user = await req.user
    if(map.researchers.length < map.maxResearchers)
        if(Team.isUser(project.team,user._id))
            return await Map.addResearcher(map._id,user._id)
        else
            throw new UnauthorizedError('You do not have permision to perform this operation')
    else 
        throw new BadRequestError('Research team is already full')

})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    
    let newMap = new Map({
        title: (req.body.title ? req.body.title : map.title),
        date: (req.body.date ? req.body.date : map.date),
        area: (req.body.area ? req.body.area : map.area),
        researchers: (req.body.reaserchers ? req.body.reaserchers : map.researchers),
        standingPoints: (req.body.standingPoints ? req.body.standingPoints : req.body.standingPoints)
    })

    project = await Project.findById(map.project)

    if (await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Map.updateMap(req.params.id,newMap))
    }

    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
    
})

router.delete('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    if(await Team.isAdmin(project.team,user._id)){
        res.json(await Project.removeActivity(map.project,map._id))
        await Map.deleteMap(map._id)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }

})

router.post('/:id/data', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    if(Map.isResearcher(map._id, user._id)){
        if(req.body.entries){
            for(var i = 0; i < req.body.entries.length; i++){
                await Map.addEntry(map._id,req.body.entries[i])
            }
            res.status(201).json(await Project.findById(req.params.id))
        }
        else{
            res.json(await Map.addEntry(map._id,req.body))
       }
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/data/:data_id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    mapId = req.params.id

    oldData = await Map.findData(mapId, req.params.data_id)

    const newData = {
        _id: oldData._id,
        location: (req.body.location ? req.body.location : oldData.location),
        age: (req.body.age ? req.body.age : oldData.age),
        posture: (req.body.posture ? req.body.posture : oldData.posture),
        activity: (req.body.activity ? req.body.activity : oldData.activity),
        time: (req.body.time ? req.body.time : oldData.time)
    }

    if (Map.isResearcher(mapId, user._id)){
        await Map.updateData(mapId,oldData._id,newData)
        res.status(201).json(await Map.findById(req.params.id))
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }  
})

router.delete('/:id/data/:data_id',passport.authenticate('jwt',{session:false}), async (req, res, next) => { 
    user = await req.user
    map = await Map.findById(req.params.id)
    if(Map.isResearcher(map._id, user._id)){
        res.json(await Map.deleteEntry(map._id,req.params.data_id))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

module.exports = router