import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from "../reducers/loginReducer";

const Login = () => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username, password
        }

        dispatch(loginUser(credentials))
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