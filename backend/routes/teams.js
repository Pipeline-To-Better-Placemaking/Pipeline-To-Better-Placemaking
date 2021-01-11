const express = require('express')
const router = express.Router()
const Team = require('../models/teams.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')



router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    let newTeam = new Team({
        title: req.body.title,
        description: req.body.description,
        owner: user._id,
        admins: [user._id],
        users: [user._id],
        public: req.body.public
    })

    const team = await Team.addTeam(newTeam)
    res.status(201).json(team)
})

module.exports = router