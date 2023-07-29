import { useCallback, useEffect, useState } from "react";
import {
    faGithub,
    faInstagram,
    faLinkedin,
    faPinterest,
    faTwitch,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import "../../style/pages/personal/personalIntroduce.css";

import PersonalStories from "./PersonalStories";
import PersonalGallery from "./PersonalGallery";
import { getUserByID } from "../../redux/request/userRequest";
import { io } from "socket.io-client";

const PersonalIntroduce = ({
    onUpdateBioPopup,
    socket,
    onUpdateIntroducePopup,
    userInfo,
}) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        bio: userInfo.bio,
        insta: userInfo.insta,
        linkedin: userInfo.linkedin,
        github: userInfo.github,
        pinterest: userInfo.pinterest,
        youtube: userInfo.youtube,
        twitter: userInfo.twitter,
        twitch: userInfo.twitch,
    });

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleSocket = {
        updateUser: useCallback((data) => {
            const {
                bio,
                insta,
                linkedin,
                github,
                pinterest,
                youtube,
                twitter,
                twitch,
            } = data;

            setUser((prevUser) => ({
                ...prevUser,
                bio,
                insta,
                linkedin,
                github,
                pinterest,
                youtube,
                twitter,
                twitch,
            }));
        }, []),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("updated-user", handleSocket.updateUser);

        return () => {
            socket.off("updated-user", handleSocket.updateUser);
        };
    }, [handleSocket.updateUser]);

    const introduceInfo = [
        {
            id: 1,
            link: "Độc thân",
            icon: faHeart,
        },
        {
            id: 2,
            link: user.insta,
            icon: faInstagram,
            href: "https://www.instagram.com/" + user.insta,
        },
        {
            id: 3,
            link: user.linkedin,
            icon: faLinkedin,
            href: "https://www.linkedin.com/in/" + user.linkedin,
        },
        {
            id: 4,
            link: user.github,
            icon: faGithub,
            href: "https://github.com/" + user.github,
        },
        {
            id: 5,
            link: user.pinterest,
            icon: faPinterest,
            href: "https://www.pinterest.com/" + user.pinterest,
        },
        {
            id: 6,
            link: user.youtube,
            icon: faYoutube,
            href: "https://www.youtube.com/channel/@" + user.youtube,
        },
        {
            id: 7,
            link: user.twitter,
            icon: faTwitter,
            href: "https://twitter.com/" + user.twitter,
        },
        {
            id: 8,
            link: user.twitch,
            icon: faTwitch,
            href: "https://www.twitch.tv/" + user.twitch,
        },
    ];

    useEffect(() => {
        userInfo._id &&
            getUserByID(userInfo._id, dispatch).then((data) => {
                const {
                    bio,
                    insta,
                    linkedin,
                    github,
                    pinterest,
                    youtube,
                    twitter,
                    twitch,
                } = data.user;

                setUser({
                    bio,
                    insta,
                    linkedin,
                    github,
                    pinterest,
                    youtube,
                    twitter,
                    twitch,
                });
            });
    }, [userInfo._id, dispatch]);

    const renderIntroduceInfo = () => {
        return introduceInfo.map(
            (item) =>
                item.link && (
                    <div
                        key={item.id}
                        className="d-flex align-items-center my-3 fs-3"
                    >
                        <FontAwesomeIcon icon={item.icon} />
                        <p className="ms-3 m-0">
                            {item.href ? (
                                <a
                                    className={`m-0 link ${
                                        item.href || item.link
                                            ? "link__color"
                                            : ""
                                    }`}
                                    href={item.href || "#"}
                                >
                                    {item.link}
                                </a>
                            ) : (
                                <span className={`m-0 link`}>{item.link}</span>
                            )}
                        </p>
                    </div>
                )
        );
    };

    return (
        <>
            <p className="fs-1 fw-bold">Introduce</p>

            <div className="w-100">
                <div className="d-flex flex-column align-items-center fs-4">
                    <p className="inline-block text-break">{user.bio}</p>
                </div>
                {currentUser._id === userInfo._id && (
                    <button className="mb-4" onClick={() => onUpdateBioPopup()}>
                        Edit bio
                    </button>
                )}
            </div>

            <div className="border-bottom pb-2 mb-4">
                {renderIntroduceInfo()}
            </div>

            {currentUser._id === userInfo._id && (
                <button
                    className="my-4"
                    onClick={() => onUpdateIntroducePopup()}
                >
                    Edit Details
                </button>
            )}

            <PersonalStories />

            {currentUser._id === userInfo._id && (
                <button className="mt-5">Edit Stories</button>
            )}

            <PersonalGallery />
        </>
    );
};

export default PersonalIntroduce;
