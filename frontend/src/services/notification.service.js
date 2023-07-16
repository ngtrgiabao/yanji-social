import api from "./api.service";

class NotificationService {
    async getAllNotisByUser(userID) {
        return await api.get(`/api/v1/notification/all/user/${userID}`);
    }

    async getNotiByID(notiID) {
        return await api.get(`/api/v1/notification/${notiID}`);
    }

    async newNotification(notification) {
        return await api.post(`/api/v1/notification/new`, notification);
    }

    async markSeen(updateNoti) {
        return await api.put(
            `/api/v1/notification/mark-seen/${updateNoti.notiID}`,
            updateNoti
        );
    }

    async deleteNoti(notiID) {
        return await api.delete(`/api/v1/notification/delete/${notiID}`);
    }
}

export default new NotificationService();
