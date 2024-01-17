import api from "./api.service";

class RoomService {
  async getAllRooms() {
    return await api.get(`/room/all-rooms`);
  }

  async getAllRoomsByUserID(userID) {
    return await api.get(`/room/all-rooms/user/${userID}`);
  }

  async getRoomByID(roomID) {
    return await api.get(`/room/${roomID}`);
  }

  async createRoom(roomInfo) {
    return await api.post(`/room/create-room`, roomInfo);
  }

  async deleteRoomByID(roomID) {
    return await api.get(`/room/delete/${roomID}`);
  }
}

export default new RoomService();
