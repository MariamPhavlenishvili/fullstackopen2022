import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLikes, removeBlog } from '../reducers/blogsReducer'
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((u) => u.id === id));
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch()

  const handleLike = () => {
    const updated = {...blog, likes: blog.likes + 1}
    dispatch(updateLikes(blog.id, updated))
  }

  const handleDelete = () => {
    dispatch(removeBlog(blog.id))
  }
  
  return (
            <div className='blog-details'>
              <h2>{blog.title}</h2>
              <div><a href={blog.url}>{blog.url}</a> </div>
              <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
              {blog.user && <div>Added by {blog.user.username}</div>}
              {blog.user && user.username === blog.user.username &&
              <button onClick={handleDelete}>Romove</button>}
            </div>

  )
}

export default BlogDetails