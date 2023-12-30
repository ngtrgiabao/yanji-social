import api from "./api.service";

class UserService {
  async getAllUsers() {
    return await api.get("/api/v1/all-users").data;
  }

  async getPostsShared(userID) {
    return await api.get(`/api/v1/user/${userID}/shared`);
  }

  async getPostsSaved(userID) {
    return await api.get(`/api/v1/user/${userID}/saved`);
  }

  async fetchUserSpecificImageQuantity(userInfo) {
    return await api.get(
      `/api/v1/user/${userInfo.userID}/quantity/image/?limit=${userInfo.limit}`,
    );
  }

  async loginUser(data) {
    return await api.post("/api/v1/user/login", data);
  }

  async createUser(data) {
    return await api.post("/api/v1/user/register", data).data;
  }

  async getUser(userID) {
    return await api.get(`/api/v1/user/${userID}`);
  }

  async updateUser(updateUser) {
    return await api.put(
      `/api/v1/user/update/${updateUser.userID}`,
      updateUser,
    );
  }

  async followUser(updatedUser) {
    return await api.put(
      `/api/v1/user/${updatedUser.userID}/follow`,
      updatedUser,
    );
  }

  async deleteAllUsers() {
    return await api.delete("/api/v1/user/delete-all").data;
  }

  async deleteUserById(id) {
    return await api.get(`/api/v1/user/delete/${id}`).data;
  }
}

export default new UserService();
