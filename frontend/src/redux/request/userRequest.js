import userService from "../../services/user.service";
import {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from "../authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await userService.loginUser(user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await userService.createUser(user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logout = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        dispatch(logoutFailed());
    }
};