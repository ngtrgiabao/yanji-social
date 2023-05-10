import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    media: [],
    files: [],
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        addMedia: (state, action) => {
            state.media.push(action.payload);
        },
        addFile: (state, action) => {
            state.files.push(action.payload);
        },
    },
});

export const { addMessage, addMedia, addFile } = messagesSlice.actions;

export default messagesSlice.reducer;
