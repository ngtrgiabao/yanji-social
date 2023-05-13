import api from "./api.service";

class UserService {
    async getAll() {
        return await api.get("/").data;
    }

    async loginUser(data) {
        return await api.post("/api/v1/user/login", data);
    }

    async createUser(data) {
        return await api.post("/api/v1/user/register", data).data;
    }

    // async deleteAll() {
    //     return await api.delete("/").data;
    // }

    // async get(id) {
    //     return await api.get(`/${id}`).data;
    // }

    // async update(id, data) {
    //     return await api.put(`/${id}`, data).data;
    // }

    // async delete(id) {
    //     return await api.get(`${id}`).data;
    // }
}

export default new UserService();
