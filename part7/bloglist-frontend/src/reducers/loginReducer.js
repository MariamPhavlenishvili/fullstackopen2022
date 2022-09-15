import { createSlice } from "@reduxjs/toolkit";
import { createNotification } from "./notificationReducer";

import loginService from "../services/login";
import userService from '../services/user'

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
      login(state, action) {
        return action.payload;
      },
      logout(state, action) {
        return action.payload;
      },
    },
});

export const { login, logout } = loginSlice.actions;

export const loginUser = (credentials) => {
    return async dispatch => {
        const { username, password } = credentials;

        try {
            const user = await loginService.login({
                username,
                password,
            });
            userService.setUser(user);
            dispatch(login(user));
          } catch (exception) {
            dispatch(createNotification(`${exception.response.data.error}`, 'error', 5));
          }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(logout(null));
    }
}

export default loginSlice.reducer