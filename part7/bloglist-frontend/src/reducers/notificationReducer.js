
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId = null;

export const createNotification = (message, status, secconds) => {
  return async (dispatch) => {
    dispatch(setNotification({
        message: message,
        status: status
    }));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(setNotification(null)), secconds * 1000);
  };
};

export default notificationSlice.reducer;