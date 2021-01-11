const express = require('express')
const xoauth2 = require('xoauth2')
const nodemailer = require('nodemailer')
const router = express.Router()
const User = require('../models/users.js')
const passport = require('passport')
const config = require('../utils/config')

// Create a new user
router.post('/register', async (req, res, next) => {
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        instituion: req.body.instituion,
        email: req.body.email,
        password: req.body.password
    })

    if( await User.getUserByEmail(req.body.email) != null){
        return res.status(401).json({
            success: false,
            msg: 'Email already in use'
        })
    }

    const user = await User.addUser(newUser)
    res.status(201).json(user)
})

// Get user info
router.get('/profile', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json({user: await req.user})
})

// Update user info
router.post('/profiles', passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    user = await req.user

    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        instituion: req.body.instituion
    })

    user = await User.updateUser(user._id, newUser)

    res.status(200).json(user)
})

// Send verification email
router.get('/verification',passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    let user = await req.user
    userId = user._id
    code = await User.createVerification(userId)


    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: config.PROJECT_EMAIL,
                clientId: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                refreshToken: config.REFRESH_TOKEN, 
                accessToken: config.ACCESS_TOKEN
            })
        }
    })

    var mailOptions = {
        from: config.PROJECT_EMAIL,
        to: await req.user.emai,
        subject: "Email Verification",
        text: "Hello from Place Makers, your verification code is: \n" + code + "\n Thanks!"
    }

    transporter.sendMail(mailOptions, function(error,info){
        if (error) {
            console.log(error)
            res.json({msg:'error'})
        }
        else{
            console.log("message sent")
            res.status(200)
        }
    })

})

// Verify user's email
router.post('/verification', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    var correct = User.verifyEmail(await req.user._id, await req.body.code)
    if (correct){
        res.status(200).json({
            msg:"Success"
        })
    }
    else{
        res.status(401).json({
            msg:"Failiure"
        })
    }
})

// Get user's invites
router.get('/invites', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.status(200).json({
        invites: await User.getInvites(await req.user._id)
    })
})

// Accept invite
router.post('/invites', passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    let user = await req.user

    for( response in req.body.responses){
        if (response.accept == true){
            //accept the invite by adding the user to the team
            //will add once I have the function written
        }
        User.deleteInvite(await user._id,response.teamId)
    }

})

module.exports = router