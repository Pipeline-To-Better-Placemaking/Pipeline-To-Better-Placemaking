const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const th = require('./test_helper')
const api = supertest(app)

const User = require('../models/users')

const baseUrl = '/api/users/authenticate'

const testUser = {
    email: 'test@yahoo.com',
    password: '1#Aadmin'
}

describe('When logging in', () => {

    beforeEach(async () => {
        // Begin each test with a known user record in the database

        await User.deleteMany({})
        const user = new User({
            firstname: 'John',
            lastname: 'Doe',
            email: testUser.email,
            password: testUser.password
        })
        await User.addUser(user)
    })
    
    test('login succeeds with valid email and password', async () => {

        const response = await api
            .post(baseUrl)
            .send(testUser)
            // Confirm successful login
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Confirm that response contains email
        expect(response.body).toMatchObject({ user: { email: testUser.email } })
        
        // Confirm that response contains authorization token
        expect(response.body.token)

        // Confirm that the token is accurate
        const user = await User.getUserByEmail(testUser.email)
        expect(response.body.token).toMatch(th.getToken(user))
    })

    test('login fails (401) with invalid email', async () => {
        const badCreds = {
            email: 'notauser@yahoo.com',
            password: testUser.password
        }

        const response = await api
            .post(baseUrl)
            .send(badCreds)
            // Confirm unsuccessful login
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('login fails (401) with invalid password', async () => {
        const badCreds = {
            email: testUser.email,
            password: 'wrong'
        }

        const response = await api
            .post(baseUrl)
            .send(badCreds)
            // Confirm unsuccessful login
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
    app.close()
})