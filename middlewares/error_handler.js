const log = require('../utils/log')

module.exports = (error, req, res, next) => {
    log.error(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

    next(error)
}