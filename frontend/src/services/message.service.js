import api from "./api.service";

class MessageService {
  async getAllMessagesByRoomID(roomID) {
    return await api.get(`/message/all-messages/room/${roomID}`);
  }

  async getMessageByID(msgID) {
    return await api.get(`/message/get-message/${msgID}`);
  }

  async sendMessage(message) {
    return await api.post(`/message/send-message`, message);
  }

  async updateMessage(updateMessage) {
    return await api.put(
      `/message/update-message/${updateMessage.msgID}`,
      updateMessage,
    );
  }

  async deleteMessage(msgID) {
    return await api.delete(`/message/delete-message/${msgID}`);
  }

  async deleteAllNessages(userID) {
    return await api.delete(`/message/delete-all/user/${userID}`);
  }
}

export default new MessageService();
