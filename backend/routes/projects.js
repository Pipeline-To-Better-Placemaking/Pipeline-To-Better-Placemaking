const express = require('express')
const config = require('../utils/config')
const router = express.Router()

const Project = require('../models/projects.js')
const Team = require('../models/teams.js')
const Area = require('../models/areas.js')
const Standing_Point = require('../models/standing_points.js')
const Stationary_Collection = require('../models/stationary_collections.js')
const Moving_Collection = require('../models/moving_collections.js')
const Survey_Collection = require('../models/survey_collections.js')

const passport = require('passport')
const jwt = require('jsonwebtoken')
const emailer = require('../utils/emailer')

const { models } = require('mongoose')
const { stationaryToCSV, movingToCSV } = require('../utils/csv_conversions')
const { BadRequestError, InternalServerError, UnauthorizedError } = require('../utils/errors')

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
    res.json(await Project.findById(req.params.id)
                          .populate('area')
                          .populate('subareas')
                          .populate('standingPoints')
                          .populate('stationaryCollections')
                          .populate('movingCollections')
                          .populate('surveyCollections')
            )
})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user   
    project = await Project.findById(req.params.id)
    let newProject = new Project({
        title: (req.body.title ? req.body.title : project.title),
        description: (req.body.description ? req.body.description : project.description),
        area: (req.body.area ? req.body.area : project.area),
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

    if(await Team.isUser(project.team,user._id)){
        
        if(req.body.points.length < 3)
            throw new BadRequestError('Areas require at least three points')
        
            let newArea = new Area({
            title: req.body.title,
            points: req.body.points
        })

        newArea.save()

        await Project.addArea(project._id,newArea._id)
        res.json(newArea)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/areas/:areaId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    area = await Area.findById(req.params.areaId)
    
    if(await Team.isAdmin(project.team,user._id)){

        let newArea = new Area({
            title: (req.body.title ? req.body.title :  area.title),
            points: (req.body.points ? req.body.points : area.points)
        })

        res.status(201).json(await Area.updateArea(req.params.areaId, newArea))
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

    if(await Team.isUser(project.team,user._id)){   

        let newPoint = new Standing_Point({
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            title: req.body.title
        })
        newPoint.save()
       
        await Project.addPoint(project._id,newPoint._id)
        res.json(newPoint)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/standing_points/:pointId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    point = await Standing_Point.findById(req.params.pointId)

    if(await Team.isAdmin(project.team,user._id)){
    
        let newPoint = new Standing_Point({
            title: (req.body.title ? req.body.title :  point.title),
            latitude: (req.body.latitude ? req.body.latitude : point.latitude),
            longitude: (req.body.longitude ? req.body.longitude : point.longitude)
        })
  
        res.status(201).json(await Standing_Point.updatePoint(req.params.pointId, newPoint))
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

router.post('/:id/stationary_collections', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)

    if(await Team.isUser(project.team,user._id)){   

        let newCollection = new Stationary_Collection({
            title: req.body.title,
            date: req.body.date,
            area: req.body.area,
            duration: req.body.duration
        })

        await newCollection.save()
       
        await Project.addStationaryCollection(project._id,newCollection._id)
        res.json(newCollection)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/stationary_collections/:collectionId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    collection = await Stationary_Collection.findById(req.params.collectionId)

    if(await Team.isAdmin(project.team,user._id)){
        
        let newCollection = new Stationary_Collection({
                title: (req.body.title ? req.body.title : collection.title),
                date: (req.body.date ? req.body.date : collection.date),
                area: (req.body.area ? req.body.area : collection.area),
                duration: (req.body.duration ? req.body.duration : collection.duration)
        })
  
        res.status(201).json(await Stationary_Collection.updateCollection(req.params.collectionId, newCollection))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.delete('/:id/stationary_collections/:collectionId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.deleteStationaryCollection(project._id, req.params.collectionId))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.post('/:id/moving_collections', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)

    if(await Team.isUser(project.team,user._id)){   

        let newCollection = new Moving_Collection({
            title: req.body.title,
            date: req.body.date,
            area: req.body.area,
            duration: req.body.duration
        })

        await newCollection.save()
       
        await Project.addMovingCollection(project._id,newCollection._id)
        res.json(newCollection)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/moving_collections/:collectionId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    collection = await Moving_Collection.findById(req.params.areaId)

    if(await Team.isAdmin(project.team,user._id)){
    
        
        let newCollection = new Moving_Collection({
                title: (req.body.title ? req.body.title : collection.title),
                date: (req.body.date ? req.body.date : collection.date),
                area: (req.body.area ? req.body.area : collection.area),
                duration: (req.body.duration ? req.body.duration : collection.duration)
        })
  
        res.status(201).json(await Moving_Collection.updateCollection(req.params.collectionId, newCollection))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.delete('/:id/moving_collections/:collectionId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.deleteMovingCollection(project._id,req.params.collectionId))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.post('/:id/survey_collections', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)

    if(await Team.isUser(project.team,user._id)){   

        let newCollection = new Survey_Collection({
            title: req.body.title,
            date: req.body.date,
            duration: req.body.duration
        })

        await newCollection.save()
       
        await Project.addSurveyCollection(project._id,newCollection._id)
        res.json(newCollection)
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.put('/:id/survey_collections/:collectionId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    collection = await Survey_Collection.findById(req.params.areaId)

    if(await Team.isAdmin(project.team,user._id)){
    
        let newCollection = new Survey_Collection({
                title: (req.body.title ? req.body.title : collection.title),
                date: (req.body.date ? req.body.date : collection.date),
                duration: (req.body.duration ? req.body.duration : collection.duration)
        })
  
        res.status(201).json(await Survey_Collection.updateCollection(req.params.collectionId, newCollection))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.delete('/:id/survey_collections/:collectionId', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.params.id)
    if(await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Project.deleteSurveyCollection(project._id,req.params.collectionId))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
})

router.get('/:id/export', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    stationaryData = await Project.findById(req.params.id)
                          .populate('area')
                          .populate([
                            {
                                path:'stationaryCollections',
                                model:'Stationary_Collections',
                                populate: [{
                                    path: 'maps',
                                    model: 'Stationary_Maps',
                                    select: 'date data',
                                    populate: {
                                        path: 'standingPoints',
                                        model: 'Standing_Points'
                                    }
                                   },{
                                    path: 'area',
                                   }]
                             }])
    movingData = await Project.findById(req.params.id)
                            .populate('area')
                            .populate([
                            {
                                path:'movingCollections',
                                model:'Moving_Collections',
                                populate: [{
                                    path: 'maps',
                                    model: 'Moving_Maps',
                                    select: 'date data',
                                    populate: {
                                        path: 'standingPoints',
                                        model: 'Standing_Points'
                                    }
                                    },{
                                    path: 'area',
                                    }]
                                }])

    const emailHTML = `
        <h3>Hello from 2+ Community!</h3>
        <p>You have requested a copy of your stationary data. Attatched is a csv formated file representing your data.</p>

    `
    
    const mailOptions = {
        from: `"2+ Community" <${config.PROJECT_EMAIL}>`,
        to: req.user.email,
        subject: 'Stationary Data Export',
        text: `Attatched is your data`,
        html: emailHTML,
        attachments: [
            {
                filename: stationaryData.title + '_stationary.csv',
                content: stationaryToCSV(stationaryData)
            },
            {
                filename: stationaryData.title + '_moving.csv',
                content:movingToCSV(movingData)

            }
        ]
    }

    if (!await emailer.sendEmail(mailOptions)) {
        throw new InternalServerError('The server encountered a problem')
    }

    res.status(200).json({
        success: true,
        message: 'Data export sent; please check your email'
    })
})

module.exports = router
