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

describe('When getting user info', () => {

    let id = null
    let token = null

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
        token = th.getToken(user)
    })

    test('all info is gotten when user\'s token is given', async () => {
        const response = await api
            .get(`${baseUrl}/${id}`)
            .set('Authorization', 'Bearer ' + token)
            // Confirm successful 
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Confirm that response contains user's info
        expect(response.body).toMatchObject({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
            email: testUser.email
        })
        expect(response.body.is_verified).toBeDefined()
        expect(response.body.invites).toBeDefined()
        expect(response.body.teams).toBeDefined()

        // Password should not be included
        expect(response.body.password).not.toBeDefined()
    })

    test('only public info is gotten when no token is given', async () => {
        const response = await api
            .get(`${baseUrl}/${id}`)
            // Confirm successful 
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Confirm that response contains user's info
        expect(response.body).toMatchObject({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
            email: testUser.email
        })
        expect(response.body.teams).toBeDefined()

        // Private info should not be included
        expect(response.body.is_verified).not.toBeDefined()
        expect(response.body.invites).not.toBeDefined()
        // Password should not be included
        expect(response.body.password).not.toBeDefined()
    })

    test('request fails (404) if user does not exist', async () => {
        await api
            .get(`${baseUrl}/1234`)
            // Confirm failure 
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

})

afterAll(() => {
    mongoose.connection.close()
    app.close()
})