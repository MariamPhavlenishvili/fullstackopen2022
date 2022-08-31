import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const handleView = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const likes = blog.likes + 1
    const updated = {...blog, likes}
    updateLikes(blog.id, updated) 
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {!visible ? <button onClick={handleView}>view</button> :
          <>
            <div className='blog-details'>
              <button onClick={handleView}>hide</button>
              <div><a href={blog.url}>{blog.url}</a> </div>
              <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
              <div>{blog.user.username}</div>
              <button onClick={handleDelete}>Romove</button>
            </div>
          </>
        }
      </div>
  </div>
)}

export default Blog