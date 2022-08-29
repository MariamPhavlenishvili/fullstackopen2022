import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({setBlogs, blogs, setMessage}) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const createBlog = async (event) => {
        event.preventDefault();

        try {
            const blog = await blogService.create({
                title,
                author,
                url,
            });
            setBlogs(blogs.concat(blog));
            setMessage({
                status: 'succsess',
                message: `a new blog ${title} by ${author} added`
            })
        } catch (err) {
            setMessage({
                status: 'error',
                message: `${err}`
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

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
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
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlog