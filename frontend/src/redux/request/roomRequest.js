import roomService from "../../services/room.service";
import { getRoomStart, getRoomSuccess, getRoomFailed } from "../roomSlice";

export const getRooms = async (dispatch) => {
    dispatch(getRoomStart());
    try {
        const res = await roomService.getAllRooms();
        dispatch(getRoomSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getRoomFailed());
    }
};
