const express = require('express')
const passport = require('passport')
const Team = require('../models/teams.js')
const router = express.Router()
const User = require('../models/users.js')

const { BadRequestError } = require('../utils/errors.js')

// Create a new user
router.post('/', async (req, res, next) => {
    // Check password
    if (!req.body.password ||                       // Password must be given
        req.body.password.length < 8 ||             // Length must be >= 8 characters
        /\s/g.test(req.body.password) ||            // Must not contain any whitespace characters
        !/\d/g.test(req.body.password) ||           // Must contain at least one digit
        !/[!@#$%^&*]/g.test(req.body.password) ||   // Must contain at least one symbol
        !/[A-Z]/g.test(req.body.password)) {        // Must contain at least one uppercase letter
        throw new BadRequestError('Missing or invalid field: password')
    }

    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        instituion: req.body.instituion,
        email: req.body.email,
        password: req.body.password
    })

    const user = await User.addUser(newUser)
    res.status(201).json(user)
})

// Get user info -
// Return all info if the token matches the user id
// Return limited info otherwise
router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    // Make a query for the user, excluding the password field
    const user = await User.findById(req.params.id).select('-password').populate('teams', 'title')

    if (req.params.id === await req.user._id) {
        for(var i = 0; i < user.invites.length; i++){
            var id = user.invites[i]; 
            var teamName = (await Team.findById(user.invites[i])).team
            user.invites[i] = ({
                                team: id,
                                name: teamName
                              })  
        }
        return res.json(user)
    }

    // Remove invites as they should only be seen by the user
    delete user.invites
    res.status(200).json(user)
})

router.get('/', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    var user = await User.findById((await req.user)._id)
    for(var i = 0; i < user.invites.length; i++){
        var id = user.invites[i]; 
        var teamName = (await Team.findById(user.invites[i])).title
        user.invites[i] = ({
                            team: id,
                            name: teamName
                          })  
    }
    return res.status(200).json(user)
})

// Update user info
router.put('/', passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    user = await req.user

    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        instituion: req.body.instituion
    })

    user = await User.updateUser(user._id, newUser)

    res.status(200).json(user)
})

// Get user's invites
router.get('/invites', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    
    var user = await User.findById(await req.user._id)
    
    res.status(200).json({
        invites: await User.getInvites(await req.user._id)
    })
})

// Accept invite
router.post('/invites', passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    let user = await req.user

    for( i = 0; i < req.body.responses.length; i++){

        var response = req.body.responses[i]

        if (response.accept == true && user.invites.includes(response.team)){
            await Team.addUser(response.team,user._id)
            await User.addTeam(user._id, response.team)
        }
        await User.deleteInvite(user._id,response.team)
    }

    res.status(200).json(user)

})

module.exports = router