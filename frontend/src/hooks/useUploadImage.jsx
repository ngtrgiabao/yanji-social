import axios from "axios";

const useUploadImage = async (imageSelected) => {
    try {
        const data = new FormData();
        data.append("file", imageSelected);
        data.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PRESET);
        data.append("cloud_name", process.env.REACT_APP_CLOUD_STORAGE_NAME);
        data.append("folder", process.env.REACT_APP_CLOUD_FOLDER);

        if (imageSelected) {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_STORAGE_NAME}/image/upload/`,
                data
            );

            return res.data;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default useUploadImage;
