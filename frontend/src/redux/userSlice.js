import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      isFetching: false,
      error: false,
      success: false,
      currentUser: null,
      isOnline: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.user = {};
      state.user.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.currentUser = action.payload;
      state.user.success = true;
    },
    getUserFailed: (state) => {
      state.user.isFetching = false;
      state.user.error = true;
    },
    updateUserStart: (state) => {
      state.user = {};
      state.user.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.currentUser = action.payload;
      state.user.success = true;
    },
    updateUserFailed: (state) => {
      state.user.isFetching = false;
      state.user.error = true;
    },
    deleteUserStart: (state) => {
      state.user = {};
      state.user.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.currentUser = action.payload;
      state.user.success = true;
    },
    deleteUserFailed: (state) => {
      state.user.isFetching = false;
      state.user.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
