const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('connecting to', config.MONGODB_URI)
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = app