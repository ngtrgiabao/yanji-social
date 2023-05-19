import api from "./api.service";

class RoomService {
    async getAllRooms() {
        return await api.get(`/api/v1/room/all-rooms`);
    }

    async getAllRoomsByUserID(userID) {
        return await api.get(`/api/v1/room/all-rooms/user/${userID}`);
    }
}

export default new RoomService();
