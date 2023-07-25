import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DEFAULT_AVATAR from "../../assets/background/default_bg_user.svg";

import "../../style/pages/home/homeMiddle.css";
import "../../style/animations/snackbar.css";

import HomeStories from "./HomeStories";
import PostPopup from "../../components/PostPopup";
import Posts from "../../components/Posts";
import { getUserByID } from "../../redux/request/userRequest";

const HomeMiddle = ({ socket }) => {
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState({
        _id: "",
        profilePicture: "",
        username: "",
    });
    const snackBar = useRef(null);
    const dispatch = useDispatch();
    // Get Data
    const [nextUrl, setNextUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const loadMore = async () => {
        setLoading(true);

        setLoading(false);
    };

    // GET AVATAR USER FROM LOCAL

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        currentUser &&
            getUserByID(currentUser._id, dispatch).then((data) => {
                const { _id, profilePicture, username } = data.user;

                setUser({
                    _id,
                    profilePicture,
                    username,
                });
            });
    }, [currentUser, dispatch]);

    const renderPostPopup = () => {
        return (
            currentUser?._id &&
            popup && (
                <PostPopup
                    socket={socket}
                    onPopup={handlePopup}
                    extendClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    const handleDeletePopup = () => {
        if (snackBar.current) {
            const sb = snackBar.current;
            sb.className = "show";

            setTimeout(() => {
                sb.className = sb.className.replace("show", "");
            }, 3000);
        }
    };

    return (
        <div className="middle animate__animated animate__fadeIn position-relative">
            <HomeStories />

            {/* STATUS */}
            <div
                action=""
                className="create-post d-flex align-items-center mb-4"
            >
                <div className="create-post-wrapper d-flex align-items-center">
                    <Link
                        to={currentUser ? `/user/${user._id}` : "/"}
                        className="profile-pic"
                        aria-label="Avatar user"
                    >
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            className="w-100"
                            src={
                                currentUser
                                    ? user.profilePicture || DEFAULT_AVATAR
                                    : DEFAULT_AVATAR
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
                        What's in your mind,
                        {user.username || " user"}?
                    </div>
                </div>
                <div
                    className="submit d-flex align-items-center"
                    title="Đăng bài viết"
                >
                    {currentUser ? (
                        <button
                            onClick={handlePopup}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Post
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Post
                        </Link>
                    )}
                </div>
                {renderPostPopup()}
            </div>
            {/* END STATUS */}

            <div className="posts">
                <Posts handleDeletePopup={handleDeletePopup} socket={socket} />
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

            <div data-deleted-popup ref={snackBar} id="snackbar">
                Deleted post :D
            </div>
        </div>
    );
};

export default HomeMiddle;
