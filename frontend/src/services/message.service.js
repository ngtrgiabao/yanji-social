import api from "./api.service";

class MessageService {
    async getAllMessagesByRoomID(roomID) {
        return await api.get(`/api/v1/message/all-messages/room/${roomID}`);
    }

    async getMessageByID(msgID) {
        return await api.get(`/api/v1/message/get-message/${msgID}`);
    }

    async sendMessage(message) {
        return await api.post(
            `/api/v1/message/send-message/${message.sender}`,
            message
        );
    }

    async updateMessage(updateMessage) {
        return await api.put(
            `/api/v1/message/update-message/${updateMessage.msgID}`,
            updateMessage
        );
    }

    async deleteMessage(msgID) {
        return await api.delete(`/api/v1/message/delete-message/${msgID}`);
    }

    async deleteAllNessages(userID) {
        return await api.delete(`/api/v1/message/delete-all/user/${userID}`);
    }
}

export default new MessageService();
