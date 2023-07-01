import userService from "../../services/user.service";

import {
    getUserStart,
    getUserSuccess,
    getUserFailed,
    updateUserStart,
    updateUserSuccess,
    updateUserFailed,
} from "../userSlice";

export const getUserByID = async (userID, dispatch) => {
    dispatch(getUserStart(userID));

    try {
        const res = await userService.getUser(userID);
        dispatch(getUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getUserFailed());
    }
};

export const getPostsShared = async (userID, dispatch) => {
    dispatch(getUserStart(userID));

    try {
        const res = await userService.getPostsShared(userID);
        dispatch(getUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getUserFailed());
    }
};

export const updateUser = async (updateUser, dispatch) => {
    dispatch(updateUserStart(updateUser));

    try {
        const res = await userService.updateUser(updateUser);
        dispatch(updateUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(updateUserFailed());
    }
};
