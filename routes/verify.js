const config = require('../utils/config')
const nodemailer = require('nodemailer')
const passport = require('passport')
const User = require('../models/users.js')
const xoauth2 = require('xoauth2')

const express = require('express')
const router = express.Router()

// Verify the email address with the given verification code
router.post('/', async (req, res, next) => {
    // Paramters are missing
    if (!req.query.email || !req.query.code) {
        return res.status(400).json({
            
        })
    }

    const user = User.getUserByEmail(req.query.email)
    // Email is not associated with an existing user
    if (!user) {
        return res.status(400).json({

        })
    }

    if (User.verifyEmail(user._id, req.query.code)){
        return res.status(200).json({
            msg:"Success"
        })
    }
    else{
        return res.status(403).json({
            msg:"Failiure"
        })
    }
})

// Generate a new email verification code and send an email to the user containing the new code
router.post('/newcode',passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    const code = await User.createVerification(req.user._id)
    // Code generation failed
    if (!code) {
        return res.status(401)
    }

    // Terminate early in testing mode so we don't end up sending a bunch of emails
    if (process.env.NODE_ENV === 'test') {
        return res.status(200)
    }

    const transporter = nodemailer.createTransport({
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

    const mailOptions = {
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

module.exports = router