import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from "./reducers/blogsReducer"
import { logoutUser } from './reducers/loginReducer'
import userService from './services/user'


import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import Menu from './components/Menu'

import { login } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import Users from './components/Users'

import { Routes, Route, Link } from "react-router-dom";
import User from './components/User'
import BlogDetails from './components/BlogDetails'

const App = () => { 
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(login(userFromStorage));
    }
  }, []);

  if (user === null) {
    return (
      <>
        <Notification/>
        <Login/>
      </>
    )
  }

  return (
    <div>
      <Menu/>
      <h2>blogs</h2>
      <Notification/>
      {/* <div className='logged'>{user.username} logged in <button onClick={handleLogout}>logout</button></div> */}
      <Routes>
        <Route path='/' element={<BlogList/>} />
        <Route path='/blogs/:id' element={<BlogDetails/>} />
        <Route path='/users' element={<Users/>} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
