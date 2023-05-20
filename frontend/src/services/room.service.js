import api from "./api.service";

class RoomService {
    async getAllRooms() {
        return await api.get(`/api/v1/room/all-rooms`);
    }

    async getAllRoomsByUserID(userID) {
        return await api.get(`/api/v1/room/all-rooms/user/${userID}`);
    }

    async getRoomByID(roomID) {
        return await api.get(`/api/v1/room/${roomID}`);
    }
}

export default new RoomService();
