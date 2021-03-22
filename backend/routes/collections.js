const express = require('express')
const router = express.Router()
const Project = require('../models/projects.js')
const Stationary_Collection = require('../models/stationary_collections.js')
const Moving_Collection = require('../models/moving_collections.js')
const Survey_Colelction = require('../models/survey_collections.js')
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
router.get('/survey/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.status(200).json(await Stationary_Collection.findById(req.params.id)
                                                .populate('area'))

})

module.exports = router