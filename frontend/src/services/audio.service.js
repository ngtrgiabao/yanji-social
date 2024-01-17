import api from "./api.service";

class AudioService {
  async getAllAudiosByUserID(userID) {
    return await api.get(`/audio/all-audios/${userID}`);
  }

  async getAudioByID(audioID) {
    return await api.get(`/audio/${audioID}`);
  }

  async uploadAudioByUserID(audio) {
    return await api.post(`/audio/upload`, audio);
  }

  async updateAudioByUserID(updateAudio) {
    return await api.put(`/audio/update/${updateAudio.audioID}`, updateAudio);
  }

  async deleteAllAudiosByUserID(userID) {
    return await api.delete(`/audio/delete/all-audios/${userID}`);
  }

  async deleteAudioByID(audioID) {
    return await api.delete(`/audio/delete/${audioID}`);
  }
}

export default new AudioService();
