const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const express = require('express')
const router = express.Router()

const { UnauthorizedError } = require('../utils/errors')

// Login -
// Generates and responds w/ json web token if email and password match a user
// Responds w/ 401 otherwise
router.post('/', async (req,res,next) => {
    const email = req.body.email

    const password = req.body.password

    // Email or password is missing
    if (!email || !password) {
        throw new UnauthorizedError('Invalid email or password')
    }

    const user = await User.findUserByEmail(email)
    const passwordMatch = (user === null)
        ? false // User was not found
        : await User.comparePassword(password, user.password)

    // Email or password is invalid
    if (!(user && passwordMatch)) {
        throw new UnauthorizedError('Invalid email or password')
    }

    var shortUser = {
        _id : user._id,
        email : user.email
    }
    const token = jwt.sign(shortUser, config.PRIVATE_KEY, {
        expiresIn: 86400 //1 day
    })

    const fullUser = await User.findById(shortUser._id)
    .select('-password -verification_code -verification_timeout')
    .populate('teams', 'title')
    .populate('invites','title')

    res.status(200).json({
        success: true,
        token: token,
        user: fullUser            
    })
})

// Logout -

module.exports = router