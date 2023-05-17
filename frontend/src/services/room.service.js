import api from "./api.service";

class RoomService {
    async getAllRooms() {
        return await api.get(`/api/v1/room/all-rooms`);
    }
}

export default new RoomService();
