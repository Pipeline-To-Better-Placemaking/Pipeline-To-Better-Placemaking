const express = require('express')
const router = express.Router()
const User = require('../models/users.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/register', async (req, res, next) => {
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

router.post('/authenticate', async (req,res,next) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.getUserByEmail(email)
    const passwordMatch = (user === null)
        ? false // User was not found
        : await User.comparePassword(password, user.password)

    if (!(user && passwordMatch)) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid email or password'
        })
    }

    const token = jwt.sign(user.toJSON(), config.PRIVATE_KEY, {
        expiresIn: 86400 //1 day
    })

    res.status(200).json({
        success: true,
        token: 'JWT' + token,
        user: {
            id: user.__id,
            name: user.firstname,
            email: user.email
        }
    })
})

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    res.json({user: req.user})
})



module.exports = router