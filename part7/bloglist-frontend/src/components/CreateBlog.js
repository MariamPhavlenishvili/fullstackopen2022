import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const CreateBlog = ({setBlogs, blogs}) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const dispatch = useDispatch()

    const handleCreateBlog = async (event) => {
        event.preventDefault();

        const newBlog = {
            title,
            author,
            url
        };
        
        dispatch(createBlog(newBlog));
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                />
                </div>
                <div>
                author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                url
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setURL(target.value)}
                    />
                </div>
                <button type="submit" id='create'>create</button>
            </form>
        </div>
    )
}

export default CreateBlog