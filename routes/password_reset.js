const express = require('express')
const router = express.Router()
const User = require('../models/users.js')
const emailer = require('../utils/emailer')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/', async (req, res, next) => {

    try{
        var user = await User.findUserByEmail(req.body.email)
        console.log(user)

        if (!user){ throw new UnauthorizedError('This email does not have a registered account') }

        const token = jwt.sign({ _id: user._id, email: user.email }, config.PRIVATE_KEY, {
            expiresIn: 86400 //1 day
        })

        site = 'http://p2bp.herokuapp.com'
        const link = `${site}/password_reset/${user._id}/${token}`

        await emailer.emailResetPassword(user.email, link)

    }
    catch(error){
        res.send("An error has occurred")
        console.log(error)
    }

    res.status(200).json({
        success: true,
        token: token,
        user: user 
    })

})

router.post('/:id/:token', async (req, res, next) => {
    
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