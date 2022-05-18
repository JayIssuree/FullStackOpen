// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URI)
.then(result => {
  console.log('connecting to', config.MONGODB_URI)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = config.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})