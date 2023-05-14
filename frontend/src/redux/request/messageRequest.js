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
} from "../messageSlice";

export const sendMessage = async (userID, dispatch) => {
    dispatch(sendMessageStart());

    try {
        const res = await messageService.sendMessage(userID.userID);
        dispatch(sendMessageSuccess(res.data));
    } catch (error) {
        dispatch(sendMessageFailed());
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
