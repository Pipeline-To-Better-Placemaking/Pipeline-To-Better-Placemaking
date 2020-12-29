const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/users.js')
const config = require('./config.js')

module.exports = function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.PRIVATE_KEY
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload._doc)
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if (err) {
                return done(err,false)
            }
            if (user) {
                return done(null,user)
            }
            else{
                return done(null, false)
            }
        })
    }))
}