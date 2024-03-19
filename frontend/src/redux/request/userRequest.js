import userService from "../../services/user.service";

import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
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

export const checkIsUserExists = async (username, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userService.getByUsername(username);
    dispatch(getUserSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getUserFailed());
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

export const deleteUser = async (userID, dispatch) => {
  dispatch(deleteUserStart());

  try {
    const res = await userService.deleteUserById(userID);
    dispatch(deleteUserSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(deleteUserFailed());
  }
};
