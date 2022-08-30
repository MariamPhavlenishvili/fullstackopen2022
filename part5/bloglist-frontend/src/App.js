import { useState, useEffect } from 'react'
import blogService from './services/blogs'


import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => { 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({
    status:'',
    notification: ''
})

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (exception) {
      setMessage({
        status: 'error',
        message: `error ${exception.response.data.error}`
      })
    } finally {
      setTimeout(() => {
          setMessage({
            status: '',
            message: ''
          })
      }, 5000)
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)

      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs)
      setMessage({
        status: 'success',
        message: 'deleted successfully'
      })
    } catch (exception) {
      setMessage({
        status: 'error',
        message: `error ${exception.response.data.error}`
      })
    } finally {
      setTimeout(() => {
          setMessage({
            status: '',
            message: ''
          })
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const allBlogs = blogs.sort(function(a,b) {
        return a.likes - b.likes;
      })
      setBlogs(allBlogs)
    }) 
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <>
        <Notification message={message}/>
        <Login setUser={setUser} setMessage={setMessage}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <div>{user.username} logged in <button onClick={handleLogout}>logout</button></div>
      <Togglable buttonLabel="new blog">
        <CreateBlog setBlogs={setBlogs} blogs={blogs} setMessage={setMessage}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App
