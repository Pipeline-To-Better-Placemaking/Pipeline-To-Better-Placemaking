const express = require('express')
const router = express.Router()
const Map = require('../models/stationary_maps.js')
const Project = require('../models/projects.js')
const Stationary_Collection = require('../models/stationary_collections.js')
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
        
        if(req.body.timeSlots)
            for(var i = 0; i < req.body.timeSlots.length; i++){
                var slot = req.body.timeSlots[0]

                let newMap = new Map({
                    title: slot.title,
                    standingPoints: slot.standingPoints,
                    researchers: slot.researchers,
                    project: req.body.project,
                    sharedData: req.body.collection,
                    date: slot.date,
                    maxResearchers: slot.maxResearchers
                })

                const map = await Map.addMap(newMap)
                await Stationary_Collection.addActivity(req.body.collection, map._id)

                res.status(201).json(await Stationary_Collection.findById(req.body.collection))

            }
    
        let newMap = new Map({
            title: req.body.title,
            standingPoints: req.body.standingPoints,
            researchers: req.body.researchers,
            project: req.body.project,
            sharedData: req.body.collection,
            date: req.body.date, 
            maxResearchers: req.body.maxResearchers
        })

        const map = await Map.addMap(newMap)
        await Stationary_Collection.addActivity(req.body.collection,map._id)
        res.status(201).json(map)

    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    const map = await  Map.findById(req.params.id)
                           .populate('standingPoints')
                           .populate('researchers','firstname lastname')
                           .populate([
                               {
                                   path:'sharedData',
                                   model:'Stationary_Collections',
                                   select:'title duration',
                                   populate: {
                                    path: 'area',
                                    model: 'Areas'
                                   }
                                }])
                           
    res.status(200).json(map)
})

router.put('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    user = await req.user
    if(map.researchers.length < map.maxResearchers)
        if(Team.isUser(project.team,user._id)){
            res.status(200).json(Map.addResearcher(map._id,user._id))
        }
        else
            throw new UnauthorizedError('You do not have permision to perform this operation')
    else 
        throw new BadRequestError('Research team is already full')
})

router.delete('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    return res.status(200).json(await Map.removeResearcher(map._id,user._id))

})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    
    let newMap = new Map({
        title: (req.body.title ? req.body.title : map.title),
        date: (req.body.date ? req.body.date : map.date),
        area: (req.body.area ? req.body.area : map.area),
        standingPoints: (req.body.standingPoints ? req.body.standingPoints : map.standingPoints)
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