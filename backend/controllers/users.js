const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
    const { password, username, name } = req.body
    if (password.length < 3){
        return res.status(400).send('Please enter a password at least 3 characters long.')
    }
    //const body = req.body
   // console.log(password)
    const hash = await bcrypt.hash(password, 10)
    console.log(hash)
    const user = new User({
        username,
        name,
        hashPass: hash
    })

   const result = await user.save()
   return res.status(200).json(result)


})

usersRouter.get('/', async (req, res) => {
    let users = await User.find()
    return res.json(users)
})

module.exports = usersRouter