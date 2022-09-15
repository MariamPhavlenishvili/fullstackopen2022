import { useSelector, useDispatch } from 'react-redux'
import BlogDetails from './BlogDetails'
import Togglable from '../components/Togglable'
import CreateBlog from '../components/CreateBlog'

import { Link } from "react-router-dom";

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs)
  
  return (
    <>
      <Togglable id="togglabe" buttonLabel="new blog">
          <CreateBlog />
        </Togglable>
      <div>
          {blogs && blogs.map(blog =>
              <div key={blog.id} style={blogStyle}>
                <div>
                <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
                </div>
              </div>
          )}
      </div>
    </>
)}

export default BlogList