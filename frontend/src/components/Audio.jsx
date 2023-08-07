import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import LOGO from "../assets/logo/yanji-social.svg";

import { getUserByID } from "../redux/request/userRequest";

const Audio = ({ audioUrl, cover, author, name }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [authorInfo, setAuthorInfo] = useState({});
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserByID(author, dispatch).then((data) => {
            setAuthorInfo(data.user);
        });
    }, [author, dispatch]);

    const handlePlay = () => {
        // Pause the currently playing audio (if any)

        // Toggle play/pause for the current audio
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleAudioEnd = () => {
        // Reset state when the audio ends to allow replaying from the beginning
        setIsPlaying(false);
    };

    return (
        <div className="d-flex align-items-center mb-5">
            <audio ref={audioRef} onEnded={handleAudioEnd}>
                <source src={audioUrl} type="audio/mp4" />
            </audio>

            <div>
                <div className="d-flex align-items-center">
                    <div
                        className="rounded rounded-circle bg-black"
                        style={{
                            width: "3rem",
                            height: "3rem",
                        }}
                    >
                        {cover ? (
                            <img src={cover} alt="" />
                        ) : (
                            <img src={LOGO} alt="" />
                        )}
                    </div>
                    <span className="fs-3 ms-2">
                        <span className="fw-light">{authorInfo.username}</span>
                        <span className="mx-2">-</span>
                        {name}
                    </span>
                </div>

                <div
                    className="ms-2 p-2 bg-primary fs-4 text-center mt-2"
                    onClick={handlePlay}
                >
                    {isPlaying ? "Pause" : "Play"}
                </div>
            </div>
        </div>
    );
};

export default Audio;
