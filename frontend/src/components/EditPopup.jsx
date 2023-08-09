import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
    faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import { faLock, faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { io } from "socket.io-client";

import PreviewImage from "./PreviewImage";
import { updatePost } from "../redux/request/postRequest";
import useUploadImage from "../hooks/useUploadImage";

const EditPopup = ({
    onPopup,
    extendClass,
    currentUser,
    defaultAvatar,
    imageSrc,
    videoSrc,
    content,
    socket,
    postID,
    title,
}) => {
    const [newContent, setNewContent] = useState(content);
    const [active, setActive] = useState("");
    const [newVideoSrc, setNewVideoSrc] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newImageSrc, setNewImageSrc] = useState("");
    const [oldVideoSrc, setOldVideoSrc] = useState(videoSrc);
    const [oldImageSrc, setOldImageSrc] = useState(imageSrc);
    const [isLoading, setIsLoading] = useState(false);
    const uploadImg = useRef(null);
    const dispatch = useDispatch();

    const cloudStorage = useUploadImage;
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    socket = io(SOCKET_URL);

    const handleSendEmoji = (e) => {
        const sym = e.unified.split("_");
        const codeArray = [];

        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);

        setNewContent(newContent + emoji);
    };

    const handleNewContent = (e) => {
        setNewContent(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);

        if (file.type === "video/mp4") {
            // For upload cloud
            setNewVideoUrl(file);
            // For preview image
            setNewVideoSrc(fileUrl);
        } else {
            // For upload cloud
            setNewImageUrl(file);
            // For preview image
            setNewImageSrc(fileUrl);
        }
    };

    const handleUploadImgFile = () => {
        uploadImg.current.click();
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        const updatedPost = {
            desc: newContent,
            postID: postID,
            img: newImageSrc,
        };

        if (newImageSrc) {
            const result = await cloudStorage(newImageUrl);
            const imageURL = result?.secure_url;
            updatedPost.img = imageURL;
        } else if (!oldImageSrc) {
            updatedPost.img = null;
        }
        if (newVideoSrc) {
            const result = await cloudStorage(newVideoUrl, true);
            const videoURL = result?.secure_url;
            updatedPost.video = videoURL;
        }

        updatePost(updatedPost, dispatch)
            .then(async (data) => {
                await socket.emit("update-post", data.data);
            })
            .catch((err) => console.error("Failed to update post", err));

        setIsLoading(false);
        onPopup();
    };

    const handleDeleteImage = () => {
        setNewImageSrc("");
        setOldImageSrc("");
        setOldVideoSrc("");

        uploadImg.current.value = null;
    };

    const textOverflow = {
        overflow: "hidden",
        display: "inline-block",
        textOverflow: "ellipsis",
        WebkitBoxOrient: "vertical",
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
                className="overflow-hidden"
                style={textOverflow}
            >
                {/* NAME */}
                <div className="form__name d-flex justify-content-between">
                    <div className="d-flex">
                        <span className="avatar border d-flex justify-content-center align-items-center text-white">
                            {currentUser.profilePicture ? (
                                <img
                                    loading="lazy"
                                    role="presentation"
                                    decoding="async"
                                    src={
                                        currentUser.profilePicture ||
                                        defaultAvatar
                                    }
                                    alt="Avatar user"
                                />
                            ) : (
                                currentUser.username
                            )}
                        </span>
                        <div className="ms-3">
                            <span className="text-white text-bold fs-4">
                                {currentUser.username}
                            </span>
                            <div className="form__status d-flex align-items-center mt-1 fw-bold text-white">
                                {title}
                            </div>
                        </div>
                    </div>
                    <span
                        className="fs-1 form__title-icon px-2"
                        onClick={onPopup}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>

                {/* INPUT FORM */}
                <div className="form__input">
                    <textarea
                        className="input overflowXHidden"
                        maxLength="5000"
                        style={{
                            overflowY: "auto",
                            width: "100%",
                            height: "10em",
                            resize: "none",
                        }}
                        onChange={handleNewContent}
                        placeholder={`What's in your mind, ${currentUser.username}?`}
                        value={newContent}
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
                            accept=".jpg, .jpeg, .webp, .png"
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
                            className="text-white"
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

                {(oldImageSrc || newImageSrc) && (
                    <div className="w-100 position-relative">
                        <PreviewImage imgSrc={oldImageSrc || newImageSrc} />
                        <div
                            className="delete-image"
                            onClick={handleDeleteImage}
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="bg-black p-2 px-3 fs-4 border-0 text-white"
                            />
                        </div>
                    </div>
                )}

                {(oldVideoSrc || newVideoSrc) && (
                    <video src={oldVideoSrc || newVideoSrc} controls></video>
                )}

                {!isLoading ? (
                    <input
                        type="submit"
                        className="form__post-btn p-2 w-100 border-0 rounded fs-5 fw-bold mt-4"
                        value="Update post"
                    />
                ) : (
                    <div className="text-center bg-white text-black form__post-btn p-2 w-100 border-0 rounded fs-5 fw-bold mt-4">
                        Updating post...
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditPopup;
