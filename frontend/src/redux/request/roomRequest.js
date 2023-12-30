import roomService from "../../services/room.service";
import {
  getRoomStart,
  getRoomSuccess,
  getRoomFailed,
  createRoomStart,
  createRoomSuccess,
  createRoomFailed,
} from "../roomSlice";

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

export const getCurrentRoom = async (dispatch, roomID) => {
  dispatch(getRoomStart());

  try {
    const res = await roomService.getRoomByID(roomID);
    dispatch(getRoomSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getRoomFailed());
  }
};

export const createRoom = async (dispatch, roomInfo) => {
  dispatch(createRoomStart());

  try {
    const res = await roomService.createRoom(roomInfo);
    dispatch(createRoomSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createRoomFailed());
  }
};
