const config = require('../utils/config')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
    // Create an OAuth client
    const oauth2Client = new OAuth2(
        config.CLIENT_ID,
        config.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground' // Redirect URI
    )

    // Provide the refresh token
    oauth2Client.setCredentials({
        refresh_token: config.REFRESH_TOKEN
    })

    // Get an access token
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((error, token) => {
            if (error) {
                console.error(error)
                reject({ message: 'Could not create access token' })
            }
            else resolve(token)
        })
    })

    // Create the transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.PROJECT_EMAIL,
            accessToken,
            clientId: config.CLIENT_ID,
            clientSecret: config.clientSecret,
            refreshToken: config.REFRESH_TOKEN
        },
        tls: {
            // Don't require cert if being run from localhost
            rejectUnauthorized: (process.env.NODE_ENV === 'dev') ? false : true
        }
    })

    return transporter
}

module.exports.sendEmail = async (mailOptions) => {
    try {
        const transporter = await createTransporter()
        await transporter.sendMail(mailOptions)
        console.log(`Sent email to ${mailOptions.to}`)
    } catch (error) {
        console.error(error)
        return false
    }

    return true
}