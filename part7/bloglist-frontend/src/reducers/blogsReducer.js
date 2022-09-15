import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
        state.push(action.payload);
    },
    updateBlog(state, action) {
        const updatedBlog = action.payload;
        const { id } = updatedBlog;
        return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    removeBlog(state, action) {
        const id = action.payload;
        return state.filter((blog) => blog.id !== id);
    }
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = await blogs.sort(function(a,b) {
            return b.likes - a.likes;
        })

      dispatch(setBlogs(sortedBlogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
      try {
        const newBlog = await blogService.create(blog);
        dispatch(appendBlog(newBlog));
        dispatch(createNotification(`New anecdote added: ${blog.title}`, 'success', 5));
      } catch (error) {
        dispatch(createNotification(`${error}`, 'error', 5));
      }
    };
};

export const updateLikes = (id, blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.update(id, blog);
            dispatch(updateBlog(updatedBlog));
        } catch (exception) {
            dispatch(createNotification(`${exception.response.data.error}`, 'error', 5));
        }
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            const deletedBlog = await blogService.remove(id)
            dispatch(removeBlog(deletedBlog))
            dispatch(createNotification(`deleted successfully`, 'success', 5));
        } catch (exception) {
            dispatch(createNotification(`${exception.response.data.error}`, 'error', 5));
        }
    }
}

export default blogSlice.reducer;