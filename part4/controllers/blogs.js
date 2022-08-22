const Router = require('express').Router()
const Blog = require('../models/blog')

Router.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      }).catch(err => console.log(err))
})

Router.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(err => console.log(err))
})

module.exports = Router

