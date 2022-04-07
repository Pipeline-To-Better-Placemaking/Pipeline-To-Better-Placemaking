const config = require('../utils/config')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const User = require('../models/users.js')

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
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN
        },
        tls: {
            // Don't require cert if being run from localhost
            rejectUnauthorized: (process.env.NODE_ENV === 'dev') ? false : true
        }
    })

    return transporter
}

const sendEmail = async (mailOptions) => {
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

const sendVerificationCode = async (email, code) => {
    if (!code) {
        const user = await User.findUserByEmail(email)
        code = user.verification_code
    }

    const emailHTML = `
        <h3>Hello from 2+ Community!</h3>
        <p>Thank you for creating a Measuring Place account. Please enter the code below in the app to verify your email address.</p>

        <p><b>Your code is:</b> ${code}</p>
    `
    
    const mailOptions = {
        from: `"2+ Community" <${config.PROJECT_EMAIL}>`,
        to: email,
        subject: 'Email Verification',
        text: `Thank you for creating a Measuring Place account. 
            Please enter the following code in the app to verify your email address: ${code}`,
        html: emailHTML
    }

    return (await sendEmail(mailOptions))
}

module.exports = {
    sendEmail,
    sendVerificationCode
}