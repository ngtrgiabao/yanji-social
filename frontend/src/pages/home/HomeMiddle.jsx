import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { POKEMON_URL } from "../../constants/api.data.constant";

import ProfilePic from "../../assets/avatar/profile-pic.png";

import "../../style/pages/home/homeMiddle.css";

import HomeStories from "./HomeStories";
import PostPopup from "../../components/PostPopup";
import Posts from "../../components/Posts";

const HomeMiddle = ({ socket }) => {
    const [popup, setPopup] = useState(false);
    const [avatar, setAvatar] = useState(null);

    // Get Data
    const [nextUrl, setNextUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const loadMore = async () => {
        setLoading(true);

        setLoading(false);
    };

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        let isCancelled = false;
        const data = window.localStorage.getItem("avatar");

        if (!isCancelled) {
            setAvatar(data);
        }

        return () => {
            isCancelled = true;
            data && URL.revokeObjectURL(data.preview);
        };
    }, []);

    // SAVE AVATAR USER TO LOCAL
    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            avatar && window.localStorage.setItem("avatar", avatar);
        }

        return () => {
            isCancelled = true;
        };
    }, [avatar]);

    // GET AVATAR USER FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const renderPostPopup = () => {
        return (
            currentUser?._id &&
            popup && (
                <PostPopup
                    onPopup={handlePopup}
                    animateClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    return (
        <>
            <div className="middle animate__animated animate__fadeIn">
                <HomeStories />

                {/* STATUS */}
                <div
                    action=""
                    className="create-post d-flex align-items-center"
                >
                    <div className="create-post-wrapper d-flex align-items-center">
                        <Link
                            to={currentUser ? `/user/${currentUser._id}` : "/"}
                            className="profile-pic"
                            aria-label="Avatar user"
                        >
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={
                                    currentUser
                                        ? currentUser.profilePicture
                                        : ProfilePic
                                }
                                alt="Avatar user"
                            />
                        </Link>

                        <div
                            className="border-0 ps-3 me-3 ms-3 caption fs-4"
                            name="caption"
                            onClick={handlePopup}
                            id="caption"
                        >
                            What's in your mind,{" "}
                            {currentUser?.username || " user"}?
                        </div>
                    </div>
                    <div
                        className="submit d-flex align-items-center"
                        title="Đăng bài viết"
                    >
                        <button
                            onClick={handlePopup}
                            role="button"
                            type="submit"
                            className="btn btn-primary"
                        >
                            Post
                        </button>
                    </div>
                    {renderPostPopup()}
                </div>
                {/* END STATUS */}

                <div className="posts">
                    <Posts socket={socket} />
                </div>

                {/* <div className="w-100 my-5 d-flex justify-content-center">
                    <button
                        role="button"
                        className="p-3 rounded btn-loadmore"
                        onClick={loadMore}
                    >
                        {loading ? "loading..." : "Load more"}
                    </button>
                </div> */}
            </div>
        </>
    );
};

export default HomeMiddle;
