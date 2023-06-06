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
        const res = await imageService.uploadImage(image);

        dispatch(sendImageSuccess(res.data));
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
