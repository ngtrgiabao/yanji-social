import messageService from "../../services/message.service";
import {
    sendMessageStart,
    sendMessageSuccess,
    sendMessageFailed,
    editMessageStart,
    editMessageSuccess,
    editMessageFailed,
    deleteMessageStart,
    deleteMessageSuccess,
    deleteMessageFailed,
    getMessageStart,
    getMessageSuccess,
    getMessageFailed,
} from "../messageSlice";

export const sendMessage = async (message, dispatch) => {
    dispatch(sendMessageStart());
    try {
        const res = await messageService.sendMessage(message);
        dispatch(sendMessageSuccess(res.data));
    } catch (error) {
        dispatch(sendMessageFailed());
    }
};

export const getMessagesByRoomID = async (roomID, dispatch) => {
    dispatch(getMessageStart());
    try {
        const res = await messageService.getAllMessagesByRoomID(roomID);
        dispatch(getMessageSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getMessageFailed());
    }
};

export const deleteMessage = async (msgID, dispatch) => {
    dispatch(deleteMessageStart());
    try {
        await messageService.deleteMessage(msgID);
        dispatch(deleteMessageSuccess());
    } catch (error) {
        dispatch(deleteMessageFailed());
    }
};
