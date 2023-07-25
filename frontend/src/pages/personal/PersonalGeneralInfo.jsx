import { useEffect, useRef, useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PersonalAvatarFriends from "./PersonalAvatarFriends";

import "../../style/pages/personal/personalGeneralInfo.css";
import "../../style/animations/snackbar.css";

import ChangeImagePopup from "../../components/ChangeImagePopup";
import { getUserByID } from "../../redux/request/userRequest";

const PersonalGeneralInfo = ({ userRoute, socket }) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [followings, setFollowings] = useState(0);
    const snackBar = useRef(null);
    const dispatch = useDispatch();

    const handlePopup = () => {
        setOpenPopup((openPopup) => !openPopup);
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        userRoute._id &&
            getUserByID(userRoute._id, dispatch).then((data) => {
                const { followers, followings } = data.user;

                setFollowers(followers.length);
                setFollowings(followings.length);
            });
    }, [userRoute._id, dispatch]);

    const handleUpdatePopup = () => {
        if (snackBar.current) {
            const sb = snackBar.current;
            sb.className = "show";

            setTimeout(() => {
                sb.className = sb.className.replace("show", "");
                window.location.reload();
            }, 3000);
        }
    };

    return (
        <div className="px-5 header-title">
            <div className="d-flex align-items-center justify-content-between header-title-container w-100 h-100">
                <div
                    className="position-relative"
                    onClick={() =>
                        userRoute._id === currentUser._id && handlePopup()
                    }
                >
                    <div className="avatar d-flex justify-content-center align-items-center text-white">
                        {userRoute.profilePicture ? (
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={userRoute.profilePicture}
                                alt="Avatar user"
                                className="w-100"
                            />
                        ) : (
                            <div className="fs-1 fw-bolder">
                                {userRoute.username}
                            </div>
                        )}
                    </div>
                    {userRoute._id === currentUser._id && (
                        <span className="position-absolute border border-primary rounded-circle p-2 edit-avatar">
                            <UilCamera />
                        </span>
                    )}
                </div>

                <div
                    data-title="information"
                    className="w-100 ms-4 mt-5 d-flex justify-content-between"
                >
                    <span>
                        <div className="d-flex align-items-center">
                            <span className="name">
                                {userRoute?.username || "User"}
                            </span>
                            {userRoute?.isVerify && (
                                <FontAwesomeIcon
                                    className="ms-2 fs-3 bg-white rounded rounded-circle text-primary"
                                    icon={faCircleCheck}
                                />
                            )}
                        </div>
                        <div className="d-flex">
                            <div className="friends mb-4 me-3">
                                {followers} Followers
                            </div>
                            <div className="friends mb-4">
                                {followings} Followings
                            </div>
                        </div>
                    </span>

                    <div className="profile-title d-flex align-items-center">
                        <PersonalAvatarFriends
                            userRoutePage={userRoute}
                            socket={socket}
                        />
                    </div>
                </div>
            </div>

            {openPopup && (
                <ChangeImagePopup
                    title="Cập nhật ảnh đại diện"
                    imgSrc={userRoute.profilePicture}
                    isAvatar={true}
                    onClose={() => setOpenPopup("")}
                    message="Update avatar successfully"
                    socket={socket}
                    handleUpdatePopup={handleUpdatePopup}
                />
            )}

            <div ref={snackBar} id="snackbar">
                Update avatar successfully
            </div>
        </div>
    );
};

export default PersonalGeneralInfo;
