import imageService from "../../services/image.service";
import {
  sendImageStart,
  sendImageSuccess,
  sendImageFailed,
  getImageStart,
  getImageSuccess,
  getImageFailed,
} from "../imageSlice";

export const sendImage = async (image, dispatch) => {
  dispatch(sendImageStart());

  try {
    const res = await imageService.uploadImageByUserID(image);
    dispatch(sendImageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(sendImageFailed());
  }
};

export const getImageByID = async (imageID, dispatch) => {
  dispatch(getImageStart());

  try {
    const res = await imageService.getImageByID(imageID);

    dispatch(getImageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getImageFailed());
  }
};

export const getAllImagesByUser = async (userID, dispatch) => {
  dispatch(getImageStart());

  try {
    const res = await imageService.getAllImagesByUserID(userID);

    dispatch(getImageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getImageFailed());
  }
};
