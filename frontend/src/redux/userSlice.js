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
    },
});

export const { getUserStart, getUserSuccess, getUserFailed } =
    userSlice.actions;

export default userSlice.reducer;
