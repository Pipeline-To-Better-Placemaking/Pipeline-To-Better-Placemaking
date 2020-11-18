const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        instituion: req.body.instituion,
        email: req.body.email,
        password: req.body.password
    })

    User.addUser(newUser, (err,user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'})
        }
        else{
            res.json({success: true, msg: 'User registered'})
        }
    })
})

router.post('/authenticate', (req,res,next) => {
    const email = req.body.email
    const password = req.body.password

    User.getUserByEmail(email, (err,user) => {
        if(err) throw err
        if(!user){
            return res.json({success: false, msg: 'User not found'})
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.PRIVATE_KEY, {
                    expiresIn: 86400 //1 day
                })

                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user.__id,
                        name: user.firstname,
                        email: user.email
                    }
                })
            }
            else {
                return res.json({success: false, msg: 'Wrong Password'})
            }
        })
    })
})

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    res.json({user: req.user})
})



module.exports = router