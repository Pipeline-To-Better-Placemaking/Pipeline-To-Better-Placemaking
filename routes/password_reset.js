const express = require('express')
const passport = require('passport')
const Team = require('../models/teams.js')
const router = express.Router()
const User = require('../models/users.js')
const emailer = require('../utils/emailer')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/', async (req, res, next) => {

    try{
        var user = await User.find({ email:  req.body.email })

        if (!user){ return res.status(400).send("This email does not have a registered account") }

        const token = jwt.sign({ _id: user._id, email: user.email }, config.PRIVATE_KEY, {
            expiresIn: 86400 //1 day
        })

        site = 'http://p2bp.herokuapp.com'

        const link = `${site}/password_reset.js/${user._id}/${token}`

        await emailer.emailResetPassword(user.email, link)

        res.send("password reset link sent to your email account");


    }
    catch(error){
        res.send("An error has occurred")
        console.log(error)
    }

    res.status(200).json(user)

})

router.post('/:id/:token', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    
    try{
        user = await User.findById(req.params.id)

        // Check password
        if (! await User.testPassword(req.body.password)) {
            throw new BadRequestError('Missing or invalid field: password')
        }
        newPassword = await User.createPasswordHash(req.body.password)

        user.password = newPassword
        user.save()
    }
    catch(error){
        res.send("An error has occured")
        console.log(error)
    }

    res.status(200).json(user)
})

module.exports = router