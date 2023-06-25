import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../style/pages/personal/body/body.css";

import Friends from "./friends/Friends";
import Introduce from "./introduce/Introduce";
import SocialLinks from "./social-links/SocialLinks";
import PostPopup from "../../../components/PostPopup";
import Post from "../../../components/Post";
import { getAllPostsByUser } from "../../../redux/request/postRequest";

function Body({ user }) {
    const [avatar, setAvatar] = useState("");
    const [popup, setPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // SAVE IMG TO LOCAL
    useEffect(() => {
        avatar && window.localStorage.setItem("avatar", avatar);
    }, [avatar]);

    // GET IMG FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const renderPostPopup = () => {
        return (
            popup && (
                <PostPopup
                    onPopup={handlePopup}
                    animateClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    useEffect(() => {
        user._id &&
            getAllPostsByUser(user._id, dispatch)
                .then((data) => {
                    setPosts(data.posts);
                })
                .catch((err) => {
                    console.error("Failed to get post of user", err);
                });
    }, [user]);

    return (
        <>
            <div className="row place-items-center gap-3">
                <div className="col p-4">
                    <div className="row p-3">
                        <Introduce />
                    </div>
                    <div className="row p-3">
                        <Friends />
                    </div>
                    <div className="row p-3">
                        <SocialLinks />
                    </div>
                </div>
                <div className="col-7">
                    <p className="fs-1 fw-bold">Introduce</p>

                    <div className="row d-flex border-bottom pb-4">
                        <div className="profile-pic p-0 rounded-circle overflow-hidden">
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={user.profilePicture}
                                alt="Avatar user"
                            />
                        </div>
                        <button
                            role="button"
                            className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted text-center"
                            onClick={handlePopup}
                        >
                            What are you thinking, {user.username} ?
                        </button>
                    </div>

                    <div className="posts">
                        {posts.map((post) => (
                            <Post
                                key={post._id}
                                postID={post._id}
                                image={post.img}
                                userID={post.userID}
                                createdAt={post.createdAt}
                                desc={post.desc}
                                likes={post.likes}
                                shares={post.shares}
                                comments={post.comments}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {renderPostPopup()}
        </>
    );
}

export default Body;
