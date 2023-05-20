import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        room: {
            currentRoom: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        //GET MSG
        getRoomStart: (state) => {
            state.room = {};
            state.room.isFetching = true;
        },
        getRoomSuccess: (state, action) => {
            state.room.isFetching = false;
            state.room.currentRoom = action.payload;
            state.room.error = false;
        },
        getRoomFailed: (state) => {
            state.room.isFetching = false;
            state.room.error = true;
        },
    },
});

export const { getRoomStart, getRoomSuccess, getRoomFailed } =
    roomSlice.actions;

export default roomSlice.reducer;
