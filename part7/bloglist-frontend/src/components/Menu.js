import { Link } from "react-router-dom"
import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { grey } from "@mui/material/colors"


const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login);

    const padding = {
        padding: 5
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <div style={{background:"#B8B8B8", padding:"5px"}}>
          <Link to='/' style={padding}>blogs</Link>
          <Link to='/users' style={padding}>users</Link>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Menu