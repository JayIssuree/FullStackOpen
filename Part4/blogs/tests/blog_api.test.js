const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const blogAPIHelper = require('../utils/blog_api_helper')

beforeEach(async() => {
    await Blog.deleteMany({})
    const blogObjects = blogAPIHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('retrieving stored blogs', () => {

    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('the correct number of blogs are returned', async() => {
        const returnedBlogs = await api.get('/api/blogs')
        expect(returnedBlogs._body.length).toEqual(blogAPIHelper.initialBlogs.length)
    })
    
    test('the returned blogs have a unique identifier property of id', async() => {
        const returnedBlogs = await api.get('/api/blogs')
        returnedBlogs._body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })

})

describe('creating blogs', () => {

    test('posts a blog to the database', async() => {
        const newBlog = {
            title: "Example Title",
            author: "Example Author",
            url: "Example URL",
            likes: 69
        }
        const returnedBlogResponse = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const returnedBlog = returnedBlogResponse._body
        const returnedBlogs = await api.get('/api/blogs')
        expect(returnedBlogs._body).toEqual(expect.arrayContaining([returnedBlog]))
    
    })
    
    test('if a likes property is missing from the post request, it defaults to 0', async() => {
        const newBlog = {
            title: "Example Title",
            author: "Example Author",
            url: "Example URL",
        }
        const returnedBlogResponse = await api.post('/api/blogs').send(newBlog)
        const returnedBlog = returnedBlogResponse._body
        expect(returnedBlog.likes).toEqual(0)
    })
    
    test('returns status 400 Bad Request if the title is missing from the request', async() => {
        const newBlog = {
            author: "Example Author",
            url: "Example URL",
            likes: 69
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    
    test('returns status 400 Bad Request if the url is missing from the request', async() => {
        const newBlog = {
            title: "Example Title",
            author: "Example Author",
            likes: 69
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})

describe('deleting blogs', () => {

    test('deletes a blog from the given id', async() => {
        const returnedBlogs = await api.get('/api/blogs')
        const blogToDelete = returnedBlogs._body[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const newReturnedBlogs = await api.get('/api/blogs')
        expect(newReturnedBlogs._body).not.toEqual(expect.arrayContaining([blogToDelete]))
    })

})

describe('updating blogs', () => {
    
    test('updates a blogs likes', async() => {
        const returnedBlogs = await api.get('/api/blogs')
        const blogToUpdate = returnedBlogs._body[0]
        await api
            .patch(`/api/blogs/${blogToUpdate.id}`)
            .send({likes: 999})
            .expect(200)
        const newReturnedBlogs = await api.get('/api/blogs')
        const updatedBlog = newReturnedBlogs._body.find(blog => blog.id === blogToUpdate.id)
        expect(updatedBlog.title).toEqual(blogToUpdate.title)
        expect(updatedBlog.author).toEqual(blogToUpdate.author)
        expect(updatedBlog.url).toEqual(blogToUpdate.url)
        expect(updatedBlog.id).toEqual(blogToUpdate.id)
        expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes)
    })
    
    test('updates a blogs likes, title and url', async() => {
        const returnedBlogs = await api.get('/api/blogs')
        const blogToUpdate = returnedBlogs._body[0]
        await api
            .patch(`/api/blogs/${blogToUpdate.id}`)
            .send({likes: 999, title: "New Title", url: "New URL"})
            .expect(200)
        const newReturnedBlogs = await api.get('/api/blogs')
        const updatedBlog = newReturnedBlogs._body.find(blog => blog.id === blogToUpdate.id)
        expect(updatedBlog.id).toEqual(blogToUpdate.id)
        expect(updatedBlog.author).toEqual(blogToUpdate.author)
        expect(updatedBlog.title).not.toEqual(blogToUpdate.title)
        expect(updatedBlog.url).not.toEqual(blogToUpdate.url)
        expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes)
    })

})


afterAll(() => {
    mongoose.connection.close()
})
