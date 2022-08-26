const Router = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

Router.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user')
  try {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end('blog not found')
    }
  } catch(err) {
    next(err)
  }
})

Router.delete('/:id', async (request, response, next) => {
  const token = await request.token;
  const user = await request.user;

  if (!token) {
    return response.status(401).json({ error: "token invalid" });
  }
  
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  try {
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: "unauthorized operation" });
    }
  } catch(err){
    next(err)
  }
})

Router.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user')

  try {  
    response.json(blogs)
  } catch(err) {
    next(err)
  }
})

Router.post('/', async (request, response, next) => {
  const body = await request.body
  const token = await request.token
  const user = await request.user

  if (!token) {
    return response.status(401).json({ error: "token invalid" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(err) {
    next(err)
  }
})

Router.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body
  Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  ).then((updatedBlog) => {
    response.json(updatedBlog)
  })
  .catch((error) => next(error))
  })

module.exports = Router

