const Router = require('express').Router()
const Blog = require('../models/blog')

Router.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
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
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(err){
    next(err)
  }
})

Router.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  try {  
    response.json(blogs)
  } catch(err) {
    next(err)
  }
})

Router.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const result = await blog.save()

  try {
    response.status(201).json(result)
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

