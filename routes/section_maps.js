const express = require('express')
const router = express.Router()
const Map = require('../models/section_maps.js')
const Project = require('../models/projects.js')
const Section_Collection = require('../models/section_collections.js')
const Team = require('../models/teams.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')
const { UnauthorizedError, BadRequestError } = require('../utils/errors')

// imports required to use firebase
const { storage } = require('../utils/firebase_config')
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage') 
const { v4 } = require('uuid')

// cant let users decide name to own file, 
// have to append unique ending to file name
export const uploadMedia = () => {
    const mediaRef = ref(storage, `media_uploads/${mediaUpload.name + v4()}`)
    uploadBytes(mediaRef, mediaUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            
        })
    })
}

//route creates new map(s).  If there are multiple tags slots in test, multiple timseslots are created.
router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.body.project)

    if(await Team.isAdmin(project.team,user._id)){
        
        if(req.body.tagsSlots)
            for(var i = 0; i < req.body.tagsSlots.length; i++){
                var slot = req.body.tagsSlots[0]

                let newMap = new Map({
                    title: slot.title,
                    researchers: slot.researchers,
                    project: req.body.project,
                    sharedData: req.body.collection,
                    date: slot.date,
                    maxResearchers: slot.maxResearchers,
                })

                //create new map with method from _map models and add ref to its parent collection.
                const map = await Map.addMap(newMap)
                await Section_Collection.addActivity(req.body.collection, map._id)

                res.status(201).json(await Section_Collection.findById(req.body.collection))
            }
            
        //note that boundaries does not use any standing points

        let newMap = new Map({
            title: req.body.title,
            researchers: req.body.researchers,
            project: req.body.project,
            sharedData: req.body.collection,
            date: req.body.date, 
            maxResearchers: req.body.maxResearchers,
        })
        const map = await Map.addMap(newMap)
        await Section_Collection.addActivity(req.body.collection,map._id)
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
                                   other:'sharedData',
                                   model:'Section_Collections',
                                   select:'title duration',
                                   populate: {
                                    other: 'area',
                                    model: 'Areas'
                                   }
                                }])
                           
    res.status(200).json(map)
})

//route signs team member up to a tags slot.
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

//route reverses sign up to a tags slot.
router.delete('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    map = await Map.findById(req.params.id)
    project = await Project.findById(map.project)
    return res.status(200).json(await Map.removeResearcher(map._id,user._id))

})

//route edits tags slot information when updating a map
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
        res.json(await Section_Collection.deleteMap(map.sharedData,map._id)) 
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }

})

//route adds test data to its relevant tags slot
router.post('/:id/data', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    map = await Map.findById(req.params.id)
    if(Map.isResearcher(map._id, user._id)){
        if(req.body.entries){
            for(var i = 0; i < req.body.entries.length; i++){
                await Map.addEntry(map._id,req.body.entries[i])
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

//route edits any already created tested tags slots.  Essentially redoing a test run for a tags slot 
router.put('/:id/data/:data_id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    mapId = req.params.id

    if (Map.isResearcher(mapId, user._id)){

        oldData = await Map.findData(mapId, req.params.data_id)

        const newData = {
            _id: oldData._id,
            title: (req.body.title ? req.body.title : oldData.title),
            date: (req.body.date ? req.body.date : oldData.date),
            url_link: (req.body.url_link ? req.body.url_link : oldData.url_link),
            panoramic: (req.body.panoramic ? req.body.panoramic : oldData.panoramic),
            tags: (req.body.tags ? req.body.tags : oldData.tags),
            other: (req.body.other ? req.body.other : oldData.other)
        }
    
        await Map.updateData(mapId,oldData._id,newData)
        res.status(201).json(await Map.findById(req.params.id))
    }  
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }  
})

//route deletes an individual tags slot from a map
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