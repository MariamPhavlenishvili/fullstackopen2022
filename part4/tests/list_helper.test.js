const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

test('Blogs list length', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("blogs have id property named id instead of _id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((blog) => blog.id);

  for (const id of ids) {
    expect(id).toBeDefined();
  }
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "Mariam Pavlenishvili",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#supertest",
    likes: 25
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs).toContain(
    'async/await simplifies making async calls'
  )
})

test("if likes property is missing default is 0", async () => {
  const newBlog = {
    title: 'for testing',
    author: "Mariam Pavlenishvili",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#supertest",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb();
  expect(blogs[blogs.length - 1].likes).toBe(0);
});

test("returns 400 status code if title and url missing", async () => {
  const newBlog = {
    author: "Mariam Pavlenishvili",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
});

test("try to add user without password", async () => {
  const newUser = {
    username: "Jack Sparrow",
    name: "Jack"
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(response.body.error).toContain("username and password are required")
});

test("try to add user with less than 3 char password", async () => {
  const newUser = {
    username: "Jack Sparrow",
    name: "Jack",
    password: "aw"
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(response.body.error).toContain("username and password must be at least 3 characters long")
});

test("token not provided", async () => {
  const token = null

  const newBlog = {
    title: 'for testing',
    author: "Mariam Pavlenishvili",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#supertest",
    likes: 20
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("token invalid")
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },
          {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          },
          {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  
    ]
  
    test('get total likes', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(36)
    })

    test('most liked post', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })

    test('most blog posts', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('most liked author', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
  })