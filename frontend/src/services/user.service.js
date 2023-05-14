import api from "./api.service";

class UserService {
    async getAllUsers() {
        return await api.get("/api/v1/all-users").data;
    }

    async loginUser(data) {
        return await api.post("/api/v1/user/login", data);
    }

    async createUser(data) {
        return await api.post("/api/v1/user/register", data).data;
    }

    async getUser(id) {
        return await api.get(`/api/v1/user/${id}`).data;
    }

    async updateUser(id, data) {
        return await api.put(`/api/v1/user/${id}`, data).data;
    }

    async deleteAllUsers() {
        return await api.delete("/api/v1/user/delete-all").data;
    }
    async deleteUserById(id) {
        return await api.get(`/api/v1/user/delete/${id}`).data;
    }
}

export default new UserService();
