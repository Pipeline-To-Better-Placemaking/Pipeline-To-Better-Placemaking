const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

    next(error)
}

module.exports = {
    errorHandler
} 