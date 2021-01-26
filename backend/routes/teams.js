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
        users: [{user:user._id, role:'owner'}],
        public: req.body.public
    })

    const team = await Team.addTeam(newTeam)

    // Add the new team to the user's teams
    user.teams.push(team._id)
    user.save()

    res.status(201).json(team)
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json(await Team.findById(req.params.id).populate('projects', 'title'))
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