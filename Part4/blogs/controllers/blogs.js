const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const blog = new Blog(request.body)
    try {
        const savedBlogResponse = await blog.save()
        response.status(201).json(savedBlogResponse)
    } catch (error) {
        response.sendStatus(400)
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    try {
        await Blog.deleteOne({ _id: request.params.id })
        response.sendStatus(204)
    } catch (error) {
        response.sendStatus(400)
    }
})

blogsRouter.patch('/:id', async(request, response) => {
    try {
        const updatedBlogResponse = await Blog.updateOne({ _id: request.params.id}, request.body)
        response.status(200).json(updatedBlogResponse)
    } catch (error) {
        console.log(error)
    }
})

module.exports = blogsRouter