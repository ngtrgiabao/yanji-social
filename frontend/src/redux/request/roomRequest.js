import roomService from "../../services/room.service";
import { getRoomStart, getRoomSuccess, getRoomFailed } from "../roomSlice";

export const getAllRooms = async (dispatch) => {
    dispatch(getRoomStart());
    try {
        const res = await roomService.getAllRooms();
        dispatch(getRoomSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getRoomFailed());
    }
};

export const getRoomsByUserID = async (dispatch, userID) => {
    dispatch(getRoomStart());
    try {
        const res = await roomService.getAllRoomsByUserID(userID);
        dispatch(getRoomSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getRoomFailed());
    }
};
