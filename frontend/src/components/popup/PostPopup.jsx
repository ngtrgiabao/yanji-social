import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Laugh, Image, X } from "lucide-react";

import "./style/postPopup.css";

import { BG_DEFAULT_WALLPAPER_USER } from "../../assets";

import { uploadPost } from "../../redux/request/postRequest";
import { useCurrentUser, useUploadImage } from "../../hooks";
import PreviewImage from "../preview/PreviewImage";
import { getUserByID } from "../../redux/request/userRequest";
import Global from "../../constants/global";

const PostPopup = ({ onPopup, extendClass, socket }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [content, setContent] = useState("");
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    profilePicture: "",
    username: "",
  });
  const uploadImg = useRef(null);
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);

    if (file.type === "video/mp4") {
      // For upload cloud
      setVideoUrl(file);
      // For preview video
      setVideoSrc(imgUrl);
    } else {
      // For upload cloud
      setImageUrl(file);
      // For preview image
      setImageSrc(imgUrl);
    }
  };

  const handleUploadImgFile = () => {
    uploadImg.current.click();
  };

  const currentUser = useCurrentUser();

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser._id, dispatch).then((data) => {
        const { username, profilePicture } = data.user;

        setUser({
          username: username,
          profilePicture: profilePicture,
        });
      });
  }, [dispatch, currentUser]);

  const handleSendEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];

    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);

    if (content.length < 5000) {
      setContent(content + emoji);
    }
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const cloudStorage = useUploadImage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newPost = {
      userID: currentUser._id,
      desc: content,
    };

    if (imageSrc) {
      const result = await cloudStorage(imageUrl);
      const imageURL = result?.secure_url;
      newPost.img = imageURL;
    }
    if (videoSrc) {
      const result = await cloudStorage(videoUrl, true);
      const videoURL = result?.secure_url;
      newPost.video = videoURL;
    }

    uploadPost(newPost, dispatch)
      .then(async (data) => {
        socket = io(Global.SOCKET_URL);

        await socket.emit("upload-post", data?.data);
      })
      .catch((err) => console.error("Failed to upload post", err));

    setIsLoading(false);
    onPopup();
  };

  const handleDeleteImage = () => {
    setImageSrc("");
    uploadImg.current.value = null;
  };

  return (
    <div
      className={
        "d-flex justify-content-center align-items-center post-popup__container " +
        extendClass
      }
      onClick={onPopup}
    >
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* NAME */}
        <div className="form__name d-flex justify-content-between">
          <div className="d-flex">
            <span className="avatar d-flex justify-content-center align-items-center border border-2 border-white text-white">
              {user.profilePicture ? (
                <img
                  loading="lazy"
                  role="presentation"
                  decoding="async"
                  src={user.profilePicture || BG_DEFAULT_WALLPAPER_USER}
                  alt="Avatar user"
                />
              ) : (
                user.username || currentUser.username
              )}
            </span>
            <div className="ms-3">
              <span className="text-white text-bold fs-4">
                {user.username || currentUser.username}
              </span>
              <div className="form__status d-flex align-items-center mt-1 text-white fw-bold">
                Upload post
              </div>
            </div>
          </div>
          <span className="form__title-icon px-2 mb-4" onClick={onPopup}>
            <X size={20} />
          </span>
        </div>

        {/* INPUT FORM */}
        <div className="form__input">
          <textarea
            id="post-input"
            className="input overflowXHidden"
            maxLength="5000"
            style={{
              overflowY: "auto",
              width: "100%",
              height: "10em",
              resize: "none",
            }}
            onChange={handleContent}
            placeholder={`What's in your mind, ${user.username}?`}
            value={content}
          ></textarea>
        </div>

        <div className="d-flex">
          <div
            className="form__drag-image"
            style={{
              fontSize: "1.8rem",
              cursor: "pointer",
            }}
            onClick={() => handleUploadImgFile()}
          >
            <input
              type="file"
              style={{ display: "none" }}
              ref={uploadImg}
              onChange={(e) => handleImageUpload(e)}
              accept=".jpg, .jpeg, .webp, .png, video/mp4"
            />

            <span>
              <Image size={20} />
            </span>
          </div>
          <span
            style={{ fontSize: "1.8rem" }}
            className="ms-3 position-relative text-white"
          >
            <Laugh
              size={20}
              cursor="pointer"
              onClick={() => {
                active !== "EMOJI" ? setActive("EMOJI") : setActive("");
              }}
            />
            <span
              className="position-absolute top-80"
              hidden={active !== "EMOJI"}
            >
              <Picker
                data={data}
                emojiSize={22}
                emojiButtonSize={29}
                maxFrequentRows={0}
                onEmojiSelect={(e) => handleSendEmoji(e)}
                locale="vi"
                perLine={8}
                previewPosition="none"
              />
            </span>
          </span>
        </div>

        {imageSrc && (
          <div
            className="position-relative mt-4"
            style={{
              maxWidth: "fit-content",
            }}
          >
            <div
              className="overflow-hidden"
              style={{
                maxHeight: "10rem",
                maxWidth: "10rem",
              }}
            >
              <PreviewImage imgSrc={imageSrc} />
            </div>
            <span
              className="delete-image text-white"
              onClick={handleDeleteImage}
            >
              <X size={20} />
            </span>
          </div>
        )}

        {videoSrc && (
          <div
            style={{
              height: "30rem",
            }}
            className="w-100"
          >
            <video src={videoSrc} className="w-100" controls></video>
          </div>
        )}

        {!isLoading ? (
          <input
            type="submit"
            className="w-100 py-3 border-0 rounded fs-4 fw-bold mt-4"
            value="Post"
            disabled={!content && !imageSrc && !videoSrc}
          />
        ) : (
          <button
            className="text-center bg-white text-black py-3 w-100 border-0 rounded fs-5 fw-bold mt-4"
            disabled
            style={{
              cursor: "not-allowed",
            }}
          >
            Uploading post...
          </button>
        )}
      </form>
    </div>
  );
};

export default PostPopup;
