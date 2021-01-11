const config = require('../utils/config')
const nodemailer = require('nodemailer')
const User = require('../models/users.js')
const xoauth2 = require('xoauth2')

const express = require('express')
const router = express.Router()

// Send verification email
router.post('/newcode',passport.authenticate('jwt',{session:false}), async (req, res, next) => {

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
router.post('/submit', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
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

module.exports = router