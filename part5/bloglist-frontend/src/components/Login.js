import { useState, useEffect } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, setMessage}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          })
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          ) 
          blogService.setToken(user.token)
          console.log(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
            console.log(exception.response.data.error)
            setMessage({
                status: 'error',
                message: `${exception.response.data.error}`
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
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        id="username"
                />
                </div>
                <div>
                password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        id="password"
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default Login