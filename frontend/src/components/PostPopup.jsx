import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import { faLock, faImage } from "@fortawesome/free-solid-svg-icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import "../style/components/postPopup.css";

import ProfilePic from "../assets/avatar/profile-pic.png";
import { uploadPost } from "../redux/request/postRequest";
import useUploadImage from "../hooks/useUploadImage";
import PreviewImage from "./PreviewImage";

const PostPopup = ({ onPopup, animateClass }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoSrc, setVideoSrc] = useState("");
    const [content, setContent] = useState("");
    const [active, setActive] = useState("");
    const uploadImg = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);

        if (file.type === "video/mp4") {
            // For upload cloud
            setVideoUrl(file);
            // For preview image
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

    const dispatch = useDispatch();

    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    const handleSendEmoji = (e) => {
        const sym = e.unified.split("_");
        const codeArray = [];

        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);

        setContent(content + emoji);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const cloudStorage = useUploadImage;
    const socketRef = useRef(null);
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userID: userID,
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
                await socket.emit("upload-post", data.data);
            })
            .catch((err) => console.error("Failed to upload post", err));

        onPopup();
    };

    const handleDeleteImage = () => {
        setImageSrc("");
        uploadImg.current.value = null;
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser.data;
    });

    return (
        <div
            className={
                "d-flex justify-content-center align-items-center post-popup__container " +
                animateClass
            }
            onClick={onPopup}
        >
            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="scrollbar"
            >
                {/* NAME */}
                <div className="form__name d-flex justify-content-between">
                    <div className="d-flex">
                        <span className="avatar">
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={currentUser.profilePicture || ProfilePic}
                                alt="Avatar user"
                            />
                        </span>
                        <div className="ms-3">
                            <span className="text-white text-bold fs-4">
                                {currentUser.username}
                            </span>
                            <div className="form__status d-flex align-items-center mt-1">
                                <span className="me-2 text-white">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <select name="" id="" defaultValue="public">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <span
                        className="fs-1 form__title-icon px-2"
                        onClick={onPopup}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                </div>

                {/* INPUT FORM */}
                <div className="form__input">
                    <textarea
                        id="post-input"
                        className="input scrollbar overflowXHidden"
                        maxLength="5000"
                        style={{
                            overflowY: "auto",
                            width: "100%",
                            height: "10em",
                        }}
                        onChange={handleContent}
                        placeholder={`What's in your mind, ${currentUser.username}?`}
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
                        />

                        <span>
                            <FontAwesomeIcon icon={faImage} />
                        </span>
                    </div>
                    <span
                        style={{ fontSize: "1.8rem" }}
                        className="ms-3 position-relative"
                    >
                        <FontAwesomeIcon
                            icon={faFaceSmile}
                            onClick={() => {
                                active !== "EMOJI"
                                    ? setActive("EMOJI")
                                    : setActive("");
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                        <span
                            className="position-absolute top-50"
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
                    <div className="w-100 position-relative">
                        <PreviewImage imgSrc={imageSrc} />
                        <span
                            className="delete-image"
                            onClick={handleDeleteImage}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                    </div>
                )}

                {videoSrc && <video src={videoSrc} controls></video>}

                <input
                    type="submit"
                    className="form__post-btn p-2 w-100 border-0 rounded fs-5 fw-bold mt-4"
                    value="Post"
                />
            </form>
        </div>
    );
};

export default PostPopup;
