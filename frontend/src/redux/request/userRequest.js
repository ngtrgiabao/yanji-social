import userService from "../../services/user.service";

import { getUserStart, getUserSuccess, getUserFailed } from "../userSlice";

export const getUserByID = async (dispatch, userID) => {
    dispatch(getUserStart(userID));

    try {
        const res = await userService.getUser(userID);
        dispatch(getUserSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getUserFailed());
    }
};
