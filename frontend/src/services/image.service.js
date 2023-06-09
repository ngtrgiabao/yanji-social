import api from "./api.service";

class ImageService {
    async getAllImagesByUserID(userID) {
        return await api.get(`/api/v1/image/all-images/${userID}`);
    }

    async getImageByID(imgID) {
        return await api.get(`/api/v1/image/${imgID}`);
    }

    async uploadImageByUserID(img) {
        return await api.post(`/api/v1/image/upload/${img.userID}`, img);
    }

    async updateImageByUserID(updateImage) {
        return await api.put(
            `/api/v1/image/update/${updateImage.imgID}`,
            updateImage
        );
    }

    async deleteAllImagesByUserID(userID) {
        return await api.delete(`/api/v1/image/delete/all-images/${userID}`);
    }

    async deleteImageByID(imgID) {
        return await api.delete(`/api/v1/image/delete/${imgID}`);
    }
}

export default new ImageService();
