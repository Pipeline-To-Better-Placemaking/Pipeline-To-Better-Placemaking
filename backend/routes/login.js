const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const express = require('express')
const router = express.Router()

// Login -
// Generates and responds w/ json web token if email and password match a user
// Responds w/ 401 otherwise
router.post('/', async (req,res,next) => {
    const email = req.body.email

    const password = req.body.password

    // Email or password is missing
    if (!email || !password) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid email or password'
        })
    }

    const user = await User.getUserByEmail(email)
    const passwordMatch = (user === null)
        ? false // User was not found
        : await User.comparePassword(password, user.password)

    // Email or password is invalid
    if (!(user && passwordMatch)) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid email or password'
        })
    }

    var shortUser = {
        _id : user._id,
        email : user.email
    }
    const token = jwt.sign(shortUser, config.PRIVATE_KEY, {
        expiresIn: 86400 //1 day
    })

    res.status(200).json({
        success: true,
        token: token,
        user: {
            id: user._id,
            name: user.firstname,
            email: user.email
        }
    })
})

// Logout -

module.exports = router