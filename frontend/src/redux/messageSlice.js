import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        sendMessage: {
            message: null,
            isFetching: false,
            error: false,
        },
        editMessage: {
            message: null,
            isFetching: false,
            error: false,
        },
        deleteMessage: {
            message: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // SEND MSG
        sendMessageStart: (state) => {
            state.sendMessage.isFetching = true;
        },
        sendMessageSuccess: (state, action) => {
            state.sendMessage.isFetching = false;
            state.sendMessage.message = action.payload;
            state.sendMessage.error = false;
        },
        sendMessageFailed: (state) => {
            state.sendMessage.isFetching = false;
            state.sendMessage.error = true;
        },
        // EDIT MSG
        editMessageStart: (state) => {
            state.editMessage.isFetching = true;
        },
        editMessageSuccess: (state, action) => {
            state.editMessage.isFetching = false;
            state.editMessage.message = action.payload;
            state.editMessage.error = false;
        },
        editMessageFailed: (state) => {
            state.editMessage.isFetching = false;
            state.editMessage.error = true;
        },
        // DELETE MSG
        deleteMessageStart: (state) => {
            state.deleteMessage.isFetching = true;
        },
        deleteMessageSuccess: (state, action) => {
            state.deleteMessage.isFetching = false;
            state.deleteMessage.error = false;
        },
        deleteMessageFailed: (state) => {
            state.deleteMessage.isFetching = false;
            state.deleteMessage.error = true;
        },
    },
});

export const {
    sendMessageStart,
    sendMessageSuccess,
    sendMessageFailed,
    editMessageStart,
    editMessageSuccess,
    editMessageFailed,
    deleteMessageStart,
    deleteMessageSuccess,
    deleteMessageFailed,
} = messageSlice.actions;

export default messageSlice.reducer;
