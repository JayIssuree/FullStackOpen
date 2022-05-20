const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const token = getTokenFrom(request)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (err){
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
  
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id,
    })
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
    const token = getTokenFrom(request)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (err){
        return response.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if(blog){
        if(blog.user.toString() === user._id.toString()){
            await Blog.deleteOne(blog)
            return response.sendStatus(204)
        } else {
            return response.status(400).json({error: "Cannot delete another users blog"})
        }
    } else {
        return response.status(400).json({error: "Invalid blog id"})
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