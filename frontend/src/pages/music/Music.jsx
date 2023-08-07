import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

import "../../style/animations/snackbar.css";
import "../../style/pages/personal/personal.css";
import "../../style/pages/personal/personalNavbarProfile.css";

import useUploadAudio from "../../hooks/useUploadAudio";
import {
    getAllAudiosByUser,
    sendAudio,
} from "../../redux/request/audioRequest";
import Navigation from "../../layout/navigation/Navigation.jsx";
import PersonalHeader from "../personal/PersonalHeader";
import { getUserByID } from "../../redux/request/userRequest";
import PersonalGeneralInfo from "../personal/PersonalGeneralInfo";
import Audio from "../../components/Audio";

const Music = ({ socket }) => {
    const { userID: userRoute } = useParams();

    const [active, setActive] = useState("ALL");
    const [audioUrl, setAudioUrl] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [allAudios, setAllAudios] = useState([]);
    const audioRef = useRef(null);
    const cloudStorage = useUploadAudio;

    const handleUploadAudio = (e) => {
        const file = e.target.files[0];

        setAudioUrl(file);
    };

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        getUserByID(userRoute, dispatch)
            .then((data) => {
                setUserInfo(data.user);
            })
            .catch((err) => {
                console.log("Failed to get user", err);
            });
    }, [userRoute, dispatch]);

    useEffect(() => {
        getAllAudiosByUser(userRoute, dispatch).then((data) => {
            setAllAudios(data.data);
        });
    }, [userRoute, dispatch]);

    const handleSubmit = async () => {
        if (audioUrl) {
            const result = await cloudStorage(audioUrl);

            const { url } = result;

            const audio = {
                userID: currentUser._id,
                audioUrl: url,
            };

            sendAudio(audio, dispatch)
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.error("Failed", err);
                });
        }
    };

    return (
        <>
            <Navigation />

            <div className="personal-container pb-5">
                <PersonalHeader userInfo={userInfo} socket={socket} />
                <PersonalGeneralInfo userInfo={userInfo} socket={socket} />
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <div
                            className="mt-5 p-2 px-3 fs-1 d-flex justify-content-center align-items-center fw-bold text-white"
                            style={{
                                background: "var(--color-primary)",
                                width: "max-content",
                                borderRadius: "0.5rem",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCompactDisc}
                                className="me-3"
                                spin
                            />
                            Yanji Music
                        </div>

                        <div
                            className="d-flex fs-3 justify-content-between"
                            style={{
                                width: "max-content",
                            }}
                        >
                            <input
                                type="file"
                                name=""
                                id=""
                                onChange={(e) => handleUploadAudio(e)}
                                accept=".mp3"
                                style={{
                                    display: "none",
                                }}
                                ref={audioRef}
                            />

                            <div
                                className="link-underline ms-5 active"
                                onClick={() => setActive("ALL")}
                            >
                                All tracks
                            </div>
                            <div
                                className="link-underline ms-5"
                                onClick={() => setActive("DISCOVER")}
                            >
                                Discover
                            </div>
                            {userRoute === currentUser?._id && (
                                <div
                                    className="link-underline ms-5"
                                    onClick={() => {
                                        audioRef.current.click();
                                    }}
                                >
                                    Upload new track
                                </div>
                            )}
                            {audioUrl && (
                                <div
                                    className="p-2 bg-primary fs-4"
                                    onClick={() => handleSubmit()}
                                >
                                    submit
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className={`mt-5 p-5 ${
                            allAudios.length === 0 &&
                            "d-flex justify-content-center align-items-center"
                        }`}
                        style={{
                            height: "80vh",
                            borderRadius: "var(--card-border-radius)",
                            background: "var( --extra-light-dark)",
                        }}
                    >
                        <div className="h-100">
                            {active === "ALL" && (
                                <>
                                    {allAudios.length > 0 ? (
                                        allAudios.map((audio) => (
                                            <Audio
                                                key={audio._id}
                                                audioUrl={audio.audioUrl}
                                                cover={audio.cover}
                                                author={audio.userID}
                                                name={audio.name}
                                            />
                                        ))
                                    ) : (
                                        <div
                                            className="fw-bold w-100 h-100 d-flex justify-content-center align-items-center"
                                            style={{
                                                fontSize: "4rem",
                                            }}
                                        >
                                            ¯\_(ツ)_/¯
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default Music;
