const app = require('../app')
const supertest = require('supertest')
const th = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')

const testUser = {
    username: 'JohnDoe',
    email: 'test@yahoo.com',
    password: 'admin'
}

describe('When logging in', () => {

    beforeEach(async () => {
        // Begin each test with a known user record in the database

        await User.deleteMany({})
        const user = new User(testUser)
        await user.save()
    })
    
    test('login succeeds with valid username and password', async () => {

        const response = await api
            .post('/login')
            .send(testUser)
            // Confirm successful login
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Confirm that response contains username
        expect(response.body).toMatchObject({ username: testUser.username })
        
        // Confirm that response contains authorization token
        expect(response.body.token)

        // Confirm that the token is accurate
        expect(response.body.token).toMatch(th.getToken(testUser.username))
    })

    test('login fails (401) with invalid username', async () => {
        const badCreds = {
            username: 'NotAUser',
            password: 'admin'
        }

        const response = await api
            .post('/login')
            .send(badCreds)
            // Confirm unsuccessful login
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('login fails (401) with invalid password', async () => {
        const badCreds = {
            username: 'JohnDoe',
            password: 'wrong'
        }

        const response = await api
            .post('/login')
            .send(badCreds)
            // Confirm unsuccessful login
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})