const express = require('express')
const router = express.Router()
const Map = require('../models/program_maps.js')
const Project = require('../models/projects.js')
const Program_Collection = require('../models/program_collections.js')
const Team = require('../models/teams.js')
const Floor = require('../models/program_floors.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')


const { UnauthorizedError, BadRequestError } = require('../utils/errors')

//route creates new map(s).  If there are multiple time slots in test, multiple timseslots are created.
router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.body.project)

    if(await Team.isAdmin(project.team,user._id)){
        
        if(req.body.timeSlots)
            for(var i = 0; i < req.body.timeSlots.length; i++){
                var slot = req.body.timeSlots[0]

                let newMap = new Map({
                    title: slot.title,
                    researchers: slot.researchers,
                    project: req.body.project,
                    sharedData: req.body.collection,
                    date: slot.date,
                    maxResearchers: slot.maxResearchers,
                    data: req.body.data
                })

                //create new map with method from _map models and add ref to its parent collection.
                const map = await Map.addMap(newMap)
                await Program_Collection.addActivity(req.body.collection, map._id)

                res.status(201).json(await Program_Collection.findById(req.body.collection))
            }
           
        //note that program does not use any standing points

        let newMap = new Map({
            title: req.body.title,
            researchers: req.body.researchers,
            project: req.body.project,
            sharedData: req.body.collection,
            date: req.body.date, 
            maxResearchers: req.body.maxResearchers,
            data: req.body.data
        })
        const map = await Map.addMap(newMap)
        await Program_Collection.addActivity(req.body.collection,map._id)
        res.status(201).json(map)

    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }   
})

//route gets all map data, including any collection data.
router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    const map = await  Map.findById(req.params.id)
                           .populate('researchers','firstname lastname')
                           .populate([
                               {
                                   path:'sharedData',
                                   model:'Program_Collections',
                                   select:'title duration',
                                   populate: {
                                    path: 'area',
                                    model: 'Areas'
                                   }
                                }])
                           
    res.status(200).json(map)
})

//route signs team member up to a time slot.
router.put('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    user = await req.user
    if(map.researchers.length < map.maxResearchers)
        // adding an await in if statement below causes unwanted behavior.  Reason unkown
        if(Team.isUser(project.team,user._id)){
            res.status(200).json(await Map.addResearcher(map._id,user._id))
        }
        else
            throw new UnauthorizedError('You do not have permision to perform this operation')
    else 
        throw new BadRequestError('Research team is already full')
})

//route reverses sign up to a time slot.
router.delete('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    user = await req.user
    return res.status(200).json(await Map.removeResearcher(map._id,user._id))

})

//route edits time slot information when updating a map
router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    
    let newMap = new Map({
        title: (req.body.title ? req.body.title : map.title),
        date: (req.body.date ? req.body.date : map.date),
        maxResearchers: (req.body.maxResearchers ? req.body.maxResearchers : map.maxResearchers),
    })

    project = await Project.findById(map.project)


    if (await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Map.updateMap(req.params.id,newMap))
    }

    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
    
})

//route deletes a map from a test collection
router.delete('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    if(await Team.isAdmin(project.team,user._id)){
        res.json(await Program_Collection.deleteMap(map.sharedData,map._id)) 
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }

})

//route adds test data to its relevant time slot
router.post('/:id/data', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    if(Map.isResearcher(map._id, user._id)){
        if(req.body.entries){
            for(var i = 0; i < req.body.entries.length; i++){
                await Map.addEntry(map._id, req.body.entries[i])
            } 
            res.status(201).json(await Map.findById(map._id))
        }
        else{
            res.json(await Map.addEntry(map._id,req.body))
       }
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

//route edits the data object for any already created tested time slots.  Essentially redoing a test run for a time slot 
router.put('/:id/data/:data_id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    mapId = req.params.id


    if (Map.isResearcher(mapId, user._id)){

        oldData = await Map.findData(mapId, req.params.data_id)

        const newData = {
            _id: oldData._id,
            numFloors: (req.body.numFloors ? req.body.numFloors : oldData.numFloors),
            perimeterPoints: (req.body.perimeterPoints ? req.body.perimeterPoints : oldData.perimeterPoints),
            time: (req.body.time ? req.body.time : oldData.time)
        }
    
        await Map.updateData(mapId,oldData._id,newData)
        res.status(201).json(await Map.findById(req.params.id))
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }  
})


//route adds floor data to its data object 
router.post('/:id/data/:data_id/floors', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    dataId = req.params.data_id

    if(Map.isResearcher(map._id, user._id)){
        if(req.body.entries){
            for(var i = 0; i < req.body.entries.length; i++){
                await Map.addFloor(map._id, dataId, req.body.entries[i])
            } 
            res.status(201).json(await Map.findById(map._id))
        }
        else{
            res.json(await Map.addFloor(map._id, dataId, req.body))
       }
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

//route edits the floors object any already created tested time slots
router.put('/:id/data/:data_id/floors/:floors_id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    mapId = req.params.id
    dataId = req.params.data_id
    

    if (Map.isResearcher(mapId, user._id)){

        oldData = await Map.findFloor(mapId, dataId, req.params.floors_id)
        
        const newData = {
            _id: oldData._id,
            floorNum: (req.body.floorNum ? req.body.floorNum : oldData.floorNum),
            programCount: (req.body.programCount ? req.body.programCount : oldData.programCount),
        }
    
        await Map.updateFloor(mapId, dataId, oldData._id,newData)
        res.status(201).json(await Map.findById(req.params.id))
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }  
})

//route adds program data to its data object 
router.post('/:id/data/:data_id/floors/:floors_id/programs', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    dataId = req.params.data_id
    floorId = req.params.floors_id

    if(Map.isResearcher(map._id, user._id)){
        if(req.body.entries){
            for(var i = 0; i < req.body.entries.length; i++){
                await Map.addProgram(map._id, dataId, floorId, req.body.entries[i])
            } 
            res.status(201).json(await Map.findById(map._id))
        }
        else{
            res.json(await Map.addProgram(map._id, dataId, floorId, req.body))
       }
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

//route edits the program object any already created tested time slots
router.put('/:id/data/:data_id/floors/:floors_id/programs/programs_id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    mapId = req.params.id
    dataId = req.params.data_id


    if (Map.isResearcher(mapId, user._id)){

        //ask aj about this
        oldData = await Map.findData(mapId, req.params.data_id.floors_id.programs_id)

        const newData = {
            _id: oldData._id,
            points: (req.body.points ? req.body.points : oldData.points),
            programType: (req.body.programType ? req.body.programType : oldData.programType),
            color: (req.body.color ? req.body.programType : oldData.color)
        }
    
        await Map.updateFloor(mapId,oldData._id,newData)
        res.status(201).json(await Map.findById(req.params.id))
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }  
})

//route deletes an individual time slot from a map (data object) 
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