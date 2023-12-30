import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: {
      isFetching: false,
      error: false,
      success: false,
      currentNotification: null,
    },
  },
  reducers: {
    getNotificationStart: (state) => {
      state.notification.isFetching = true;
    },
    getNotificationSuccess: (state, action) => {
      state.notification.isFetching = false;
      state.notification.currentNotification = action.payload;
      state.notification.success = true;
    },
    getNotificationFailed: (state) => {
      state.notification.isFetching = false;
      state.notification.error = true;
    },
    newNotificationStart: (state) => {
      state.notification.isFetching = true;
    },
    newNotificationSuccess: (state, action) => {
      state.notification.isFetching = false;
      state.notification.currentNotification = action.payload;
      state.notification.success = true;
    },
    newNotificationFailed: (state) => {
      state.notification.isFetching = false;
      state.notification.error = true;
    },
    markSeenNotificationStart: (state) => {
      state.notification.isFetching = true;
    },
    markSeenNotificationSuccess: (state) => {
      state.notification.isFetching = false;
      state.notification.isRead = true;
      state.notification.success = true;
    },
    markSeenNotificationFailed: (state) => {
      state.notification.isFetching = false;
      state.notification.error = true;
    },
    deleteNotificationStart: (state) => {
      state.notification.isFetching = true;
    },
    deleteNotificationSuccess: (state) => {
      state.notification.isFetching = false;
      state.notification.isDeleted = true;
      state.notification.success = true;
    },
    deleteNotificationFailed: (state) => {
      state.notification.isFetching = false;
      state.notification.error = true;
    },
  },
});

export const {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailed,
  newNotificationStart,
  newNotificationSuccess,
  newNotificationFailed,
  markSeenNotificationStart,
  markSeenNotificationSuccess,
  markSeenNotificationFailed,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailed,
} = notificationSlice.actions;

export default notificationSlice.reducer;
