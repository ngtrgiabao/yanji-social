import api from "./api.service";

class NotificationService {
  async getAllNotisByUser(userID) {
    return await api.get(`/notification/all/user/${userID}`);
  }

  async getNotiByID(notiID) {
    return await api.get(`/notification/${notiID}`);
  }

  async newNotification(notification) {
    return await api.post(`/notification/new`, notification);
  }

  async markSeen(updateNoti) {
    return await api.put(
      `/notification/mark-seen/${updateNoti.notiID}`,
      updateNoti,
    );
  }

  async deleteNoti(notiID) {
    return await api.delete(`/notification/delete/${notiID}`);
  }
}

export default new NotificationService();
