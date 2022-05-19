const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    let user = await User.find({ name: request.body.author })
    if(user.length === 0){
        return response.status(400).json({error: "Cannot find author from given name"})
    }
    user = user[0]
    request.body.user = user._id
    const blog = new Blog(request.body)
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    try {
        const savedBlogResponse = await blog.save()
        return response.status(201).json(savedBlogResponse)
    } catch (error) {
        return response.sendStatus(400)
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