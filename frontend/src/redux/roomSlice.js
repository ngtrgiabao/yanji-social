import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        getRoom: {
            room: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        //GET MSG
        getRoomStart: (state) => {
            state.getRoom.isFetching = true;
        },
        getRoomSuccess: (state, action) => {
            state.getRoom.isFetching = false;
            state.getRoom.message = action.payload;
            state.getRoom.error = false;
        },
        getRoomFailed: (state) => {
            state.getRoom.isFetching = false;
            state.getRoom.error = true;
        },
    },
});

export const { getRoomStart, getRoomSuccess, getRoomFailed } =
    roomSlice.actions;

export default roomSlice.reducer;
