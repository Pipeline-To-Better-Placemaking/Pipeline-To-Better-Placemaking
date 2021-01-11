const express = require('express')
const xoauth2 = require('xoauth2')
const nodemailer = require('nodemailer')
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

    if( await User.getUserByEmail(req.body.email) != null){
        return res.status(401).json({
            success: false,
            msg: 'Email already in use'
        })
    }

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

    var shortUser = {
        _id : user._id,
        email : user.emai
    }
    const token = jwt.sign(shortUser, config.PRIVATE_KEY, {
        expiresIn: 86400 //1 day
    })

    res.status(200).json({
        success: true,
        token: token,
        user: {
            id: user.__id,
            name: user.firstname,
            email: user.email
        }
    })
})

router.get('/profile', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.json({user: await req.user})
})

router.put('/profile', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        instituion: req.body.instituion,
    })

    User.updateUser(await req.user, newUser)

    res.status(200).json({
        success: true
    })
})

router.get('/verification',passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    let userId = await req.user._id
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

router.get('/invites', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    res.status(200).json({
        invites: await User.getInvites(await req.user._id)
    })
})

router.post('/invites', passport.authenticate('jwt',{session:false}), async (req, res, next) => {

    for( response in req.body.responses){
        if (response.accept == true){
            //accept the invite by adding the user to the team
            //will add once I have the function written
        }
        User.deleteInvite(await req.user._id,response.teamId)
    }

})

module.exports = router