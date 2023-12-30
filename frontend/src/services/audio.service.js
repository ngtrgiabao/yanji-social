import api from "./api.service";

class AudioService {
  async getAllAudiosByUserID(userID) {
    return await api.get(`/api/v1/audio/all-audios/${userID}`);
  }

  async getAudioByID(audioID) {
    return await api.get(`/api/v1/audio/${audioID}`);
  }

  async uploadAudioByUserID(audio) {
    return await api.post(`/api/v1/audio/upload/${audio.userID}`, audio);
  }

  async updateAudioByUserID(updateAudio) {
    return await api.put(
      `/api/v1/audio/update/${updateAudio.audioID}`,
      updateAudio,
    );
  }

  async deleteAllAudiosByUserID(userID) {
    return await api.delete(`/api/v1/audio/delete/all-audios/${userID}`);
  }

  async deleteAudioByID(audioID) {
    return await api.delete(`/api/v1/audio/delete/${audioID}`);
  }
}

export default new AudioService();
