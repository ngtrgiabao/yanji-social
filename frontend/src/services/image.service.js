import api from "./api.service";

class ImageService {
  async getAllImagesByUserID(userID) {
    return await api.get(`/image/all-images/${userID}`);
  }

  async getImageByID(imgID) {
    return await api.get(`/image/${imgID}`);
  }

  async uploadImageByUserID(img) {
    return await api.post(`/image/upload/${img.userID}`, img);
  }

  async updateImageByUserID(updateImage) {
    return await api.put(`/image/update/${updateImage.imgID}`, updateImage);
  }

  async deleteAllImagesByUserID(userID) {
    return await api.delete(`/image/delete/all-images/${userID}`);
  }

  async deleteImageByID(imgID) {
    return await api.delete(`/image/delete/${imgID}`);
  }
}

export default new ImageService();
