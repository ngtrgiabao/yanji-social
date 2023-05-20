import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: {
            isFetching: false,
            error: false,
            messageThread: null,
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
            state.message.error = false;
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
            state.message.error = false;
        },
        getMessageFailed: (state) => {
            state.message.isFetching = false;
            state.message.error = true;
        },
        // EDIT MSG
        editMessageStart: (state) => {
            state.message.isFetching = true;
        },
        editMessageSuccess: (state, action) => {
            state.message.isFetching = false;
            state.message.messageThread = action.payload;
            state.message.error = false;
        },
        editMessageFailed: (state) => {
            state.message.isFetching = false;
            state.message.error = true;
        },
        // DELETE MSG
        deleteMessageStart: (state) => {
            state.message.isFetching = true;
        },
        deleteMessageSuccess: (state, action) => {
            state.message.isFetching = false;
            state.message.error = false;
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
    editMessageStart,
    editMessageSuccess,
    editMessageFailed,
    deleteMessageStart,
    deleteMessageSuccess,
    deleteMessageFailed,
    getMessageStart,
    getMessageSuccess,
    getMessageFailed,
} = messageSlice.actions;

export default messageSlice.reducer;
