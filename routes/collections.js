const express = require('express')
const router = express.Router()
const Project = require('../models/projects.js')
const Stationary_Collection = require('../models/stationary_collections.js')
const Moving_Collection = require('../models/moving_collections.js')
const Survey_Collection = require('../models/survey_collections.js')
const Sound_Collection = require('../models/sound_collections.js')
const Nature_Collection = require('../models/nature_collections.js')
const Light_Collection = require('../models/light_collections.js')
const Boundaries_Collection = require('../models/boundaries_collections.js')
const Order_Collection = require('../models/order_collections.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')

const { BadRequestError, UnauthorizedError } = require('../utils/errors')


router.get('/moving/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.status(200).json(await Moving_Collection.findById(req.params.id)
                                                .populate('area')
                                                .populate('maps'))

})

router.get('/stationary/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.status(200).json(await Stationary_Collection.findById(req.params.id)
                                                .populate('area')
                                                .populate('maps'))

})


// router.get('/sound/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
//     res.status(200).json(await Sound_Collection.findById(req.params.id)
//                                                 .populate('area')
//                                                 .populate('maps'))

// })

// router.get('/nature/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
//     res.status(200).json(await Nature_Collection.findById(req.params.id)
//                                                 .populate('area')
//                                                 .populate('maps'))

// })

// router.get('/light/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
//     res.status(200).json(await Light_Collection.findById(req.params.id)
//                                                 .populate('area')
//                                                 .populate('maps'))

// })

// router.get('/boundaries/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
//     res.status(200).json(await Boundaries_Collection.findById(req.params.id)
//                                                 .populate('area')
//                                                 .populate('maps'))

// })

// router.get('/order/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
//     res.status(200).json(await Order_Collection.findById(req.params.id)
//                                                 .populate('area')
//                                                 .populate('maps'))

// })

router.get('/survey/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.status(200).json(await Survey_Collection.findById(req.params.id)
                                                .populate('area')
                                                .populate('surveys'))

})

module.exports = router