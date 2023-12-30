import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: {
      isFetching: false,
      error: false,
      success: false,
      messageThread: null,
      isRead: false,
    },
  },

  reducers: {
    // SEND MSG
    sendMessageStart: (state) => {
      state.message.isFetching = true;
    },
    sendMessageSuccess: (state, action) => {
      state.message.isFetching = false;
      state.message.messageThread = action.payload;
      state.message.success = true;
    },
    sendMessageFailed: (state) => {
      state.message.isFetching = false;
      state.message.error = true;
    },
    //GET MSG
    getMessageStart: (state) => {
      state.message = {};
      state.message.isFetching = true;
    },
    getMessageSuccess: (state, action) => {
      state.message.isFetching = false;
      state.message.messageThread = action.payload;
      state.message.success = true;
    },
    getMessageFailed: (state) => {
      state.message.isFetching = false;
      state.message.error = true;
    },
    // UPDATE MSG
    updateMessageStart: (state) => {
      state.message.isFetching = true;
    },
    updateMessageSuccess: (state, action) => {
      state.message.isFetching = false;
      state.message.messageThread = action.payload;
      state.message.success = true;
    },
    updateMessageFailed: (state) => {
      state.message.isFetching = false;
      state.message.error = true;
    },
    // DELETE MSG
    deleteMessageStart: (state) => {
      state.message.isFetching = true;
    },
    deleteMessageSuccess: (state, action) => {
      state.message.isFetching = false;
      state.message.success = true;
    },
    deleteMessageFailed: (state) => {
      state.message.isFetching = false;
      state.message.error = true;
    },
  },
});

export const {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailed,
  updateMessageStart,
  updateMessageSuccess,
  updateMessageFailed,
  deleteMessageStart,
  deleteMessageSuccess,
  deleteMessageFailed,
  getMessageStart,
  getMessageSuccess,
  getMessageFailed,
} = messageSlice.actions;

export default messageSlice.reducer;
