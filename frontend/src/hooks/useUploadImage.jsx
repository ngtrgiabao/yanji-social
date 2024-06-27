import axios from "axios";
import Global from "../constant/global";

const useUploadImage = async (fileSeleted, isVideo = false) => {
  try {
    const data = new FormData();
    data.append("file", fileSeleted);
    data.append("upload_preset", Global.CLOUD_UPLOAD_PRESET);
    data.append("cloud_name", Global.CLOUD_STORAGE_NAME);
    data.append("folder", Global.CLOUD_IMAGE_FOLDER);

    if (fileSeleted) {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${Global.CLOUD_STORAGE_NAME}/${
          isVideo ? "video" : "image"
        }/upload/`,
        data,
      );

      return res.data;
    }
  } catch (error) {
    console.error("[UPLOAD_IMAGE]", error);
    throw error;
  }
};

export default useUploadImage;
