import api from "./api.service";

class UserService {
  async getAllUsers() {
    return await api.get("/all-users").data;
  }

  async getByUsername(username) {
    return await api.get(`/user/username/${username}`);
  }

  async getPostsShared(userID) {
    return await api.get(`/user/${userID}/shared`);
  }

  async getPostsSaved(userID) {
    return await api.get(`/user/${userID}/saved`);
  }

  async fetchUserSpecificImageQuantity(userInfo) {
    return await api.get(
      `/user/${userInfo.userID}/quantity/image/?limit=${userInfo.limit}`,
    );
  }

  async loginUser(data) {
    return await api.post("/user/login", data);
  }

  async createUser(data) {
    return await api.post("/user/register", data);
  }

  async getUser(userID) {
    return await api.get(`/user/${userID}`);
  }

  async updateUser(updatedUser) {
    return await api.put(`/user/update/${updatedUser.userID}`, updatedUser);
  }

  async followUser(updatedUser) {
    return await api.put(`/user/${updatedUser.userID}/follow`, updatedUser);
  }

  async deleteAllUsers() {
    return await api.delete("/user/delete-all").data;
  }

  async deleteUserById(userID) {
    return await api.delete(`/user/delete/${userID}`);
  }
}

export default new UserService();
