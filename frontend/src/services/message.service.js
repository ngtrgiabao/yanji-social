import api from "./api.service";

class MessageService {
    async getAllMessages(userID) {
        return await api.get(`/api/v1/message/all-messages/user/${userID}`).data;
    }

    async sendMessage(userID) {
        return await api.post(`/api/v1/message/send-message/${userID}`);
    }

    async editMessage(id, data) {}

    async deleteMessage(msgID) {
        return await api.post(`/api/v1/message/delete-message/${msgID}`);
    }

    async deleteAllNessages(userID) {
        return await api.delete(`api/v1/message/delete-all/user/${userID}`);
    }
}

export default new MessageService();
