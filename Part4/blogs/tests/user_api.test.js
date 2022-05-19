const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')
const Blog = require('../models/blogs')

beforeEach(async() => {
    await User.deleteMany({})
})

describe('invalid users', () => {

    test('returns error if username is too short', async() => {
        const newUser = {
            username: "sr",
            name: "Example",
            password: "Password"
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response._body.error).toEqual("Username is too short or not unique")
    })

    test('returns error if username is not unique', async() => {
        const newUser = {
            username: "duplicate",
            name: "Example",
            password: "Password"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response._body.error).toEqual("Username is too short or not unique")
    })

    test('returns error if password is too short', async() => {
        const newUser = {
            username: "username",
            name: "Example",
            password: "st"
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response._body.error).toEqual("Password too short")
    })

})

describe('blogs', () => {

    test('displays blogs written by the user', async() => {
        const testUser = await new User({
            username: "WriterX",
            name: "Auther Cunningham",
            password: "PASSWORD"
        }).save()
        const newBlog = await new Blog({
            title: "TITLE",
            author: "Auther Cunningham",
            url: "poorl",
            user: testUser.id
        }).save()
        testUser.blogs = testUser.blogs.concat(newBlog._id)
        await testUser.save()
        const response = await api
            .get('/api/users')
        expect(response._body[0].blogs[0].title).toEqual(newBlog.title)
        expect(response._body[0].blogs[0].id).toEqual(newBlog.id)
        // expect(response._body.error).toEqual("Password too short")
    })

})

afterAll(() => {
    mongoose.connection.close()
})