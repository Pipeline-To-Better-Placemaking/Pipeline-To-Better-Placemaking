const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const th = require('./test_helper')
const User = require('../models/users')

const baseUrl = '/api/users'

const testUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'test@yahoo.com',
    password: '1#Aadmin'
}

describe('Model functions', () => {
    let id = null

    beforeAll(async () => {
        // Begin with a known user record in the database
        await User.deleteMany({})
        const user = new User({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
            email: testUser.email,
            password: testUser.password
        })
        const savedUser = await User.addUser(user)
        id = savedUser._id
    })

    describe('createVerification', () => {
        test('succeeds with a valid user id', async () => {
            let user = await User.findById(id)
            // User should not have a code before one is created
            expect(user.verification_code).not.toBeDefined()
            expect(user.verification_timeout).not.toBeDefined()

            const code = await User.createVerification(id)
            user = await User.findById(id)
            // User should now have a code
            expect(user.verification_code).toBeDefined()
            expect(user.verification_timeout).toBeDefined()
            expect(code).toEqual(user.verification_code)
        })

        test('fails with an invalid user id', async () => {
            let user = await User.findById(id)
            // User should not have a code before one is created
            expect(user.verification_code).not.toBeDefined()
            expect(user.verification_timeout).not.toBeDefined()

            const code = await User.createVerification('0000')
            // Code should not be generated if the user does not exist
            expect(code).not.toBeDefined()
            user = await User.findById(id)
            // User should still not have a code
            expect(user.verification_code).not.toBeDefined()
            expect(user.verification_timeout).not.toBeDefined()
        })
    })

    describe('verifyEmail', () => {
        test('succeeds with the correct verification code', async () => {
            let user = await User.findById(id)
            const code = await User.createVerification(id)
            // User's email address should not yet be verified
            expect(user.is_verified).toEqual(false)

            const success = await User.verifyEmail(id, code)
            expect(success).toEqual(true)
            // User's email address should now be verified
            user = await User.findById(id)
            expect(user.is_verified).toEqual(true)
        })

        test('fails with the incorrect verification code', async () => {
            const user = await User.findById(id)
            const code = await User.createVerification(id)
            const success = await User.verifyEmail(id, '0' + code)

            // Verification should fail
            expect(success).toEqual(false)
            expect(user.is_verified).toEqual(false)
        })

        test('fails with an invalid user id', async () => {
            const user = await User.findById(id)
            const code = await User.createVerification(id)
            const success = await User.verifyEmail('0' + String(id).slice(0, -1), code)

            // Verification should fail
            expect(success).toEqual(false)
            expect(user.is_verified).toEqual(false)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
    app.close()
})