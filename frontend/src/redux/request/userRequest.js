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
    if (userID) {
        dispatch(getUserStart(userID));

        try {
            const res = await userService.getUser(userID);
            dispatch(getUserSuccess(res.data));
            return res.data;
        } catch (error) {
            dispatch(getUserFailed());
        }
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

export const getPostsSaved = async (userID, dispatch) => {
    dispatch(getUserStart(userID));

    try {
        const res = await userService.getPostsSaved(userID);
        dispatch(getUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getUserFailed());
    }
};

export const updateUser = async (updatedUser, dispatch) => {
    dispatch(updateUserStart(updatedUser));

    try {
        const res = await userService.updateUser(updatedUser);
        dispatch(updateUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(updateUserFailed());
    }
};

export const followUser = async (updatedUser, dispatch) => {
    dispatch(updateUserStart(updatedUser));

    try {
        const res = await userService.followUser(updatedUser);
        dispatch(updateUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(updateUserFailed());
    }
};

export const fetchUserSpecificImageQuantity = async (userInfo, dispatch) => {
    dispatch(getUserStart());

    try {
        const res = await userService.fetchUserSpecificImageQuantity(userInfo);
        dispatch(getUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getUserFailed());
    }
};
