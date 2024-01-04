import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";

import "../style/changeImagePopup.css";

import PreviewImage from "../preview/PreviewImage";
import { updateUser } from "../../redux/request/userRequest";
import { useUploadImage } from "../../hooks";

const ChangeImagePopup = ({
  title = "Title",
  isCircle = true,
  isAvatar = false,
  isCover = false,
  imgSrc = "imgSrc",
  onClose,
  message,
  socket,
  handleUpdatePopup,
}) => {
  const [avatar, setAvatar] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const avatarImg = useRef(null);
  const dispatch = useDispatch();

  const cloudStorage = useUploadImage;
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];

    const previewImgURL = URL.createObjectURL(file);

    setPreviewImg(previewImgURL);
    setAvatar(file);
  };

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });

  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();

    const result = await cloudStorage(avatar);

    const newUpdateUser = {
      userID: currentUser._id,
    };

    if (isAvatar) {
      const newAvatar = result?.secure_url;
      newUpdateUser.profilePicture = newAvatar;
    }

    if (isCover) {
      const newCover = result?.secure_url;
      newUpdateUser.coverPicture = newCover;
    }

    updateUser(newUpdateUser, dispatch)
      .then((data) => {
        setIsLoading(false);

        const { _id, coverPicture, profilePicture } = data.data;

        const updatedUser = {
          userID: _id,
          coverPicture: coverPicture,
          profilePicture: profilePicture,
        };

        socket = io(SOCKET_URL);
        socket.emit("update-user", updatedUser);

        setIsSuccess(true);
      })
      .catch((err) => {
        console.error("Failed to update avatar", err);
      });

    handleUpdatePopup();
  };

  return (
    !isSuccess && (
      <>
        <div className="change-img__popup d-flex justify-content-center align-items-center animate__animated animate__fadeIn">
          <div
            className="change-img__popup-container d-flex justify-content-center align-items-center flex-column p-4 mt-5"
            data-change-image-popup
          >
            <div className="change-img__popup-title fs-1 d-flex justify-content-between w-100">
              {title}
              <span onClick={onClose}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            </div>

            <div className="change-img__popup-content my-4 d-flex justify-content-center align-items-center flex-column">
              <div className={`${isCircle ? "circle" : "w-75"}`} data-image>
                <PreviewImage imgSrc={previewImg || imgSrc} />
              </div>
              <div
                onClick={() => {
                  avatarImg.current.click();
                }}
                className="fs-2 border w-100 h-100 mt-4 text-center"
                style={{
                  cursor: "pointer",
                }}
                data-choose-image
              >
                Tải ảnh lên
              </div>
              <input
                type="file"
                ref={avatarImg}
                style={{ display: "none" }}
                onChange={(e) => handleUploadAvatar(e)}
                accept=".jpg, .jpeg, .webp, .png"
              />
            </div>

            <div className="change-img__popup-footer fs-4 w-100 d-flex justify-content-end">
              <button className="p-2" onClick={onClose}>
                Cancel
              </button>
              <button
                className="p-2"
                onClick={(e) => handleSubmit(e)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ChangeImagePopup;
