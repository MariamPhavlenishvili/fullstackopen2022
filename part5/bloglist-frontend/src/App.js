import { useState, useEffect } from 'react'
import blogService from './services/blogs'


import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
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
      <CreateBlog setBlogs={setBlogs} blogs={blogs} setMessage={setMessage}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App
