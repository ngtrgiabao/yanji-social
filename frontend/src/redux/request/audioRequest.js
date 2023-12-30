import audioService from "../../services/audio.service";
import {
  sendAudioStart,
  sendAudioSuccess,
  sendAudioFailed,
  getAudioStart,
  getAudioSuccess,
  getAudioFailed,
} from "../audioSlice";

export const sendAudio = async (audio, dispatch) => {
  dispatch(sendAudioStart());

  try {
    const res = await audioService.uploadAudioByUserID(audio);
    dispatch(sendAudioSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(sendAudioFailed());
  }
};

export const getAudioByID = async (audioID, dispatch) => {
  dispatch(getAudioStart());

  try {
    const res = await audioService.getAudioByID(audioID);

    dispatch(getAudioSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getAudioFailed());
  }
};

export const getAllAudiosByUser = async (userID, dispatch) => {
  dispatch(getAudioStart());

  try {
    const res = await audioService.getAllAudiosByUserID(userID);

    dispatch(getAudioSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getAudioFailed());
  }
};
