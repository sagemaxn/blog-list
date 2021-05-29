const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user') 

// const getTokenFrom = req => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user')
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async (request, response, next) => {
    //logger.info(request)
    try{
    const {title, author, url, likes, userId} = request.body
    //console.log(' token')
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //console.log(req.test + "   test")
    if(!request.token || !request.decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    
    const blog = new Blog({
      title,
    author,
    url,
    likes: 0,
    user: user._id
    })
  
    const savedBlog = await blog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.json(savedBlog)
  }catch(error){
    next(error)
  }})

blogsRouter.delete('/', async (req, res, next) => {
  try{
  //const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!req.token || !req.decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.body.blogID)
  const user = req.user
  console.log('token-user')
  console.log(user.id.toString())
  console.log('blog-user')
  console.log(blog.user.toString())
  if(user.id.toString() !== blog.user.toString()){
    return res.status(401).json({ error: 'You are not the user who created this post' })
  }
  else{
  Blog.findByIdAndDelete(blog.id, function (err, blog) {
    if (err){
        res.status(401).send(err)
    }
    else{
      res.send(`${blog} has been deleted`)
    }
});
  }
}catch(error){
  next(error)
}})  
module.exports = blogsRouter