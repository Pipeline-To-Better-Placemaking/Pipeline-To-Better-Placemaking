const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const th = require('./test_helper')
const User = require('../models/users')

const baseUrl = '/api/users'

describe('When creating a new user account', () => {

    beforeEach(async () => {
        // Begin each test with an empty database
        await User.deleteMany({})
    })

    test('creation succeeds with valid information', async () => {
        const usersBefore = await th.getUsers()
        
        const newUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'test@yahoo.com',
            password: '!1Abcdef'
        }

        const response = await api
            .post(baseUrl)
            .send(newUser)
            // Confirm success
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await th.getUsers()
        // Check if there is now one more user than before
        expect(usersAfter).toHaveLength(usersBefore.length + 1)

        // Check if the user is in the database
        expect(usersAfter).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email
                })
            ])
        )
    })
})

afterAll(() => {
    mongoose.connection.close()
    app.close()
})