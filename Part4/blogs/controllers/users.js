const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.get('/', async(request, response) => {
    const allUsers = await User.find({}).populate('blogs', {title: 1})
    response.json(allUsers)
})

usersRouter.post('/', async(request, response) => {
    const { username, name, password } = request.body

    if(password.length <= 2){
        return response.status(400).json({error: "Password too short"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    })
    try {
        const savedUser = await user.save()
        return response.status(201).json(savedUser)
    } catch (error) {
        return response.status(400).json({error: "Username is too short or not unique"})
    }

})

module.exports = usersRouter